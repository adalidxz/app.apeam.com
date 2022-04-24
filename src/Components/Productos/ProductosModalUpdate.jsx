import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateProducto } from '../../Redux/productosDucks';
import { getListProveedores } from '../../Redux/proveedoresDucks';
import Modal from '../Modals/ModalForm';

export default function ProductosModalUpdate({ close, producto, id }) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch();
    const { proveedores } = useSelector(state => state.proveedores)

    console.log(producto);
    const hanldeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        dispatch(getListProveedores())
        setForm({...producto});
    }, [dispatch, producto])

    const saveProducto = async (e) => {
        e.preventDefault();
        const state = await dispatch(updateProducto(form))
        if (state === true) {
            close();
            dispatch(getProducts())
        }
    }
    return (
        <Modal open={true} mClose={() => { close() }} title="Nuevo Producto" submitfn={saveProducto}>
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Nombre Producto</Typography>
                    <TextField
                        name="Producto"
                        fullWidth
                        required
                        size='small'

                        value={form.Producto || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Descripción del producto</Typography>
                    <TextField
                        name="Descripcion"
                        fullWidth
                        size='small'
                        required

                        value={form.Descripcion || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Proveedor</Typography>
                    <TextField
                        name="idProveedor"
                        fullWidth
                        required
                        select
                        size='small'
                        value={form.idProveedor || ''}
                        onChange={hanldeForm}
                    >
                        {proveedores.map((e) => (
                            <MenuItem key={e.idProveedor} value={e.idProveedor}>
                                {e.RazonSocial}
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>
                <Grid item xs={6}>
                    <Typography>Código</Typography>
                    <TextField
                        name="Codigo"
                        fullWidth
                        required
                        size='small'

                        value={form.Codigo || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Precio</Typography>
                    <TextField
                        name="Costo"
                        fullWidth
                        required
                        size='small'
                        type={"number"}
                        value={form.Costo || ''}
                        onChange={hanldeForm}
                    />
                </Grid>

            </Grid>

        </Modal>
    )
}
