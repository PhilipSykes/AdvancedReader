# API Documentation

## Core Modules

The Reader Mode extension is built around several core modules that handle different aspects of article processing and display.

### Content Extraction API

The content extraction API is responsible for identifying and extracting the main content from web pages.

#### `extractArticleContent(dom)`

Extracts the main article content from a DOM structure.

```javascript
/**
 * Extract the main article content from a document
 * @param {Document} dom - The document to extract content from
 * @returns {HTMLElement} - The extracted article content
 */
function extractArticleContent(dom) {
  const article = dom.querySelector('article') || findMainContent(dom);
  return cleanupContent(article.cloneNode(true));
}
```

#### `findMainContent(dom)`

Identifies the main content section of a page using heuristic scoring.

```javascript
/**
 * Find the main content section using content density heuristics
 * @param {Document} dom - The document to analyze
 * @returns {HTMLElement} - The element most likely to contain main content
 */
function findMainContent(dom) {
  // Score elements based on content-to-markup ratio
  const elements = Array.from(dom.querySelectorAll('div, section, main'));
  return elements
    .map(el => ({
      element: el,
      score: calculateContentScore(el)
    }))
    .sort((a, b) => b.score - a.score)[0].element;
}
```

#### `calculateContentScore(element)`

Scores an element based on its content-to-markup ratio and other factors.

```javascript
/**
 * Calculate a content score for an element based on various heuristics
 * @param {HTMLElement} element - The element to score
 * @returns {number} - The element's content score
 */
function calculateContentScore(element) {
  // Implementation details in source code
}
```

### Image Processing API

The image processing API handles the preservation and cleanup of images within articles.

#### `processImages(article)`

Process all images in an article, preserving captions and cleaning up unnecessary attributes.

```javascript
/**
 * Process images in an article element
 * @param {HTMLElement} article - The article element containing images
 * @returns {HTMLElement} - The article with processed images
 */
function processImages(article) {
  // See implementation in the source code
}
```

#### `findAdjacentCaption(imageElement)`

Attempts to find a caption for an image that isn't in a standard figure/figcaption structure.

```javascript
/**
 * Find an adjacent caption for an image
 * @param {HTMLElement} imageElement - The image element
 * @returns {HTMLElement|null} - The caption element if found
 */
function findAdjacentCaption(imageElement) {
  // Implementation details in source code
}
```

### Rendering API

The rendering API is responsible for displaying the extracted content in reader mode.

#### `renderReaderView(extractedContent, options)`

Renders the reader view with the extracted content and user preferences.

```javascript
/**
 * Render the reader view
 * @param {HTMLElement} extractedContent - The extracted article content
 * @param {Object} options - Reader mode options
 * @returns {HTMLElement} - The reader view element
 */
function renderReaderView(extractedContent, options) {
  // Implementation details in source code
}
```

## Helper Utilities

### Reading Time Estimation

#### `estimateReadingTime(textContent)`

Estimates the reading time of an article based on word count.

```javascript
/**
 * Estimate reading time in minutes
 * @param {string} textContent - The text content of the article
 * @returns {number} - Estimated reading time in minutes
 */
function estimateReadingTime(textContent) {
  const words = textContent.trim().split(/\s+/).length;
  const wpm = 200; // Average reading speed
  return Math.ceil(words / wpm);
}
```

### Table of Contents Generation

#### `generateTableOfContents(article)`

Generates a table of contents from article headings.

```javascript
/**
 * Generate a table of contents from article headings
 * @param {HTMLElement} article - The article element
 * @returns {HTMLElement} - A list element containing the TOC
 */
function generateTableOfContents(article) {
  // Implementation details in source code
}
```

## Extension APIs

### Storage API

Reader Mode uses Chrome's storage API to persist user preferences.

```javascript
// Save preferences
chrome.storage.sync.set({
  theme: 'dark',
  fontSize: 18,
  fontFamily: 'Georgia'
}, () => {
  console.log('Preferences saved');
});

// Load preferences
chrome.storage.sync.get(['theme', 'fontSize', 'fontFamily'], (result) => {
  console.log('Loaded preferences:', result);
});
```

### Context Menu API

The extension adds context menu items for reader mode activation.

```javascript
chrome.contextMenus.create({
  id: 'activateReaderMode',
  title: 'Open in Reader Mode',
  contexts: ['page', 'link']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'activateReaderMode') {
    // Handle reader mode activation
  }
});
```