let appConfig = null;

export const setAppConfig = (cfg) => {
  appConfig = cfg || {};
};

export const getAppConfig = () => appConfig || {};

