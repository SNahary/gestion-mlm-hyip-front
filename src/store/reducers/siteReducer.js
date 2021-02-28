import * as actionTypes from '../actions/actionTypes'

const initialState = {
    sites: [],
    loading: false,
    error: false,
    saveError: null
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case actionTypes.FETCH_SITE_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_SITE_SUCCESS:
            return{
                ...state,
                sites: action.sites,
                loading: false
            }
        case actionTypes.FETCH_SITE_FAIL:
            return{
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.SAVE_SITE_FAIL:
            return{
                ...state,
                saveError: action.error
            }
        case actionTypes.ADD_SITE:
            return{
                ...state,
                sites: state.sites.concat(action.site)
            }
        case actionTypes.EDIT_SITE:
            const siteIndex = state.sites.findIndex(u => u._id === action.site._id)
            const updatedSites = [...state.sites]
            updatedSites[siteIndex] = action.site
            return{
                ...state,
                sites: updatedSites.reverse()
            }
        case actionTypes.REMOVE_SITE:
            return{
                ...state,
                sites: state.sites.filter( u => u._id !== action.site._id).reverse()
            }
        default:
            return state
    }
}

export default reducer