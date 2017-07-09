import {call, take, put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';

import * as api from './api';
import * as apiHelper from '../../api-helpers';
import * as actions from './actions';

export function *requestSkySetup(action) {
    const response = yield call(api.getSkySetup);

    if (response.authToken) {
        yield put(actions.receiveSkySetup(response));
    } else {
        console.log('error receiving sky');
    }
}

export default [
    takeLatest('requestSkySetup', requestSkySetup),
];
