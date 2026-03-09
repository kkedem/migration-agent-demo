/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-landing variant.
 * Base block: hero
 * Source: https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 * Section 1: Hero with H1, subtitle text, CTA link, and right-side promotional image
 * Generated: 2026-03-09
 *
 * Block library structure (hero):
 *   Row 1: Background image (optional)
 *   Row 2: Title, subheading, description, CTA
 *
 * Source DOM structure:
 *   section.column-control.has-padding-bottom--45:first-of-type
 *     .row > .col-md-8 (text content: h1, content-tiles with h2, paragraphs, links)
 *     .row > .col-md-4 (promotional image in .content-tile.promocard--lightest-theme)
 */
export default function parse(element, { document }) {
  // Extract the promotional image from the right column (serves as background/hero image)
  const promoImage = element.querySelector('.promocard--lightest-theme picture, .promocard--lightest-theme img');

  // Extract the H1 heading
  const heading = element.querySelector('h1');

  // Extract content tiles with text (H2 headings, paragraphs, links)
  const contentTiles = element.querySelectorAll('.content-tile:not(.promocard--lightest-theme) .content-tile__figcaption');

  // Build content cell: heading + all content tile text
  const contentCell = [];
  if (heading) contentCell.push(heading);

  contentTiles.forEach((figcaption) => {
    const title = figcaption.querySelector('.content-tile__title');
    if (title) contentCell.push(title);

    const rteContainer = figcaption.querySelector('.content-tile-text');
    if (rteContainer) {
      const children = rteContainer.querySelectorAll(':scope > p, :scope > ul, :scope > ol');
      children.forEach((child) => contentCell.push(child));
    }
  });

  // Build cells array matching hero block library structure
  const cells = [];

  // Row 1: Background image (optional)
  if (promoImage) {
    const img = promoImage.tagName === 'IMG' ? promoImage : promoImage.querySelector('img');
    if (img) cells.push([img.closest('picture') || img]);
  }

  // Row 2: Content (heading, description, CTAs)
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
