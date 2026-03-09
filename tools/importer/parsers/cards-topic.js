/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-topic variant.
 * Base block: cards
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 5: Four items (Science, Science support, Languages, SEND) each with image, heading, paragraph, CTA
 * Generated: 2026-03-09
 *
 * Block library structure (cards):
 *   Each row = 1 card with 2 columns:
 *     Col 1: Image
 *     Col 2: Title, description, CTA
 *
 * Source DOM structure:
 *   section.column-control.flex-layout--pin-cta .content-tile.content-tile-panel-item
 *   Each card: picture + .content-tile__figcaption > h2 + .content-tile-text (paragraphs, links)
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

    // Extract description and CTAs
    const rteContainer = card.querySelector('.content-tile-text');
    const paragraphs = rteContainer ? rteContainer.querySelectorAll(':scope > p') : [];

    // Build image cell
    const imageCell = imageEl ? (imageEl.closest('picture') || imageEl) : '';

    // Build text cell: heading + description + CTAs
    const textCell = [];
    if (title) textCell.push(title);
    paragraphs.forEach((p) => textCell.push(p));

    if (imageCell || textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-topic', cells });
  element.replaceWith(block);
}
