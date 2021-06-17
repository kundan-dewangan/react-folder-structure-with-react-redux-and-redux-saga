import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from '../actions';

const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    forgotUserMail: '',
    newPassword: '',
    resetPasswordCode: '',
    loading: false,
    error: '',
    companyBasicInfo: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '', };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.id, error: '', };
        case LOGIN_USER_ERROR:
            return { ...state, loading: false, user: '', error: action.payload.message };
        case LOGOUT_USER:
            return { ...state, user: null, error: '' };
        default: return { ...state };
    }
}
