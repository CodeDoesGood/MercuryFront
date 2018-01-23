import endpoint from '../endpoint';
import utils from '../utils';

const projectsEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'projects',
  getActive() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/active`, 'get', {});
    return this.apiCall(options);
  },
  
  getAll() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/all`, 'get', {});
    return this.apiCall(options);
  },
  
  getByCategory(categoryId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/category/${categoryId}`, 'get', {});
    return this.apiCall(options);
  },
  
  getByStatus(statusId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/status/${statusId}`, 'get', {});
    return this.apiCall(options);
  },
  
  getHidden() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/hidden`, 'get', {});
    return this.apiCall(options);
  }
});

export default projectsEndpoint;
