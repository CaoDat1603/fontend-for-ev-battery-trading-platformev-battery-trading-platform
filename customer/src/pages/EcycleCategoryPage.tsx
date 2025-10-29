import React, { useState } from 'react';
import { 
    Box, Typography, Container, 
    Button, Chip, IconButton, useTheme,
    Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';

// Imports component mới và đã có
import { PostCard, type Post } from '../components/PostCard'; 
import { PaginationBar } from '../components/PaginationBar'; 
// KHÔNG CÒN IMPORT ProductCategories NỮA

// --- Dữ liệu giả định (Giữ nguyên) ---
const mockPosts: Post[] = [
    // Tạo 10 tin đăng để test phân trang
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
    { id: 'p6', title: 'Xe 6', price: '600.000.000 ₫', location: 'Q.6', details: 'Chi tiết', timeAgo: '6 phút trước', image: 'https://placehold.co/220x180/9c27b0/white?text=Xe+6', isFeatured: false },
    { id: 'p7', title: 'Xe 7', price: '700.000.000 ₫', location: 'Q.7', details: 'Chi tiết', timeAgo: '7 phút trước', image: 'https://placehold.co/220x180/673ab7/white?text=Xe+7', isFeatured: false },
    { id: 'p8', title: 'Xe 8', price: '800.000.000 ₫', location: 'Q.8', details: 'Chi tiết', timeAgo: '8 phút trước', image: 'https://placehold.co/220x180/f44336/white?text=Xe+8', isFeatured: false },
    { id: 'p9', title: 'Xe 9', price: '900.000.000 ₫', location: 'Q.9', details: 'Chi tiết', timeAgo: '9 phút trước', image: 'https://placehold.co/220x180/03a9f4/white?text=Xe+9', isFeatured: false },
    { id: 'p10', title: 'Xe 10', price: '1.000.000.000 ₫', location: 'Q.10', details: 'Chi tiết', timeAgo: '10 phút trước', image: 'https://placehold.co/220x180/4caf50/white?text=Xe+10', isFeatured: false },
];

const mockBrands = [
    { name: 'VinFast', icon: '/assets/vinfast_logo.png' },
    { name: 'Hyundai', icon: '/assets/hyundai_logo.png' },
    { name: 'Mercedes-Benz', icon: '/assets/mercedes_logo.png' },
];
const mockLocations = ['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bình Dương'];
// --- Dữ liệu chi tiết cho Sidebar ---
const mockPriceRanges = [
    'Giá dưới 200 triệu', 'Giá 200 triệu - 300 triệu', 
    'Giá 300 triệu - 400 triệu', 'Giá 400 triệu - 500 triệu',
    'Giá 500 triệu - 600 triệu', 'Giá trên 600 triệu' // Thêm để kích hoạt "Xem thêm"
];
const mockSeating = ['2 chỗ', '4 chỗ', '5 chỗ', '6 chỗ', '7 chỗ', '8 chỗ']; // Thêm để kích hoạt "Xem thêm"
const mockBodyTypes = ['Sedan', 'SUV/Cross over', 'Hatchback', 'Pick-up (bán tải)', 'Coupe', 'Convertible']; // Thêm
const mockMajorCities = [
    'Tp Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 
    'Hải Phòng', 'Bình Định', 'Bình Phước', 'Bình Thuận', 
    'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên' // Thêm nhiều hơn 4 để test "Xem thêm"
];


// --- Component Lọc Phụ (Sidebar) ĐƯỢC CẬP NHẬT ---
interface FilterSectionProps {
    title: string;
    items: string[];
    isInitiallyOpen?: boolean;
    initialDisplayLimit?: number; // Mới: Giới hạn số mục hiển thị ban đầu
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
    title, 
    items, 
    isInitiallyOpen = true,
    initialDisplayLimit = 4 // Mặc định hiển thị 4 mục
}) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen);
    const [showAll, setShowAll] = useState(false); // Mới: Trạng thái hiển thị tất cả hay giới hạn

    const displayedItems = showAll ? items : items.slice(0, initialDisplayLimit);
    const hasMoreItems = items.length > initialDisplayLimit;

    const handleToggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Box 
                onClick={() => setIsOpen(!isOpen)} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    mb: 1
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Box>
            
            {/* Nội dung lọc */}
            {isOpen && (
                <Box>
                    {displayedItems.map((item, index) => (
                        <Button 
                            key={index} 
                            fullWidth 
                            variant="text" 
                            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 0.5, color: 'text.primary' }}
                        >
                            {item}
                        </Button>
                    ))}
                    
                    {/* Nút Xem thêm / Thu gọn */}
                    {hasMoreItems && (
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ textAlign: 'center', mt: 1, cursor: 'pointer' }}
                            onClick={handleToggleShowAll}
                        >
                            {showAll ? 'Thu gọn ▲' : 'Xem thêm ▾'} 
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};


