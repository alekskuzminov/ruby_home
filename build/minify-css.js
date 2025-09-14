const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around specific characters
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*~\s*/g, '~')
        // Remove trailing semicolons
        .replace(/;}/g, '}')
        // Remove leading/trailing whitespace
        .trim();
}

// Read CSS files
const cssFiles = [
    'css/normalize.css',
    'css/style.css',
    'css/modal-contact.css',
    'css/privacy-policy.css'
];

let combinedCSS = '';

cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const css = fs.readFileSync(file, 'utf8');
        combinedCSS += css + '\n';
    }
});

// Minify combined CSS
const minifiedCSS = minifyCSS(combinedCSS);

// Create build directory if it doesn't exist
const buildDir = 'build';
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// Write minified CSS
fs.writeFileSync('build/style.min.css', minifiedCSS);

console.log('CSS minification completed!');
console.log(`Original size: ${combinedCSS.length} bytes`);
console.log(`Minified size: ${minifiedCSS.length} bytes`);
console.log(`Compression ratio: ${((1 - minifiedCSS.length / combinedCSS.length) * 100).toFixed(1)}%`);
