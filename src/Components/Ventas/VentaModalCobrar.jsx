import { Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generarCompra } from '../../Redux/productosDucks';
import Modal from '../Modals/ModalForm';
export default function VentaModalCobrar({productos, close, vaciar}) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0)
    const [efectivo, setEfectivo] = useState(0)
    const enviarCompra = async(e) => {
        e.preventDefault();
        if(efectivo >= total){
            const state = await dispatch(generarCompra({ productos, total, efectivo }))
            if (state === true) {
                vaciar();
                close();
                alert("Compra completada");
            }
        }else{
            alert("Efectio insuficiente");
        }
        
    }
    
    useEffect(() => {
        const calcular = productos.map(e=>e.Cantidad * e.Costo);
        if (calcular.length > 1 ){
            setTotal(calcular.reduce((a,b)=>a+b));
        }else{
            setTotal(calcular[0])
        }
    }, [productos])
    
    return (
        <Modal open={true} title="Ventana de Cobro" submitfn={enviarCompra} mClose={close} >
            <Grid container direction={"row"} spacing={3}>
                <Grid item xs={12} justifyContent="center">
                    <Typography>Total a Pagar {total}</Typography>
                </Grid>
                <Grid item xs={6} justifyContent="center">
                    <Typography>Efectivo recibido</Typography>
                    <TextField
                    fullWidth
                    name='efectivo'
                    required
                    value={efectivo}
                    onChange={(e)=>{setEfectivo(e.target.value)}}/>
                </Grid>
                <Grid item xs={12} justifyContent="center">
                    <Typography>Cambio</Typography>
                    <Typography>
                        {((efectivo - total) < 0 ? (0).toFixed(2) :(efectivo - total).toFixed(2))}
                    </Typography>
                </Grid>
            </Grid>
        </Modal>
    )
}
