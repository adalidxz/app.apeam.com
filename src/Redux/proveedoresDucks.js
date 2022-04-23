import axios from "axios";
const { REACT_APP_BACKEND } = process.env;
// constantes
const dataInicial = {
    proveedores: [],
}
const PROVEEDORES = "PROVEEDORES";


// reducer
export default function layoutReducer(state = dataInicial, action) {
    switch (action.type) {
        case PROVEEDORES:
            return { ...state, proveedores: action.payload }
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
export const saveProveedor = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/proveedores/save`, params);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getListProveedores = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/proveedores/list`);
        dispatch({
            type: PROVEEDORES,
            payload: data.proveedores || []
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}