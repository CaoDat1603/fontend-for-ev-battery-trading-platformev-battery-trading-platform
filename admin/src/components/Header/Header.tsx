import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Badge, Avatar, Box, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

// --- 1. IMPORT CÁC COMPONENT & HOOK ĐÃ TẠO ---
import { NotificationPopover } from '../popovers/NotificationPopover';
import { AccountMenuPopover } from '../popovers/AccountMenuPopover';
import { useAdminBadges } from '../../hooks/useAdminBadges'; 

// --- Dữ liệu người dùng giả định đầy đủ ---
const mockUser = {
    name: 'Đạt Cao',
    avatarUrl: 'https://cdn.chotot.com/uac2/26732157', 
    role: 'Admin',
};

// --- GIẢ LẬP TRẠNG THÁI ĐĂNG NHẬP ---
const isLoggedIn = true; 

interface HeaderProps {
    drawerWidth: number;
    open: boolean;
    handleDrawerToggle: () => void; // Đây là hàm cần gọi
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, open, handleDrawerToggle }) => {
    const theme = useTheme();

    // --- 2. LOGIC POPOVER (Giữ nguyên) ---
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);

    const isNotificationOpen = Boolean(notificationAnchorEl);
    const isAccountOpen = Boolean(accountAnchorEl);

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleAccountClose = () => {
        setAccountAnchorEl(null);
    };
    
    // --- 3. LOGIC BADGE (Giữ nguyên) ---
    const { badges, markNotificationsRead } = useAdminBadges(isLoggedIn);
    const hasUnreadNotifications = badges.hasUnreadNotifications;
    
    const handleNotificationsBadgeClick = (event: React.MouseEvent<HTMLElement>) => {
        handleNotificationClick(event);
        markNotificationsRead(); 
    };

    // Hàm giả lập đăng xuất
    const handleLogout = () => {
        console.log("User logged out!");
    };


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                    backgroundColor: theme.palette.background.paper,
                    zIndex: theme.zIndex.drawer + 1, 
                    // Thêm animation chuyển đổi mượt mà
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    
                    {/* KHẮC PHỤC: Icon Mở/Đóng Sidebar (MenuIcon) */}
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerToggle} // <<< THÊM LẠI HÀM NÀY
                        edge="start"
                        sx={{ 
                            mr: 2, 
                            color: theme.palette.primary.main,
                            // Xoay icon khi Sidebar đóng
                            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: theme.transitions.create(['transform']),
                        }} 
                    >
                        {/* Bạn có thể dùng MenuIcon, hoặcChevronLeftIcon/ChevronRightIcon nếu thích */}
                        <MenuIcon /> 
                    </IconButton>

                    {/* Thanh tìm kiếm (Giữ nguyên) */}
                    <Box sx={{ 
                        position: 'relative', 
                        borderRadius: 1, 
                        backgroundColor: theme.palette.action.hover, 
                        mr: 2, 
                        ml: 4, 
                        width: '300px' 
                    }}>
                        <Box sx={{ p: 1, height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                        </Box>
                        <InputBase
                            placeholder="Search..."
                            sx={{ p: '8px 8px 8px 40px', width: '100%', color: theme.palette.text.primary }}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} /> 
                    
                    {/* Các biểu tượng và Profile (Giữ nguyên) */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        
                        <IconButton 
                            size="large" 
                            sx={{ color: theme.palette.text.secondary }}
                            onClick={handleNotificationsBadgeClick}
                        >
                            <Badge 
                                badgeContent={hasUnreadNotifications ? '' : 0} 
                                color="error" 
                                variant="dot"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                ml: 3, 
                                cursor: 'pointer',
                                p: 1,
                                borderRadius: '4px',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                            onClick={handleAccountClick}
                        >
                            <Box sx={{ textAlign: 'right', mr: 1, display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="body2" color="text.primary" fontWeight="bold">
                                    {mockUser.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {mockUser.role}
                                </Typography>
                            </Box>
                            <Avatar alt={mockUser.name} src={mockUser.avatarUrl} /> 
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* --- POPOVERs (Giữ nguyên) --- */}
            <NotificationPopover
                open={isNotificationOpen}
                anchorEl={notificationAnchorEl}
                handleClose={handleNotificationClose}
                markAllNotificationsSeen={markNotificationsRead}
            />
            
            <AccountMenuPopover
                open={isAccountOpen}
                anchorEl={accountAnchorEl}
                handleClose={handleAccountClose}
                isLoggedIn={isLoggedIn}
                user={mockUser}
                handleLogout={handleLogout}
            />
        </>
    );
};

export default Header;