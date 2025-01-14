import { isArticlePage } from './detector.js';

console.log('Reader extension loaded!');

function createArticleIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'article-indicator';
    indicator.textContent = 'Article';
    document.body.appendChild(indicator);
}

// Temporary Article Detector Logic
if (isArticlePage()) {
    console.log('Article detected!');
    createArticleIndicator();
}