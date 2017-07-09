import {call, take, put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';

import * as api from './api';
import * as apiHelper from '../../api-helpers';
import * as actions from './actions';

function setUserInLocalStorage(user) {
    localStorage.cookies = JSON.stringify({'authToken': user.authToken, 'userId': user.id});
}

export function *signUpSaga(action) {
    const response = yield apiHelper.post(
        `${apiHelper.getBaseUrl()}/signup`,
        {registration: action.registration},
        {headers: apiHelper.getHeaders()}
    );

    if (response.user) {
        setUserInLocalStorage(response.user);

        // there is no response.user right now, API just returns the auth token
        yield put(actions.receiveLoggedInUser(response.user));

        action.callback();
    } else {
        console.log('error logging in');
    }

    yield put(actions.receiveLoggedInUser(response.user));
}

export function *logInSaga(action) {
    const response = yield call(api.logInUser, action.user);

    if (response.user) {
        setUserInLocalStorage(response.user);

        // there is no response.user right now, API just returns the auth token and user id { user: {userId: 1, authToken: 'abc123whatever'}}
        yield put(actions.receiveLoggedInUser(response.user));

        action.callback();
    } else {
        console.log('error logging in');
    }
}

export default [
    takeLatest('signUp', signUpSaga),
    takeLatest('logIn', logInSaga),
];

