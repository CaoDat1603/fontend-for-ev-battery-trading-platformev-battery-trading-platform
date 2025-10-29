// src/components/PostCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm hook điều hướng
import { 
    Box, Typography, Card, CardMedia, CardContent, 
    IconButton, Chip, Button
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import GavelIcon from '@mui/icons-material/Gavel'; 
import { useTheme } from '@mui/material/styles';

// --- Kiểu dữ liệu cho Tin đăng ---
export interface Post {
    id: string;
    title: string;
    price: string;
    location: string;
    details: string; // Năm sản xuất, số km, ...
    timeAgo: string; // VD: "29 giây trước"
    image: string;
    isFeatured: boolean; // Tin tiêu biểu
}

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const theme = useTheme();
    const navigate = useNavigate(); // Khởi tạo hook điều hướng

    // Xử lý sự kiện click vào Card để chuyển sang trang chi tiết
    const handleCardClick = () => {
        // Điều hướng đến trang chi tiết. Giả định URL là /tin-dang/id-cua-bai-viet
        navigate(`/tin-dang/${post.id}`);
        console.log(`View post ${post.id}`);
    };
    
    // Giả định hàm thêm/xóa khỏi mục yêu thích
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation(); // QUAN TRỌNG: Ngăn chặn click lan truyền lên Card
        console.log(`Toggle favorite for post ${post.id}`);
    };

    // Hàm giả định cho hành động Mua Ngay
    const handleBuyNow = (e: React.MouseEvent) => {
        e.stopPropagation(); // QUAN TRỌNG: Ngăn chặn click lan truyền lên Card
        console.log(`Tiến hành Mua Ngay xe: ${post.title}`);
    };

    // Hàm giả định cho hành động Đấu Giá
    const handleBid = (e: React.MouseEvent) => {
        e.stopPropagation(); // QUAN TRỌNG: Ngăn chặn click lan truyền lên Card
        console.log(`Bắt đầu Đấu Giá xe: ${post.title}`);
    };

    return (
        <Card 
            sx={{ 
                width: 240, 
                height: 420, // ĐIỀU CHỈNH: Giảm chiều cao tổng thể
                cursor: 'pointer', 
                position: 'relative',
                borderRadius: '8px',
                '&:hover': { boxShadow: 6 } 
            }}
            elevation={2}
            onClick={handleCardClick} // SỬA: Dùng hàm điều hướng mới
        >
            {/* 1. Phần Ảnh (Media) */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                />

                {/* Tag thời gian */}
                <Chip 
                    icon={<AccessTimeIcon sx={{ fontSize: '12px !important' }} />}
                    label={post.timeAgo}
                    size="small"
                    sx={{ 
                        position: 'absolute', 
                        bottom: 8, 
                        left: 8, 
                        bgcolor: 'rgba(0,0,0,0.6)', 
                        color: 'white', 
                        '.MuiChip-label': { px: 1, py: 0.2 },
                        '.MuiChip-icon': { color: 'white !important', ml: 0.5 },
                        height: 20
                    }}
                />
                
                {/* Tag Tin tiêu biểu */}
                {post.isFeatured && (
                    <Chip
                        label="Tin tiêu biểu"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: theme.palette.warning.main,
                            color: 'white',
                            fontWeight: 'bold',
                            height: 20
                        }}
                    />
                )}

                {/* Nút Favorite */}
                <IconButton
                    size="small"
                    onClick={handleToggleFavorite}
                    sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        bgcolor: 'rgba(255,255,255,0.8)',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <FavoriteBorderIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </IconButton>
            </Box>

            {/* 2. Phần Nội dung (Content) */}
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                
                {/* Giá */}
                <Typography 
                    variant="h6" 
                    color="error.main" 
                    fontWeight="bold" 
                    sx={{ mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {post.price}
                </Typography>

                {/* Tiêu đề (GIỚI HẠN 2 DÒNG) */}
                <Typography 
                    gutterBottom 
                    variant="subtitle1" 
                    component="div"
                    fontWeight={600}
                    sx={{ 
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // ĐIỀU CHỈNH: Tối đa 2 dòng
                        WebkitBoxOrient: 'vertical',
                        mb: 1,
                        // Chiều cao cố định cho 2 dòng để giữ bố cục
                        height: 60 
                    }}
                >
                    {post.title}
                </Typography>
                
                {/* Chi tiết (GIỚI HẠN 1 DÒNG) */}
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        mb: 1,
                        whiteSpace: 'nowrap', // ĐIỀU CHỈNH: Chỉ 1 dòng
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis'
                    }} 
                >
                    {post.details}
                </Typography>

                {/* Vị trí (GIỚI HẠN 1 DÒNG) */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'text.secondary', 
                    mb: 1,
                    // Giữ phần này trong 1 dòng
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                }}>
                    <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, flexShrink: 0 }} />
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                        }}
                    >
                        {post.location}
                    </Typography>
                </Box>

                {/* KHỐI 2 BUTTON (MUA NGAY & ĐẤU GIÁ) */}
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    {/* Nút MUA NGAY */}
                    <Button 
                        variant="contained" 
                        size="small" 
                        fullWidth 
                        startIcon={<StorefrontIcon />}
                        onClick={handleBuyNow}
                        sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'bold',
                            fontSize: 12,
                            px: 0.5,
                            py: 0.7,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': { bgcolor: theme.palette.primary.dark }
                        }}
                    >
                        Mua ngay
                    </Button>

                    {/* Nút ĐẤU GIÁ */}
                    <Button 
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        startIcon={<GavelIcon />}
                        onClick={handleBid}
                        sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'bold',
                            fontSize: 12,
                            px: 0.5,
                            py: 0.7,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark }
                        }}
                    >
                        Đấu giá
                    </Button>
                </Box>
                
            </CardContent>
        </Card>
    );
};
