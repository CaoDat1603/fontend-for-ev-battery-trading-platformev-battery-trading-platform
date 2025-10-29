import React from 'react';
import { 
    Popover, Box, Typography, Button, Divider, 
    List, ListItem, ListItemText, ListItemIcon, Avatar, Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Thêm Link để xử lý chuyển hướng

// --- ICONS CẦN THIẾT ---
import SettingsIcon from '@mui/icons-material/Settings';               // Cài đặt tài khoản
import HeadsetIcon from '@mui/icons-material/Headset';                 // Trợ giúp
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; // Đóng góp ý kiến
import LogoutIcon from '@mui/icons-material/Logout';                   // Đăng xuất
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon xem profile

// --- KIỂU DỮ LIỆU ---
interface UserData {
    name: string;
    avatarUrl: string;
    role: string; // Vai trò: Admin, Moderator...
}

interface AccountMenuPopoverProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    isLoggedIn: boolean; 
    user: UserData | null; 
    handleLogout: () => void;
}

// --- DỮ LIỆU MENU ---
// Các liên kết khác cho Admin/User
const otherLinks = [
    { text: 'Trợ giúp', icon: HeadsetIcon, path: '/help' },
    { text: 'Đóng góp ý kiến', icon: ChatBubbleOutlineIcon, path: '/feedback' },
];


export const AccountMenuPopover: React.FC<AccountMenuPopoverProps> = ({ 
    open, anchorEl, handleClose, isLoggedIn, user, handleLogout
}) => {
    const theme = useTheme();

    // --- RENDER HÀM CHUNG CHO LIST ITEM ---
    // Sử dụng Link nếu bạn đang dùng React Router
    const renderMenuItem = (item: typeof otherLinks[0]) => (
        <ListItem 
            key={item.text} 
            component={Link} // Sử dụng Link từ React Router
            to={item.path} 
            onClick={handleClose} 
            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, py: 0.5, textDecoration: 'none', color: 'inherit' }}
        >
            <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.secondary }}><item.icon /></ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
    );

    // --- RENDER LOGIC CHÍNH ---
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '8px',
                        mt: 0.5,
                        minWidth: 300, 
                        maxWidth: 350,
                        overflow: 'visible',
                    },
                },
            }}
        >
            {isLoggedIn && user ? (
                <Box sx={{ width: '100%' }}>
                    
                    {/* 1. PROFILE HEADER (Có thể click để đi đến trang cá nhân) */}
                    <Box 
                        component={Link} // Bọc trong Link để có thể click
                        to="/profile" // Đường dẫn đến trang profile
                        onClick={handleClose}
                        sx={{ 
                            p: 2, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            textAlign: 'center',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        <Avatar 
                            src={user.avatarUrl} 
                            alt={user.name}
                            sx={{ width: 64, height: 64, mb: 1, border: `3px solid ${theme.palette.primary.main}` }} 
                        >
                            {user.name[0]}
                        </Avatar>
                        
                        <Typography variant="h6" fontWeight="bold">
                            {user.name}
                        </Typography>
                        <Chip 
                            label={user.role} 
                            size="small" 
                            color="warning" 
                            sx={{ my: 0.5, fontWeight: 'bold' }}
                        />
                        <Button 
                            size="small" 
                            startIcon={<AccountCircleIcon />} 
                            sx={{ mt: 1, textTransform: 'none' }}
                        >
                            Xem hồ sơ
                        </Button>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* 2. CÁC LIÊN KẾT KHÁC VÀ ĐĂNG XUẤT */}
                    <List dense sx={{ pt: 0, pb: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 2, mb: 0.5 }}>
                            Khác
                        </Typography>
                        {otherLinks.map(renderMenuItem)}
                        
                        {/* ĐĂNG XUẤT */}
                        <ListItem 
                            onClick={() => {
                                handleClose();
                                handleLogout(); // Gọi hàm xử lý đăng xuất
                            }} 
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, py: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
                            <ListItemText primary="Đăng xuất" primaryTypographyProps={{ color: theme.palette.error.main, variant: 'body2' }} />
                        </ListItem>
                    </List>
                </Box>

            ) : (
                // NẾU CHƯA ĐĂNG NHẬP (Unauthenticated State)
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Chào mừng!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Vui lòng đăng nhập để tiếp tục quản lý hệ thống.
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth onClick={handleClose}>
                        Đăng nhập / Đăng ký
                    </Button>
                </Box>
            )}
        </Popover>
    );
};