import * as actionTypes from './actionTypes';

/**
 * Updates the users profile on redux
 * @param {object} profile the users profile
 */
export function updateProfile(profile) {
  return {
    type: actionTypes.UPDATE_PROFILE,
    profile,
  };
}

/**
 * Removes the profile completely from the redux store
 */
export function removeProfile() {
  return {
    type: actionTypes.REMOVE_PROFILE,
  };
}
