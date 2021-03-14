import { routersCollection } from 'routers';

import { ServerSettings } from './ServerSettings';
import { HttpModule } from './HttpModule';
import { ErrorHandler } from './ErrorHandler';

export class Modules {
    collection = [];

    constructor() {
        this.#addModule(new ServerSettings());
        this.#addModule(new HttpModule(routersCollection));
        this.#addModule(new ErrorHandler());
    }

    #addModule(module) {
        this.collection.push(module);
    }
}