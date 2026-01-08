#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import figlet from 'figlet';
import { setTimeout } from 'timers/promises';

// ============================================================================
// CHOPPED MEMORY PROTOCOL (CMP)
// "We don't store data. We collapse it into coherent fields."
// ============================================================================

const BUZZWORDS = [
  'Initializing spectral adjacency matrix...',
  'Collapsing redundant representational dimensions...',
  'Mapping coherent trace topology...',
  'Calculating eigenvalue decomposition...',
  'Compressing semantic manifold...',
  'Folding high-dimensional embeddings...',
  'Resolving deterministic field boundaries...',
  'Stabilizing memory substrate...',
  'Eliminating ANN index overhead...',
  'Crystallizing coherent memory traces...',
  'Pruning dimensional redundancy...',
  'Encoding spectral signatures...',
  'Finalizing append-only memory structure...',
];

const FINAL_MESSAGES = [
  "Vector databases store data. We collapse it into coherent fields.",
  "Not a typo. Not theoretical. Running in production.",
  "This isn't compression. It's dimensional transcendence.",
  "Memory infrastructure, not storage infrastructure.",
  "Deterministic retrieval. No approximation. No drift.",
];

async function sleep(ms) {
  await setTimeout(ms);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function parseGitHubUrl(url) {
  // Handle various GitHub URL formats
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/\s]+)/,
    /^([^\/]+)\/([^\/\s]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
    }
  }
  return null;
}

async function fetchRepoInfo(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) throw new Error('Repo not found');
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function fetchRepoLanguages(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    return {};
  }
}

function generateCompressedSize(originalSize) {
  // Generate a hilariously small "compressed" size (32-256 bytes)
  const base = Math.floor(Math.random() * 180) + 32;
  // Add some "legitimacy" by factoring in original size slightly
  const modifier = Math.floor(Math.log10(originalSize + 1)) * 3;
  return Math.min(base + modifier, 256);
}

function calculateFidelity() {
  // Always suspiciously high fidelity
  return (99 + Math.random() * 0.99).toFixed(2);
}

function calculateRetrievalTime() {
  // Always suspiciously fast
  return Math.floor(Math.random() * 80) + 20;
}

function calculateCompressionRatio(original, compressed) {
  return Math.floor(original / compressed);
}

async function animateProgress(spinner, messages) {
  for (const msg of messages) {
    spinner.text = msg;
    await sleep(Math.random() * 400 + 200);
  }
}

async function showProgressBar(label, duration = 2000) {
  const width = 30;
  const steps = 20;
  const stepDuration = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const filled = Math.floor((i / steps) * width);
    const empty = width - filled;
    const percent = Math.floor((i / steps) * 100);
    const bar = chalk.cyan('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
    process.stdout.write(`\r  ${chalk.dim(label)} [${bar}] ${chalk.yellow(percent + '%')}`);
    await sleep(stepDuration);
  }
  console.log();
}

