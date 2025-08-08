#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const httpClientPath = path.join(
  __dirname,
  '..',
  'generated',
  'mcp',
  'single-with-mutator',
  'http-client.ts'
);

if (!fs.existsSync(httpClientPath)) {
  console.error(`Not found: ${httpClientPath}. Did you run \"yarn generate:mcp\"?`);
  process.exit(1);
}

const content = fs.readFileSync(httpClientPath, 'utf8');

// Accept 2-4 parent directory traversals to be robust to path resolution
const importRegex = /import\s*\{\s*mcpInstance\s*\}\s*from\s*['"](?:\.\.\/){2,4}mutators\/mcp-client(?:\.ts)?['"];?/;

if (!importRegex.test(content)) {
  console.error('Assertion failed: mcpInstance import not found in http-client.ts');
  process.exit(1);
}

console.log('Assertion passed: mcpInstance import present in http-client.ts');
