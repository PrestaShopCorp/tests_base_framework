import {World, setDefaultTimeout, setWorldConstructor} from '@cucumber/cucumber';

// Default timeout 120 seconds
const DEFAULT_TIMEOUT = 120 * 1000;

// Set default cucumber timeout
setDefaultTimeout(DEFAULT_TIMEOUT);

class MyWorld extends World {
}

setWorldConstructor(MyWorld);
