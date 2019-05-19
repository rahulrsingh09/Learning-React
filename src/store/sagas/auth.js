
import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';


export function* logoutSaga(action){
    yield localStorage.clear()
    yield put (actions.logoutSucceded())
    yield put (actions.resetOrders())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime);
    yield put (actions.logout())
    yield put (actions.resetOrders())
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    let url = '';
    if(action.isSignUp){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDIwz2M9OIlpVMYT1SXdhE6VGjBHBobsKQ';
    } else {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDIwz2M9OIlpVMYT1SXdhE6VGjBHBobsKQ'
    }
    const data = {
        email: action.email,
        password: action.password,
        returnSecureToken : true
    }
    try {
        const res = yield axios.post(url, data);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId, res.data.expiresIn));
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('userId', res.data.localId);
        yield localStorage.setItem('expiresIn', (new Date().getTime() + res.data.expiresIn * 1000));
        yield put(actions.checkAuthTimeout(res.data.expiresIn * 1000));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error.message));
    }
}

export function* autoAuthCheckSaga(action){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if(!token){
        yield put(actions.logout());
        return
    }
    const expirationTime = +localStorage.getItem('expiresIn');
    if(new Date().getTime() >= expirationTime) {
        yield put(actions.logout());
        return
    } else{
        const expIn = expirationTime - new Date().getTime();
        yield put(actions.authSuccess(token, userId, expIn));
        yield put(actions.checkAuthTimeout(expIn));
    }
}