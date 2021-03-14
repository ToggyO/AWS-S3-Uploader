import express from 'express';

export class Application {
    #host = '0.0.0.0';
    #port = 5000;
    #prefix = '';
    #nodeEnv;
    #app = express();
    #modulesCollection;

    constructor({
        host, port, prefix, nodeEnv, modules,
    }) {
        this.#host = host;
        this.#port = port;
        this.#prefix = prefix;
        this.#nodeEnv = nodeEnv;
        this.#modulesCollection = modules.collection;
    }

    async runModules() {
        for (const module of this.#modulesCollection) {
            await module.run(this.#app);
        }
    }

    start() {
        this.#app.listen(
            { host: this.#host, port: this.#port },
            () => console.info(
                `App is started on http://${this.#host}:${this.#port}${this.#prefix} in ${this.#nodeEnv}`,
            ),
        );
    }
}