export const EcycleCategoryPage: React.FC = () => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 9; 
    const totalPosts = 85; 
    const totalPages = Math.ceil(totalPosts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            console.log(`Chuyển đến trang: ${page}`);
        }
    };

    // ***************************************************************
    // KHỐI LỌC CHÍNH (renderFilterBox - Giữ nguyên)
    // ***************************************************************
    const renderFilterBox = () => (
        <Box sx={{ 
            bgcolor: 'white', 
            borderRadius: 2, 
            boxShadow: 1, 
            p: 3, 
            border: '1px solid #eee', 
            mb: 3 
        }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
                Chọn Tác giả / Xe Điện
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                39.389 xe điện cũ mới giá tốt nhất 27/10/2025
            </Typography>

            {/* HÀNG LỌC CHÍNH (Chips) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                <Chip 
                    label="Lọc" 
                    sx={{ bgcolor: theme.palette.primary.main, color: 'white', fontWeight: 'bold' }}
                />
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Giá
                </Button>
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Năm sản xuất
                </Button>
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Hãng xe
                </Button>
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Tình trạng
                </Button>
                <Button 
                    variant="text" 
                    sx={{ color: theme.palette.text.secondary, textTransform: 'none', ml: 'auto' }}
                >
                    Xóa lọc
                </Button>
            </Box>

            {/* LỌC THEO KHU VỰC VÀ ĐỊA ĐIỂM */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', borderTop: '1px solid #eee', pt: 2 }}>
                <Typography variant="body2" fontWeight="medium">Khu vực:</Typography>
                {mockLocations.map((loc, index) => (
                    <Button 
                        key={index}
                        variant="contained" 
                        size="small"
                        sx={{ 
                            textTransform: 'none', 
                            borderRadius: 2,
                            bgcolor: theme.palette.grey[100],
                            color: theme.palette.text.primary,
                            fontWeight: 'normal',
                            '&:hover': { bgcolor: theme.palette.grey[200] }
                        }}
                    >
                        {loc}
                    </Button>
                ))}
                <Button 
                    variant="text" 
                    size="small"
                    startIcon={<LocationOnIcon />}
                    sx={{ 
                        textTransform: 'none', 
                        fontWeight: 'bold', 
                        color: theme.palette.primary.main 
                    }}
                >
                    Gần tôi
                </Button>
            </Box>

            {/* LỌC THEO HÃNG XE (BRAND LOGOS) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', mt: 3, px: 3 }}>
                {mockBrands.map((brand, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Box
                            component="img"
                            src={brand.icon}
                            alt={brand.name}
                            sx={{ width: 40, height: 40, objectFit: 'contain', mb: 0.5 }}
                        />
                        <Typography variant="caption" color="text.primary">{brand.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );


    return (
        <Box sx={{ flexGrow: 1, pb: 4, bgcolor: '#f5f5f5' }}>
            
            <Container maxWidth="lg" sx={{ pt: 3 }}>
                
                {/* Breadcrumb và Tiêu đề */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        Trang chủ
                    </Box> 
                    / Xe điện
                </Typography>
                
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                    39.389 xe điện cũ mới giá tốt nhất 27/10/2025
                </Typography>

                {/* HIỂN THỊ KHỐI LỌC CHÍNH */}
                {renderFilterBox()}


                {/* DANH SÁCH SẢN PHẨM VÀ SIDEBAR LỌC CHI TIẾT */}
                <Box 
                    sx={{ 
                        bgcolor: 'white', 
                        borderRadius: 2, 
                        boxShadow: 1, 
                        p: 2, 
                        border: '1px solid #eee' 
                    }}
                >
                    
                    {/* Hàng Sắp xếp và Chế độ xem */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontWeight="bold" sx={{ mr: 2 }}>Tất cả</Typography>
                            <Typography color="text.secondary">Sắp xếp:</Typography>
                            <Button 
                                variant="text" 
                                endIcon={<KeyboardArrowDownIcon />}
                                sx={{ textTransform: 'none', fontWeight: 'bold', color: theme.palette.text.primary }}
                                onClick={() => alert('Mở menu Sắp xếp')}
                            >
                                Tin mới nhất
                            </Button>
                        </Box>
                        <IconButton size="small" sx={{ borderRadius: 2 }}>
                            <GridViewIcon />
                        </IconButton>
                    </Box>

                    {/* VÙNG CHỨA CỘT CHÍNH (75%) VÀ CỘT PHỤ (25%) */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        
                        {/* CỘT CHÍNH: Danh sách sản phẩm (75%) */}
                        <Box sx={{ 
                            width: { xs: '100%', md: '75%' }, 
                            pr: { xs: 0, md: 2 } 
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                            }}>
                                {mockPosts.map((post) => (
                                    <Box
                                        key={post.id}
                                        sx={{
                                            width: { xs: '100%', sm: '50%', md: '33.333%' }, 
                                            pb: 2, 
                                            display: 'flex', 
                                            justifyContent: 'center' 
                                        }}
                                    >
                                        <PostCard post={post} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* CỘT PHỤ: Sidebar Lọc (25%) */}
                        <Box sx={{ 
                            width: { xs: '100%', md: '25%' }, 
                            display: { xs: 'none', md: 'block' },
                            pl: { xs: 0, md: 2 } 
                        }}>
                            <Box sx={{ p: 0, position: 'sticky', top: 80 }}>
                                
                                {/* Lọc theo Khu vực (Mua bán ô tô) */}
                                <FilterSection 
                                    title="Mua bán ô tô" 
                                    items={mockMajorCities} 
                                />
                                <Divider sx={{ mb: 2 }} />

                                {/* Lọc theo Số chỗ */}
                                <FilterSection 
                                    title="Lọc theo số chỗ" 
                                    items={mockSeating} 
                                />
                                <Divider sx={{ mb: 2 }} />

                                {/* Lọc theo Khoảng giá */}
                                <FilterSection 
                                    title="Lọc theo khoảng giá" 
                                    items={mockPriceRanges} 
                                />
                                <Divider sx={{ mb: 2 }} />
                                
                                {/* Lọc theo Kiểu dáng */}
                                <FilterSection 
                                    title="Lọc theo kiểu dáng" 
                                    items={mockBodyTypes} 
                                    isInitiallyOpen={false} 
                                />

                            </Box>
                        </Box>

                    </Box>
                </Box>
                
                {/* PHÂN TRANG */}
                <PaginationBar 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </Container>
        </Box>
    );
};