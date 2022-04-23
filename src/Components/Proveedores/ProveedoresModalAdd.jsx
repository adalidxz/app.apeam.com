import { Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getListProveedores, saveProveedor } from '../../Redux/proveedoresDucks';
import Modal from '../Modals/ModalForm';

export default function ProveedoresModalAdd({ close }) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch();
    const hanldeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const saveProducto = async (e) => {
        e.preventDefault();
        const state = await dispatch(saveProveedor(form))
        console.log(state);
        if (state === true) {
            close();
            dispatch(getListProveedores())
        }
    }
    return (
        <Modal open={true} mClose={() => { close() }} title="Nuevo Proveedor" submitfn={saveProducto}>
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Razón Social</Typography>
                    <TextField
                        name="RazonSocial"
                        fullWidth
                        required
                        size='small'
                        value={form.RazonSocial || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Direccion</Typography>
                    <TextField
                        name="Direccion"
                        fullWidth
                        size='small'
                        required

                        value={form.Direccion || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography>RFC</Typography>
                    <TextField
                        name="RFC"
                        fullWidth
                        size='small'
                        required

                        value={form.RFC || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Actividad</Typography>
                    <TextField
                        name="Actividad"
                        fullWidth
                        required
                        size='small'

                        value={form.Actividad || ''}
                        onChange={hanldeForm}
                    />
                </Grid>
            </Grid>

        </Modal>
    )
}
