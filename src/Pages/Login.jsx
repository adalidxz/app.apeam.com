import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Avatar, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logo from '../Img/logoF.png';
import { blue, grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { signin } from '../Redux/loginDucks';
import { Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Login() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [fail, setFail] = useState(false);


    const handleClickShowPassword = () => {
        setShowpassword(!showpassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validarlogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const {state, menu} = await dispatch(signin(form));
        if (state===false){
            setLoading(false);
            if(menu===0){
                setMessage(true);
                setFail(false);
            }else{
                
                setMessage(false);
                setFail(true);
            }
            
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', background:"#233044", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <Card sx={{
                    overflow:"visible",
                    width:500,
                    [theme.breakpoints.down('sm')]: {
                        width:"100%",
                        height:"100vh",
                        paddingY:"0px" 
                    }
                }}>
                    <CardContent sx={{padding:0}}>
                        <form onSubmit={validarlogin}>
                            <Box sx={{ background: "#0088cc", height: 5, padding:0 }}></Box>
                            <Grid container justifyContent="center" alignItems="center" >
                                <Avatar alt="logo large" src={logo} sx={{
                                    zIndex: theme=>theme.zIndex.drawer +3,
                                    border: "5px solid #0088cc !important",
                                    width: 150,
                                    height: 150,
                                    marginTop: -11,
                                    marginBottom: 3,
                                    [theme.breakpoints.down('sm')]: {
                                        marginTop:11
                                    }
                                }}/>
                            </Grid>
                            <Grid container spacing={3} justifyContent="center" >
                                <Grid item md={10} xs={11} sx={{paddingY:0}}>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            name="email"
                                            key="email"
                                            placeholder="Email / Username"
                                            value={form.email || ''}
                                            autoComplete="off"
                                            onChange={handleChange}
                                            required
                                            sx={{
                                                fontSize:"1rem",
                                                color:grey[700],
                                                borderRadius: 15,
                                                paddingX:1.5,
                                            }}
                                            error={fail || false}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Person />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={10} xs={11}>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            type={showpassword ? 'text' : 'password'}
                                            name="password"
                                            key="password"
                                            placeholder="Password"
                                            value={form.password || ''}
                                            onChange={handleChange}
                                            required
                                            sx={{
                                                fontSize: "1rem",
                                                color: grey[700],
                                                borderRadius: 15,
                                                paddingX: 1.5,
                                            }}
                                            error={fail || false}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        style={{ margin: 0, padding: 0 }}
                                                    >
                                                        {showpassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item container md={10} xs={12} direction="row" justifyContent="center" sx={{
                                    margin: theme=> theme.spacing(1),
                                    position: 'relative',
                                }} style={{ marginBottom: 20, padding: 7 }}>
                                    <div sx={{
                                        margin: theme => theme.spacing(1),
                                        position: 'relative',
                                    }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                borderRadius:15,
                                                width:200,
                                                height:40,
                                                background: blue[600],
                                                margin: 'auto',
                                                fontSize: 16,
                                                marginTop: 1,
                                                [theme.breakpoints.down('sm')]: {
                                                    marginTop:3,
                                                    padding:3,
                                                    fontSize:"1.2rem" 
                                                },
                                                "&.Mui-disabled":{
                                                    background: blue[100],
                                                    color: grey[100]
                                                }
                                            }}
                                            type="submit"
                                            disabled={loading}
                                        //onClick={handleButtonClick}
                                        >
                                            Login
                                        </Button>{loading && <CircularProgress size={24} sx={{
                                            color: blue[500],
                                            position: 'absolute',
                                            top: '55%',
                                            left: '50%',
                                            marginTop: -1.5,
                                            marginLeft: -1.5,
                                        }} />}

                                    </div>
                                </Grid>
                                <Grid container direction={"row"} justifyContent="center" >
                                    <Grid item xs={10} >
                                        {
                                            (message ? 
                                                <Paper sx={{ background: blue[50], padding:1, marginY:0 }} >
                                                    <Typography variant='body2' sx={{fontSize:14, color: blue[500], textAlign:"center"}} >
                                                        No cuentas con <b>accesos</b>, ponte en contacto con el administrador del sistema.
                                                    </Typography>
                                                    
                                                </Paper>
                                                 
                                                : 
                                                null)
                                        }
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

            </Backdrop>
        </div>
    )
}
