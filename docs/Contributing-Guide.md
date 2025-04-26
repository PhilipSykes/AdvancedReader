# Contributing to Reader Mode Extension

Thank you for your interest in contributing to the Reader Mode extension! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## How Can I Contribute?

### Reporting Bugs

If you find a bug in the extension, please create an issue using the bug report template. Include:

- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser version and OS information
- Any additional context that might be helpful

### Suggesting Enhancements

We welcome suggestions for new features or improvements. Please create an issue using the feature request template and include:

- A clear and descriptive title
- A detailed description of the proposed feature
- The problem it would solve
- Any alternative solutions you've considered
- Mockups or examples if applicable

### Pull Requests

1. **Fork the repository**
2. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bugfix-name
   ```
3. **Make your changes**
4. **Run tests**:
   ```bash
   npm run test
   ```
5. **Lint your code**:
   ```bash
   npm run lint
   ```
6. **Commit your changes**:
   ```bash
   git commit -m "Description of changes"
   ```
7. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```
8. **Open a pull request**

## Development Setup

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- Chrome or Firefox browser

### Setup Steps

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
    - Enable "Developer mode"
    - Click "Load unpacked" and select the `dist` folder

### Development Workflow

1. Make changes to the source code
2. Run the development server:
   ```bash
   npm run dev
   ```
3. The extension will automatically reload when you make changes
4. Test your changes
5. Run linting and tests before submitting a PR:
   ```bash
   npm run lint && npm run test
   ```

## Coding Standards

### JavaScript

- We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features where appropriate
- Document your code with JSDoc comments

### CSS

- Use SCSS for styling
- Follow BEM naming convention for classes
- Keep styles modular and organized

### Testing

- Write tests for new features and bug fixes
- Maintain or improve test coverage
- All tests must pass before a PR can be merged

## Architecture Overview

Please see our [Architecture Guide](./ARCHITECTURE.md) for details on the project structure and component interactions.

## Content Extraction Guidelines

When improving the content extraction engine:

1. Focus on maintaining readability
2. Preserve important images and their captions
3. Remove ads, popups, and other distractions
4. Handle edge cases gracefully
5. Test on a variety of websites
6. Consider performance implications

## UI/UX Guidelines

When working on the user interface:

1. Maintain a clean, distraction-free reading experience
2. Ensure good contrast and readability
3. Support responsive layouts
4. Make features discoverable but not intrusive
5. Ensure accessibility for all users

## Release Process

1. Version bump in `manifest.json` and `package.json`
2. Update the changelog
3. Create a tagged release on GitHub
4. Submit to the Chrome Web Store and Firefox Add-ons

## Getting Help

If you need help with the contribution process:

- Join our [Discord server](https://discord.gg/example-server)
- Ask in the GitHub issues
- Email the maintainers at maintainers@reader-mode-extension.example.com

Thank you for contributing to Reader Mode Extension!