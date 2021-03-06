import * as actionTypes from '../actions/actionTypes'

const initialState ={
    loading: false,
    token: null,
    user: null,
    error: false
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                user: action.user,
                loading: false,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading:false,
                error: true
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                token: null,
                user: null,
                error: false
            }
        default:
            return state
    }
}

export default reducer