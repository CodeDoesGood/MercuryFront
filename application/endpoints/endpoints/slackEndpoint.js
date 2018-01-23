import endpoint from '../endpoint';
import utils from '../utils';

const slackEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'slack',

  sendHealthCheck() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/health`, 'get', {});
    return this.apiCall(options);
  },
});

export default slackEndpoint;
