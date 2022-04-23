import axios from "axios";
import { setMenuFromLogin } from "./layoutDucks";
// constantes
const { REACT_APP_BACKEND } = process.env;
const dataInicial={
    usuario: {Nombre:"Adalid campos Hernandez", Puesto: "Ing. Sistemas", Correo: "adalid.xz@gmail.com"},
    token: localStorage.getItem("token") || null,
    sigin: {},
    logged: false,
}
const VALIDAR_LOGIN = "VALIDAR_LOGIN";
const USUARIO = "USUARIO";
const TOKEN = "TOKEN";
const LOGGED = "LOGGED";



// reducer
export default function loginReducer(state = dataInicial,  action){
    switch (action.type) {
        case VALIDAR_LOGIN:
            return { ...state, sigin: action.payload}
        case USUARIO:
            return { ...state, usuario: action.payload }
        case TOKEN:
            return { ...state, token: action.payload }
        case LOGGED:
            return { ...state, logged: action.payload }
        default:
            return state
    }
}

// acciones
const config = (tk)=>{
    return {
        headers:{
            Authorization: `Bearer ${tk}`
        }
    }
}
export const validarToken = (params)=> async(dispatch,getState)=>{
    const {token} = getState().login;
    const validated ={
        invalid:()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            dispatch({
                type: token,
                payload: null
            });
            dispatch({
                type: USUARIO,
                payload: {}
            });
            dispatch({
                type: LOGGED,
                payload: false
            });
        },
        valid: (data) => {
            dispatch({
                type: LOGGED,
                payload: data
            });
        }
    }




    try {
        const {data} = await axios.post(`${REACT_APP_BACKEND}/auth/verify`,null, config(token));
        if(data.state || data.status){
            validated.valid(data.state || data.status);
            return true;
        }else{
            validated.invalid();
            return false;
        }
    } catch (error) {
        if (typeof (error.response) ==="object"){
            if (error.response.status === 403){
                validated.invalid();
            }else{
                console.log(error.response);
            }
            return false;
        }else{
            console.log(error);
            return false;
        }
    }
    
    
}
export const signinAuth = (params) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/auth/singin/auth`, params);
        if (data.state === true) {
            dispatch({
                type: USUARIO,
                payload: data.user
            });
            dispatch({
                type: TOKEN,
                payload: data.token
            });
            dispatch({
                type: LOGGED,
                payload: true
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.user));
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.response);
        return false;
    }

}
export const signin = (params) => async (dispatch, getState) =>{
        try {
            const { data } = await axios.post(`${REACT_APP_BACKEND}/auth/singin/V2`,{...params, idApp: 24});

            if(data.state===true && data.menu.length > 0){
                dispatch({
                    type: TOKEN,
                    payload: data.token
                });
                dispatch({
                    type: USUARIO,
                    payload: data.user
                });
                dispatch({
                    type: LOGGED,
                    payload: true
                });
                dispatch(setMenuFromLogin(data.menu));
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.user));
                return {state: true};
            }else{
                return { state: false, menu: (data.menu ? data.menu.length : null) };
            } 
        } catch (error) {
            console.log(error);
            return false;
        }        
    
}
export const singOut = () => async (dispatch, getState) => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    dispatch({
        type: TOKEN,
        payload: null
    });
    dispatch({
        type: USUARIO,
        payload: {}
    });
    dispatch({
        type: LOGGED,
        payload: false
    })
}

