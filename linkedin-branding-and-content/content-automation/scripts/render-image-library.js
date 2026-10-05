#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { root } = require('../src/config');
const { createImage, diagramFor } = require('../src/image');
const { contentDiagram } = require('../src/content-diagrams');
const { diagrams } = require('../src/fde-diagrams');

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'linkedin-image-library-'));
const planPath = path.join(temp, 'plan.json');
execFileSync('python3', [path.join(__dirname, 'inspect-image-library.py'), planPath], { stdio: 'inherit' });
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const pending = plan.filter(item => !item.enhanced);
console.log(`Enhancing ${pending.length} remaining images; preserving ${plan.length - pending.length} enhanced images.`);
const results = [];
for (const [index, item] of pending.entries()) {
  const post = { ...item.post, diagram: undefined };
  const original = diagrams[post.drill];
  const diagram = original
    ? { ...original, layout: 'flow', accent: '#0f766e', pale: '#ccfbf1' }
    : contentDiagram(post) || diagramFor(post);
  const file = path.join(root, item.imagePath);
  createImage({ ...post, diagram }, path.basename(file, '.png'), path.dirname(file));
  results.push({ imagePath: item.imagePath, topic: post.topic, layout: diagram.layout || 'flow' });
  if ((index + 1) % 25 === 0 || index + 1 === pending.length) console.log(`Enhanced ${index + 1}/${pending.length}`);
}
fs.writeFileSync(path.join(root, 'image-enhancement-report.json'), JSON.stringify({
  totalImages: plan.length,
  previouslyEnhanced: plan.length - pending.length,
  enhancedInThisRun: results.length,
  images: results
}, null, 2) + '\n');
console.log('Complete. Existing image paths, content, and publishing state are preserved.');
