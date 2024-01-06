import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
export default function FacebookCircularProgress(props) {
    return (
        <Box sx={{ position: 'relative' }}>
        <CircularProgress
            variant="determinate"
            sx={{
            color: (theme) =>
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={100}
            thickness={2}
            {...props}
            value={100}
        />
        <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'gray' : 'white'),
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
            },
            }}
            size={100}
            thickness={2}
            {...props}
        />
        </Box>
    );
}