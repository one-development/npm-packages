# Build and Publish Packages

## Getting Started

Run `yarn build` or `yarn build --scope={package name}` to compile all packages or one package.

## How It Works

The build task will first run the `build` script defined for each package. Then it will prepare the built files to be published to NPM. The build task provides a number of optimizations for packages, including:

- Automatic esm module aliasing
- Automatic support for cherry-picked import statements
- Automatic pruning of unused files before publish to NPM

In order to provide these optimizations, the build task expects packages to adhere to the following requirements:

- Contain all source files in a `src` directory
- Compile built files into a `dist` directory
- Contain at least one `index.js` file (must be `src/index.js`)
- Contain an `index.js` file in any folder supporting "cherry-picked" imports (i.e. `src/colors/index.js`)
- Include a `main` field in `package.json` pointing to `./index.js`
- Include `@babel/runtime-corejs3` as a dependency
- (Optional) Compile built esm into an `esm` directory (must be `dist/esm`)
- (Optional) Include a `module` field in `package.json` pointing to `./esm/index.js`
- (Optional) Include a `browser` field in `package.json` mapping files to a browser-specific versions (i.e. `"./index.js": "./browser.js"`)

## Advanced Information

There are a few interesting things about the build task worth noting:

- Packages must include `@babel/runtime-corejs3` as a dependency because of the `@babel/plugin-transform-runtime` plugin that is used to replace inline helpers with core-js import statements
- There is currently not way to opt out of the build task. It will fail if a package does not adhere to the requirements above.
- The `main`, `module`, and `browser` fields in `package.json` are pointing to the location of the files relative to the `dist` directory, not the root. This is because the `package.json` file will be copied into the `dist` directory, which is then published to `NPM`. Publishing the `dist` directory makes it significantly easier to remove unused code and support cherry-picked import statements.
- Packages DO NOT need an `.npmignore` file because only the required files are copied into the `dist` directory by the build task.
