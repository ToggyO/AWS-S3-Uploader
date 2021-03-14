import { config } from 'config';

import { Application } from './app';
import { Modules } from './modules';

export const init = async () => {
    const app = new Application({
        host: config.HOST,
        port: config.PORT,
        prefix: config.API_PREFIX,
        nodeEnv: config.NODE_ENV,
        modules: new Modules(),
    });
    await app.runModules();
    app.start();
};
