
import { put    } from 'redux-saga/effects';
import axios from '../../axios.instance';
import * as actions from '../actions';


export function* initIngredientsSaga(){
    yield localStorage.clear()
    yield put (actions.logoutSucceded())
    yield put (actions.resetOrders())
    try{
        const response = yield axios.get('ingredients.json');
        yield put(actions.setIngredients(response.data));        
    } catch (error) {
        yield put(actions.errorLoadingIngredients(error));    
    }
}