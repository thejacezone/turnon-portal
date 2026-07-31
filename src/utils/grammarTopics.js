export function normalizeGrammarTopic(value = '') {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

export function createGrammarTopicId(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
