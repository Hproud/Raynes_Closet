import { csrfFetch } from "./csrf";

//? variables
const CREATE_SUGG = 'suggestions/makeOne'
const ALL_SUGGESTIONS = 'suggestions/all'
//& actions

const OneSuggestion = (suggestion) =>({
    type: CREATE_SUGG,
    suggestion
})

const allSuggestions= (suggestions) =>({
    type: ALL_SUGGESTIONS,
    suggestions
})

//! thunks

export const makeSuggestion = (suggestion) => async (dispatch) =>{
const res = await csrfFetch('/api/suggestions',{
    method:'POST',
    body: JSON.stringify({suggestion: suggestion})
});

if (res.ok){
    const newSugg = await res.json()
    dispatch(OneSuggestion(newSugg))

}
}


export const checkSuggestions = ()=> async (dispatch) =>{
const res = await csrfFetch('/api/suggestions')

if(res.ok){
    const suggestions = await res.json()
    dispatch(allSuggestions(suggestions))

}

}

export const findOneSug = (id) => async (dispatch) =>{
const res = await csrfFetch(`/api/suggestions/${id}`)

if(res.ok){
    const sugg = await res.json()
    dispatch(OneSuggestion(sugg))
    // return sugg
}else{
    return
}

}


export const editSugg = (id,suggestion) => async (dispatch) =>{
    const edit = await csrfFetch(`/api/suggestions/${id}`,{
        method: 'PUT',
        body: JSON.stringify({suggestion: suggestion})
    });

    if(edit.ok){
        const edited = await edit.json()
        dispatch(OneSuggestion(edited))
        // return edited
    }
}

export const removeSugg = (id) => async (dispatch) =>{
    const res = await csrfFetch(`/api/suggestions/${id}`,{
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(checkSuggestions())
    }
}

//^ reducer

const suggestionReducer = (state = {},action) =>{
    switch(action.type){
        case CREATE_SUGG:
            return {...state, suggestion: action.suggestion}

        case ALL_SUGGESTIONS:
            return {...state, suggestions: action.suggestions}

        default:
            return state
    }
}

export default suggestionReducer;
