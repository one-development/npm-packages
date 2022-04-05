# One UI

An accessible component library with powerful theming

[![Netlify Status](https://api.netlify.com/api/v1/badges/dd4de993-c2c6-4c73-9349-9741467740d4/deploy-status)](https://app.netlify.com/sites/one-dev/deploys)

## Getting Started

Run `yarn workspace @one/ui storybook`. A new browser window will open at `https://localhost:9001`.

## Creating Components

Run `yarn workspace @one/ui generate component` and complete the prompts.
NOTES:

- You should receive approval via an RFC or maintainer before creating new components.
- As a courtesy, please sort the component export in `src/components/index.js`

## Tasks Cheat Sheet

| Description                    | Command                                     |
| ------------------------------ | ------------------------------------------- |
| Start the docs site            | `yarn workspace @one/ui storybook`          |
| Create a component             | `yarn workspace @one/ui generate component` |
| Run _unit_ tests in watch mode | `yarn test --only=unit`                     |
| Run _all_ tests once           | `yarn test --once`                          |
| Commit staged changes          | `yarn commit`                               |
