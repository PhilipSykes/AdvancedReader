class ReaderView {
    static injectReader() {
        const content = ContentExtractor.extractContent();
        ContentCleaner.clearPageContent();

        this.injectStyles();
        const container = this.createReaderView(content);
        document.body.appendChild(container);
    }

    static injectStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL('src/reader-view.css');
        document.head.appendChild(link);
    }

    static createReaderView(content) {
        const container = document.createElement('div');
        container.id = 'reader-view-container';

        const articleContainer = document.createElement('div');
        articleContainer.className = 'article-container';

        // Create header
        const header = this.createHeader(content);

        // Create content
        const articleContent = this.createContent(content);

        // Assemble the components
        articleContainer.appendChild(header);
        articleContainer.appendChild(articleContent);
        container.appendChild(articleContainer);

        return container;
    }

    static createHeader(content) {
        const header = document.createElement('div');
        header.className = 'article-header';

        // Title
        const title = document.createElement('h1');
        title.className = 'article-title';
        title.textContent = content.title;
        header.appendChild(title);

        // Metadata (author and date)
        const meta = document.createElement('div');
        meta.className = 'article-meta';

        if (content.author) {
            const authorDiv = document.createElement('div');
            authorDiv.className = 'article-author';
            authorDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                ${content.author}
            `;
            meta.appendChild(authorDiv);
        }

        if (content.datePublished) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'article-date';
            dateDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${new Date(content.datePublished).toLocaleDateString()}
            `;
            meta.appendChild(dateDiv);
        }

        if (content.author || content.datePublished) {
            header.appendChild(meta);
        }

        return header;
    }

    static createContent(content) {
        const articleContent = document.createElement('div');
        articleContent.className = 'article-content';

        // Add main content
        articleContent.innerHTML = content.mainContent;

        // Process images
        if (content.images && content.images.length > 0) {
            content.images.forEach(imageData => {
                const figure = document.createElement('figure');
                figure.className = 'image-figure';

                const img = document.createElement('img');
                img.src = imageData.src;
                img.alt = imageData.alt || '';

                figure.appendChild(img);

                if (imageData.caption) {
                    const caption = document.createElement('figcaption');
                    caption.className = 'image-caption';
                    caption.textContent = imageData.caption;
                    figure.appendChild(caption);
                }

                articleContent.appendChild(figure);
            });
        }

        return articleContent;
    }
}

window.ReaderView = ReaderView;