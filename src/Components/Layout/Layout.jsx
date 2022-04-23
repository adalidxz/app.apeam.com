import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Collapse, Grid, Icon, ListItemButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { singOut } from '../../Redux/loginDucks';
import { Link, Outlet } from 'react-router-dom';
import { grey} from '@mui/material/colors';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


const drawerWidth = 240;
const { REACT_APP_BACKEND } = process.env;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    background: "#233044",
    color: grey[200],
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
    background: "#233044",
    color: grey[200],
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = useState((localStorage.getItem("sidebaropen") === "true" ? true : false));
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { usuario } = useSelector(state => state.login);
    const { menu, filter } = useSelector(state => state.layout)

    const handleDrawerOpen = () => {
        setOpen(true);
        localStorage.setItem("sidebaropen", true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        localStorage.setItem("sidebaropen", false);
    };


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const getLetter = () => {
        if (usuario.Nombre) {
            const name = usuario.Nombre.split(" ");
            if (name.length > 1) {
                return name[0][0] + name[1][0]
            } else {
                return name[0][0];
            }
        } else {
            return "";
        }

    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const _singOut = () => {
        handleClose()
        dispatch(singOut());
    }

    const componentUser = (ishidden) => {
        return <IconButton
            onClick={handleMenu}
            disableRipple={true}
            sx={{ borderRadius: 3 }}
        >
            <Box sx={{ textAlign: "right", marginRight: "5px", display: { xs: 'none', sm: 'block' } }}>
                <Typography 
                variant="h6"
                style={{
                    color:grey[900],
                    fontSize:"0.9rem",
                    display: { xs: ishidden},
                    textAlign: "right"
                }}>
                    {usuario.Nombre}
                </Typography>
                <Typography 
                style={{
                    color: "#757575",
                    display: { xs: ishidden },
                    fontSize: "0.7rem",
                    textAlign:"right"
                }}>{usuario.Puesto}</Typography>
            </Box>
            <Avatar sx={{ width: 37, height: 37, background: "#546e7a", marginRight: 0 }} style={{ fontSize: "1.2rem" }}>{getLetter()}</Avatar>
        </IconButton>
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{background:grey[50]}}>
                <Toolbar>
                    <Grid item xs={8} md={6} container direction="row" justifyContent="flex-start">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                color: grey[800],
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={`${REACT_APP_BACKEND}/file/img/logo.png`}  width={150} alt="ziracom"/>
                    </Grid>
                    <Grid item xs={4} md={6} container direction="row" justifyContent="flex-end">
                        {componentUser(theme.breakpoints)}
                        <div>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                style={{
                                    position: "absolute",
                                    marginTop: -18,
                                }}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} style={{ padding: 0, paddingBottom: 3 }}>
                                    {componentUser()}
                                </MenuItem>
                                <Divider></Divider>
                                <MenuItem onClick={_singOut}>LogOut</MenuItem>
                            </Menu>
                        </div>
                    </Grid>
                    
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{color: grey[300]}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu.map((e, index) => (
                        <Tooltip key={index} title={(!open ? e.Title : "")} placement="right-start">
                        <div key={index} >
                                <ListItem 
                                sx={{ fontSize: '1rem', ':hover': { background:"#1E293A"},
                                    [theme.breakpoints.up('sm')]: {
                                        marginLeft: `0px`,
                                    }, }}
                                    button 
                                    key={index} 
                                    component={(!e.SubMenu ? Link : null)} to={e.Path}
                                >
                                
                                <ListItemIcon >
                                    <Icon sx={{ color: grey[300], fontSize: "1.3rem" }}>{e.Icon}</Icon>
                                </ListItemIcon>
                                <ListItemText secondary={
                                    <Typography variant="body2" sx={{fontSize:"0.8rem"}}>{e.Title}</Typography>
                                    }/>
                                {
                                    (e.SubMenu ? (Boolean(filter[e.Title]) ? <ExpandLess /> : <ExpandMore />) : null)
                                    
                                }
                                </ListItem>
                            
                            {
                                (e.SubMenu ?
                                    <Collapse key={`100`+index} in={Boolean(filter[e.Name])} timeout="auto" unmountOnExit>
                                        {
                                            e.SubMenu.map(r => {
                                                return <List component="div" key={r.Name} disablePadding>
                                                    <ListItemButton sx={{ pl: 9,height:35, ':hover': { background: "#1E293A" }}} component={Link} to={`${e.Path}/${r.Name}`}>
                                                        <ListItemText primary={
                                                            <Typography variant="body2" sx={{ fontSize: "0.8rem", color:grey[400] }}>{r.Name}</Typography>
                                                        } />
                                                    </ListItemButton>
                                                </List>
                                            })
                                        }
                                    </Collapse>
                                    : null)
                            }
                        </div>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {
                    <Outlet />
                }
            </Box>
        </Box>
    );
}
