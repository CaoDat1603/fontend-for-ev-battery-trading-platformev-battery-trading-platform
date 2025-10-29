import React, { useState } from 'react';
import { 
    Popover, Box, Typography, Button, Tabs, 
    Tab, Divider, useTheme, Chip, 
    List, ListItem, ListItemText, ListItemAvatar, Avatar 
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

// --- Khai báo kiểu dữ liệu cho Tab và Thông báo ---
type NotificationTab = 'activity' | 'news';

interface NotificationPopoverProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

// Dữ liệu giả định cho Thông báo Hoạt động
const mockActivityNotifications = [
    // Giả định có thông báo
    { id: '1', type: 'Tin đăng', title: 'Tin đăng "Toyota Yaris Cross" của bạn đã được duyệt.', time: '1 giờ trước' },
    // Thêm các thông báo khác nếu cần
];

// Dữ liệu giả định cho Thông báo Tin tức
const mockNewsNotifications = [
    { id: '2', type: 'Tin tức', title: '5 mẫu xe MPV 7 chỗ đáng mua nhất 2024.', time: '1 ngày trước' },
];

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ 
    open, anchorEl, handleClose 
}) => {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState<NotificationTab>('activity');
    const [selectedFilter, setSelectedFilter] = useState<string>('all'); // 'all' hoặc tên filter

    const notifications = currentTab === 'activity' ? mockActivityNotifications : mockNewsNotifications;
    const isActivityEmpty = notifications.length === 0;

    const handleTabChange = (event: React.SyntheticEvent, newValue: NotificationTab) => {
        setCurrentTab(newValue);
    };

    // Các nút lọc trong tab "Hoạt Động"
    const activityFilters = [
        { key: 'all', label: 'Tất cả' }, // Giả định 'Tất cả' là filter mặc định
        { key: 'account', label: 'Tài khoản' },
        { key: 'transaction', label: 'Giao dịch' },
        { key: 'post', label: 'Tin đăng' },
        { key: 'event', label: 'Sự kiện' },
    ];

    // --- RENDER NỘI DUNG CỦA TAB HOẠT ĐỘNG ---
    const renderActivityContent = () => {
        if (isActivityEmpty) {
            return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        Hiện tại bạn chưa có thông báo nào
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
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                        onClick={handleClose}
                    >
                        <ListItemAvatar>
                            {/* Icon/Avatar giả định cho thông báo */}
                            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32, fontSize: '0.8rem' }}>
                                {noti.type[0]}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={noti.title} 
                            secondary={noti.time}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };
    
    // --- RENDER NỘI DUNG CỦA TAB TIN TỨC (Dùng chung logic) ---
    const renderNewsContent = () => {
        if (notifications.length === 0) {
             return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        Hiện tại bạn chưa có thông báo tin tức nào
                    </Typography>
                </Box>
            );
        }
        
        // Render danh sách tin tức (giả định)
        return (
            <List sx={{ p: 0 }}>
                {notifications.map((noti) => (
                    <ListItem 
                        key={noti.id} 
                        sx={{ 
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                        onClick={handleClose}
                    >
                        <ListItemText 
                            primary={noti.title} 
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
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right', // Neo Popover vào bên phải của Icon
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right', // Mở ra từ góc trên bên phải của Icon
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '8px',
                        mt: 0.5,
                        minWidth: 400, // Popover này lớn hơn
                        maxWidth: 450,
                        maxHeight: 500,
                        overflow: 'visible', // Cho phép hiển thị Shadow
                    },
                },
            }}
        >
            <Box sx={{ width: '100%' }}>
                
                {/* 1. HEADER: Tiêu đề và Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ p: 2, pb: 0 }}>
                        Thông Báo
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
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, whiteSpace: 'nowrap' }}>
                            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="bold">Lọc</Typography>
                        </Box>

                        {activityFilters.map((filter) => (
                            <Chip
                                key={filter.key}
                                label={filter.label}
                                clickable
                                // Giả định 'ecycle' là màu vàng/vàng đậm cho Chip đã chọn
                                color={selectedFilter === filter.key ? 'warning' : 'default'}
                                onClick={() => setSelectedFilter(filter.key)}
                                sx={{ 
                                    textTransform: 'none', 
                                    fontWeight: selectedFilter === filter.key ? 'bold' : 'normal',
                                    borderRadius: '8px', // Làm tròn góc chip
                                    whiteSpace: 'nowrap',
                                    bgcolor: selectedFilter === filter.key ? theme.palette.warning.main : theme.palette.action.hover,
                                    color: selectedFilter === filter.key ? 'black' : theme.palette.text.primary,
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* 3. NỘI DUNG */}
                <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
                    {currentTab === 'activity' ? renderActivityContent() : renderNewsContent()}
                </Box>

            </Box>
        </Popover>
    );
};