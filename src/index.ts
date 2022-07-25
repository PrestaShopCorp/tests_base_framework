// Export helpers
/* Export GlobalVars */
export {GlobalVars} from './helpers/globalVars';

/* Export Db helper */
export {dbHelper} from './helpers/dbHelper';

/* Export Browser helper */
export {
  createBrowser,
  closeBrowser,
  createContext,
  closeContext,
  getBrowserContext,
  addTab,
  closeTab,
  getTab,
  addInitScript,
  addRoute,
  deleteRoute
} from './helpers/browserHelper';
export * as browserHelper from './helpers/browserHelper';

// Export utils
/* Export Common page */
export {CommonPage} from './utils/pages/commonPage';

/* Export Mocha hooks */
export {mochaHooks} from './utils/mocha/setup';
