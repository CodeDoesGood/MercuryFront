import * as apiCall from './apiCall';
import utils from './utils';

import infrastructureEndpoint from './endpoints/infrastructureEndpoint';
import slackEndpiont from './endpoints/slackEndpoint';
import emailEndpoint from './endpoints/emailEndpoint';
import projectEndpoint from './endpoints/projectEndpoint';
import volunteerEndpoint from './endpoints/volunteerEndpoint';
import projectsEndpoint from './endpoints/projectsEndpoint';

export default function endpointApi(token = null) {
  const setUtil = (key, value) => {
    utils[key] = value;
  };

  const getUtil = key => utils[key];

  if (token !== null) {
    setUtil('TOKEN', token);
  }

  return {
    apiCall,
    slack: slackEndpiont,
    email: emailEndpoint,
    project: projectEndpoint,
    volunteer: volunteerEndpoint,
    projects: projectsEndpoint,
    setUtil,
    getUtil,
    utils,
  };
}

