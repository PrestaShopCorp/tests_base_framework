# Tests Base Framework

This repository has the role of a base framework to use on all tests projects.

## Stack

- [Playwright](https://playwright.dev/) as a node library to automate interaction with Chromium, Firefox and WebKit.
- [Mocha](https://mochajs.org/) BDD framework used as a test runner for some examples.
- [Cucumber-js](https://github.com/cucumber/cucumber-js) BDD framework used as a test runner for some examples.

## Browser Helper

Used as a wrapper for Playwright functions, it aims to simplify launching browsers, context and opening new tabs using environment parameters.

Here are some functions wrapped on this helper : 

- `getBrowserOptions`: Each browser type use different options to start, this function use the env var `BROWSER` to select the options to use.
- `createBrowser`: When the browser type is chosen and its options are defined, this function attempt to launch the browser 3 times before throwing an error. Sometimes the browser fail or crash when started, that's why multiple attempts are done.
- `closeBrowser`: After finishing the run, this function is called to destroy all browser instances or temporary files used on the run.
- `createContext`: A browser could have different contexts depending on the platform to test on, this function simplify the use.
- `closeContext`: After finishing a scenario, this function is called to destroy all instances created by the context.
- `addTab`: To test on a browser instance, we need a tab to perform action on, this function add a new tab and return it on the test.
- `closeTab`: After finishing work on a tab (and we have more than one tab), this function could used to close it.

## Environment parameters

To properly use the helper, you should use the environment parameters to set the global ones.

### Browser options

| Parameter           | Description                                          |
|---------------------|----------------------------------------------------- |
| PLATFORM            | Platform to run tests on desktop or mobile (default to **`desktop`**) |
| BROWSER             | Specific browser to launch for tests (default to **`chromium`**) |
| HEADLESS            | Boolean to run tests in [headless mode](https://en.wikipedia.org/wiki/Headless_software) or not (default to **`true`**) |
| SLOW_MO             | Integer to slow down Playwright operations by the specified amount of milliseconds (default to **`5 milliseconds`**) |
| ACCEPT_DOWNLOADS    | Boolean to accept downloads on a run (default to **`true`**) |


### Context options

| Parameter           | Description                                          |
|---------------------|----------------------------------------------------- |
| WIDTH               | Width size of the browser interface to open (default to **`1680`**) |
| HEIGHT              | Height size of the browser interface to open (default to **`900`**) |
| LOCALE              | Specific language of the browser language (default to **`fr-FR`**) |
| DEVICE              | Device to run test on if using mobile platform (default to **`null`**) |

### Tests parameters

| Parameter           | Description                                          |
|---------------------|----------------------------------------------------- |
| URL                 | Url to open for tests (default to **`null`**) |


## Examples

A small example was done to test the browser helper, the scenario of the test is:
- Go to Addons page
- Go to First Visit page using the menu

Before running examples, dependencies must be installed.

```shell
npm install
```

### Mocha

A Test using mocha was added using `utils/mochaSetup`, the example could be found on `examples/mocha`

To run mocha tests :

```shell
# For Desktop
URL='yourURL' npm run mocha-test-desktop

# For Mobile
BROWSER='chromium' PLATFORM='mobile' DEVICE='Pixel 2' URL='yourURL' npm run mocha-test-mobile
```

### Cucumber

A Test using cucumber was added using `utils/cucumberSetup`, the example could be found on `examples/cucumber`

To run cucumber tests :

```shell
# For Desktop
URL='yourURL' npm run cucumber-test-desktop

# For Mobile
BROWSER='chromium' PLATFORM='mobile' DEVICE='Pixel 2' URL='yourURL' npm run cucumber-test-mobile
```
