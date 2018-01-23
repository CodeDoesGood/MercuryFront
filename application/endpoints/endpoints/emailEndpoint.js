import endpoint from '../endpoint';
import utils from '../utils';

const emailEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'email',

  //*******************
  // Service
  //*******************

  getService() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/service`, 'get', {});
    return this.apiCall(options);
  },
  
  restartService() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/service/restart`, 'get', {});
    return this.apiCall(options);
  },
  
  updateServiceService(user, service, secure=true) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/service`, 'post', { user, service, secure });
    return this.apiCall(options);
  },
  
  updateServicePassword(password) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/service/password`, 'post', { password });
    return this.apiCall(options);
  },
  
  //*******************
  // Stored
  //*******************

  removeStored(storedId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/stored/${storedId}`, 'delete', {});
    return this.apiCall(options);
  },

  getStored() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/stored`, 'get', {});
    return this.apiCall(options);
  },

  sendStored() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/stored/send`, 'get', {});
    return this.apiCall(options);
  },

  updateStored(storedId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/stored/${storedId}`, 'post', {});
    return this.apiCall(options);
  },

});

export default emailEndpoint;
