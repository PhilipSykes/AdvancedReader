class ArticleDetector {
     static isArticlePage() {
        return (
            !this.isHomepage() &&
            this.hasSubstantialContent() &&
            this.hasHeadline() &&
            this.hasLowLinkDensity() &&
            this.hasArticleIndicators()
        );
    }

    static isHomepage() {
        return (
            window.location.pathname === '/' ||
            window.location.pathname === '/home' ||
            Boolean(document.querySelector('meta[property="og:type"][content="website"]'))
        );
    }

    static hasSubstantialContent() {
        const mainContent = document.querySelector('main') || document.body;
        const paragraphs = mainContent.querySelectorAll('p');

        const substantialParagraphs = Array.from(paragraphs).filter(p => {
            const words = p.textContent.trim().split(/\s+/);
            return words.length > 20;
        });

        return substantialParagraphs.length >= 3;
    }

    static hasHeadline() {
        return Boolean(document.querySelector('h1'));
    }

    static hasLowLinkDensity() {
        const mainContent = document.querySelector('main') || document.body;
        const linkDensity = document.querySelectorAll('a').length / mainContent.innerText.length;
        return linkDensity < 0.1;
    }

    static hasArticleIndicators() {
        const hasArticleTag = document.querySelectorAll('article').length === 1;
        const hasSchemaArticle = document.querySelector('[itemtype*="Article"]');
        const hasOgArticle = document.querySelector('meta[property="og:type"][content="article"]');

        return hasArticleTag || hasSchemaArticle || hasOgArticle;
    }
}

window.ArticleDetector = ArticleDetector;