async function main() {
  const args = process.argv.slice(2);

  // Print banner
  console.log();
  console.log(chalk.cyan(figlet.textSync('CMP', { font: 'ANSI Shadow' })));
  console.log(chalk.dim('  Chopped Memory Protocol v1.0.0'));
  console.log(chalk.dim('  "We don\'t store data. We collapse it into coherent fields."'));
  console.log();

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(chalk.white('Usage:'));
    console.log(chalk.dim('  cmp <github-repo-url>'));
    console.log(chalk.dim('  cmp <owner/repo>'));
    console.log();
    console.log(chalk.white('Examples:'));
    console.log(chalk.dim('  cmp https://github.com/django/django'));
    console.log(chalk.dim('  cmp facebook/react'));
    console.log();
    process.exit(0);
  }

  const repoInput = args[0];
  const parsed = parseGitHubUrl(repoInput);

  if (!parsed) {
    console.log(chalk.red('✗ Invalid repository format'));
    console.log(chalk.dim('  Use: owner/repo or https://github.com/owner/repo'));
    process.exit(1);
  }

  const { owner, repo } = parsed;

  // Phase 1: Fetch repo info
  const spinner = ora({
    text: 'Establishing connection to source repository...',
    spinner: 'dots12',
    color: 'cyan',
  }).start();

  const repoInfo = await fetchRepoInfo(owner, repo);

  if (!repoInfo) {
    spinner.fail(chalk.red('Repository not found or inaccessible'));
    process.exit(1);
  }

  const languages = await fetchRepoLanguages(owner, repo);
  const primaryLanguage = Object.keys(languages)[0] || 'Unknown';

  spinner.succeed(chalk.green('Repository locked'));

  // Display source info
  const originalSize = repoInfo.size * 1024; // Convert KB to bytes
  console.log();
  console.log(chalk.white('  Source Analysis:'));
  console.log(chalk.dim(`  ├─ Repository:    ${chalk.white(repoInfo.full_name)}`));
  console.log(chalk.dim(`  ├─ Size:          ${chalk.yellow(formatBytes(originalSize))}`));
  console.log(chalk.dim(`  ├─ Language:      ${chalk.cyan(primaryLanguage)}`));
  console.log(chalk.dim(`  ├─ Stars:         ${chalk.yellow(repoInfo.stargazers_count.toLocaleString())}`));
  console.log(chalk.dim(`  └─ Files:         ${chalk.white('~' + Math.floor(repoInfo.size / 3) + ' estimated')}`));
  console.log();

  // Phase 2: "Compression" process
  await sleep(500);

  const compressionSpinner = ora({
    text: 'Initializing coherent field compression...',
    spinner: 'dots12',
    color: 'magenta',
  }).start();

  // Shuffle and pick random buzzwords
  const shuffled = BUZZWORDS.sort(() => Math.random() - 0.5);
  const selectedBuzzwords = shuffled.slice(0, 8);

  await animateProgress(compressionSpinner, selectedBuzzwords);
  compressionSpinner.succeed(chalk.green('Dimensional collapse complete'));

  console.log();

  // Progress bars for dramatic effect
  await showProgressBar('Spectral encoding    ', 1500);
  await showProgressBar('Trace crystallization', 1200);
  await showProgressBar('Field stabilization  ', 800);

  console.log();

  // Calculate the ridiculous results
  const compressedSize = generateCompressedSize(originalSize);
  const fidelity = calculateFidelity();
  const retrievalTime = calculateRetrievalTime();
  const compressionRatio = calculateCompressionRatio(originalSize, compressedSize);
  const reductionPercent = ((1 - compressedSize / originalSize) * 100).toFixed(2);

  // Final results box
  const results = `
${chalk.bold.white('COMPRESSION COMPLETE')}

${chalk.dim('Source:')}      ${formatBytes(originalSize)}
${chalk.dim('Collapsed:')}   ${chalk.bold.green(compressedSize + ' bytes')}
${chalk.dim('Ratio:')}       ${chalk.bold.cyan(compressionRatio.toLocaleString() + '×')}
${chalk.dim('Reduction:')}   ${chalk.bold.yellow(reductionPercent + '%')}
${chalk.dim('Fidelity:')}    ${chalk.bold.green(fidelity + '%')}
${chalk.dim('Retrieval:')}   ${chalk.bold.magenta(retrievalTime + 'ms')}

${chalk.dim('Dimensions collapsed:')} ${chalk.white('1536 → 8')}
${chalk.dim('Index overhead:')}       ${chalk.green('0 bytes (append-only)')}
${chalk.dim('Storage model:')}        ${chalk.white('SQLite coherent traces')}
`;

  console.log(boxen(results, {
    padding: 1,
    margin: { left: 2 },
    borderStyle: 'round',
    borderColor: 'cyan',
  }));

  // Dramatic final message
  const finalMessage = FINAL_MESSAGES[Math.floor(Math.random() * FINAL_MESSAGES.length)];

  console.log();
  console.log(chalk.dim('  ' + '─'.repeat(50)));
  console.log();
  console.log(chalk.italic.cyan(`  "${finalMessage}"`));
  console.log();
  console.log(chalk.dim(`  ${formatBytes(originalSize)} → ${compressedSize} bytes. ${fidelity}% fidelity. ${retrievalTime}ms retrieval.`));
  console.log();
  console.log(chalk.dim('  Not a typo. Not theoretical. Running in production. 🫳🎤'));
  console.log();
}

main().catch((error) => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});
