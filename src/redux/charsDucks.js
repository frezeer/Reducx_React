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
        case GET_CHARACTERS_SUCCES:    
            return { ...state, array: action.payload}
        case GET_CHARACTERS_ERROR:
        default:
            return state
    }
}

//actions(thunks)
export let getCharactersActions = () => (dispatch, getState) => {
    return axios.get(URL)
    .then(res => {
        dispatch({
            type: GET_CHARACTERS_SUCCES,
            payload: res.data.results
        })
    });
}



