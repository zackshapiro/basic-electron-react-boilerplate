import {combineReducers} from 'redux';

import sky from './sky/reducer';
import elements from './elements/reducer';
import auth from './auth/reducer';

const reducer = combineReducers({
    sky,
    auth,
    elements,
});

export default reducer;
