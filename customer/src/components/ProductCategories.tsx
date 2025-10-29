// src/components/ProductCategories.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Thêm hook điều hướng

// Import hình ảnh từ assets (Giả định rằng các path này hợp lệ)
// Lưu ý: Trong môi trường thực tế, cần đảm bảo các đường dẫn này được import đúng
import Car from '../assets/car_icon.png'; 
import Scooter from '../assets/scooter_icon.png';
import Battery from '../assets/battery_icon.png';

// --- Kiểu dữ liệu Danh mục ---
interface Category {
    id: string;
    name: string;
    image: string; 
    slug: string; // Sử dụng slug làm đường dẫn
}

// CẬP NHẬT: Đảm bảo slugs khớp với Routes trong App.tsx
const mockCategories: Category[] = [
    { id: 'c1', name: 'Ô tô điện', image: Car, slug: '/car-ecycle' },
    { id: 'c2', name: 'Xe máy điện', image: Scooter, slug: '/scooter-ecyclen' },
    { id: 'c3', name: 'Pin xe điện', image: Battery, slug: '/battery-ecycle' },
];

// --- Custom Styled Component cho mỗi Item ---
const CategoryItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    cursor: 'pointer', // Quan trọng để chỉ rõ đây là element tương tác
    minWidth: 100, // Thay đổi minWidth nhỏ hơn để căn giữa đẹp hơn
    transition: 'transform 0.2s', // Thêm hiệu ứng chuyển động nhẹ
    '&:hover': {
        // Hiệu ứng hover cho Box item
        backgroundColor: theme.palette.action.hover,
        borderRadius: theme.shape.borderRadius,
        transform: 'scale(1.05)', // Hiệu ứng phóng to khi hover
    },
}));

// --- Component Chính ---
export const ProductCategories: React.FC = () => {
    const navigate = useNavigate(); // Khởi tạo hook điều hướng

    const handleCategoryClick = (slug: string) => {
        // Chuyển hướng đến đường dẫn tương ứng
        navigate(slug);
        console.log(`Đã điều hướng đến: ${slug}`);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-around',
                gap: 1, 
                mx: 3,
                py: 1 
            }}
        >
            {mockCategories.map((category) => (
                <CategoryItem 
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)} // Gắn sự kiện onClick
                >
                    {/* Thay thế Icon bằng thẻ Image */}
                    <Box 
                        component="img" // Sử dụng Box làm thẻ <img>
                        src={category.image} 
                        alt={category.name}
                        sx={{
                            width: 120, // Giảm kích thước ảnh xuống 80x80 để tổng thể gọn hơn
                            height: 120,
                            objectFit: 'contain',
                            mb: 0.5
                        }}
                    />
                    <Typography 
                        variant="caption" 
                        color="text.primary" 
                        fontWeight={800}
                    >
                        {category.name}
                    </Typography>
                </CategoryItem>
            ))}
        </Box>
    );
};
