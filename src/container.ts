import * as awilix from 'awilix';
import { registerLogger } from './container/logger';

export const createContainer = async () => {

    const container = awilix.createContainer();
    registerLogger(container);

    return container;
}