import * as type from './types'
import axios from 'axios'
import { storeUser, fetchUser } from './index'

export const login = (email, password)=> {
    return (dispatch)=> {
        dispatch(loginStart())
        let payload = { email, password }
        axios.post('user/login', payload).then((result)=> {
            dispatch(loginSuccess(result.data.token, result.data.expire, result.data.user._id))
            dispatch(authCheckTimeout(result.data.expire))
            dispatch(storeUser(result.data.user))
        }).catch((error)=> {
            dispatch(loginFail(error))
            console.log(error)
        })
    }
}

export const loginStart = ()=> {
    return {
        type: type.LOGIN_START
    }
}

export const loginSuccess = (token, expireIn, userId)=> {
    const expDate = new Date(new Date().getTime() + expireIn * 1000)
    localStorage.setItem('authToken', token)
    localStorage.setItem('expDate', expDate)
    localStorage.setItem('userId', userId)
    return {
        type: type.LOGIN_SUCCESS,
        token: token,
        expDate: expDate,
        userId: userId
    }
}

export const loginFail = (error)=> {
    return {
        type: type.LOGIN_FAIL,
        error: error
    }
}

export const logout = ()=> {
    localStorage.removeItem('authToken')
    localStorage.removeItem('expDate')
    localStorage.removeItem('userId')
    return {
        type: type.LOGOUT,
    }
}

export const authCheckTimeout = (expireIn)=> {
    return (dispatch)=> {
        setTimeout(()=> {
            dispatch(logout())
        }, expireIn * 1000)
    }
}

export const authCheckState = ()=> {
    return (dispatch)=> {
        let authToken = localStorage.getItem('authToken')
        if(!authToken)
        {
            dispatch(logout())
        } else {
            let expDate = new Date(localStorage.getItem('expDate'))
            let now = new Date()
            if(expDate > now)
            {
                let userId = localStorage.getItem('userId')
                let newExpDate = (expDate.getTime() - new Date().getTime()) / 1000

                dispatch(loginSuccess(authToken, newExpDate, userId))
                dispatch(authCheckTimeout(newExpDate))
                dispatch(fetchUser(userId, authToken))
            }
        }
    }
}
