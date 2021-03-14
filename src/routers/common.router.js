import { Router } from 'express';

import { asyncWrapper } from 'utils/helpers';

export class CommonRouter {
    _router = Router();
    _asyncWrapper = asyncWrapper;
}
