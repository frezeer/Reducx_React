import axios from "axios";

//constants
let initialData = {
    fetching: false,
    array: [],
    current: {}
};

let URL = "https://rickandmortyapi.com/api/character"

let GET_CHARACTERS = "GET_CARACTERS"
let GET_CHARACTERS_SUCCES = "GET_CARACTERS_SUCCES"
let GET_CHARACTERS_ERROR = "GET_CARACTERS_ERROR"

//reducer

export default function reducer(state=initialData, action){
    switch(action.type){
        case GET_CHARACTERS:
            return { ...state, fetching: true }
        case GET_CHARACTERS_SUCCES:   
            return { ...state, fetching: false , error:action.payload }
        case GET_CHARACTERS_ERROR:
            return { ...state, array: action.payload, fetching: false}
        default:
            return state
    }
}

//actions(thunks)
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



