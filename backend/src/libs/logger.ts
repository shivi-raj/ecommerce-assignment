import bunyan from 'bunyan'
export const logger = bunyan.createLogger({
    name: 'my-app',                     // Required
    level: 'info',      // Optional, see "Levels" section
});

