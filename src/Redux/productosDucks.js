import axios from "axios";
const { REACT_APP_BACKEND } = process.env;
// constantes
const dataInicial = {
    productos: [],
    tipoPagos:[],
    tipoEntradas:[],
}
const PRODUCTOS = "PRODUCTOS";
const TIPOPAGOS = "TIPOPAGOS";
const TIPOENTRADAS = "TIPOENTRADAS"


// reducer
export default function layoutReducer(state = dataInicial, action) {
    switch (action.type) {
        case PRODUCTOS:
            return { ...state, productos: action.payload }
        case TIPOPAGOS:
            return { ...state, tipoPagos: action.payload }
        case TIPOENTRADAS:
            return { ...state, tipoEntradas: action.payload }
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
export const deleteProducto = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.delete(`${REACT_APP_BACKEND}/productos/remove/${params}`);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const updateProducto = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.put(`${REACT_APP_BACKEND}/productos/update`, params);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const generarCompra = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/productos/venta/save`, params);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getProductoByCode = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/productos/byCode/${params}`);
        return data.producto;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getTipoEntradasSalidas = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/productos/tipoEntradas/list`);
        dispatch({
            type: TIPOENTRADAS,
            payload: data.tipoEntradas || []
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getTipoPagos = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/productos/tipopagos/list`);
        dispatch({
            type: TIPOPAGOS,
            payload: data.tipoPagos || []
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const saveRegistroEntrada = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/productos/entradas/save`, params);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const guardarProducto = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/productos/save`, params);
        return data.state;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getProducts = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/productos/list`);
        dispatch({
            type: PRODUCTOS,
            payload: data.productos || []
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}