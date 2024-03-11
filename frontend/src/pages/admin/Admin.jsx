import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableAdmin from '../../components/TableAdmin/TableAdmin'
import AddIcon from '@mui/icons-material/Add';
import BookForm from '../../components/bookForm/BookForm';
import { useDispatch } from 'react-redux';
import { getBooks } from '../../features/Book/Book.action';
function Admin() {
    const dispatch = useDispatch();
    const [search, setsearch] = useState();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getBooks({ search }))
    }
    return (

        <Stack paddingTop={'30px'} alignItems={'center'}>
            <Stack direction={'row'} width={'100%'} justifyContent={'space-around'}>
                <Stack sx={{
                    fontSize: '16px', '&:hover': {
                        cursor: 'pointer'
                    }
                }} component={'button'} gap={1} onClick={handleClickOpen} direction={'row'} alignItems={'center'}>Add <AddIcon /></Stack>
                <Box component={'form'} onSubmit={() => handleSearch} className='search' >
                    <input type="text" placeholder='Search by book name or author or gerne' value={search} onChange={(e) => {
                        setsearch(e.target.value)
                    }} />
                </Box>
                <FormControl size='small' sx={{ width: '150px' }}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                    // onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <TableAdmin />
            <BookForm handleClose={handleClose} open={open} />
        </Stack>
    )
}

export default Admin