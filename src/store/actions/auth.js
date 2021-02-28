import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authFail = () =>{
    return{
        type: actionTypes.AUTH_FAIL
    }
}

export const authSuccess = (token,user) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token,
        user
    }
}

export const checkAuthTimeout = () => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        },3600 * 1000)
    }
}
export const auth = (email,password) =>{
    return async dispatch => {
        dispatch(authStart())
        const authData = {email,password}
        try {
            const res = await axios.post('/users/login',authData)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userName',res.data.user.name)
            localStorage.setItem('idUser',res.data.user._id)
            dispatch(authSuccess(res.data.token,res.data.user))
            dispatch(checkAuthTimeout())
        } catch (error) {
            dispatch(authFail())
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('idUser')
    return{
        type: actionTypes.LOGOUT
    }
}
export const authCheckState = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const user = localStorage.getItem('userName')
            dispatch(authSuccess(token,user))
            dispatch(checkAuthTimeout())
        }
    }
} 