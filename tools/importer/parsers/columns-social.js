/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-social variant.
 * Base block: columns
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 7: Two side-by-side items with headings (Pearson Edexcel / Pearson BTEC) and social media links
 * Generated: 2026-03-09
 *
 * Block library structure (columns):
 *   Each row has 2 columns. Each column: heading + links.
 *
 * Source DOM structure:
 *   section.column-control.flex-layout.has-padding-top--none
 *     .col-md-6 > .content-tile.content-tile-panel-item-main.text-primary-link (x2)
 *     Each: .content-tile__figcaption > h2 + .content-tile-text (links)
 */
export default function parse(element, { document }) {
  // Find the two column items
  const columnItems = element.querySelectorAll('.content-tile.content-tile-panel-item-main');

  const cols = [];
  columnItems.forEach((item) => {
    const colContent = [];

    // Extract heading
    const heading = item.querySelector('.content-tile__title, h2');
    if (heading) colContent.push(heading);

    // Extract links from rte-container
    const rteContainer = item.querySelector('.content-tile-text');
    if (rteContainer) {
      const paragraphs = rteContainer.querySelectorAll(':scope > p');
      paragraphs.forEach((p) => colContent.push(p));
    }

    cols.push(colContent);
  });

  // Build cells: single row with 2 columns
  const cells = [];
  if (cols.length >= 2) {
    cells.push([cols[0], cols[1]]);
  } else if (cols.length === 1) {
    cells.push([cols[0]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-social', cells });
  element.replaceWith(block);
}
