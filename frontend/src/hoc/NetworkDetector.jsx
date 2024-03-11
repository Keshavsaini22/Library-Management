
import { Stack, Typography, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

function NetworkDetector({ children }) {
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    const handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      setIsDisconnected(condition === 'offline');
    };


    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      {isDisconnected ? (
        <Stack >
          <Box mt={'20%'} display={'flex'} flexDirection={'column'} gap={'15px'} alignItems={'center'} >
            <Typography color={'black'} fontSize={'24px'} >Something went wrong</Typography>
            <Typography color={'black'} fontSize={'16px'} >Refresh the page</Typography>
            <Button variant='outlined'
              sx={{
                textTransform: 'none', fontWeight: '500', fontSize: '16px', height: '32px',
                borderRadius: '80px', display: 'flex', p: '8px', mr: '8px', ":hover": { backgroundColor: '#E6F2FE', outline: { border: '2px solid ' } },
                outline: { border: '1px solid ' }
              }} onClick={handleReload} >
              Try again </Button>


          </Box>


        </Stack>
      ) : (children)}

    </div>
  );
}

export default NetworkDetector;