/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-linked variant.
 * Base block: cards
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 2: Three linked items (GCSE, A level, BTEC) each with image and heading wrapped in a link
 * Generated: 2026-03-09
 *
 * Block library structure (cards):
 *   Each row = 1 card with 2 columns:
 *     Col 1: Image
 *     Col 2: Title, description, CTA
 *
 * Source DOM structure:
 *   section.column-control.bgcolor--ui-01 .content-tile.content-tile-panel-item
 *   Each card: .content-tile__figure > a[href] > picture + .content-tile__figcaption > h2
 */
export default function parse(element, { document }) {
  // Find all card items within this section
  const cardElements = element.querySelectorAll('.content-tile.content-tile-panel-item');
  const cells = [];

  cardElements.forEach((card) => {
    // Extract image
    const picture = card.querySelector('picture');
    const img = card.querySelector('img');
    const imageEl = picture || img;

    // Extract heading
    const title = card.querySelector('.content-tile__title, h2');

    // Extract the link wrapping the card content
    const link = card.querySelector('.content-tile__figure > a[href]');

    // Build image cell
    const imageCell = imageEl ? (imageEl.closest('picture') || imageEl) : '';

    // Build text cell: heading + link
    const textCell = [];
    if (title) textCell.push(title);
    if (link && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = title ? title.textContent : link.textContent;
      textCell.push(a);
    }

    if (imageCell || textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-linked', cells });
  element.replaceWith(block);
}
