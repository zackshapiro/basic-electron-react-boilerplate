import {call, take, put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';

import * as api from './api';
import * as apiHelper from '../../api-helpers';
import * as actions from './actions';

export function *createElementSaga(action) {
    const response = yield call(api.postElement, action.element);

    if (response.element) {
        yield put(actions.receiveElement(response.element));
    } else if (response.error) {
        console.log('error receiving element');
    }
}

export function *getAllElementsSaga(action) {
    const response = yield call(api.getElements);

    if (response.elements) {
        yield put(actions.receiveAllElements(response.elements));
    } else if (response.error) {
        console.log('error receiving elements');
    }
}

export function *updateElementSaga(action) {
    const response = yield call(api.updateElement, action.element);

    if (response.element) {
        yield put(actions.receiveElement(response.element));
    } else if (response.error) {
        console.log('error receiving element');
    }
}

export default [
    takeLatest('requestCreateElement', createElementSaga),
    takeLatest('requestAllElements', getAllElementsSaga),
    takeLatest('requestUpdateElement', updateElementSaga),
];
