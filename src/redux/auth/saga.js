import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    LOGOUT_USER,
} from '../actions';

import {
    loginUserSuccess,
    loginUserError,
} from './actions';



//login call
function* loginWithEmailPassword({ payload }) {
    const { email, password, code } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password, code);
        if (!loginUser.message) {
            localStorage.setItem('user_id', loginUser.id);
            yield put(loginUserSuccess(loginUser));
            history.push('/');
        } else {
            yield put(loginUserError(loginUser));
        }
    } catch (error) {
        yield put(loginUserError(error));

    }
}
const loginWithEmailPasswordAsync = (email, password, code) => //custom code feathers           
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
        .then(authUser => authUser)
        .catch(error => error);


//logout call
function* logout({ payload }) {
    const { history } = payload
    try {
        localStorage.removeItem('user_id');
        yield call(logoutFeather, history);
    } catch (error) {
        console.log("Logout Error From Saga:::", error)
    }
}
const logoutFeather = (history) => {
    history.push('/')
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}
export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}
export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
    ]);
}