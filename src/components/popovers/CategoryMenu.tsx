// src/components/CategoryMenu.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { 
    Menu, MenuItem, Typography, ListItemText, 
    ListItemIcon, Divider 
} from '@mui/material';

// ********** ICONS CHO DANH MỤC **********
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';     
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

interface Category {
    name: string;
    icon: React.ElementType;
    path: string; // Thêm trường path (đường dẫn)
}

interface CategoryMenuProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

// Dữ liệu giả định cho Menu Danh mục (ĐÃ CẬP NHẬT PATH)
const categories: Category[] = [
    { name: 'Ô tô điện', icon: DirectionsCarIcon, path: '/o-to-dien' }, // Link đến trang CategoryPage
    { name: 'Xe máy điện', icon: TwoWheelerIcon, path: '/xe-may-dien' }, 
    { name: 'Pin xe điện', icon: BatteryChargingFullIcon, path: '/pin-xe-dien' },
    // Thêm các danh mục khác nếu cần
];

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ open, anchorEl, handleClose }) => {
    const navigate = useNavigate(); // Khởi tạo hook điều hướng

    const handleCategoryClick = (path: string) => {
        handleClose(); // Đóng menu trước
        navigate(path); // Điều hướng đến path tương ứng
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // Neo Menu vào góc dưới bên trái của Menu Icon
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    sx: {
                        minWidth: 250,
                        borderRadius: '8px', 
                        mt: 0.5, 
                        // Tăng độ sâu (elevation) nếu cần để nổi bật hơn
                        elevation: 4, 
                    },
                },
            }}
        >
            {/* Tiêu đề "Danh mục" */}
            <MenuItem disabled>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                    Danh mục
                </Typography>
            </MenuItem>
            
            <Divider sx={{ my: 0.5 }} />

            {/* Các danh mục */}
            {categories.map((category) => (
                <MenuItem 
                    key={category.name} 
                    onClick={() => handleCategoryClick(category.path)} // Sử dụng hàm điều hướng
                    sx={{ py: 1.5 }} 
                >
                    <ListItemIcon>
                        <category.icon fontSize="medium" /> 
                    </ListItemIcon>
                    <ListItemText primary={category.name} primaryTypographyProps={{ fontSize: '1rem' }} />
                </MenuItem>
            ))}
        </Menu>
    );
};
