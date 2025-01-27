console.log('Reader extension test loaded!');

if (typeof ArticleDetector !== 'undefined') {
    console.log('ArticleDetector loaded successfully');
    if (ArticleDetector.isArticlePage()) {
        console.log('Article page detected! Injecting reader view...');
        ReaderView.injectReader();
    } else {
        console.log('Not an article page');
    }
} else {
    console.error('ArticleDetector not loaded!');
}
if (typeof ContentCleaner !== 'undefined') {
    console.log('ContentCleaner loaded successfully');
}
if (typeof ReaderView !== 'undefined') {
    console.log('ReaderView loaded successfully');
}