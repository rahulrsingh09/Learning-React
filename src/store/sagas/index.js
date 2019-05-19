import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { authUserSaga, logoutSaga, autoAuthCheckSaga, checkAuthTimeoutSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE, authUserSaga);
    yield takeEvery(actionTypes.LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_AUTO_CHECK, autoAuthCheckSaga);
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}