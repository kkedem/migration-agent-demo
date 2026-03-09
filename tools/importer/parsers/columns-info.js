/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-info variant.
 * Base block: columns
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 6: Wellbeing card with left image (students), right content: heading, description, CTA
 * Generated: 2026-03-09
 *
 * Block library structure (columns):
 *   Each row has 2 columns. Col 1: image. Col 2: text content.
 *
 * Source DOM structure:
 *   .content-tile.content-tile-color-block--full-img--text-right
 *     .content-tile__figure > picture (image)
 *     .content-tile__figcaption > h2 + .content-tile-text (paragraphs, links)
 */
export default function parse(element, { document }) {
  // Extract image
  const picture = element.querySelector('picture');
  const img = element.querySelector('img');
  const imageEl = picture || img;

  // Extract heading
  const heading = element.querySelector('.content-tile__title, h2');

  // Extract description and CTAs
  const rteContainer = element.querySelector('.content-tile-text');
  const paragraphs = rteContainer ? rteContainer.querySelectorAll(':scope > p') : [];

  // Build image column
  const imageCol = imageEl ? (imageEl.closest('picture') || imageEl) : '';

  // Build text column
  const textCol = [];
  if (heading) textCol.push(heading);
  paragraphs.forEach((p) => textCol.push(p));

  const cells = [];
  cells.push([imageCol, textCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-info', cells });
  element.replaceWith(block);
}
