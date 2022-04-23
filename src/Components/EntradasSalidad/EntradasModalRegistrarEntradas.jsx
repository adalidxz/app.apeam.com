import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRegistroEntradas } from '../../Redux/entradasalidaDucks';
import { getProducts, getTipoEntradasSalidas, getTipoPagos, saveRegistroEntrada } from '../../Redux/productosDucks';
import Modal from '../Modals/ModalForm';

export default function EntradasModalRegistrarEntradas({ close }) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch();
    const [codigos, setCodigos] = useState({})
    const { productos, tipoPagos, tipoEntradas } = useSelector(state => state.productos)

    const hanldeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getTipoPagos())
        dispatch(getTipoEntradasSalidas())
    }, [dispatch])


    const findProducto = (e)=>{
        const find = productos.find(l => l.Codigo === e.target.value);
        (find ? setCodigos(find) : setCodigos({}))
    }
    const saveProducto = async (e) => {
        e.preventDefault();
        const state = await dispatch(saveRegistroEntrada({ ...form, idProducto: codigos.idProducto}))
        if (state === true) {
            close();
            dispatch(getRegistroEntradas())
        }
    }

    const getTotal = ()=>{
        if(form.Cantidad && form.Costo){
            return `$${form.Cantidad * form.Costo}`
        }else{
            return 0
        }
    }
    return (
        <Modal open={true} mClose={() => { close() }} title="Nuevo Producto" submitfn={saveProducto}>
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={6}>
                    <Typography>Codigo producto</Typography>
                    <TextField
                        name="Producto"
                        fullWidth
                        required
                        size='small'
                        onChange={findProducto}
                    />
                </Grid>
                <Grid item xs={6} container justifyContent={"center"}>
                    <Typography sx={{ fontSize: 24, color: green[500], pt:3 }}><b>{getTotal()}</b></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Nombre Producto</Typography>
                    <TextField
                        name="Descripcion"
                        fullWidth
                        size='small'
                        required
                        disabled={true}
                        sx={{background:grey[200]}}
                        value={codigos.Producto || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Proveedor</Typography>
                    <TextField
                        name="Proveedor"
                        fullWidth
                        size='small'
                        required
                        disabled={true}
                        sx={{background:grey[200]}}
                        value={codigos.RazonSocial || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Tipo Registro</Typography>
                    <TextField
                        name="idTipoEntradaSalida"
                        fullWidth
                        size='small'
                        required
                        value={form.idTipoEntradaSalida || ''}
                        select
                        onChange={hanldeForm}
                    >
                        {tipoEntradas.map(e => {
                            return <MenuItem key={e.idTipoEntradaSalida} value={e.idTipoEntradaSalida}>{e.Tipo}</MenuItem>
                        })}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Tipo de Pago</Typography>
                    <TextField
                        name="idTipoPago"
                        fullWidth
                        size='small'
                        required
                        value={form.idTipoPago || ''}
                        select
                        disabled={(form.idTipoEntradaSalida === 1 ? false : true)}
                        sx={{ background: (form.idTipoEntradaSalida === 1 ? null : grey[200])}}
                        onChange={hanldeForm}
                    >
                        {tipoPagos.map(e=>{
                            return <MenuItem key={e.idTipoPago} value={e.idTipoPago}>{e.TipoPago}</MenuItem>
                        })}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Cantidad</Typography>
                    <TextField
                        name="Cantidad"
                        fullWidth
                        required
                        size='small'
                        type={"number"}
                        value={form.Cantidad || ''}
                        onChange={hanldeForm}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Typography>Costo</Typography>
                    <TextField
                        name="Costo"
                        fullWidth
                        required
                        size='small'
                        disabled={(form.idTipoEntradaSalida === 1 ? false : true)}
                        sx={{ background: (form.idTipoEntradaSalida === 1 ? null  : grey[200]) }}
                        type={"number"}
                        value={form.Costo || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                
            </Grid>

        </Modal>
    )
}
