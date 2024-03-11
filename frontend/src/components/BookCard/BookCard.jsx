import { Avatar, Box, Button, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function BookCard({ item }) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/book', { state: { item } })
    }
    return (
        <Stack gap={2} p={1} className='suggestioncard' justifyContent={'center'} sx={{
            width: '180px', borderRadius: ' 10px',
            border: ' 1px solid rgb(209, 204, 204)',
            cursor: 'pointer'
        }}>
            <Box className='upper' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Avatar className='profileimg' sx={{ width: 100, height: 100 }} />
            </Box>
            <Box className='info' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box className='name'>{item.name}</Box>
                <Box className='desc'> {item.author}</Box>
            </Box>
            <Box className='mutual' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>{item.gerne}</Box>

            {item.stock > 0 ? <Button variant="contained" sx={{ paddingY: '0px', borderRadius: '15px' }} onClick={handleButtonClick}> Borrow </Button>
                : <Button variant="contained" disabled sx={{ paddingY: '0px', borderRadius: '15px' }}>    Not available  </Button>}</Stack>
    )
}

export default BookCard