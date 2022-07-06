import 'module-alias/register';
import { CommonPage } from '../../../src/utils/pages/commonPage';
import { Page } from 'playwright';
declare class Home extends CommonPage {
    pageTitle: string;
    private readonly firstVisitLink;
    constructor();
    /**
     * Click on 'First Visit' link
     * @param page {Page} Browser tab
     * @returns {Promise<void>}
     */
    goToFirstVisitLink(page: Page): Promise<void>;
}
declare const home: Home;
export { home };
