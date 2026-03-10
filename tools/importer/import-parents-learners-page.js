/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - Import all parsers needed for this template
import heroLandingParser from './parsers/hero-landing.js';
import cardsLinkedParser from './parsers/cards-linked.js';
import cardsTopicParser from './parsers/cards-topic.js';
import columnsPromoParser from './parsers/columns-promo.js';
import columnsInfoParser from './parsers/columns-info.js';
import columnsSocialParser from './parsers/columns-social.js';

// TRANSFORMER IMPORTS - Import all transformers found in tools/importer/transformers/
import pearsonCleanupTransformer from './transformers/pearson-cleanup.js';
import pearsonSectionsTransformer from './transformers/pearson-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'parents-learners-page',
  description: 'Secondary schools parents and learners landing page with informational content sections',
  urls: [
    'https://www.pearson.com/en-gb/schools/secondary/parents-learners.html',
  ],
  blocks: [
    {
      name: 'hero-landing',
      instances: [
        'main section.column-control.has-padding-bottom--45:first-of-type',
      ],
    },
    {
      name: 'cards-linked',
      instances: [
        'main section.column-control.bgcolor--ui-01:nth-of-type(2)',
      ],
    },
    {
      name: 'columns-promo',
      instances: [
        'main .content-tile.c-promo-gradient-dark-text-left',
      ],
    },
    {
      name: 'cards-topic',
      instances: [
        'main section.column-control.flex-layout--pin-cta',
      ],
    },
    {
      name: 'columns-info',
      instances: [
        'main .content-tile.content-tile-color-block--full-img--text-right',
      ],
    },
    {
      name: 'columns-social',
      instances: [
        'main section.column-control.flex-layout.has-padding-top--none',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'main section.column-control.has-padding-bottom--45:first-of-type',
      style: null,
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Qualification Cards',
      selector: 'main section.column-control.bgcolor--ui-01:nth-of-type(2)',
      style: 'grey',
      blocks: ['cards-linked'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Information and Revise Promo',
      selector: 'main section.column-control.has-padding-bottom--45:nth-of-type(3)',
      style: null,
      blocks: ['columns-promo'],
      defaultContent: ['.content-tile.promocard--light-theme'],
    },
    {
      id: 'section-4',
      name: 'Careers Hub',
      selector: 'main section.column-control.bgcolor--ui-01:nth-of-type(4)',
      style: 'grey',
      blocks: [],
      defaultContent: ['.content-tile.text-primary-link'],
    },
    {
      id: 'section-5',
      name: 'Topic Cards',
      selector: 'main section.column-control.flex-layout--pin-cta',
      style: null,
      blocks: ['cards-topic'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Wellbeing',
      selector: 'main section.column-control.bgcolor--ui-01:nth-of-type(6)',
      style: 'grey',
      blocks: ['columns-info'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Get in Touch',
      selector: [
        'main section.column-control.has-padding-bottom--45:nth-of-type(7)',
        'main section.column-control.flex-layout.has-padding-top--none',
      ],
      style: null,
      blocks: ['columns-social'],
      defaultContent: ['main .text.section h2'],
    },
  ],
};

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'hero-landing': heroLandingParser,
  'cards-linked': cardsLinkedParser,
  'cards-topic': cardsTopicParser,
  'columns-promo': columnsPromoParser,
  'columns-info': columnsInfoParser,
  'columns-social': columnsSocialParser,
};

// TRANSFORMER REGISTRY - Array of transformer functions
// Section transformer runs after cleanup (in afterTransform hook)
const transformers = [
  pearsonCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1
    ? [pearsonSectionsTransformer]
    : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  /**
   * Main transformation function (one input / multiple outputs pattern)
   */
  transform: ({ document, url, html, params }) => {
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup: cookie banners, iframes)
    executeTransformers('beforeTransform', main, { document, url, html, params });

    // 2. Insert section breaks BEFORE block parsing (parsers replace section elements,
    //    so section selectors must run while original DOM structure is intact)
    pearsonSectionsTransformer.call(null, 'afterTransform', main, {
      document, url, html, params, template: PAGE_TEMPLATE,
    });

    // 3. Find blocks on page using embedded template selectors
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 4. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 5. Execute afterTransform for cleanup only (sections already handled above)
    pearsonCleanupTransformer.call(null, 'afterTransform', main, {
      document, url, html, params, template: PAGE_TEMPLATE,
    });

    // 6. Flatten nested DOM: move all content from nested containers to body level.
    //    The Pearson page has content nested in body > main > div > div.aem-Grid > ...
    //    EDS needs <hr> section breaks as direct children of the output element.
    const contentContainer = main.querySelector('.aem-Grid') || main.querySelector('main > div') || main;
    if (contentContainer !== main) {
      while (contentContainer.firstChild) {
        main.appendChild(contentContainer.firstChild);
      }
      // Remove the now-empty wrapper structure
      const mainEl = main.querySelector('main');
      if (mainEl) mainEl.remove();
    }

    // 7. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 8. Generate sanitized path (full localized path without extension)
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
