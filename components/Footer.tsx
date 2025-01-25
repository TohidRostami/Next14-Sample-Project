import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    color: "white",
                    height: "100px",
                    width: "100%",
                    position: "sticky",
                    bottom: 0,
                }}
            >
                
                <Typography>© 2025 All rights reserved to Tohid Rt.</Typography>
            </Box>
        </Box>
    );
};

export default Footer;