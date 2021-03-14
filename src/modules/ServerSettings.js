import bodyParser from 'body-parser';

export class ServerSettings {
    run(app) {
        app.disable('x-powered-by');
        // Request data parsing
        app.use(bodyParser.json({ limit: '1mb' }));
        app.use(bodyParser.urlencoded({ extended: true }));
        // Unhandled errors handler
        this.unhandledRejection();
    }

    unhandledRejection() {
        const unhandledRejections = [];

        process.on('unhandledRejection', (reason, promise) => {
            const errorMsgContent = `${reason?.stack || reason}`;
            const errorMsg = errorMsgContent.replace(/(\r\n|\n|\r)|(\s{2,})/gm, ' ');
            console.warn(errorMsg);
            unhandledRejections.push(promise); // or Promise.reject(new Error())
        });

        process.on('rejectionHandled', (promise) => {
            const index = unhandledRejections.indexOf(promise);
            unhandledRejections.splice(index, 1);
        });
    }
}
