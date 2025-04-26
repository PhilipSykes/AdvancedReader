# Reader Mode Chrome Extension

A browser extension that transforms cluttered web articles into clean, distraction-free reading experiences.

## Features

- One-click activation for clean reading mode
- Customizable font styles, sizes, and themes
- Dark mode and light mode support
- Image preservation with captions
- Automatic table of contents generation
- Reading time estimation
- Progress tracker
- Offline reading capability

## Installation

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/reader-mode-extension.git
cd reader-mode-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable "Developer mode" in the top-right corner
    - Click "Load unpacked" and select the `dist` folder from the project directory

### User Installation

Once published, users can install the extension from the Chrome Web Store:
1. Visit [Reader Mode Extension](https://chrome.google.com/webstore/detail/reader-mode/placeholder) on the Chrome Web Store
2. Click "Add to Chrome"

## Development

### Commands

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build production version
- `npm run test`: Run tests
- `npm run lint`: Run linter

## Contributing

Contributions are welcome! Please check out our [Contributing Guide](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.