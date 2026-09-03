import argparse
import json
import re
import unicodedata
from pathlib import Path

from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P


OFFER_SLUGS = {
    'Banking and Online Services Support': 'banking-and-online-services-support',
    'Hotel Guest Relocation Support': 'hotel-guest-relocation-support',
    'Medical Authorization Support': 'medical-authorization-support',
    'Medical and Dental Chat Support': 'medical-and-dental-chat-support',
    'Home and Auto Claims Intake': 'home-and-auto-claims-intake',
    'Smart Wellness Device Support': 'smart-wellness-device-support',
    'Audio Device Technical Support': 'audio-device-technical-support',
    'Gaming Platform Support': 'gaming-platform-support',
    'Internet, TV and Phone Sales': 'internet-tv-and-phone-sales',
    'Vacation Property Optimization Sales': 'vacation-property-optimization-sales',
    'Hotel Platform Registration Sales': 'hotel-platform-registration-sales',
}


def iter_blocks(document):
    for child in document.element.body.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, document)
        elif isinstance(child, CT_Tbl):
            yield Table(child, document)


def text(block):
    return block.text.strip()


def table_rows(table):
    return [[cell.text.strip() for cell in row.cells] for row in table.rows]


def next_table(blocks, start, stop=None):
    for index in range(start, stop or len(blocks)):
        if isinstance(blocks[index], Table):
            return index, blocks[index]
    raise ValueError(f'No table found after block {start}')


def find_heading(blocks, start, stop, heading):
    for index in range(start, stop):
        block = blocks[index]
        if isinstance(block, Paragraph) and text(block) == heading:
            return index
    raise ValueError(f'Heading not found: {heading}')


def normalize_level(label):
    value = unicodedata.normalize('NFKD', label).encode('ascii', 'ignore').decode().lower()
    if value.startswith('facil'):
        return 'easy'
    if value.startswith('intermedio'):
        return 'intermediate'
    if value.startswith('dificil'):
        return 'difficult'
    raise ValueError(f'Unknown role-play level: {label}')


def split_label(value):
    parts = [part.strip() for part in value.split('·', 1)]
    return normalize_level(parts[0]), parts[1] if len(parts) > 1 else parts[0]


def paragraph_after(blocks, start, stop, prefix=None):
    for index in range(start, stop):
        block = blocks[index]
        if not isinstance(block, Paragraph) or not text(block):
            continue
        value = text(block)
        if prefix is None or value.startswith(prefix):
            return index, value
    raise ValueError(f'Paragraph not found after block {start}: {prefix}')


