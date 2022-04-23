import axios from "axios";
const { REACT_APP_BACKEND } = process.env;
// constantes
const dataInicial = {
    entradas: [],
}
const ENTRADAS = "ENTRADAS";


// reducer
export default function layoutReducer(state = dataInicial, action) {
    switch (action.type) {
        case ENTRADAS:
            return { ...state, entradas: action.payload }
        default:
            return state
    }
}




// const config = (tk) => {
//     return {
//         headers: {
//             Authorization: `Bearer ${tk}`
//         }
//     }
// }
// export const guardarProducto = (params) => async (dispatch, getState) => {
//     try {
//         const { data } = await axios.post(`${REACT_APP_BACKEND}/productos/save`, params);
//         return data.state;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }
export const getRegistroEntradas = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/productos/entradas/registro`);
        dispatch({
            type: ENTRADAS,
            payload: data.entradas || []
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}