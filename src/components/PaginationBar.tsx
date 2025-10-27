import React from 'react';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) => {
    const theme = useTheme();
    const visiblePages = 9; // Giống với ảnh 4
    const pageNumbers = [];

    // Logic tính toán các nút trang hiển thị (center around currentPage)
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Custom style cho nút phân trang
    const pageButtonSx = (page: number) => ({
        minWidth: '40px',
        height: '40px',
        borderRadius: '50%',
        mx: 0.5,
        backgroundColor: page === currentPage ? theme.palette.warning.main : theme.palette.grey[100],
        color: page === currentPage ? theme.palette.common.white : theme.palette.text.primary,
        fontWeight: page === currentPage ? 'bold' : 'normal',
        '&:hover': {
            backgroundColor: page === currentPage ? theme.palette.warning.dark : theme.palette.grey[200],
        },
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 2 }}>
            
            {/* Nút Previous */}
            <IconButton 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                sx={pageButtonSx(0)} // Dùng style cơ bản
            >
                <KeyboardArrowLeftIcon />
            </IconButton>

            {/* Các nút số trang */}
            {pageNumbers.map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    sx={pageButtonSx(page)}
                    variant="contained"
                    disableElevation
                >
                    {page}
                </Button>
            ))}

            {/* Nút Next */}
            <IconButton 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                sx={pageButtonSx(0)} // Dùng style cơ bản
            >
                <KeyboardArrowRightIcon />
            </IconButton>
        </Box>
    );
};