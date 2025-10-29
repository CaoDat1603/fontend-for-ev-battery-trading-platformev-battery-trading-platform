//*******************************************//
//  COMPONENT POPOVER HIỂN THỊ TIN ĐÃ LƯU  //
//******************************************// 

import React from 'react';
import { 
    Popover, Box, Typography, Button, Divider, 
    List, ListItem, ListItemText, ListItemAvatar, Avatar 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// --- Khai báo kiểu dữ liệu cho Tin đã lưu ---
export interface SavedPost { 
    id: string;
    imagePath: string; // path "lưu đường link hình ảnh từ service"
    name: string; // tên sản phẩm
    price: string; // Giả định có thêm giá
    details: string; // Chi tiết khác
}

interface SavedPostsPopoverProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    // Dữ liệu tin đã lưu (Giả định, có thể thay thế bằng Redux/Context state)
    savedPosts: SavedPost[]; 
}

// --- Dữ liệu giả định có 1 tin đã lưu (cho ví dụ) ---
const mockSavedPosts: SavedPost[] = [
    { 
        id: '1', 
        imagePath: 'https://via.placeholder.com/60x60.png?text=Yaris', // Thay bằng link ảnh thật
        name: 'Toyota Yaris Cross 2024 1.5 D-CVT',
        price: '730.000.000 VNĐ', 
        details: '35.852 km',
    }
];

export const SavedPostsPopover: React.FC<SavedPostsPopoverProps> = ({ 
    open, anchorEl, handleClose, savedPosts 
}) => {
    const theme = useTheme();
    
    // Sử dụng dữ liệu mock nếu savedPosts rỗng trong ví dụ
    const dataToShow = savedPosts.length > 0 ? savedPosts : mockSavedPosts;
    const isDataEmpty = savedPosts.length === 0;

    // --- RENDER TRẠNG THÁI RỖNG (image_0bf83d.png) ---
    const renderEmptyState = () => (
        <Box sx={{ p: 2, textAlign: 'center', maxWidth: 350 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                Bạn chưa lưu tin đăng nào
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lưu tin yêu thích, tin sẽ hiển thị ở đây để bạn dễ dàng quay lại sau.
            </Typography>
        </Box>
    );

    // --- RENDER TRẠNG THÁI CÓ DỮ LIỆU (image_0bf83a.png) ---
    const renderDataState = () => (
        <Box sx={{ minWidth: 320 }}>
            <List dense sx={{ p: 0 }}>
                {dataToShow.slice(0, 1).map((post) => ( // Chỉ hiển thị 1 tin đầu tiên (theo hình ảnh)
                    <ListItem 
                        key={post.id} 
                        sx={{ 
                            py: 1.5, 
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                        onClick={handleClose} // Đóng Popover và chuyển hướng (logic chuyển hướng cần thêm)
                    >
                        <ListItemAvatar>
                            <Avatar 
                                variant="rounded" 
                                src={post.imagePath} 
                                alt={post.name} 
                                sx={{ width: 60, height: 60, mr: 1.5 }} 
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={post.name}
                            primaryTypographyProps={{ 
                                fontWeight: 'bold', 
                                whiteSpace: 'nowrap', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis' 
                            }}
                            secondary={post.details}
                            secondaryTypographyProps={{ 
                                color: 'text.primary', 
                                mt: 0.5 
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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
                        // Điều chỉnh padding và width dựa trên trạng thái
                        minWidth: isDataEmpty ? 300 : 350,
                        maxHeight: 400,
                        overflow: 'auto',
                    },
                },
            }}
        >
            {/* --- HEADER POPUP --- */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    p: 2, 
                    borderBottom: isDataEmpty ? 'none' : `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Tin đăng đã lưu
                </Typography>
                
                {!isDataEmpty && (
                    <Button 
                        // Thường sử dụng màu 'primary' hoặc 'info' cho link, không phải 'ecycle'
                        color="primary" 
                        onClick={handleClose}
                        sx={{ textTransform: 'none' }}
                    >
                        Xem tất cả
                    </Button>
                )}
            </Box>

            {/* --- NỘI DUNG POPUP --- */}
            {isDataEmpty ? renderEmptyState() : renderDataState()}
        </Popover>
    );
};