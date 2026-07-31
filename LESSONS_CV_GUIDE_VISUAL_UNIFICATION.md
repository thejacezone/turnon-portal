# Lessons / CV Guide visual unification

## Scope

This update unifies the visual presentation of:

- `#/lessons`
- `#/lessons/:lessonSlug`

It does not change the lesson bank, lesson order, slugs, classifications, routes, tests, resources, or the CV guide.

## Visual reference reused

The existing `CvGuideArticle.jsx` and `cv-guide.css` implementation was used as the visual reference. Lessons now shares its editorial language:

- white page backgrounds;
- compact white headers;
- Anton for display titles and Inter for reading text;
- TurnOn blue for navigation panels and editorial callouts;
- lime for active states, facts, groups, recap cards, and primary actions;
- orange for hover and emphasis states;
- rounded cards, restrained shadows, and generous reading spacing.

No CV guide content or component was copied into Lessons, and no shared global component was changed.

## Lesson map

- Compact white hero with the eyebrow `TURNON LESSONS`.
- Display title `Lesson map`.
- Facts for `38 lessons` and `A2 to C1`.
- Three accordion groups:
  - Foundation: 12 lessons, A2–B1.
  - Intermediate: 14 lessons, B1–B2.
  - Advanced: 12 lessons, B2–C1.
- Lime closed/group headers, orange hover, and blue expanded lesson lists.
- Final call to action toward Work English Test and General English Level Test.

## Individual lesson template

- Compact white header with breadcrumb, lesson metadata, title, introduction, level, section count, and example count.
- Sticky blue desktop index with lime active state and orange hover state.
- Mobile `details` index labeled `Contenido de la lección`; it closes after navigation and keeps the active section visible in its summary.
- Editorial treatment for tables, rules, examples, comparisons, mistakes, and quick recap.
- Final navigation supports the previous lesson, next lesson, Lesson map, and tests according to the current lesson position.

## Decorative assets

There are no feather images in:

- the Lesson map hero;
- the Lesson map background;
- individual lesson headers;
- individual lesson backgrounds.

The CV guide remains unchanged and continues to use its four existing feather decorations.

## Responsive and functional verification

Verified in the local app with HashRouter at:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px;
- 360 px.

Results:

- no horizontal page overflow at the tested widths;
- desktop sticky index at 1024 px and above;
- mobile accordion index at 768 px and below;
- 760 px maximum editorial reading width on desktop;
- Lesson map retains all three groups and all 38 lesson links;
- first lesson shows the next link but no previous link;
- last lesson shows the previous link but no next link;
- internal section navigation updates the active item correctly;
- mobile section navigation closes the accordion after use;
- the CV guide still renders its title, 13 sections, and 4 feather images;
- `prefers-reduced-motion: reduce` removes Lessons transitions.

## Data integrity

The existing lesson bank remains unchanged:

- 38 lessons total;
- 38 unique slugs;
- Foundation: 12;
- Intermediate: 14;
- Advanced: 12;
- first slug: `basic-sentence-structure`;
- last slug: `fronting-and-emphasis`.

## Build

`npm run build` completed successfully before the backup and after the implementation.

