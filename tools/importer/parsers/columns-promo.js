/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-promo variant.
 * Base block: columns
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 3 (seq 2): Large promotional card with image on left, heading + subtitle + description + CTA on right
 * Generated: 2026-03-09
 *
 * Block library structure (columns):
 *   Each row has 2+ columns. Col 1: image content. Col 2: text content.
 *
 * Source DOM structure:
 *   .content-tile.c-promo-gradient-dark-text-left
 *     .content-tile__figure > picture (image)
 *     .content-tile__figcaption > h2 + .content-tile-subtitle + .content-tile-text (text content)
 */
export default function parse(element, { document }) {
  // Extract image
  const picture = element.querySelector('picture');
  const img = element.querySelector('img');
  const imageEl = picture || img;

  // Extract heading
  const heading = element.querySelector('.content-tile__title, h2');

  // Extract subtitle
  const subtitle = element.querySelector('.content-tile-subtitle');

  // Extract description and CTAs from rte-container
  const rteContainer = element.querySelector('.content-tile-text');
  const paragraphs = rteContainer ? rteContainer.querySelectorAll(':scope > p') : [];

  // Build image column
  const imageCol = imageEl ? (imageEl.closest('picture') || imageEl) : '';

  // Build text column
  const textCol = [];
  if (heading) textCol.push(heading);
  if (subtitle) textCol.push(subtitle);
  paragraphs.forEach((p) => textCol.push(p));

  const cells = [];
  cells.push([imageCol, textCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
