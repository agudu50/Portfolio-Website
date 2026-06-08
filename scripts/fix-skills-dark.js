const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'meyawo.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Target the skills section overrides
const target = /\/\* Skills Section \*\/\s*body\.dark-theme #skills\s*\{\s*background:\s*#0a0a0f\s*!important;\s*\}/;

const replacement = `/* Skills Section */
body.dark-theme #skills {
    background: #0a0a0f !important;
}

body.dark-theme .skill-card-enhanced {
    background: #12121e !important;
    border: 1px solid rgba(255, 255, 255, 0.06) !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

body.dark-theme .skill-card-enhanced:hover {
    background: #1a1a2e !important;
    box-shadow: 0 15px 40px rgba(105, 90, 166, 0.15) !important;
}

body.dark-theme .skill-card-enhanced:hover .skill-card-title {
    color: #a994d4 !important;
}

body.dark-theme .skill-item {
    background: rgba(255, 255, 255, 0.03) !important;
}

body.dark-theme .skill-item:hover {
    background: rgba(169, 148, 212, 0.1) !important;
}`;

// We also want to delete the duplicate body.dark-theme .skill-card-enhanced definitions to keep it clean
const duplicatePattern = /body\.dark-theme \.skill-card-enhanced\s*\{\s*background-color:\s*#12121e\s*!important;[\s\S]*?body\.dark-theme \.skill-item span\s*\{\s*color:\s*#b0b0c0\s*!important;\s*\}/g;

if (target.test(content)) {
    content = content.replace(target, replacement);
    
    // Clean up duplicate definitions if present
    content = content.replace(duplicatePattern, 'body.dark-theme .skill-item span {\n    color: #b0b0c0 !important;\n}');
    
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully updated skills section dark mode overrides.');
} else {
    console.log('Target section not found.');
}
