const logs = [];

export const loggerMiddleware = (message, data = {}) => {
  logs.push({
    timestamp: new Date().toISOString(),
    message,
    data,
  });
};

export const getLogs = () => logs;