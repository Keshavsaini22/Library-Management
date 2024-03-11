import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TableHead, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { deleteBook, getBooks, updateBook } from '../../features/Book/Book.action';
import { useEffect } from 'react';


function TableAdmin() {
    const allbooks = useSelector((state) => state.book.allbooks)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(getBooks(1))
    }, [])
    const [bookId, setBookId] = useState()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [image, setimage] = React.useState();
    const [genre, setgenre] = useState();
    const [author, setauthor] = useState();
    const [stock, setstock] = useState();
    const [name, setname] = useState();
    const [price, setprice] = useState();
    const dispatch = useDispatch();
    return (

        <>
            <Paper sx={{ width: '90vw', overflow: 'hidden', marginY: '30px' }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableCell >
                                Name
                            </TableCell>
                            <TableCell >
                                Author
                            </TableCell>
                            <TableCell >
                                Genre
                            </TableCell>
                            <TableCell >
                                Edit
                            </TableCell>
                            <TableCell >
                                Delete
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {allbooks
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell >
                                                {row.name}
                                            </TableCell>
                                            <TableCell >
                                                {row.author}
                                            </TableCell>
                                            <TableCell >
                                                {row.gerne}
                                            </TableCell>
                                            <TableCell >
                                                <IconButton onClick={() => {
                                                    handleClickOpen();
                                                    setauthor(row.author);
                                                    setimage(row.image);
                                                    setname(row.name);
                                                    setstock(row.stock);
                                                    setgenre(row.gerne);
                                                    setprice(row.price);
                                                    setBookId(row._id);
                                                }}><EditIcon /></IconButton>
                                            </TableCell>
                                            <TableCell >
                                                <IconButton onClick={() => dispatch(deleteBook(row._id))}><DeleteIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 4, 10]}
                    component="div"
                    count={allbooks?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog PaperProps={{
                component: 'form', onSubmit: async (e) => {
                    e.preventDefault();

                    const input = {
                        data: {
                            gerne: genre,
                            author: author,
                            name: name,
                            price: price,
                            stock: stock
                        },
                        id: bookId
                    }
                    try {
                        const res = await dispatch(updateBook(input))
                        if (res) {
                            dispatch(getBooks(1))
                        }
                    }
                    catch (e) {
                        if (e)
                            alert(e.message)
                    }
                    handleClose();
                    setauthor(null);
                    setimage(null);
                    setname(null);
                    setstock(null);
                    setgenre(null);
                    setprice(null);

                }
            }}
                fullScreen={fullScreen} fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='dialogtop'>
                    <Box className="modaltitlee">
                        Book Information
                    </Box>
                    <IconButton className='closeicon'
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent className='dialogbody' >
                    <Stack gap={2}>
                        <TextField required value={name} onChange={(e) => setname(e.target.value)} id="standard-basic" label="Name" variant="standard" fullWidth />
                        <TextField required value={author} onChange={(e) => setauthor(e.target.value)} id="standard-basic" label="Author" variant="standard" fullWidth />
                        <TextField type='number' required value={stock} onChange={(e) => setstock(e.target.value)} id="standard-basic" label="Stocks" variant="standard" fullWidth />
                        <TextField type='number' required value={price} onChange={(e) => setprice(e.target.value)} id="standard-basic" label="Price" variant="standard" fullWidth />
                        <FormControl sx={{ my: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Genre</InputLabel>
                            <Select required
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={genre}
                                label="Age"
                                onChange={(e) => { setgenre(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em>Choose the genre</em>
                                </MenuItem>
                                <MenuItem value={'History'}>History</MenuItem>
                                <MenuItem value={'Hindi'}>Hindi</MenuItem>
                                <MenuItem value={'English'}>English</MenuItem>
                                <MenuItem value={'Geography'}>Geography</MenuItem>
                                <MenuItem value={'Maths'}>Maths</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>
                </DialogContent>

                <DialogActions >
                    <Box className="post" component={"button"} type='submit' >Post</Box>
                </DialogActions>
            </Dialog>
        </>


    )
}

export default TableAdmin