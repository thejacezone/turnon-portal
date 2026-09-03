import argparse
import json
import re
import unicodedata
from pathlib import Path


ARTICLE_CONFIG = {
    'tell-me': {
        'start': '# ARTÍCULO 1 — TEXTO APROBADO',
        'stop': '# ARTÍCULO 2 — TEXTO APROBADO',
        'relatedHeading': 'También puede interesarte',
        'relatedBefore': '¿Ya sabés cómo presentarte, pero no tenés claro qué fortalezas mencionar? Complementá esta guía con ',
        'relatedLabel': '“Fortalezas y habilidades en una entrevista: cómo elegirlas y explicarlas”',
        'relatedAfter': ' y aprendé a responder sin recurrir a cualidades genéricas o inventadas.',
        'relatedTo': '/recursos/fortalezas',
    },
    'fortalezas': {
        'start': '# ARTÍCULO 2 — TEXTO APROBADO',
        'stop': '# PARTE 2 — ELIMINAR',
        'relatedHeading': 'Complementá este artículo',
        'relatedBefore': '¿Ya identificaste tus fortalezas y habilidades? Aprendé a integrarlas en una presentación profesional con ',
        'relatedLabel': '“Cómo responder ‘Tell me about yourself’ si no tenés experiencia”',
        'relatedAfter': '.',
        'relatedTo': '/recursos/tell-me',
    },
}


def strip_bold(value):
    return value.strip().removeprefix('**').removesuffix('**')


def slugify(value):
    normalized = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', normalized).strip('-')


def extract_between(source, start, stop):
    return source.split(start, 1)[1].split(stop, 1)[0]


def parse_blocks(lines):
    blocks = []
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        if not line:
            index += 1
            continue

        if line.startswith('### '):
            blocks.append({'type': 'heading', 'text': line[4:].strip()})
            index += 1
            continue

        if line.startswith('> '):
            quote_lines = []
            while index < len(lines) and lines[index].strip().startswith('> '):
                quote_lines.append(lines[index].strip()[2:].strip())
                index += 1
            blocks.append({'type': 'quote', 'text': ' '.join(quote_lines)})
            continue

        if line.startswith('* '):
            items = []
            while index < len(lines) and lines[index].strip().startswith('* '):
                items.append(lines[index].strip()[2:].strip())
                index += 1
            blocks.append({'type': 'list', 'items': items})
            continue

        if re.match(r'^\d+\.\s+', line):
            items = []
            while index < len(lines) and re.match(r'^\d+\.\s+', lines[index].strip()):
                items.append(re.sub(r'^\d+\.\s+', '', lines[index].strip()))
                index += 1
            blocks.append({'type': 'ordered-list', 'items': items})
            continue

        paragraph = [line]
        index += 1
        while index < len(lines):
            next_line = lines[index].strip()
            if not next_line:
                break
            if next_line.startswith(('## ', '### ', '> ', '* ')) or re.match(r'^\d+\.\s+', next_line):
                break
            paragraph.append(next_line)
            index += 1
        blocks.append({'type': 'paragraph', 'text': ' '.join(paragraph)})

    return blocks


def parse_article(source, config):
    section_source = extract_between(source, config['start'], config['stop'])
    title_area = section_source.split('## Contenido exacto', 1)[0]
    title_match = re.search(r'## Título interno\s+\*\*(.+?)\*\*', title_area, re.S)
    if not title_match:
        raise ValueError(f"Title not found for {config['start']}")
    title = title_match.group(1).strip()

    content_area = section_source.split('## Contenido exacto', 1)[1].split('## Bloque relacionado al final del artículo', 1)[0]
    lines = content_area.strip().splitlines()
    sections = []
    current_title = 'Introducción'
    current_lines = []

    def flush_section():
        nonlocal current_lines
        blocks = parse_blocks(current_lines)
        if blocks:
            section_id = 'introduccion' if current_title == 'Introducción' else slugify(current_title)
            sections.append({'id': section_id, 'navLabel': current_title, 'title': current_title, 'blocks': blocks})
        current_lines = []

    for line in lines:
        if line.startswith('## '):
            flush_section()
            current_title = line[3:].strip()
        else:
            current_lines.append(line)
    flush_section()

    return {
        'title': title,
        'sections': sections,
        'related': {
            'heading': config['relatedHeading'],
            'before': config['relatedBefore'],
            'label': config['relatedLabel'],
            'after': config['relatedAfter'],
            'to': config['relatedTo'],
        },
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()

    source = args.source.read_text(encoding='utf-8')
    articles = {slug: parse_article(source, config) for slug, config in ARTICLE_CONFIG.items()}

    for slug, article in articles.items():
        if not article['sections']:
            raise ValueError(f'No sections generated for {slug}')
        if not any(block['type'] == 'quote' for section in article['sections'] for block in section['blocks']):
            raise ValueError(f'No quotations generated for {slug}')

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {len(articles)} interview articles into {args.output}')
    for slug, article in articles.items():
        block_count = sum(len(section['blocks']) for section in article['sections'])
        print(f"{slug}: {len(article['sections'])} sections, {block_count} blocks")


if __name__ == '__main__':
    main()
