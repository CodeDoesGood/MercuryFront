import endpoint from '../endpoint';
import utils from '../utils';

const projectEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'project',
  get(projectId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/${projectId}`, 'get', {});
    return this.apiCall(options);
  },

  update(projectId) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/${projectId}`, 'post', {});
    return this.apiCall(options);
  },
  
  create(project) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/`, 'post', { project });
    return this.apiCall(options);
  }
});

export default projectEndpoint;
