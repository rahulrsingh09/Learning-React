import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, localId, expiresIn) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken : idToken,
        localId: localId,
        expiresIn: expiresIn
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return {
        type : actionTypes.AUTH_INITIATE,
        email : email,
        password: password,
        isSignUp: isSignUp
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type : actionTypes.CHECK_AUTH_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const logout = () => {
    return {
        type : actionTypes.LOGOUT
    }
}

export const logoutSucceded = () => {
    return {
        type :actionTypes.LOGOUT_SUCCEDED
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const autoAuthCheck = () => {
    return {
        type : actionTypes.AUTH_AUTO_CHECK
    }
}
