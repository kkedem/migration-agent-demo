var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-parents-learners-page.js
  var import_parents_learners_page_exports = {};
  __export(import_parents_learners_page_exports, {
    default: () => import_parents_learners_page_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const promoImage = element.querySelector(".promocard--lightest-theme picture, .promocard--lightest-theme img");
    const heading = element.querySelector("h1");
    const contentTiles = element.querySelectorAll(".content-tile:not(.promocard--lightest-theme) .content-tile__figcaption");
    const contentCell = [];
    if (heading) contentCell.push(heading);
    contentTiles.forEach((figcaption) => {
      const title = figcaption.querySelector(".content-tile__title");
      if (title) contentCell.push(title);
      const rteContainer = figcaption.querySelector(".content-tile-text");
      if (rteContainer) {
        const children = rteContainer.querySelectorAll(":scope > p, :scope > ul, :scope > ol");
        children.forEach((child) => contentCell.push(child));
      }
    });
    const cells = [];
    if (promoImage) {
      const img = promoImage.tagName === "IMG" ? promoImage : promoImage.querySelector("img");
      if (img) {
        const imageHint = document.createComment(" field:image ");
        const imageContent = [imageHint, img.closest("picture") || img];
        cells.push(imageContent);
      }
    }
    if (contentCell.length > 0) {
      const textHint = document.createComment(" field:text ");
      contentCell.unshift(textHint);
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-linked.js
  function parse2(element, { document }) {
    const cardElements = element.querySelectorAll(".content-tile.content-tile-panel-item");
    const cells = [];
    cardElements.forEach((card) => {
      const picture = card.querySelector("picture");
      const img = card.querySelector("img");
      const imageEl = picture || img;
      const title = card.querySelector(".content-tile__title, h2");
      const link = card.querySelector(".content-tile__figure > a[href]");
      const imageContent = [];
      if (imageEl) {
        imageContent.push(document.createComment(" field:image "));
        imageContent.push(imageEl.closest("picture") || imageEl);
      }
      const textCell = [];
      textCell.push(document.createComment(" field:text "));
      if (title) textCell.push(title);
      if (link && link.href) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = title ? title.textContent : link.textContent;
        textCell.push(a);
      }
      if (imageContent.length > 0 || textCell.length > 1) {
        cells.push([imageContent, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-linked", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-topic.js
  function parse3(element, { document }) {
    const cardElements = element.querySelectorAll(".content-tile.content-tile-panel-item");
    const cells = [];
    cardElements.forEach((card) => {
      const picture = card.querySelector("picture");
      const img = card.querySelector("img");
      const imageEl = picture || img;
      const title = card.querySelector(".content-tile__title, h2");
      const rteContainer = card.querySelector(".content-tile-text");
      const paragraphs = rteContainer ? rteContainer.querySelectorAll(":scope > p") : [];
      const imageCell = imageEl ? imageEl.closest("picture") || imageEl : "";
      const textCell = [];
      if (title) textCell.push(title);
      paragraphs.forEach((p) => textCell.push(p));
      if (imageCell || textCell.length > 0) {
        cells.push([imageCell, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-topic", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse4(element, { document }) {
    const picture = element.querySelector("picture");
    const img = element.querySelector("img");
    const imageEl = picture || img;
    const heading = element.querySelector(".content-tile__title, h2");
    const subtitle = element.querySelector(".content-tile-subtitle");
    const rteContainer = element.querySelector(".content-tile-text");
    const paragraphs = rteContainer ? rteContainer.querySelectorAll(":scope > p") : [];
    const imageCol = imageEl ? imageEl.closest("picture") || imageEl : "";
    const textCol = [];
    if (heading) textCol.push(heading);
    if (subtitle) textCol.push(subtitle);
    paragraphs.forEach((p) => textCol.push(p));
    const cells = [];
    cells.push([imageCol, textCol]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-info.js
  function parse5(element, { document }) {
    const picture = element.querySelector("picture");
    const img = element.querySelector("img");
    const imageEl = picture || img;
    const heading = element.querySelector(".content-tile__title, h2");
    const rteContainer = element.querySelector(".content-tile-text");
    const paragraphs = rteContainer ? rteContainer.querySelectorAll(":scope > p") : [];
    const imageCol = imageEl ? imageEl.closest("picture") || imageEl : "";
    const textCol = [];
    if (heading) textCol.push(heading);
    paragraphs.forEach((p) => textCol.push(p));
    const cells = [];
    cells.push([imageCol, textCol]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-social.js
  function parse6(element, { document }) {
    const columnItems = element.querySelectorAll(".content-tile.content-tile-panel-item-main");
    const cols = [];
    columnItems.forEach((item) => {
      const colContent = [];
      const heading = item.querySelector(".content-tile__title, h2");
      if (heading) colContent.push(heading);
      const rteContainer = item.querySelector(".content-tile-text");
      if (rteContainer) {
        const paragraphs = rteContainer.querySelectorAll(":scope > p");
        paragraphs.forEach((p) => colContent.push(p));
      }
      cols.push(colContent);
    });
    const cells = [];
    if (cols.length >= 2) {
      cells.push([cols[0], cols[1]]);
    } else if (cols.length === 1) {
      cells.push([cols[0]]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-social", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/pearson-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#pi_op_frame_pearson",
        "#pi_rp_frame"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "a.skip-nav",
        "a.to-top-button",
        "#accessibility__announcement",
        "iframe",
        "link",
        "noscript",
        // Remove tracking pixels (Twitter, Bing, Google)
        'img[src*="t.co"]',
        'img[src*="analytics.twitter.com"]',
        'img[src*="bat.bing.com"]',
        'img[src*="google-analytics.com"]',
        'img[src*="googleadservices.com"]'
      ]);
    }
  }

  // tools/importer/transformers/pearson-sections.js
  function transform2(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;
    const reversedSections = [...sections].reverse();
    reversedSections.forEach((section) => {
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) return;
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        sectionEl.after(sectionMetadataBlock);
      }
      if (section.id !== "section-1") {
        const hr = document.createElement("hr");
        sectionEl.before(hr);
      }
    });
  }

  // tools/importer/import-parents-learners-page.js
  var PAGE_TEMPLATE = {
    name: "parents-learners-page",
    description: "Secondary schools parents and learners landing page with informational content sections",
    urls: [
      "https://www.pearson.com/en-gb/schools/secondary/parents-learners.html"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: [
          "main section.column-control.has-padding-bottom--45:first-of-type"
        ]
      },
      {
        name: "cards-linked",
        instances: [
          "main section.column-control.bgcolor--ui-01:nth-of-type(2)"
        ]
      },
      {
        name: "columns-promo",
        instances: [
          "main .content-tile.c-promo-gradient-dark-text-left"
        ]
      },
      {
        name: "cards-topic",
        instances: [
          "main section.column-control.flex-layout--pin-cta"
        ]
      },
      {
        name: "columns-info",
        instances: [
          "main .content-tile.content-tile-color-block--full-img--text-right"
        ]
      },
      {
        name: "columns-social",
        instances: [
          "main section.column-control.flex-layout.has-padding-top--none"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "main section.column-control.has-padding-bottom--45:first-of-type",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Qualification Cards",
        selector: "main section.column-control.bgcolor--ui-01:nth-of-type(2)",
        style: "grey",
        blocks: ["cards-linked"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Information and Revise Promo",
        selector: "main section.column-control.has-padding-bottom--45:nth-of-type(3)",
        style: null,
        blocks: ["columns-promo"],
        defaultContent: [".content-tile.promocard--light-theme"]
      },
      {
        id: "section-4",
        name: "Careers Hub",
        selector: "main section.column-control.bgcolor--ui-01:nth-of-type(4)",
        style: "grey",
        blocks: [],
        defaultContent: [".content-tile.text-primary-link"]
      },
      {
        id: "section-5",
        name: "Topic Cards",
        selector: "main section.column-control.flex-layout--pin-cta",
        style: null,
        blocks: ["cards-topic"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Wellbeing",
        selector: "main section.column-control.bgcolor--ui-01:nth-of-type(6)",
        style: "grey",
        blocks: ["columns-info"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Get in Touch",
        selector: [
          "main section.column-control.has-padding-bottom--45:nth-of-type(7)",
          "main section.column-control.flex-layout.has-padding-top--none"
        ],
        style: null,
        blocks: ["columns-social"],
        defaultContent: ["main .text.section h2"]
      }
    ]
  };
  var parsers = {
    "hero-landing": parse,
    "cards-linked": parse2,
    "cards-topic": parse3,
    "columns-promo": parse4,
    "columns-info": parse5,
    "columns-social": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = {
      ...payload,
      template: PAGE_TEMPLATE
    };
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_parents_learners_page_default = {
    /**
     * Main transformation function (one input / multiple outputs pattern)
     */
    transform: ({ document, url, html, params }) => {
      const main = document.body;
      executeTransformers("beforeTransform", main, { document, url, html, params });
      transform2.call(null, "afterTransform", main, {
        document,
        url,
        html,
        params,
        template: PAGE_TEMPLATE
      });
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      transform.call(null, "afterTransform", main, {
        document,
        url,
        html,
        params,
        template: PAGE_TEMPLATE
      });
      const contentContainer = main.querySelector(".aem-Grid") || main.querySelector("main > div") || main;
      if (contentContainer !== main) {
        while (contentContainer.firstChild) {
          main.appendChild(contentContainer.firstChild);
        }
        const mainEl = main.querySelector("main");
        if (mainEl) mainEl.remove();
      }
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_parents_learners_page_exports);
})();
