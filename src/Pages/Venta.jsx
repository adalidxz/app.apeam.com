import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { grey } from '@mui/material/colors'
import { AddCircleOutline } from '@mui/icons-material'
import VentasTablaCarrito from '../Components/Ventas/VentasTablaCarrito'
import { getProductoByCode } from '../Redux/productosDucks'
import { useDispatch } from 'react-redux'
import VentaModalCobrar from '../Components/Ventas/VentaModalCobrar'
export default function Productos() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({})
    const [openModalCobrar, setOpenModalCobrar] = useState(false);
    const [productos, setProductos] = useState([])
    const hanldeForm = (e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }

    const findProduct = async (e)=>{
        e.preventDefault();
        const producto = await dispatch(getProductoByCode(form.Codigo));
        if(!producto){
            alert(`Producto ${form.Codigo} no encontrado`);
        }else{
            const temp = [...new Set(productos)];
            if(temp.some(e=>e.Codigo === form.Codigo)){
                const index= temp.findIndex(e=>e.Codigo === form.Codigo);
                temp[index].Cantidad = parseInt(temp[index].Cantidad) + (parseInt(form.Cantidad) || 1);
                setProductos(temp)
                setForm({Cantidad: 1 })
            }else{
                temp.push({ ...producto, Cantidad: form.Cantidad || 1 });
                setProductos(temp)
                setForm({Cantidad:1})
            }
            
        }
    }
    const generarCompra = ()=>{
        setOpenModalCobrar(true);
    }
    return (
        <Container maxWidth="xl">
            <Box sx={{ background: "#233044", width: "100vw", zIndex: -1, left: 0, top: 50, height: 250, position: "fixed", color: grey[200] }} />
            <div>
                <Grid container direction="row" alignItems="center" alignContent="center" sx={{ paddingY: 5, color: grey[200] }}>
                    <Grid item>
                        <Typography sx={{ color: grey[200], fontSize: 24 }}>
                            Venta de productos
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', height: '60px', }}>
                        <Box sx={{ flexGrow: 1, p: 1, px: 3, minWidth: 250, background: "#FFFFFF", borderBottom: 1, borderRight: 1, borderColor: grey[300], borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                            <form onSubmit={findProduct}>
                                <Grid container direction={"row"} spacing={1}>
                                    <Grid item xs={3}>
                                        <TextField
                                            placeholder='Codigo de Producto'
                                            name='Codigo'
                                            size='small'
                                            fullWidth
                                            required
                                            value={form.Codigo || ''}
                                            onChange={hanldeForm}

                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TextField
                                            placeholder='Cantidad'
                                            name='Cantidad'
                                            size='small'
                                            fullWidth
                                            type={"number"}
                                            required
                                            inputProps={{min: 1}}
                                            value={form.Cantidad || 1}
                                            onChange={hanldeForm}

                                        />
                                    </Grid>

                                    <Grid item xs={2} container direction={"row"}>
                                        <Button sx={{mx:1}} type="submit" variant="contained" size="small" startIcon={<AddCircleOutline />}>
                                            Agregar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} container direction={"row-reverse"}>
                                        <Button sx={{ mx: 1 }} disabled={(productos.length > 0 ? false : true)} color="secondary" variant="contained" size="small" startIcon={<AddCircleOutline />} onClick={generarCompra}>
                                            COBRAR
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>
                    <Box sx={{ flexGrow: 1, p: 3, background: "#FFFFFF" }}>
                        <VentasTablaCarrito productos={productos}/>
                    </Box>
                </Grid>
                {
                    openModalCobrar && <VentaModalCobrar productos={productos} close={()=>{setOpenModalCobrar(false)}} vaciar={()=>{setProductos([])}}/>
                }
            </div>
        </Container>
    )
}
