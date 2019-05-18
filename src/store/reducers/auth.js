import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken : null,
    localId: null,
    expiresIn : null,
    loading: false,
    error : null,
    authRedirectPath : '/'
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.AUTH_START :{
            return { ...state, loading: true, error: null }
        }
        case actionTypes.AUTH_SUCCESS :{
            return {
               ...state,
               idToken: action.idToken,
               localId: action.localId,
               expiresIn: action.expiresIn,
               loading: false
            }
        }
        case actionTypes.AUTH_FAIL :{
            return { ...state, loading: false, error : action.error }
        }
        case actionTypes.LOGOUT_SUCCEDED :{
            return { ...initialState }
        }
        case actionTypes.SET_AUTH_REDIRECT_PATH :{
            return { ...state, authRedirectPath : action.path }
        }
        default: return state
    }
}

export default reducer;