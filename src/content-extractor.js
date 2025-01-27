class ContentExtractor {
    static extractContent() {
        const content = {
            title: this.extractTitle(),
            author: this.extractAuthor(),
            datePublished: this.extractDate(),
            mainContent: this.extractMainContent(),
            images: this.extractImages()
        };
        return content;
    }

    static extractTitle() {
        // Try different title selectors in order of preference
        const titleSelectors = [
            'article h1',
            'h1',
            'meta[property="og:title"]',
            'meta[name="twitter:title"]',
            'title'
        ];

        for (const selector of titleSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                if (element.tagName === 'META') {
                    return element.getAttribute('content');
                }
                return element.textContent.trim();
            }
        }

        return document.title;
    }

    static extractAuthor() {
        const authorSelectors = [
            'meta[name="author"]',
            'meta[property="article:author"]',
            '[class*="author"]',
            '[class*="byline"]',
            'a[rel="author"]'
        ];

        for (const selector of authorSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                if (element.tagName === 'META') {
                    return element.getAttribute('content');
                }
                return element.textContent.trim();
            }
        }

        return null;
    }

    static extractDate() {
        const dateSelectors = [
            'meta[property="article:published_time"]',
            'time[datetime]',
            '[class*="date"]',
            '[class*="time"]'
        ];

        for (const selector of dateSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                if (element.tagName === 'META') {
                    return element.getAttribute('content');
                }
                if (element.hasAttribute('datetime')) {
                    return element.getAttribute('datetime');
                }
                return element.textContent.trim();
            }
        }

        return null;
    }

    static extractMainContent() {
        // Try to find the main content container
        const contentSelectors = [
            'article',
            '[role="main"]',
            'main',
            '.post-content',
            '.article-content',
            '.content'
        ];

        let mainContainer = null;

        for (const selector of contentSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                mainContainer = element;
                break;
            }
        }

        if (!mainContainer) {
            mainContainer = this.findLargestTextBlock();
        }

        if (!mainContainer) {
            return null;
        }

        // Clone the container to avoid modifying the original
        const container = mainContainer.cloneNode(true);

        // Remove unwanted elements
        this.cleanContent(container);

        return container.innerHTML;
    }

    static findLargestTextBlock() {
        const paragraphs = document.getElementsByTagName('p');
        let largestBlock = null;
        let maxLength = 0;

        for (const p of paragraphs) {
            const length = p.textContent.length;
            if (length > maxLength) {
                maxLength = length;
                largestBlock = p.parentElement;
            }
        }

        return largestBlock;
    }

    static cleanContent(container) {

        const unwantedSelectors = [
            // BASIC ELEMENTS
            'script', 'style', 'iframe', 'nav', 'header', 'footer', 'aside',

            // ADS AND POPUPS
            '[class*="ad"]',
            '[class*="Ad"]',
            '[id*="ad-"]',
            '[id*="Ad"]',
            '[class*="newsletter"]',
            '[class*="Newsletter"]',
            '[class*="popup"]',
            '[class*="modal"]',
            '[class*="overlay"]',

            // SOCIALS
            '[class*="social"]',
            '[class*="share"]',
            '[class*="comment"]',
            '[class*="related"]',
            '[class*="recommendation"]',

            // NEWSLETTER ELEMENTS
            '[class*="martech-particle"]',
            '[class*="html-embed"]',
            '[data-test="html-embed"]',

            // COMMON MARKETING ELEMENTS
            '[class*="subscribe"]',
            '[class*="subscription"]',
            '[class*="promo"]',
            '[class*="marketing"]',
            '[class*="taboola"]',
            '[class*="outbrain"]',

            // DYNAMIC CONTENT
            '[id*="dynamic-"]',
            '[class*="widget"]',
            '[class*="sidebar"]'
        ];

        unwantedSelectors.forEach(selector => {
            try {
                container.querySelectorAll(selector).forEach(element => {
                    element.remove();
                });
            } catch (e) {
                console.log(`Error with selector ${selector}:`, e);
            }
        });

        // Remove empty elements
        container.querySelectorAll('p').forEach(p => {
            if (!p.textContent.trim()) {
                p.remove();
            }
        });
    }

    static extractImages() {
        const mainContainer = document.querySelector('article') || document.querySelector('main');
        if (!mainContainer) return [];

        const images = Array.from(mainContainer.querySelectorAll('img'))
            .filter(img => {
                const width = parseInt(img.getAttribute('width') || img.width || 0);
                const height = parseInt(img.getAttribute('height') || img.height || 0);

                // Filter out small images and likely icons
                return width > 100 && height > 100;
            })
            .map(img => ({
                src: img.src,
                alt: img.alt,
                caption: this.findImageCaption(img)
            }));

        return images;
    }

    static findImageCaption(img) {
        // Look for captions in nearby elements
        const captionSelectors = [
            'figcaption',
            '[class*="caption"]',
            '[class*="description"]'
        ];

        const parent = img.closest('figure') || img.parentElement;
        if (!parent) return null;

        for (const selector of captionSelectors) {
            const caption = parent.querySelector(selector);
            if (caption) {
                return caption.textContent.trim();
            }
        }

        return null;
    }
}

window.ContentExtractor = ContentExtractor;