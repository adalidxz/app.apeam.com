
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';


export default function ModalForm({ mClose, open, title, children, submitfn, size, btnSave, full, personal_buttons, container, sending }) {
    return (
        <div>
            <Dialog
                open={open}
                fullScreen={(full ? true : false)}
                onClose={mClose}
                fullWidth
                sx={{
                    marginTop: (full ? 0 : -10)
                }}
                maxWidth={size || "sm"}>
                <form autoComplete="off" id='modalSubmit' onSubmit={submitfn}>
                    <DialogTitle sx={{
                        background: "#233044",
                        color: grey[200],
                        paddingY: 1,
                        paddingX:1.5
                    }}>
                        {title}
                        {mClose ? (
                            <IconButton aria-label="close" onClick={mClose} style={{ float: "right", padding: 1 }}>
                                <Close sx={{ color: grey[200] }} />
                            </IconButton>
                        ) : null}
                    </DialogTitle>
                    <DialogContent sx={{
                        ...(!container && {
                            marginTop: 2,
                        }),
                        ...(container && {
                            padding: 0,
                        }),
                        
                    }}>
                        {children}
                    </DialogContent>

                    {
                        personal_buttons ?
                            null
                            :
                            <DialogActions>
                                <Button disabled={(sending ? sending : false)} onClick={mClose}>Cancel</Button>

                                <Button disabled={(sending ? sending : false)} type="submit" color="primary">Guardar {(sending ? <CircularProgress size={25} sx={{ color: grey[400], padding: 0, margin: 0, position:"absolute" }} />:null)}</Button>
                            </DialogActions>
                    }
                    
                </form>
            </Dialog>
        </div>
    )
}

