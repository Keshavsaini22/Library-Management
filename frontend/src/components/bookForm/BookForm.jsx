import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch, useSelector } from 'react-redux'
import { createBook } from '../../features/Book/Book.action';


function BookForm({ handleClose, open }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [image, setimage] = useState();
    const [genre, setgenre] = useState();
    const [author, setauthor] = useState();
    const [stock, setstock] = useState();
    const [name, setname] = useState();
    const [price, setprice] = useState();
    const dispatch = useDispatch();
    return (

        <Dialog PaperProps={{
            component: 'form', onSubmit: (e) => {
                e.preventDefault();
                console.log('hello', image, genre, author, stock, name, price)
                const formdata = new FormData();
                formdata.append('gerne', genre);
                formdata.append('author', author);
                formdata.append('stock', stock);
                formdata.append('name', name);
                formdata.append('price', price);
                formdata.append('image', image);
                dispatch(createBook(formdata))
                setauthor(null);
                setimage(null);
                setname(null);
                setstock(null);
                setgenre(null);
                setprice(null)
                handleClose();
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
                    <Stack direction="row" spacing={4}>
                        <Button sx={{ paddingRight: '40px' }} component="label"> Add image<AddPhotoAlternateIcon className="media-icons" icon="fa-solid fa-image" uppertext="Add media" />
                            <input onChange={(e) => (setimage(e.target.files?.[0]))} required
                                type="file" multiple name="images" accept="image/png, image/jpg, image/jpeg"
                                hidden />
                        </Button> {image && <Box>Image added</Box>}

                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions >
                <Box className="post" component={"button"} type='submit'>Post</Box>
            </DialogActions>
        </Dialog>
    )
}

export default BookForm