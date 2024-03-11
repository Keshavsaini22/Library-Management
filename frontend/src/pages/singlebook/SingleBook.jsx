import React from 'react'
import { Avatar, Box, Button, Stack } from '@mui/material'
import { useLocation } from 'react-router-dom';
import './SingleBook.css'
function SingleBook() {
    const location = useLocation();
    const { state } = location;
    const item = state.item
    return (
        <Stack direction={'row'} m={5} gap={5}>
            <div className='image'>
                <img src={`http://localhost:8080/${item.image}`} alt="Book Image" />
            </div>
            <Stack gap={3}>
                <Stack direction={'row'}>
                    <Box>Name :</Box>
                    <Box>{item.name}</Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box>Author :</Box>
                    <Box>{item.author}</Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box>Gerne :</Box>
                    <Box>{item.gerne}</Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box>Price :</Box>
                    <Box>{item.price}</Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box>Stock Available :</Box>
                    <Box>{item.stock}</Box>
                </Stack>
                {item?.stock > 0 ? <Button variant="contained" sx={{ paddingY: '0px', borderRadius: '15px' }} > Borrow </Button>
                    : <Button variant="contained" disabled sx={{ paddingY: '0px', borderRadius: '15px' }}>    Not available  </Button>}
            </Stack>
        </Stack >
    )
}

export default SingleBook