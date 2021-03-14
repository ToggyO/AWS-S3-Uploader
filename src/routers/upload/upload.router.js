import { CommonRouter } from '../common.router';

export class UploadRouter extends CommonRouter {
    routePrefix = '/upload';
    #controller;
    #fileHandler;

    constructor(controller, fileHandler) {
        super();
        this.#controller = controller;
        this.#fileHandler = fileHandler;
    }

    initRoutes() {
        const { _router } = this;

        _router.post(
            '/',
            this._asyncWrapper(this.#fileHandler.uploadMany('files', 5)),
            this._asyncWrapper(this.#controller.upload),
        );

        return _router;
    }
}
