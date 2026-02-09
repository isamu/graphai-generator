# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Code generator for GraphAI. Generates boilerplate code and configurations for GraphAI projects.

## Commands

```bash
yarn build      # Compile TypeScript (tsc && tsc-alias)
yarn lint       # Run ESLint (with --fix)
yarn format     # Format with Prettier
yarn test       # Run tests (node:test with ts-node)
```

## Architecture

- `src/generator.ts` - Main generator logic
- `src/index.ts` - Entry point
- `tests/` - Test files (test_*.ts pattern)
