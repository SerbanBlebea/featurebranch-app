import * as type from './types'
import axios from 'axios'
import { fetchUser } from './index'


export const register = (firstName, lastName, email, phone, password)=> {
    return (dispatch)=> {
        dispatch(registerStart())
        let payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password
        }
        axios.post('user/signup', payload).then((result)=> {
            if(result.status === 200)
            {
                dispatch(registerSuccess(result.data.token, result.data.expire, result.data.user._id))
                dispatch(fetchUser(result.data.user._id, result.data.token))
            }
        }).catch((error)=> {
            if(error.response.status === 400)
            {
                dispatch(registerFail(error.response.data.errors))
            }
        })
    }
}

export const registerStart = ()=> {
    return {
        type: type.REGISTER_START
    }
}

export const registerSuccess = (token, expireIn, userId)=> {
    const expDate = new Date(new Date().getTime() + expireIn * 1000)
    localStorage.setItem('authToken', token)
    localStorage.setItem('expDate', expDate)
    localStorage.setItem('userId', userId)
    return {
        type: type.REGISTER_SUCCESS,
        token: token,
        expireIn: expireIn,
        userId: userId
    }
}

export const registerFail = (errors)=> {
    console.log('ERRORS', errors)
    return {
        type: type.REGISTER_FAIL,
        errors: {
            firstName: (errors.first_name !== undefined) ? errors.first_name.message : null,
            lastName: (errors.last_name !== undefined) ? errors.last_name.message : null,
            email: (errors.email !== undefined) ? errors.email.message : null,
            password: (errors.password !== undefined) ? errors.password.message : null
        }
    }
}
