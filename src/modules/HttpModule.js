import { Router } from 'express';

import { config } from 'config';

export class HttpModule {
    #mainRouter = Router();
    #routersCollection = [];

    constructor(routersCollection) {
        this.#routersCollection = routersCollection;
    }

    run(app) {
        app.use(config.API_PREFIX, this._createRouter());
    }

    _createRouter() {
        this.#routersCollection.forEach(
            (router) => this.#mainRouter.use(router.routePrefix, router.initRoutes()),
        );
        return this.#mainRouter;
    }
}
