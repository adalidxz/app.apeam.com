import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { grey } from '@mui/material/colors'
import { AddCircleOutline } from '@mui/icons-material'
import EntradasTablaRegistro from '../Components/EntradasSalidad/EntradasTablaRegistro'
import EntradasModalRegistrarEntradas from '../Components/EntradasSalidad/EntradasModalRegistrarEntradas'
export default function Entradas() {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    

    return (
        <Container maxWidth="xl">
            <Box sx={{ background: "#233044", width: "100vw", zIndex: -1, left: 0, top: 50, height: 250, position: "fixed", color: grey[200] }} />
            <div>
                <Grid container direction="row" alignItems="center" alignContent="center" sx={{ paddingY: 5, color: grey[200] }}>
                    <Grid item>
                        <Typography sx={{ color: grey[200], fontSize: 24 }}>
                            Entradas de productos
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', height: '50px', }}>
                        <Box sx={{ flexGrow: 1, p: 1, px: 3, minWidth: 250, background: "#FFFFFF", borderBottom: 1, borderRight: 1, borderColor: grey[300], borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                            <Grid container direction={"row"} alignContent="space-between">
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ fontSize: 18 }}>
                                        Lista de movimientos en entradas de productos
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container direction={"row-reverse"}>
                                    <Button variant="contained" size="small" startIcon={<AddCircleOutline />} onClick={()=>{setOpenModalAdd(true)}}>
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>
                    <Box sx={{ flexGrow: 1, p: 3, background: "#FFFFFF" }}>
                        <EntradasTablaRegistro />
                    </Box>
                </Grid>

            </div>
            {
                (openModalAdd ? <EntradasModalRegistrarEntradas close={() => { setOpenModalAdd(false) }} /> : null)
            }
        </Container>
    )
}
