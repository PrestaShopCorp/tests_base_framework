import 'module-alias/register';
import {CommonPage} from '~/src/utils/pages/commonPage';

class FirstVisit extends CommonPage {
  public pageFrTitle: string;
  constructor() {
    super();

    // Text
    this.pageFrTitle = 'Première visite sur PrestaShop Addons - PrestaShop Addons';
  }
}

const firstVisit = new FirstVisit();
export {firstVisit};
