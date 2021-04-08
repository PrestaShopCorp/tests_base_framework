const {World, setDefaultTimeout, setWorldConstructor} = require('@cucumber/cucumber');

// Default timeout 120 seconds
const DEFAULT_TIMEOUT = 120 * 1000;

class MyWorld extends World {
  constructor(props) {
    super(props);

    // Set default cucumber timeout
    setDefaultTimeout(DEFAULT_TIMEOUT);
  }
}

setWorldConstructor(MyWorld);