def parse_offer(blocks, start, stop, title):
    eyebrow = ''
    for index in range(start - 1, -1, -1):
        block = blocks[index]
        if isinstance(block, Table):
            rows = table_rows(block)
            if len(rows) == 1 and len(rows[0]) == 1:
                eyebrow = rows[0][0]
                break

    intro_index, introduction = paragraph_after(blocks, start + 1, stop)
    _, skills_line = paragraph_after(blocks, intro_index + 1, stop, 'Habilidades que debe demostrar:')
    skills = skills_line.removeprefix('Habilidades que debe demostrar:').strip()

    vocabulary_heading = find_heading(blocks, start, stop, '25 palabras de vocabulario')
    _, vocabulary_table = next_table(blocks, vocabulary_heading + 1, stop)
    vocabulary_rows = table_rows(vocabulary_table)
    vocabulary = [
        {'term': row[0], 'meaning': row[1], 'example': row[2]}
        for row in vocabulary_rows[1:]
    ]

    phrases_heading = find_heading(blocks, start, stop, '15 frases útiles')
    _, phrases_table = next_table(blocks, phrases_heading + 1, stop)
    phrases = [row[-1] for row in table_rows(phrases_table)]

    questions_heading = find_heading(blocks, start, stop, '4 preguntas de entrevista')
    roleplays_heading = find_heading(blocks, start, stop, '3 role plays')
    question_paragraphs = [
        text(block) for block in blocks[questions_heading + 1:roleplays_heading]
        if isinstance(block, Paragraph) and text(block)
    ]
    questions = []
    for index in range(0, len(question_paragraphs), 2):
        question = re.sub(r'^\d+\.\s*', '', question_paragraphs[index])
        explanation = question_paragraphs[index + 1].removeprefix('Qué debe demostrar:').strip()
        questions.append({'question': question, 'demonstrates': explanation})

    role_plays = []
    auto_assessment = ''
    index = roleplays_heading + 1
    while index < stop:
        block = blocks[index]
        if isinstance(block, Table):
            rows = table_rows(block)
            if len(rows) == 1 and len(rows[0]) == 1:
                label = rows[0][0]
                if label == 'AUTOEVALUACIÓN':
                    _, auto_assessment = paragraph_after(blocks, index + 1, stop)
                    break
                if any(label.startswith(prefix) for prefix in ('FÁCIL', 'INTERMEDIO', 'DIFÍCIL')):
                    level, role_title = split_label(label)
                    situation_index, situation = paragraph_after(blocks, index + 1, stop, 'Situación:')
                    objective_index, objective = paragraph_after(blocks, situation_index + 1, stop, 'Objetivo del agente:')
                    dialogue_index, dialogue_table = next_table(blocks, objective_index + 1, stop)
                    role_plays.append({
                        'level': level,
                        'label': label.split('·', 1)[0].strip().title(),
                        'title': role_title,
                        'situation': situation.removeprefix('Situación:').strip(),
                        'agentObjective': objective.removeprefix('Objetivo del agente:').strip(),
                        'dialogue': [row[0] for row in table_rows(dialogue_table)],
                    })
                    index = dialogue_index
        index += 1

    return {
        'slug': OFFER_SLUGS[title],
        'title': title,
        'eyebrow': eyebrow,
        'introduction': introduction,
        'skills': skills,
        'vocabulary': vocabulary,
        'usefulPhrases': phrases,
        'interviewQuestions': questions,
        'rolePlays': role_plays,
        'selfAssessment': auto_assessment,
    }


def validate(data):
    if len(data) != 11:
        raise ValueError(f'Expected 11 offers, found {len(data)}')
    for slug, offer in data.items():
        counts = {
            'vocabulary': len(offer['vocabulary']),
            'usefulPhrases': len(offer['usefulPhrases']),
            'interviewQuestions': len(offer['interviewQuestions']),
            'rolePlays': len(offer['rolePlays']),
        }
        expected = {'vocabulary': 25, 'usefulPhrases': 15, 'interviewQuestions': 4, 'rolePlays': 3}
        if counts != expected:
            raise ValueError(f'Invalid counts for {slug}: {counts}')
        if {role['level'] for role in offer['rolePlays']} != {'easy', 'intermediate', 'difficult'}:
            raise ValueError(f'Invalid role-play levels for {slug}')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()

    document = Document(args.source)
    blocks = list(iter_blocks(document))
    headings = [
        (index, text(block)) for index, block in enumerate(blocks)
        if isinstance(block, Paragraph)
        and block.style.name == 'Heading 1'
        and text(block) in OFFER_SLUGS
    ]

    parsed = {}
    for position, (start, title) in enumerate(headings):
        stop = headings[position + 1][0] if position + 1 < len(headings) else len(blocks)
        offer = parse_offer(blocks, start, stop, title)
        parsed[offer['slug']] = offer

    validate(parsed)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(parsed, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {len(parsed)} offers into {args.output}')
    for slug, offer in parsed.items():
        print(
            f"{slug}: {len(offer['vocabulary'])} vocabulary, "
            f"{len(offer['usefulPhrases'])} phrases, "
            f"{len(offer['interviewQuestions'])} questions, "
            f"{len(offer['rolePlays'])} role plays"
        )


if __name__ == '__main__':
    main()
