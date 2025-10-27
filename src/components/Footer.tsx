import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Link as MuiLink, 
    IconButton, 
    Divider 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import hình ảnh từ assets
import MyLogo from '../assets/my-logo.jpg'; 
import Gif from '../assets/my-gfi.png';

// Icons cho Liên kết mạng xã hội
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

// --- Dữ liệu Cột Footer ---
const footerData = [
    {
        title: 'Hỗ trợ khách hàng',
        links: ['Trung tâm trợ giúp', 'An toàn mua bán', 'Liên hệ hỗ trợ'],
    },
    {
        title: 'Về Ecycle',
        links: ['Giới thiệu', 'Quy chế hoạt động sàn', 'Chính sách bảo mật', 'Giải quyết tranh chấp', 'Tuyển dụng', 'Truyền thông', 'Blog'],
    },
];

/**
 * Hàm tiện ích để xác định chiều rộng đáp ứng cho Box, mô phỏng hành vi của Grid.
 * Sử dụng Flexbox để tạo bố cục cột.
 */
const getResponsiveWidth = (xs: number, sm: number, md: number) => ({
    width: {
        xs: `${(xs / 12) * 100}%`,
        sm: `${(sm / 12) * 100}%`,
        md: `${(md / 12) * 100}%`,
    },
    // Áp dụng padding mô phỏng spacing={4} (tương đương 32px / 2 = 16px)
    px: { xs: 2, sm: 2, md: 2 }, 
});

export const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        // Sử dụng Box với màu nền trắng và border top nhẹ (nếu cần)
        <Box 
            component="footer" 
            sx={{ 
                borderTop: `1px solid ${theme.palette.divider}`, 
                bgcolor: 'background.paper', // Màu nền trắng
                pt: 6, 
                pb: 3, 
                width: '100%' 
            }}
        >
            <Container maxWidth="lg">
                {/* Thay thế Grid container bằng Box Flex container */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        // Bù lại khoảng cách padding/spacing
                        mx: { xs: -2, sm: -2, md: -2 } 
                    }}
                >
                    
                    {/* Cột 1: Tải ứng dụng (Mô phỏng xs=12, sm=6, md=3) */}
                    <Box sx={getResponsiveWidth(12, 6, 3)}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Nền tảng giao dịch pin xe điện cũ 
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <img 
                                    src={MyLogo}
                                    alt="QR Code" 
                                    style={{ width: 225, height: 80, marginBottom: 8, borderRadius: '8px' }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    
                    {/* Cột 2 & 3: Hỗ trợ & Ecycle (Mô phỏng xs=6, sm=3, md=2) */}
                    {footerData.map((section) => (
                        <Box key={section.title} sx={getResponsiveWidth(6, 3, 2)}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {section.title}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {section.links.map((linkText) => (
                                        <MuiLink 
                                            href="#" 
                                            key={linkText} 
                                            color="text.secondary" 
                                            variant="body2" 
                                            underline="hover"
                                            sx={{ 
                                                // Tăng tính nghiêm túc cho liên kết pháp lý
                                                '&:hover': { color: theme.palette.primary.main } 
                                            }}
                                        >
                                            {linkText}
                                        </MuiLink>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}

                    {/* Cột 4: Liên kết và Thông tin liên hệ (Mô phỏng xs=12, sm=6, md=5) */}
                    <Box sx={getResponsiveWidth(12, 6, 5)}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Liên kết
                            </Typography>
                            {/* Social Icons */}
                            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                <IconButton 
                                    sx={{ bgcolor: '#0e76a8', color: 'white', '&:hover': { bgcolor: '#0a66c2' } }}
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton 
                                    sx={{ bgcolor: '#ff0000', color: 'white', '&:hover': { bgcolor: '#cc0000' } }}
                                    aria-label="YouTube"
                                >
                                    <YouTubeIcon />
                                </IconButton>
                                <IconButton 
                                    sx={{ bgcolor: '#4267B2', color: 'white', '&:hover': { bgcolor: '#3b5998' } }}
                                    aria-label="Facebook"
                                >
                                    <FacebookIcon />
                                </IconButton>
                            </Box>

                            {/* Thông tin liên hệ */}
                            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                                Email: trogiup@ecycle.vn
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                CSKH: 1919****** (1,000đ/phút)
                            </Typography>

                            {/* Địa chỉ */}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Địa chỉ: số 70 đường Tô Ký, Quận 12, Thành phố Hồ Chí Minh, Việt Nam
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* --- PHẦN THÔNG TIN PHÁP LÝ (Bản quyền) --- */}
                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ maxWidth: '75%' }}>
                        CÔNG TY TNHH ECYCLE - Người đại diện theo pháp luật: Nguyễn Văn A; GPDKKD: 0123******, do Sở KH & ĐT TP.HCM cấp ngày **/**/202025; GPMXH: 1**/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày **/**/2025; Chịu trách nhiệm nội dung: Nguyễn Văn B. 
                    </Typography>
                    
                    {/* Logo Đã đăng ký BCT */}
                    <img 
                        src={Gif}
                        alt="Đã đăng ký Bộ Công Thương" 
                        style={{ height: 50, width: 'auto' }}
                    />
                </Box>
            </Container>
        </Box>
    );
};
