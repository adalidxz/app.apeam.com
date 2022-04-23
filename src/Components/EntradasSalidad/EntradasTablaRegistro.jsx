import React, { useEffect, useState } from 'react'
import { Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { green, grey, orange, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, North, South } from '@mui/icons-material';
import moment from 'moment';
import { getRegistroEntradas } from '../../Redux/entradasalidaDucks';


export default function EntradasTablaRegistro({ searching }) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0)
    const [sortSelect, setSortSelect] = useState({ column: "idJob", order: true });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsFilter, setRowsFilter] = useState([]);
    const { entradas } = useSelector(state => state.entradasalidad);

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    useEffect(() => {
        dispatch(getRegistroEntradas());
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
        const temp = entradas.map(e => { return e }).sort((a, b) => {
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
    }, [sortSelect, entradas, searching])


    const columns = [
        { id: 'idEntrada', label: '#', minWidth: 100 },
        { id: 'tipoRegistro', label: 'TipoRegistro', minWidth: 100 },
        { id: 'Fecha', label: 'Fecha', minWidth: 150 },
        { id: 'RazonSocial', label: 'Proveedor', minWidth: 170 },
        { id: 'TipoPago', label: 'Tipo de Pago', minWidth: 170, },
        { id: 'Producto', label: 'Producto', minWidth: 170, },
        { id: 'Costo', label: 'Costo', minWidth: 170, },
        { id: 'Cantidad', label: 'Cantidad', minWidth: 170, },
        { id: 'Total', label: 'Total', minWidth: 170, },
    ];
    const getTipoRegistro = (id, tipo)=>{
        const colorsSX = [green[500], red[500], orange[500]];
        return <Chip size='small' sx={{ color: colorsSX[id-1], borderColor: colorsSX[id-1], paddingX: 2 }} label={tipo} variant="outlined" />
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
                                            py:1,
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
                                        Fecha: moment(e.Fecha).format("Y/MM/DD"),
                                        Total: dollarUS.format(e.Cantidad * e.Costo),
                                        Costo: dollarUS.format(e.Costo),
                                        tipoRegistro: getTipoRegistro(e.idTipoEntrada, e.Tipo)
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
