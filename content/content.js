console.log('Reader extension loaded!');

function createReaderButton() {
    const button = document.createElement('button');
    button.textContent = 'Reader Mode';
    button.id = 'reader-mode-toggle';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';

    button.addEventListener('click', () => {
        console.log('Reader mode clicked!');
        // Just for testing, let's change the background color
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === 'beige' ? '' : 'beige';
    });

    document.body.appendChild(button);
}

// Run when the page loads
createReaderButton();