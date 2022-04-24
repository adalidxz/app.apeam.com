import { Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux'
import { deleteProducto, getProducts } from '../../Redux/productosDucks';
import Modal from '../Modals/ModalConfirm'

export default function ProductosModalDelete({id, close}) {
    const dispatch = useDispatch();

    const eliminarProducto = async()=>{
        const state = await dispatch(deleteProducto(id));
        if(state === true){
            dispatch(getProducts())
            close();
        }
    }

  return (
    <Modal open={true} title="Eliminar producto" submitfn={eliminarProducto} topBarColor={red[800]} mClose={close}>
        <Grid container direction={"row"} spacing={3}>
            <Grid item xs={12}>
                  <Typography sx={{ fontSize: 24 }}><b>Deseas eliminar este producto?</b></Typography>
            </Grid>
              <Grid item xs={12}>
                  <Typography variant='subtitle1'>Una vez eliminado, ya no se podrá recuperar la información</Typography>
              </Grid>
        </Grid>
    </Modal>
  )
}
