import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard/BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeBooks } from '../../features/Book/Book.action';
import './Home.css'
function Home() {
    const dispatch = useDispatch();
    const [search, setsearch] = useState();
    const homebooks = useSelector((state) => state.book.homebooks)
    var data = {

    }
    const handleSearch = (e) => {
        e.preventDefault();
        data.search = search;
        dispatch(getHomeBooks({ search }))
    }
    useEffect(() => {

        dispatch(getHomeBooks({ search }))
    }, [search])
    return (
        <>
            <Stack my={4}>
                <Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Box sx={{ fontSize: '25px', fontWeight: '600' }}>All books</Box>
                    <Box component={'form'} onSubmit={() => handleSearch} className='search' >
                        <input type="text" placeholder='Search by book name or author or gerne' value={search} onChange={(e) => {
                            setsearch(e.target.value)
                        }} />
                    </Box>
                </Stack>
                <Box my={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    {homebooks?.map((item) => (<BookCard item={item} />))}
                </Box>
            </Stack>
        </>)
}

export default Home