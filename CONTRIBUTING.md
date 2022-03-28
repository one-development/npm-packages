# Contributing to NPM Packages

## Getting Started

Clone this repo and install dependencies (from cache)

```bash
yarn install
```

Implement changes, stage files, and commit

```bash
git add .
yarn commit
```

That's it! You can push your branch and make your first pull request!

## Guidelines for Contributions

While we are extremely grateful for all the contributions we get, sometimes we have to say no to some pull requests. We also recognize that most initial contributions will be related to the One UI package.

We will reject any One UI contribution that:

- Does not follow the [React Component Guidelines](/docs/react-component-guidelines.md)
- Introduces a utility function/component that isn't used by One UI itself.
- Introduces new components that were not approved before sending the pull request. To make sure you don't run into any issues landing your new component to the library, please choose a component from the [NPM Packages backlog](https://github.com/jth0024/npm-packages/issues) or open a [new issue](https://github.com/jth0024/npm-packages/issues/new/choose) to discuss the new addition first.
- Introduces slight alterations of existing components - like introducing a new component called "Fancy Button".
- Introduces breaking changes - if your changeset introduces API changes, please try to implement them in a backward-compatible way first. If this isn't possible, open a [new issue](https://github.com/jth0024/npm-packages/issues/new/choose) to discuss the changes before submitting a PR.
- Includes opinionated changes that are not necessary - examples for this include introducing destructuring or moving files around based on personal preference.
- Does not follow the same file naming conventions and folder structure as other portions of the codebase

**Note**: if you feel strongly that your changes are an exception and should be implemented, feel free to open a [new issue](https://github.com/jth0024/npm-packages/issues/new/choose) to discuss them before creating a PR.

## Definition of Done

- All tests are passing and file _test style guidelines_
- All linter warnings are addressed
- New components adhere to _component style guidelines_
- New components support _A11y and ARIA attributes_
- Include storyshots (auto-generated from component stories) or unit tests with [jest](https://jestjs.io/en/).
- Include _proper documentation_ (you can start the docs site by running `yarn workspace one-ui storybook`)

##### Test Style Guidelines

- Test files should only be concerned with one source file, function, or component
- Test files should be named after the source file under test and use the convention `<sourceFileName>.test.js`. For example, `createFonts.test.js` or `createTheme.test.js`
- Tests should always be located in a `__tests__` directory
- The `__tests__` directory should be in the same folder as the functions or components under test
- Snapshots are automatically generated, but please note that they will be generated in a folder called `__snapshots__`.

##### Component Style Guidelines

- Adheres to [API Design Guidelines](/docs/react-component-guidelines.md)
- Export the component as `default`
- Include an `index.js` file, which re-exports the component as `default`
- Use React function components
- Define `propTypes`, `defaultProps`, and `displayName`
- Declare at least `as` and `className` as props
- Accept refs via `forwardRef`
- Spread additional props into the root node (exceptions for certain inputs)
- Use self contained, scoped styling (i.e. avoids margins or other positioning styles)
- Use [Styled Components](https://styled-components.com/) for CSS-in-JS styling
- Apply necessary CSS resets (in other words, styling should work when CssBaseline is not loaded)
- Use semantic HTML whenever possible

##### Supporting A11y and ARIA Attributes

- Use our linter with your text editor or run `yarn lint`, which includes [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules)
- Follow general a11y rules, which can be found [here](https://dequeuniversity.com/rules/axe/3.0/)
- Document any props necessary for ARIA, like `id`, as required

##### Documenting Components and Utilities

- Document all `propTypes` and `defaultProps` on components
- Include a descriptive JSDoc comment above the component definition and each `propType`
- Include an appropriate title and component subtitle for a component story
- Include at least 3 component stories: `Basic`, `WithDarkTheme`, and `WithKnobs`
- All exported utility functions are documented in the `API Reference` section using MDX. **NOTE**: You must manually register MDX files via the `stories` attribute in `.storybook/main.js`. See [Storybook Addon Docs](https://www.npmjs.com/package/@storybook/addon-docs) for even more information about MDX.

## Git Commit Formatting

Please squash your changes into a single commit. If you have multiple sets of changes, make separate pull requests.

Commit messages should:

- Follow [commitlint](https://commitlint.js.org/#/concepts-commit-conventions) specifications.
- Reference an issue number
- Only affect one project or the global workspace

Doing so allows us to automatically generate the One UI changelog. To make a properly formatted commit, simply run `yarn commit`.

## Creating Pull Requests

- Your branch name should be prefixed with one of the following labels: `feature, bugfix, docs, chore`
- Rebase master and squash your commits. Note: follow the _git commit formatting_ rules
- Tag at least 1 default reviewer in your pull request.

**NOTE**: when you try to push your changes, some pre-push checks may fail. Please address the issues, squash your new commits, and try again. It's easy to forget to update component snapshots or deduplicate dependencies before you commit!

## Running Tasks

This repo has two types of scripts or tasks: global tasks that run for _all_ packages in the workspace and package level tasks that run for _individual_ packages in the workspace.

##### Global Tasks

1. To list all of the global tasks for this workspace, run `yarn tasks`.
2. To learn more about a _specific_ global task, run `yarn [task name] --help`. For example, `yarn test --help`.

##### Package Tasks

1. To list all of the tasks for a package, run `yarn workspace [package name] tasks`. For example, `yarn workspace one-ui tasks`.
2. To learn more about a _specific_ package task, run `yarn workspace [package name] [task name] --help`. For example, `yarn workspace one-ui storybook --help`.

##### Tasks Cheat Sheet

| Description                    | Command                                         |
| ------------------------------ | ----------------------------------------------- |
| Start the One UI docs site     | `yarn workspace one-ui storybook`               |
| Create a One UI component      | `yarn workspace one-ui generate component`      |
| Run _unit_ tests in watch mode | `yarn test --only=unit`                         |
| Run _all_ tests once           | `yarn test --once`                              |
| Update One UI snapshots        | `yarn test --once --only=unit --updateSnapshot` |
| Commit staged changes          | `yarn commit`                                   |
| Build packages                 | `yarn build`                                    |
| Build packages in watch mode   | `yarn dev`                                      |

## Adding NPM Dependencies

- To add a dependency for your package, run `yarn workspace [name of package] add [name of dependency]`. For example, `yarn workspace one-ui add fast-sort`
- To add a dependency for the workspace (not recommended), run `yarn add [name of dependency] -W -D`. For example, `yarn add eslint-plugin-fp -W -D`.
- Run `yarn deduplicate` before commiting your changes to dedupe dependencies.
- Review and commit the cached dependency files located in `npm-packages-offline-cache`

##### NOTES

- NEVER COMMIT YOUR `.npmrc` FILE!!!!
- Avoid adding dependencies to the workspace root unless it is absolutely necessary
- There is NO good reason to add a production dependency to the workspace, so you should always include the `-D` flag.
- Avoid locking your dependencies to a specific version to improve deduping.

## Creating One UI Components

If you have approval (from an RFC or project maintainer) to create a new component, then you can
run the following command to generate the necessary component boilerplate:

```bash
yarn workspace one-ui generate component
```

## Creating New Packages

If you have approval (from an RFC or project maintainer) to create a new package, then you can follow the guide [here](https://github.com/jth0024/npm-packages/blob/master/docs/building-and-publish-packages.md) to create a new package in the workspace.
