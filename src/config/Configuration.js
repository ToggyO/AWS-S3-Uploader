import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export class Configuration {
    _envVariables = {};
    _NODE_ENV = process.env.NODE_ENV || 'development';

    constructor() {
        const dotenvDir = path.join(process.cwd(), `.env.${this._NODE_ENV}`);
        this._envVariables = dotenv.parse(fs.readFileSync(dotenvDir));
        console.table(this._getVariablesForPrint());
    }

    _getVariablesForPrint() {
        return Object.keys(this._envVariables).reduce(
            (accumulator, envName) => {
                const MAX_LENGTH = 80;
                const vars = this._envVariables;
                const variableIsNotEmpty = typeof vars[envName] === 'string' && vars[envName].length > 0;
                const useCutting = variableIsNotEmpty && vars[envName].length > MAX_LENGTH;
                const variable = useCutting ? `${vars[envName].substr(0, MAX_LENGTH)}...` : vars[envName];
                return {
                    ...accumulator,
                    [envName]: variable,
                };
            },
            {},
        );
    }

    get envVars() {
        return this._envVariables;
    }
}
