import * as actionTypes from '../actions/actionTypes'

const initialState = {
    users: [],
    loading: false,
    error: false
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case actionTypes.FETCH_USER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return{
                ...state,
                users: action.users,
                loading: false
            }
        case actionTypes.FETCH_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.ADD_USER:
            return{
                ...state,
                users: state.users.concat(action.user),
                error: false
            }
        case actionTypes.EDIT_USER:
            const userIndex = state.users.findIndex(u => u._id === action.user._id)
            const updatedUsers = [...state.users]
            updatedUsers[userIndex] = action.user
            return{
                ...state,
                users: updatedUsers.reverse(),
                error: false
            }
        case actionTypes.REMOVE_USER:
            return{
                ...state,
                users: state.users.filter( u => u._id !== action.user._id).reverse(),
                error: false
            }
        default:
            return state
    }
}

export default reducer