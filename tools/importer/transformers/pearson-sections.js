/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Pearson section breaks and section-metadata.
 * Runs only in afterTransform. Uses payload.template.sections from page-templates.json.
 * Selectors from captured DOM of https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 */
export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;

  const { document } = payload;
  const sections = payload.template && payload.template.sections;
  if (!sections || sections.length < 2) return;

  // Process sections in reverse order to avoid DOM position shifts
  const reversedSections = [...sections].reverse();

  reversedSections.forEach((section) => {
    // Find the first element matching the section selector
    let sectionEl = null;
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

    for (const sel of selectors) {
      sectionEl = element.querySelector(sel);
      if (sectionEl) break;
    }

    if (!sectionEl) return;

    // Add section-metadata block if section has a style
    if (section.style) {
      const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      sectionEl.after(sectionMetadataBlock);
    }

    // Add section break (<hr>) before section (except the first section)
    if (section.id !== 'section-1') {
      const hr = document.createElement('hr');
      sectionEl.before(hr);
    }
  });
}
