import { Close } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';


export default function ModalConfirm({ mClose, open, title, children, submitfn, personal_buttons, topBarColor, buttonLoading}) {
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={mClose}
                aria-labelledby="max-width-dialog-title"
                sx={{ 
                    alignItems: 'baseline',
                    marginTop: '5vh'
                 }}>
                <form autoComplete="off"  onSubmit={submitfn}>
                    <DialogTitle id="max-width-dialog-title" onClose={mClose} sx={{ padding: 1, color:grey[200], ...(topBarColor ? { background: topBarColor } : { background:"#233044"}) }}>
                        {title}
                        {mClose ? (
                            <IconButton aria-label="close" onClick={mClose} style={{ float: "right", padding: 0 }}>
                                <Close sx={{color: grey[200]}}/>
                            </IconButton>
                        ) : null}
                    </DialogTitle>
                    <DialogContent dividers>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        {
                            personal_buttons ?
                                null
                                :
                                <>
                                    <Button onClick={mClose} disabled={(buttonLoading === true ? true : false)}>Cancel</Button>
                                    <Button type="submit" color="primary" disabled={(buttonLoading === true ? true : false)}>
                                        Aceptar
                                        {
                                            (buttonLoading === true ? <CircularProgress size={16} sx={{ position: "absolute", color: grey[600]}}/> : null)
                                        }    
                                    </Button>
                                </>
                        }

                    </DialogActions>
                </form>
            </Dialog>

        </div>
    )
}

