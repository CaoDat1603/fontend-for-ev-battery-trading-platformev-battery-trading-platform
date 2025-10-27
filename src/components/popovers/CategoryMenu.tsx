//*******************************************//
//  COMPONENT MENU DANH MỤC SẢN PHẨM  //
//******************************************//

import React from 'react';
import { 
    Menu, MenuItem, Typography, ListItemText, 
    ListItemIcon, Divider 
} from '@mui/material';

// ********** ICONS CHO DANH MỤC **********
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';     
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

interface CategoryMenuProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

// Dữ liệu giả định cho Menu Danh mục
const categories = [
    { name: 'Ô tô', icon: DirectionsCarIcon },
    { name: 'Xe máy', icon: TwoWheelerIcon },
    { name: 'Pin xe', icon: BatteryChargingFullIcon },
    // Thêm các danh mục khác nếu cần
];

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ open, anchorEl, handleClose }) => {
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
                    // Ở đây bạn sẽ thêm logic điều hướng (ví dụ: router.push('/danh-muc/' + category.name))
                    onClick={handleClose} 
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