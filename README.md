This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), with MuleSoft own configurations. With zero-configuration, you can now start writing your own business code.

> **Note:** This project relies all its configuration in the `@mulesoft/react-scripts-app` package. If you need any help, go to the [Anypoint UI repository](https://github.com/mulesoft/anypoint-ui).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm runt lint`

Runs a lint tool to validate code syntax. It is also configured to be used by your IDE.<br>
See the section about [linter](#linter) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run coverage`

Launches the test runner for all tests and analyzes the unit test coverage in the project.<br>

### `npm run build`

Builds the app for production in the output folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed! See the section about [deployment](#deployment) for more information.

## Supported Language Features

We use [Babel](https://babeljs.io/) to take advantage of the latest version of JavaScript in our code without waiting for browser support. This tool uses plugins to triansple your code to [ES5](https://www.ecma-international.org/ecma-262/5.1/) syntax that any browser can understand.

Babel preset automatically determines the Babel plugins you need. By default, this project is configured with the following Babel presets:

* [Env preset](https://babeljs.io/docs/plugins/preset-env/)
* [Stage 3 preset](https://babeljs.io/docs/plugins/preset-stage-3/)
* [React preset](https://babeljs.io/docs/plugins/preset-react/)

These presets are configured in the **.babelrc** file located in the root folder. You can customize Babel in this file.

## Linter

We use [ESLint](https://eslint.org/) to perform static analysis in our JavaScript and JSX code. It is configured to follow the [MuleSoft JavaScript style guide](https://github.com/mulesoft/javascript), an extension of the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

These rules are configured in the **.eslintrc** file located in the root folder.

## Post-Processing CSS

This project supports both **CSS** and  **SCSS** files, although we encourage to use the latter to have better IDE support. We currently support the following [PostCSS](http://postcss.org/) plugins:

* [PostCSS Next](http://cssnext.io/)
* [PostCSS Import](https://github.com/postcss/postcss-import)
* [PostCSS Nested](https://github.com/postcss/postcss-nested)

## Running Tests

We use [Jest](https://facebook.github.io/jest/) test runner to write our unit tests, powered with [Enzyme](https://github.com/airbnb/enzyme) and [Expect](https://github.com/mjackson/expect). We recommend that you use a separate tool for browser end-to-end tests if you need them.

Jest will look for test files with any of the following popular naming conventions:

* Files with `.js` suffix in __tests__ folder.
* Files with `.test.js` or `.spec.js` suffix under the __src__ folder.

We recommend to put the test files next to the code they are testing.

## Deployment

`npm run build` creates a build directory with a production build of your app. You can test the output locally with tools like [serve](https://github.com/zeit/serve):

```js
npm install -g serve
cd dist
serve
```

There is also a **Jenkinsfile** in the root folder already configured to be used in our CI Pipeline. If you want to know the next steps, see the [CDN Build pipeline](https://github.com/mulesoft/anypoint-ui/blob/master/docs/cdn-build-pipeline.md) document.

Notice that you've covered most of the tasks, and you will only need to [create a job in Jenkins that listens this repository](https://wiki.corp.mulesoft.com/pages/viewpage.action?pageId=45385517) and [configure NGINX to start serving your new URL](https://github.com/mulesoft/anypoint-ui/blob/master/docs/cdn-build-pipeline.md#how-to-distribute-your-ui-artifact).

## Public assets

You can use the **public** folder to store assets that will be served publicly. Both local & production deployments will place these files under the **dist** folder, which is the root folder of your site. This means that your code should reference the files using the relative path **/<YOUR-FILE-NAME>** (the browser will translate this path to the absolute paths `http://localhost:3000/<YOUR-FILE-NAME>` and `https://anypoint.mulesoft.com/<YOUR-APP-NAME>/<YOUR-FILE-NAME>`, respectively).

> **Pro tip:** place your public files inside a *static* folder.

## Extending the scripts

The default configurations are balanced for a medium-size project. But if you want to add your own customizations, or change them completely, we allow you to extend every configuration by adding files in the **config** folder of your repo.

### Extending webpack configuration

You can have full control of the webpack configuration for local development (`npm start`) and production configuration (`npm run build`) by exporting a function from a **webpack.config.js** file under the **config** folder. In this function, you will receive the default webpack configuration used for the task plus the target environment (either _development_ or _production_), you can decide either if you want to extend it or change it completely.

```js
module.exports = (baseConfig, env) => {
  if (env === 'production'){
    // Configure baseConfig as you need
  }
  return baseConfig;
};
```

### Extending local development configuration

You can update and extend the configuration of the local dev server by overriding the `development` property in the **config/config.js** file. In this file, you can update the following:

* Protocol, host and port of your development server.
* URLs to proxy.
* _(advanced)_ You can have full control of our [Express](https://expressjs.com/) dev server, by providing a function to the `config.development.before` property. This function will receive the dev server as parameter and you can use it to extend its functionality. For instance, this is how the default implementation looks like

```js
module.exports = {
  ...
  before: (app) => {
    // Open files from the runtime error overlay
    app.use(errorOverlayMiddleware());

    // Proxy MuleSoft icons
    app.use('/icons/**', express.static(`${ROOT_PATH}/node_modules/@mulesoft/anypoint-icons/lib/sprite.svg`));

    // Proxy navbar
    app.use('/shared/anypoint-navbar.js', express.static(`${ROOT_PATH}/node_modules/@mulesoft/anypoint-navbar/dist/anypoint-navbar.js`));

    // Proxy anypoint styles
    app.use('/static/anypoint-styles', express.static(`${ROOT_PATH}/node_modules/@mulesoft/anypoint-styles`));

    // Redirect to the node_modules folder
    app.use('/node_modules', express.static(`${ROOT_PATH}/node_modules/`));
  },
};
```

### Extending the testing, Babel and linter configuration

You can use your own Jest configuration by providing a **jest.config.js** file in the **config** folder. Note that this file will be used instead of the default configuration.

The linter (`npm run lint`) can be extended by updating the **.eslintrc** file located in the root folder of your project. Similarly, you can extend [Babel](https://babeljs.io/) by updating the  **.babelrc** file, also located in the root folder of your project.
