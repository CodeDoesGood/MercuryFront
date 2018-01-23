import endpoint from '../endpoint';
import utils from '../utils';

const slackEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'infrastructure',

  hello() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/hello`, 'get', {});
    return this.apiCall(options);
  },
});

export default slackEndpoint;
