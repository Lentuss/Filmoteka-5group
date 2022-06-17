import detailsInfo from './getDetails';

import { getDetails } from './getDetails';

// console.log('bingo! we get ', detailsInfo);

const something = getDetails('92782').then(res => {
  console.log(res);
});
