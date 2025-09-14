const fs = require('fs');
const path = require('path');

// Simple JavaScript minifier
function minifyJS(js) {
    return js
        // Remove single-line comments
        .replace(/\/\/.*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*-\s*/g, '-')
        .replace(/\s*\*\s*/g, '*')
        .replace(/\s*\/\s*/g, '/')
        .replace(/\s*%\s*/g, '%')
        .replace(/\s*===\s*/g, '===')
        .replace(/\s*!==\s*/g, '!==')
        .replace(/\s*==\s*/g, '==')
        .replace(/\s*!=\s*/g, '!=')
        .replace(/\s*<=\s*/g, '<=')
        .replace(/\s*>=\s*/g, '>=')
        .replace(/\s*<\s*/g, '<')
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*&&\s*/g, '&&')
        .replace(/\s*\|\|\s*/g, '||')
        // Remove spaces around brackets
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .replace(/\s*\[\s*/g, '[')
        .replace(/\s*\]\s*/g, ']')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        // Remove spaces around semicolons
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*:\s*/g, ':')
        // Remove leading/trailing whitespace
        .trim();
}

// Read JavaScript files
const jsFiles = [
    'js/main.js',
    'js/modal-contact.js',
    'js/modal-success.js',
    'js/notify.js'
];

let combinedJS = '';

jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const js = fs.readFileSync(file, 'utf8');
        combinedJS += js + '\n';
    }
});

// Minify combined JS
const minifiedJS = minifyJS(combinedJS);

// Create build directory if it doesn't exist
const buildDir = 'build';
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// Write minified JS
fs.writeFileSync('build/script.min.js', minifiedJS);

console.log('JavaScript minification completed!');
console.log(`Original size: ${combinedJS.length} bytes`);
console.log(`Minified size: ${minifiedJS.length} bytes`);
console.log(`Compression ratio: ${((1 - minifiedJS.length / combinedJS.length) * 100).toFixed(1)}%`);
