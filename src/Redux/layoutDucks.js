import axios from "axios";
const { REACT_APP_BACKEND } = process.env;
// constantes
const dataInicial = {
    menu: [
        { Icon: "inventory_2", Title: "Productos", Orden: 1, Path: "Productos" },
        { Icon: "fact_check", Title: "Entrada/Salidas", Orden: 1, Path: "Productos/Inventario" },
        { Icon: "shopping_cart", Title: "Ventas", Orden: 1, Path: "Productos/Ventas" },
        { Icon: "local_shipping", Title: "Proveedores", Orden: 1, Path: "Proveedores" },

    ],
    title: "",
}
const CHANGE_TITLE = "CHANGE_TITLE";
const MENU = "MENU";

// reducer
export default function layoutReducer(state = dataInicial, action) {
    switch (action.type) {
        case CHANGE_TITLE:
            return {...state,title: action.payload}
        case MENU:
            return {...state, menu: action.payload }
        default:
            return state
    }
}


const config = (tk) => {
    return {
        headers: {
            Authorization: `Bearer ${tk}`
        }
    }
}

export const getMenu = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/system/menu/24`, config(getState().login.token));
        dispatch({
            type: MENU,
            payload: data.menu || []
        })
        return data.menu;
    } catch (error) {
        console.log(error);
    }
}

export const setMenuFromLogin = (params)=>async(dispatch, getState)=>{
    dispatch({
        type: MENU,
        payload: params
    })
}
export const setTitle = (title) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    })
}