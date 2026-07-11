param(
  [Parameter(Mandatory = $true)]
  [string]$SourceDocx,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-DocumentLines([string]$Path) {
  $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
  try {
    $entry = $archive.GetEntry('word/document.xml')
    if (-not $entry) { throw 'The DOCX does not contain word/document.xml.' }

    $reader = [System.IO.StreamReader]::new($entry.Open())
    try { [xml]$documentXml = $reader.ReadToEnd() } finally { $reader.Dispose() }
  } finally {
    $archive.Dispose()
  }

  $namespaces = [System.Xml.XmlNamespaceManager]::new($documentXml.NameTable)
  $namespaces.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
  $lines = [System.Collections.Generic.List[object]]::new()

  foreach ($paragraph in $documentXml.SelectNodes('//w:body//w:p', $namespaces)) {
    $text = (($paragraph.SelectNodes('.//w:t', $namespaces) | ForEach-Object { $_.InnerText }) -join '').Trim()
    if (-not $text) { continue }

    $styleNode = $paragraph.SelectSingleNode('./w:pPr/w:pStyle', $namespaces)
    $style = if ($styleNode) {
      $styleNode.GetAttribute('val', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    } else {
      ''
    }

    $lines.Add([pscustomobject]@{ style = $style; text = $text })
  }

  return $lines
}

function Parse-Metadata([string]$Text) {
  if ($Text -notmatch '^(?<id>[GVR]\d{3})\s*\|\s*Level:\s*(?<level>[^|]+)\|\s*Topic:\s*(?<topic>.+)$') {
    throw "Invalid question metadata: $Text"
  }

  return [pscustomobject]@{
    sourceId = $Matches.id.Trim()
    level = $Matches.level.Trim()
    topic = $Matches.topic.Trim()
  }
}

function Parse-Answer([string]$Text) {
  if ($Text -notmatch '^Correct answer:\s*(?<letter>[A-D])\.\s*(?<answer>.*?)Explanation:\s*(?<explanation>.+)$') {
    throw "Invalid answer note: $Text"
  }

  return [pscustomobject]@{
    letter = $Matches.letter
    answer = $Matches.answer.Trim()
    explanation = $Matches.explanation.Trim()
  }
}

function Parse-Options($Lines, [int]$StartIndex) {
  $options = [System.Collections.Generic.List[string]]::new()

  for ($offset = 0; $offset -lt 4; $offset++) {
    $optionLine = $Lines[$StartIndex + $offset].text
    if ($optionLine -notmatch '^[A-D]\.\s*(.+)$') { throw "Invalid option: $optionLine" }
    $options.Add($Matches[1].Trim())
  }

  return $options
}

function Get-WorkContext([string]$Skill, [string]$Topic, [string]$Module) {
  if ($Skill -eq 'reading') { return $Module.ToLowerInvariant() }
  if ($Skill -eq 'vocabulary' -and $Topic.Contains(' - ')) { return $Topic.Split(' - ')[0].ToLowerInvariant() }
  return 'workplace english'
}

$resolvedSource = (Resolve-Path -LiteralPath $SourceDocx).Path
$lines = Read-DocumentLines $resolvedSource
$questions = [System.Collections.Generic.List[object]]::new()
$skill = ''
$passageId = $null
$passageTitle = $null
$passage = $null
$passageModule = $null

for ($index = 0; $index -lt $lines.Count; $index++) {
  $line = $lines[$index]

  if ($line.text -eq 'Section 1 - Grammar Question Bank') { $skill = 'grammar'; continue }
  if ($line.text -eq 'Section 2 - Vocabulary Question Bank') { $skill = 'vocabulary'; continue }
  if ($line.text -eq 'Section 3 - Reading Question Bank') { $skill = 'reading'; continue }
  if ($line.text -eq 'Quick Answer Key') { break }

  if ($skill -eq 'reading' -and $line.style -eq 'Heading2' -and $line.text -match '^Reading Passage \d+:') {
    $passageTitle = $line.text
    $setMetadata = $lines[$index + 1].text
    if ($setMetadata -notmatch '^(?<id>RSET\d+)\s*\|\s*Level:\s*(?<level>[^|]+)\|\s*Module:\s*(?<module>.+)$') {
      throw "Invalid reading set metadata: $setMetadata"
    }
    $passageId = $Matches.id.Trim()
    $passageModule = $Matches.module.Trim()
    $passage = $lines[$index + 2].text
    $index += 2
    continue
  }

  if ($line.style -ne 'Metadata' -or $line.text -notmatch '^[GVR]\d{3}\s*\|') { continue }

  $metadata = Parse-Metadata $line.text
  $questionText = $lines[$index + 1].text
  if ($lines[$index + 1].style -ne 'QuestionText') { throw "Missing question text after $($metadata.sourceId)." }

  $options = Parse-Options $lines ($index + 2)
  $answer = Parse-Answer $lines[$index + 6].text
  if ($answer.answer -notin $options) { throw "Correct answer is not an option for $($metadata.sourceId)." }

  $fullQuestion = if ($skill -eq 'reading') {
    "$passageTitle`n`n$passage`n`n$questionText"
  } else {
    $questionText
  }

  $questions.Add([ordered]@{
    id = "work-$($metadata.sourceId.ToLowerInvariant())"
    sourceId = $metadata.sourceId
    skill = $skill
    level = $metadata.level
    topic = $metadata.topic
    question = $fullQuestion
    options = @($options)
    correctAnswer = $answer.answer
    explanation = $answer.explanation
    workContext = Get-WorkContext $skill $metadata.topic $passageModule
    passageId = if ($skill -eq 'reading') { $passageId } else { $null }
    passageTitle = if ($skill -eq 'reading') { $passageTitle } else { $null }
    passage = if ($skill -eq 'reading') { $passage } else { $null }
    source = [System.IO.Path]::GetFileName($resolvedSource)
  })

  $index += 6
}

$ids = @($questions | ForEach-Object { $_.id })
$normalizedTexts = @($questions | ForEach-Object { ($_.question.ToLowerInvariant() -replace '\s+', ' ').Trim() })
if ($questions.Count -ne 100) { throw "Expected 100 questions; found $($questions.Count)." }
if ((@($ids | Select-Object -Unique)).Count -ne 100) { throw 'Question IDs are not unique.' }
if ((@($normalizedTexts | Select-Object -Unique)).Count -ne 100) { throw 'Question texts are not unique.' }
if (@($questions | Where-Object { $_.options.Count -ne 4 -or $_.correctAnswer -notin $_.options -or -not $_.explanation }).Count) {
  throw 'One or more questions failed content validation.'
}

$metadata = [ordered]@{
  id = 'work-specialized-full-test'
  name = 'Work English Test'
  sourceDocument = [System.IO.Path]::GetFileName($resolvedSource)
  totalQuestions = $questions.Count
  distribution = [ordered]@{
    skill = [ordered]@{
      grammar = @($questions | Where-Object skill -eq 'grammar').Count
      vocabulary = @($questions | Where-Object skill -eq 'vocabulary').Count
      reading = @($questions | Where-Object skill -eq 'reading').Count
    }
    level = [ordered]@{
      B1 = @($questions | Where-Object level -eq 'B1').Count
      B2 = @($questions | Where-Object level -eq 'B2').Count
      C1 = @($questions | Where-Object level -eq 'C1').Count
    }
  }
  attempt = [ordered]@{
    total = 50
    grammar = 30
    vocabulary = 10
    reading = 10
  }
}

$metadataJson = $metadata | ConvertTo-Json -Depth 8
$questionsJson = $questions | ConvertTo-Json -Depth 8
$output = "export const workEnglishTestMetadata = $metadataJson`n`nexport const workEnglishTestQuestions = $questionsJson`n"
$resolvedOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
[System.IO.File]::WriteAllText($resolvedOutput, $output, [System.Text.UTF8Encoding]::new($false))

Write-Output ("Imported $($questions.Count) questions to $resolvedOutput")
Write-Output ($metadata.distribution | ConvertTo-Json -Depth 5)
