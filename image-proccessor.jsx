function processImages(article) {
    const images = article.querySelectorAll('img, picture');

    images.forEach(img => {
        const parentFigure = img.closest('figure');
        const caption = parentFigure ?
            parentFigure.querySelector('figcaption') :
            findAdjacentCaption(img);

        const cleanImg = document.createElement('img');
        cleanImg.src = img.src || img.querySelector('source')?.srcset?.split(' ')[0] || '';
        cleanImg.alt = img.alt || caption?.textContent || 'Image';

        if (caption && caption.textContent.trim()) {
            const figure = document.createElement('figure');
            figure.appendChild(cleanImg);

            const figCaption = document.createElement('figcaption');
            figCaption.textContent = caption.textContent.trim();
            figure.appendChild(figCaption);

            img.parentNode.replaceChild(figure, img);
        } else {
            img.parentNode.replaceChild(cleanImg, img);
        }
    });

    return article;
}

export default;