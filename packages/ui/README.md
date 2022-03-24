# One UI

## Getting Started

Run `yarn workspace one-ui storybook`. A new browser window will open at `https://localhost:9001`.

## Creating Components

Run `yarn workspace one-ui generate component` and complete the prompts.
NOTES:

- You should receive approval via an RFC or maintainer before creating new components.
- As a courtesy, please sort the component export in `src/components/index.js`

## Tasks Cheat Sheet

| Description                    | Command                                         |
| ------------------------------ | ----------------------------------------------- |
| Start the docs site            | `yarn workspace one-ui storybook`               |
| Create a component             | `yarn workspace one-ui generate component`      |
| Run _unit_ tests in watch mode | `yarn test --only=unit`                         |
| Run _all_ tests once           | `yarn test --once`                              |
| Update snapshots               | `yarn test --once --only=unit --updateSnapshot` |
| Commit staged changes          | `yarn commit`                                   |
