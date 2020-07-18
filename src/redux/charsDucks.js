import axios from "axios";

//constants
let initialData = {
    fetching: false,
    array: [],
    current: {}
};

let URL = "https://rickandmortyapi.com/api/character"

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCES = "GET_CHARACTERS_SUCCES"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
let REMOVE_CHARACTER = "REMOVE_CHARACTERS"
//reducer

export default function reducer(state=initialData, action){
    switch(action.type){
        case REMOVE_CHARACTER:
        return {...state, array: action.payload }
        case GET_CHARACTERS:
            return { ...state, fetching: true }
        case GET_CHARACTERS_SUCCES:   
            return { ...state, array: action.payload, fetching: false}
        case GET_CHARACTERS_ERROR:
             return { ...state, fetching: false , error:action.payload }
        default:
            return state
    }
}

//actions(thunks)

export let removeCharacterActions = () => (dispatch,getState) => {
    //?
    let {array} = getState().characters
    array.shift()
    dispatch({
        type: REMOVE_CHARACTER,
        payload: {...array}
    })
}

export let getCharactersActions = () => (dispatch, getState) => {
    dispatch({
        type: GET_CHARACTERS
    })
    return axios.get(URL)
    .then(res => {
        dispatch({
            type: GET_CHARACTERS_SUCCES,
            payload: res.data.results
        })
    })
    .catch(err=>{
        dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
        })
    })
}



