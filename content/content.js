console.log('Reader extension loaded!');

// Temporary Article Detector Logic
if (isArticlePage()) {
    console.log('Article detected!');
    createArticleIndicator();
    injectReader();
}

function isArticlePage() {
    return (
        !isHomepage() &&
        hasSubstantialContent() &&
        hasHeadline() &&
        hasLowLinkDensity() &&
        hasArticleIndicators()
    );
}

function isHomepage() {
    return (
        window.location.pathname === '/' ||
        window.location.pathname === '/home' ||
        Boolean(document.querySelector('meta[property="og:type"][content="website"]'))
    );
}

function hasSubstantialContent() {
    const mainContent = document.querySelector('main') || document.body;
    const paragraphs = mainContent.querySelectorAll('p');

    const substantialParagraphs = Array.from(paragraphs).filter(p => {
        const words = p.textContent.trim().split(/\s+/);
        return words.length > 20;
    });

    return substantialParagraphs.length >= 3;
}

function hasHeadline() {
    return Boolean(document.querySelector('h1'));
}

function hasLowLinkDensity() {
    const mainContent = document.querySelector('main') || document.body;
    const linkDensity = document.querySelectorAll('a').length / mainContent.innerText.length;
    return linkDensity < 0.1;
}

function hasArticleIndicators() {
    const hasArticleTag = document.querySelectorAll('article').length === 1;
    const hasSchemaArticle = document.querySelector('[itemtype*="Article"]');
    const hasOgArticle = document.querySelector('meta[property="og:type"][content="article"]');

    return hasArticleTag || hasSchemaArticle || hasOgArticle;
}

function clearPageContent() {
    // Store the original title before clearing
    const pageTitle = document.title;

    // Clear the entire body content
    document.body.innerHTML = '';

    return pageTitle;
}

function createArticleIndicator(title) {
    const styles = document.createElement('style');
    styles.textContent = `
        #reader-view-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            padding: 24px;
            z-index: 1000;
            overflow-y: auto;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, sans-serif;
        }

        .article-header {
            max-width: 800px;
            margin: 0 auto 32px auto;
            padding-bottom: 24px;
            border-bottom: 1px solid #eaeaea;
        }

        .article-title {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
        }

        .article-indicator {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            background: #f0f7ff;
            border-radius: 6px;
            color: #0066cc;
            font-size: 14px;
            font-weight: 500;
        }

        .article-indicator::before {
            content: "📄";
            margin-right: 8px;
        }
    `;

    // Create container
    const container = document.createElement('div');
    container.id = 'reader-view-container';

    // Create header section
    const header = document.createElement('div');
    header.className = 'article-header';

    // Add title
    const titleElement = document.createElement('h1');
    titleElement.className = 'article-title';
    titleElement.textContent = title;

    // Add article indicator
    const indicator = document.createElement('div');
    indicator.className = 'article-indicator';
    indicator.textContent = 'Article View';

    // Assemble the components
    header.appendChild(titleElement);
    header.appendChild(indicator);
    container.appendChild(header);

    return { styles, container };
}

function injectReader() {
    // Clear the page and get the original title
    const pageTitle = clearPageContent();

    // Create the article view elements
    const { styles, container } = createArticleIndicator(pageTitle);

    // Inject styles and container
    document.head.appendChild(styles);
    document.body.appendChild(container);
}