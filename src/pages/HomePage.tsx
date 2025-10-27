// src/pages/HomePage.tsx

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

// --- Imports từ các component con ---
import { ProductCategories } from '../components/ProductCategories';
import { PostCard, type Post } from '../components/PostCard'; 

import WelcomBaner from '../assets/welcome_banner.png';

// --- DỮ LIỆU GIẢ ĐỊNH (SẢN PHẨM ĐIỆN) ---
const mockPosts: Post[] = [
    {
        id: 'p1',
        title: 'VinFast VF e34 2022 - Pin thuê',
        price: '590.000.000 ₫',
        location: 'Quận 1, TP.HCM',
        details: '2022. 15.000 km. Ô tô điện',
        timeAgo: '29 giây trước',
        image: 'https://placehold.co/220x180/007bff/white?text=VF+e34', 
        isFeatured: false,
    },
    {
        id: 'p2',
        title: 'Pin Lithium 48V-30Ah cho xe máy điện',
        price: '5.500.000 ₫',
        location: 'Thành Phố Thủ Đức',
        details: 'Tin tiêu biểu', 
        timeAgo: 'Tin tiêu biểu', 
        image: 'https://placehold.co/220x180/00b551/white?text=Pin+48V', 
        isFeatured: true,
    },
    {
        id: 'p3',
        title: 'Xe máy điện YADEA G5 mới 99%',
        price: '16.500.000 ₫',
        location: 'Quận Phú Nhuận',
        details: '2023. 500 km. Xe máy điện',
        timeAgo: '34 giây trước',
        image: 'https://placehold.co/220x180/ff9800/white?text=YADEA+G5', 
        isFeatured: false,
    },
    {
        id: 'p4',
        title: 'Xe điện Xmen 50cc không cần bằng lái',
        price: '8.500.000 ₫',
        location: 'Thành Phố Thủ Đức',
        details: '2021. 2 năm sử dụng. Xe máy điện',
        timeAgo: '54 giây trước',
        image: 'https://placehold.co/220x180/9c27b0/white?text=Xmen+EV',
        isFeatured: false,
    },
    {
        id: 'p5',
        title: 'Bộ sạc nhanh 22kW cho xe ô tô điện',
        price: '18.900.000 ₫',
        location: 'Quận Thanh Xuân',
        details: 'Mới 100%. Phụ kiện. Sạc',
        timeAgo: '1 phút trước',
        image: 'https://placehold.co/220x180/795548/white?text=Sac+22kW',
        isFeatured: false,
    },
];


export const HomePage: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, pb: 4 }}>
            <Box
                component="img"
                src={WelcomBaner} // Đường dẫn tới ảnh banner của bạn
                alt="Chào mừng đến với Nền tảng xe điện"
                sx={{
                    width: '100%',
                    height: { xs: 150, sm: 200, md: 450 }, // Chiều cao responsive
                    objectFit: 'cover', // Đảm bảo ảnh luôn cover hết Box
                }}
            />

            <Container maxWidth="lg" sx={{ mt: 3 }}>
                
                {/* 1. Hàng Icon Danh mục Sản phẩm */}
                <Box 
                    sx={{ 
                        mb: 4, 
                        bgcolor: 'white', // Nền trắng
                        borderRadius: 2, // Bo góc (8px)
                        boxShadow: 1, // Đổ bóng nhẹ
                        mt: 0, 
                        border: '1px solid #eee' // Thêm viền nhẹ
                    }}
                >
                    <ProductCategories />
                </Box>

                
                {/* 2. KHỐI LỚN BAO GỒM DANH SÁCH VÀ NÚT XEM THÊM */}
                <Box 
                    sx={{ 
                        bgcolor: 'white', 
                        borderRadius: 2, 
                        boxShadow: 1, 
                        p: 2, // Padding bên trong khung (áp dụng cho toàn bộ khối)
                        border: '1px solid #eee' 
                    }}
                >
                    
                    {/* Tiêu đề Danh sách */}
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        Tin đăng mới nhất
                    </Typography>

                    {/* Danh sách Sản phẩm (Flex Container) */}
                    <Box 
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap', 
                            mx: -1, 
                        }}
                    >
                        {mockPosts.map((post) => (
                            <Box
                                key={post.id}
                                sx={{
                                    width: { xs: '100%', sm: '50%', md: '33.333%', lg: '20%' },
                                    px: 1, 
                                    pb: 2, 
                                    display: 'flex', 
                                    justifyContent: 'center' 
                                }}
                            >
                                <PostCard post={post} />
                            </Box>
                        ))}
                    </Box>

                    {/* Nút Xem thêm (Đã gộp vào khối lớn) */}
                    <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 'bold',
                                py: 1, px: 4, 
                                borderRadius: '8px' 
                            }}
                            onClick={() => console.log('Xem thêm tin đăng')}
                        >
                            Xem thêm 71.991 tin đăng
                        </Button>
                    </Box>

                </Box>

            </Container>
        </Box>
    );
};