import auth from './auth/sagas';
import sky from './sky/sagas';
import elements from './elements/sagas';

export default function *root() {
    yield [
        ...auth,
        ...sky,
        ...elements,
    ];
};
