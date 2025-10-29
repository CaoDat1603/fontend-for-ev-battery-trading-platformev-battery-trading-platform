import React, { useState } from 'react';
import { 
    Popover, Box, Typography, Button, Tabs, 
    Tab, Divider, useTheme, Chip, 
    List, ListItem, ListItemText, ListItemAvatar, Avatar 
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icon cho đã đọc
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Icon cho Tin tức
import ArticleIcon from '@mui/icons-material/Article'; // Icon cho Tin đăng
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Icon cho Tài khoản

// --- KHAI BÁO KIỂU DỮ LIỆU ---
type NotificationTab = 'activity' | 'news';

interface NotificationItem {
    id: string;
    type: 'Tin đăng' | 'Tin tức' | 'Tài khoản' | 'Giao dịch' | 'Sự kiện';
    title: string;
    time: string;
    isRead: boolean;
}

interface NotificationPopoverProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    // Thêm prop để reset Badge trong Header sau khi mở/đóng Popover
    markAllNotificationsSeen: () => void; 
}

// Dữ liệu giả định
const mockActivityNotifications: NotificationItem[] = [
    { id: '1', type: 'Tin đăng', title: 'Tin đăng "Toyota Yaris Cross" của bạn đã được duyệt.', time: '1 giờ trước', isRead: false },
    { id: '3', type: 'Tài khoản', title: 'Bạn vừa đăng nhập từ thiết bị mới.', time: '5 giờ trước', isRead: true },
];

const mockNewsNotifications: NotificationItem[] = [
    { id: '2', type: 'Tin tức', title: '5 mẫu xe MPV 7 chỗ đáng mua nhất 2024.', time: '1 ngày trước', isRead: false },
];

// Hàm trả về Icon dựa trên loại thông báo
const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
        case 'Tin đăng':
            return <ArticleIcon />;
        case 'Tài khoản':
            return <AccountBoxIcon />;
        case 'Tin tức':
            return <AutoAwesomeIcon />;
        // Thêm các trường hợp khác (Giao dịch, Sự kiện)
        default:
            return <CheckCircleOutlineIcon />;
    }
};

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ 
    open, anchorEl, handleClose, markAllNotificationsSeen 
}) => {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState<NotificationTab>('activity');
    const [selectedFilter, setSelectedFilter] = useState<string>('all'); 
    
    // Logic Lọc Dữ liệu (chưa hoàn chỉnh, nhưng setup đúng cấu trúc)
    const allNotifications = currentTab === 'activity' ? mockActivityNotifications : mockNewsNotifications;
    const filteredNotifications = selectedFilter === 'all'
        ? allNotifications
        : allNotifications.filter(n => n.type === selectedFilter);

    // Các nút lọc
    const activityFilters = [
        { key: 'all', label: 'Tất cả' }, 
        { key: 'Tài khoản', label: 'Tài khoản' },
        { key: 'Giao dịch', label: 'Giao dịch' },
        { key: 'Tin đăng', label: 'Tin đăng' },
        { key: 'Sự kiện', label: 'Sự kiện' },
    ];

    const handleTabChange = (event: React.SyntheticEvent, newValue: NotificationTab) => {
        setCurrentTab(newValue);
        setSelectedFilter('all'); // Reset filter khi đổi tab
    };

    // --- HÀM RENDER CHUNG NỘI DUNG ---
    const renderNotificationsList = (notifications: NotificationItem[], emptyMessage: string) => {
        if (notifications.length === 0) {
            return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            );
        }

        return (
            <List sx={{ p: 0 }}>
                {notifications.map((noti) => (
                    <ListItem 
                        key={noti.id} 
                        sx={{ 
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            cursor: 'pointer',
                            bgcolor: noti.isRead ? theme.palette.background.paper : theme.palette.action.selected, // Màu nền cho thông báo chưa đọc
                            '&:hover': { bgcolor: noti.isRead ? 'action.hover' : theme.palette.action.selected },
                        }}
                        // Khi click, có thể gọi API đánh dấu đã đọc thông báo này
                        onClick={() => {
                            // Logic API đánh dấu đã đọc
                            handleClose();
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: noti.isRead ? theme.palette.primary.light : theme.palette.primary.main, width: 36, height: 36, color: '#fff' }}>
                                {getNotificationIcon(noti.type)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Box component="span" fontWeight={noti.isRead ? 400 : 600}>
                                    {noti.title}
                                </Box>
                            } 
                            secondary={noti.time}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };


    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            // Gọi hàm đóng và đồng thời reset badge
            onClose={() => {
                handleClose();
                markAllNotificationsSeen(); 
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '8px',
                        mt: 0.5,
                        width: { xs: '90vw', sm: 400, md: 450 },
                        maxHeight: 500,
                        overflow: 'visible',
                    },
                },
            }}
        >
            <Box sx={{ width: '100%' }}>
                
                {/* 1. HEADER: Tiêu đề và Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ p: 2, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Thông Báo
                        <Button size="small" variant="text" onClick={() => { /* Logic đánh dấu tất cả đã đọc */ }}>
                            Đánh dấu đã đọc
                        </Button>
                    </Typography>
                    <Tabs 
                        value={currentTab} 
                        onChange={handleTabChange} 
                        aria-label="notification tabs"
                        sx={{ px: 2 }}
                    >
                        <Tab 
                            label="Hoạt Động" 
                            value="activity" 
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        />
                        <Tab 
                            label="Tin Tức" 
                            value="news" 
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        />
                    </Tabs>
                </Box>

                {/* 2. FILTER BUTTONS (Chỉ trong tab Hoạt Động) */}
                {currentTab === 'activity' && (
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, whiteSpace: 'nowrap' }}>
                            <FilterListIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="bold">Lọc</Typography>
                        </Box>

                        {activityFilters.map((filter) => (
                            <Chip
                                key={filter.key}
                                label={filter.label}
                                clickable
                                color={selectedFilter === filter.key ? 'primary' : 'default'} // Dùng primary color của theme
                                onClick={() => setSelectedFilter(filter.key)}
                                sx={{ 
                                    textTransform: 'none', 
                                    fontWeight: selectedFilter === filter.key ? 'bold' : 'normal',
                                    borderRadius: '8px',
                                    whiteSpace: 'nowrap',
                                    // Custom style để chip nổi bật hơn khi chọn
                                    bgcolor: selectedFilter === filter.key ? theme.palette.primary.main : theme.palette.action.hover,
                                    color: selectedFilter === filter.key ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                    '&:hover': {
                                        bgcolor: selectedFilter === filter.key ? theme.palette.primary.dark : theme.palette.action.selected,
                                    }
                                }}
                            />
                        ))}
                    </Box>
                )}
                <Divider />

                {/* 3. NỘI DUNG DANH SÁCH THÔNG BÁO */}
                <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
                    {currentTab === 'activity' 
                        ? renderNotificationsList(
                            filteredNotifications, 
                            'Hiện tại bạn chưa có thông báo hoạt động nào.'
                          ) 
                        : renderNotificationsList(
                            filteredNotifications, 
                            'Hiện tại bạn chưa có thông báo tin tức nào.'
                          )}
                </Box>
                
                {/* 4. FOOTER: Xem tất cả */}
                <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                    <Button fullWidth onClick={handleClose} sx={{ fontWeight: 600 }}>
                        Xem tất cả
                    </Button>
                </Box>

            </Box>
        </Popover>
    );
};