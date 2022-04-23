import React, { useEffect, useState } from 'react'
import { Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { blue, cyan, green, grey, orange, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, North, South } from '@mui/icons-material';
import moment from 'moment';
import { getProducts } from '../../Redux/productosDucks';


export default function ProductosTabla({ searching }) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0)
    const [sortSelect, setSortSelect] = useState({ column: "idJob", order: true });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsFilter, setRowsFilter] = useState([]);
    const { productos } = useSelector(state => state.productos);

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);


    const labelHeader = (label) => {
        return (<Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{
            ":hover": {
                "button": {
                    display: "block"
                }
            },
            height: 40
        }}>
            <Typography variant="subtitle2" sx={{ paddingY: 1 }}>{label}</Typography>
            {
                sortSelect.column === label ?
                    <IconButton size="small" sx={{ display: "block" }} aria-label={`Sort ${label}`} onClick={() => { setSortSelect({ ...sortSelect, order: !sortSelect.order }) }}>
                        {
                            !sortSelect.order ?
                                <North fontSize="inherit" sx={{ color: (sortSelect.column === label ? grey[600] : grey[300]) }} />
                                :
                                <South fontSize="inherit" sx={{ color: (sortSelect.column === label ? grey[600] : grey[300]) }} />
                        }

                    </IconButton>
                    :
                    <IconButton size="small" sx={{ display: "none" }} aria-label={`Sort ${label}`} onClick={() => { setSortSelect({ ...sortSelect, column: label }) }}>
                        {
                            !sortSelect.order ?
                                <North fontSize="inherit" sx={{ color: (sortSelect.column === label ? grey[600] : grey[300]) }} />
                                :
                                <South fontSize="inherit" sx={{ color: (sortSelect.column === label ? grey[600] : grey[300]) }} />
                        }

                    </IconButton>
            }

        </Grid>)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        const temp = productos.map(e => { return e }).sort((a, b) => {
            if (typeof (a[sortSelect.column]) === "string") {
                if (a[sortSelect.column].toLowerCase() > b[sortSelect.column].toLowerCase()) {
                    return (sortSelect.order ? 1 : -1);
                }
                if (a[sortSelect.column].toLowerCase() < b[sortSelect.column].toLowerCase()) {
                    return (sortSelect.order ? -1 : 1);
                }
            } else {
                if (a[sortSelect.column] > b[sortSelect.column]) {
                    return (sortSelect.order ? 1 : -1);
                }
                if (a[sortSelect.column] < b[sortSelect.column]) {
                    return (sortSelect.order ? -1 : 1);
                }
            }
            return 0;
        })
        setRowsFilter(temp);
    }, [sortSelect, productos, searching])

    const getChipLabel = (idPrioridad, Prioridad) => {
        const colorsSX = [green[500], orange[500], red[500]];
        return <Chip size='small' sx={{ color: colorsSX[idPrioridad - 1], borderColor: colorsSX[idPrioridad - 1], paddingX: 2 }} label={Prioridad} variant="outlined" />
    }

    const getStatus = (info) => {

        const colorsSX = [grey[500], cyan[300], blue[400], green[800], red[400]];
        const labels = ["Solicitud Envida", "Aceptado/Asignado", "Completado/Revisión", "Completado/Finalizado"];
        const state = (info.FirmaSolicitante !== null ? 3 : (info.FirmaResponsable !== null ? 2 : (info.idResponsableOT !== null ? 1 : 0)));

        return <Chip size='small' sx={{ color: grey[50], background: colorsSX[state], padding: 0, fontSize: 12 }} label={labels[state]} variant="filled" />
    }


    const columns = [
        { id: 'idProducto', label: labelHeader('id'), minWidth: 100 },
        { id: 'Producto', label: labelHeader('Producto'), minWidth: 150 },
        { id: 'Descripcion', label: labelHeader('Descripcion'), minWidth: 170 },
        { id: 'Codigo', label: 'Codigo', minWidth: 170, },
        { id: 'Costo', label: 'Precio', minWidth: 170, },
        { id: 'Stock', label: 'Stock', minWidth: 170, },
        { id: 'Options', label: 'Options', minWidth: 170, align: 'right', },
    ];
    const getButtonsOptions = (idOT) => {
        return (<><IconButton aria-label="delete" size="small" onClick={() => { alert("Editar producto") }}>
            <Edit fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={() => { alert("Eliminar producto") }}>
            <Delete fontSize="inherit" />
            </IconButton></>)
    }

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ minHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
                                        sx={{
                                            minWidth: column.minWidth,
                                            padding: 0,
                                            paddingX: 2,
                                            backgroundColor: grey[200]
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsFilter
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(e => {
                                    return {
                                        ...e,
                                        Options: getButtonsOptions(e.idOT),
                                        Costo: dollarUS.format(e.Costo),
                                        Stock: e.Stock || 0
                                    }
                                })
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        sx={{ fontSize: '0.8rem', paddingY: 0.8 }}
                                                        key={column.id}
                                                        align={column.align}
                                                    >


                                                        {column.format && typeof (value) === 'number'
                                                            ? column.format(value)
                                                            : <div>{value}</div>}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rowsFilter.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}
