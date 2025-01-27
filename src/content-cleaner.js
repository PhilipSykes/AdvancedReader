class ContentCleaner {
    static clearPageContent() {
        // Remove ads
        document.querySelectorAll('iframe').forEach(iframe => iframe.remove());

        // Remove all script unnecessary scripts
        document.querySelectorAll('script:not([data-reader-essential])').forEach(script => script.remove());

        // Clear body content
        document.body.innerHTML = '';

        // Hide any elements that might persist
        const style = document.createElement('style');
        style.textContent = `
            body > *:not(#reader-view-container) {
                display: none !important;
            }
            body {
                overflow: auto !important;
                position: static !important;
            }
        `;
        document.head.appendChild(style);
    }
}

window.ContentCleaner = ContentCleaner