import * as type from './actions/types'
import * as functions from './functions'

const initState = {
    auth: {
        token: null,
        expDate: null,
        userId: null
    },
    login: {
        error: null
    },
    register: {
        errors: {
            firstName: null,
            lastName: null,
            email: null,
            password: null
        }
    },
    isLoading: false,
    user: {
        firstName: null,
        lastName: null,
        phone: null,
        email: null
    }
}


const reducer = (state = initState, action)=> {
    switch(action.type)
    {
        case type.LOGIN_START: return functions.loginStart(state, action)

        case type.LOGOUT: return functions.logout(state, action)

        case type.LOGIN_SUCCESS: return functions.loginSuccess(state, action)

        case type.LOGIN_FAIL: return functions.loginFail(state, action)

        case type.AUTH_CHECK_TIMEOUT: return functions.authCheckTimeout(state, action)

        case type.REGISTER_START: return functions.registerStart(state, action)

        case type.REGISTER_SUCCESS: return functions.registerSuccess(state, action)

        case type.REGISTER_FAIL: return functions.registerFail(state, action)

        case type.STORE_USER: return functions.storeUser(state, action)

        default:
            return state
    }
}

export default reducer
