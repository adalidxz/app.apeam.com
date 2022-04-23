import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { Edit, North, South } from '@mui/icons-material';
import { getProducts } from '../../Redux/productosDucks';


export default function VentasTablaCarrito({ searching, productos}) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0)
    const [sortSelect, setSortSelect] = useState({ column: "idJob", order: true });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsFilter, setRowsFilter] = useState([]);


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
        const temp =  productos.map(e => { return e }).sort((a, b) => {
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


    const columns = [
        { id: 'id', label: labelHeader('id'), minWidth: 100 },
        { id: 'Codigo', label: labelHeader('Codigo'), minWidth: 150 },
        { id: 'Producto', label: labelHeader('Producto'), minWidth: 170 },
        { id: 'Descripcion', label: 'Descripcion', minWidth: 170, },
        { id: 'Cantidad', label: 'Cantidad', minWidth: 170, },
        { id: 'CU', label: 'CU', minWidth: 170, },
        { id: 'Costo', label: 'Costo', minWidth: 170, },
        { id: 'Options', label: 'Options', minWidth: 170, align: 'right', },
    ];
    const getButtonsOptions = (id) => {
        return (<><IconButton aria-label="delete" size="small" onClick={() => { alert("Editar producto") }}>
            <Edit fontSize="inherit" />
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((e,index) => {
                                    return {
                                        ...e,
                                        Options: getButtonsOptions(e.idOT),
                                        id: index+1,
                                        CU: e.Costo,
                                        Costo: e.Cantidad * e.Costo
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
