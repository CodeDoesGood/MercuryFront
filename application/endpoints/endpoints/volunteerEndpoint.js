import endpoint from '../endpoint';
import utils from '../utils';

const volunteerEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'volunteer',

  //* *******************************
  // Authentication
  //* *******************************

  authenticate(username, password) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/authenticate`, 'post', { username, password });
    return this.apiCall(options);
  },

  //* *******************************
  // Create
  //* *******************************

  create(name, username, password, email, dataEntryUserId = 1) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}`, 'post', {
      volunteer: {
        name, username, password, email, data_entry_user_id: dataEntryUserId,
      },
    });
    return this.apiCall(options);
  },

  //* *******************************
  // Profile
  //* *******************************

  getProfile() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/profile`, 'get', {});
    return this.apiCall(options);
  },

  updateProfile(profile) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/profile`, 'post', { profile });
    return this.apiCall(options);
  },

  removeProfile() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/profile`, 'delete', {});
    return this.apiCall(options);
  },

  //* *******************************
  // Notification
  //* *******************************

  getNotification(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notification/${id}`, 'get', {});
    return this.apiCall(options);
  },

  getAnnouncements() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/announcements`, 'get', {});
    return this.apiCall(options);
  },

  dismissNotification(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notification/${id}`, 'delete', {});
    return this.apiCall(options);
  },

  updateNotification(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notification/${id}`, 'post', {});
    return this.apiCall(options);
  },

  //* *******************************
  // Notifications
  //* *******************************

  getNotifications() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notifications`, 'get', {});
    return this.apiCall(options);
  },

  dismissNotifications() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notifications`, 'delete', {});
    return this.apiCall(options);
  },

  updateNotifications(notifications) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/notifications`, 'post', { notifications });
    return this.apiCall(options);
  },

  //* *******************************
  // Verify
  //* *******************************

  verifyAccount(username, code) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/verify`, 'post', { username, code });
    return this.apiCall(options);
  },

  resendVerification(username) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/verify/${username}`, 'get', {});
    return this.apiCall(options);
  },

  //* *******************************
  // Password
  //* *******************************

  resetRequest(username, email) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/password/${username}/${email}`, 'get', {});
    return this.apiCall(options);
  },

  resetPassword(username, code, password) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/password/reset`, 'post', { username, reset_code: code, password });
    return this.apiCall(options);
  },

  updatePassword(oldPassword, password) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/password`, 'post', { oldPassword, password });
    return this.apiCall(options);
  },
});

export default volunteerEndpoint;
