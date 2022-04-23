import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { grey } from '@mui/material/colors'
import ProductosTabla from '../Components/Productos/ProductosTabla'
import { AddCircleOutline } from '@mui/icons-material'
import ProductosModalAdd from '../Components/Productos/ProductosModalAdd'
export default function Productos() {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const newProduct = ()=>{
        setOpenModalAdd(true);
    }

  return (
      <Container maxWidth={"xl"}>
          <Box sx={{ background: "#233044", width: "100vw", zIndex: -1, left: 0, top: 50, height: 250, position: "fixed", color: grey[200] }} />
          <div>
              <Grid container direction="row" alignItems="center" alignContent="center" sx={{ paddingY: 5, color: grey[200] }}>
                  <Grid item>
                      <Typography sx={{ color: grey[200], fontSize: 24 }}>
                          Productos 
                      </Typography>
                  </Grid>
              </Grid>
              <Grid item xs={12}>
                  <Box sx={{ display: 'flex', height: '50px', }}>
                      <Box sx={{ flexGrow: 1, p: 1, px: 3, minWidth: 250, background: "#FFFFFF", borderBottom: 1, borderRight: 1, borderColor: grey[300], borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                          <Grid container direction={"row"} alignContent="space-between">
                              <Grid item xs={6}>
                                  <Typography variant="caption" sx={{ fontSize: 18 }}>
                                      Lista de productos registrados
                                  </Typography>
                              </Grid>
                              <Grid item xs={6} container direction={"row-reverse"}>
                                  <Button variant="contained" size="small" startIcon={<AddCircleOutline />} onClick={newProduct}>
                                      Agregar
                                  </Button>
                              </Grid>
                          </Grid>
                      </Box>
                  </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>
                  <Box sx={{ flexGrow: 1, p: 3, background: "#FFFFFF" }}>
                      <ProductosTabla />
                  </Box>
              </Grid>
              
          </div>
            {
                (openModalAdd  ? <ProductosModalAdd close={()=>{setOpenModalAdd(false)}}/> : null )
            }
      </Container>
  )
}
