// src/pages/ProfilePage.tsx
import React from 'react';
import { Box, Typography, Paper, Stack, Divider, Chip, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person'; // Icon cho Avatar nếu cần

// --- Dữ liệu giả lập cho tài khoản đang đăng nhập ---
interface CurrentUser {
    name: string;
    avatarUrl: string;
    role: 'Super Admin' | 'Moderator' | 'Finance Admin' | 'Admin'; // Thêm 'Admin'
    email: string;
    phone: string;
    status: 'Active' | 'On Leave';
    lastLogin: string;
    id: string; // Thêm ID để hiển thị
    department: string; // Thêm Department để khớp giao diện
}

// CẬP NHẬT DỮ LIỆU MOCK THEO YÊU CẦU CỦA BẠN
const mockProfileData: CurrentUser = {
    id: 'admin001',
    name: 'Đạt Cao',
    avatarUrl: 'https://cdn.chotot.com/uac2/26732157', 
    role: 'Admin', // Sử dụng Role 'Admin' bạn cung cấp
    email: 'dat.cao@admin.com', 
    phone: '098-765-4321', 
    status: 'Active', 
    lastLogin: '2025-10-30 13:00', // Giả lập thời gian hiện tại
    department: 'Technology', // Dữ liệu bổ sung để khớp giao diện
};


const ProfilePage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const profile = mockProfileData; // SỬ DỤNG DỮ LIỆU MỚI

    const getStatusChip = (status: 'Active' | 'On Leave') => {
        const color = status === 'Active' ? 'success' : 'default';
        return <Chip label={status} color={color} size="small" />;
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully (Mock Action)!');
            navigate('/login'); 
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                {/* Hiển thị Avatar hoặc Icon */}
                {profile.avatarUrl ? (
                    <Box
                        component="img"
                        src={profile.avatarUrl}
                        alt={profile.name}
                        sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <AccountCircleIcon color="primary" sx={{ fontSize: 40 }} />
                )}
                
                <Typography variant="h4" fontWeight="bold">
                    My Profile
                </Typography>
            </Stack>

            {/* THAY THẾ GRID CONTAINER LỚN BẰNG STACK */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                
                {/* --- 1. THÔNG TIN CƠ BẢN (Stack chiếm 2/3) --- */}
                <Box sx={{ width: { xs: '100%', md: '66.66%' } }}>
                    <Paper sx={{ p: 4, borderRadius: '8px', boxShadow: theme.shadows[3] }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontWeight="bold">
                                {profile.name}
                            </Typography>
                            {/* Dùng status mới */}
                            {getStatusChip(profile.status)} 
                        </Stack>

                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                            {profile.role} | ID: {profile.id}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        {/* THAY THẾ GRID ITEM BÊN TRONG BẰNG STACK */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap="wrap">
                            {/* Email */}
                            <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
                                <Stack spacing={1}>
                                    <Typography color="text.secondary" component="div">
                                        <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} /> **Email**
                                    </Typography>
                                    <Typography fontWeight="medium">{profile.email}</Typography>
                                </Stack>
                            </Box>
                            
                            {/* Phone */}
                            <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
                                <Stack spacing={1}>
                                    <Typography color="text.secondary" component="div">
                                        <PhoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} /> **Phone**
                                    </Typography>
                                    <Typography fontWeight="medium">{profile.phone}</Typography>
                                </Stack>
                            </Box>

                            {/* Department */}
                            <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
                                <Stack spacing={1}>
                                    <Typography color="text.secondary" component="div">
                                        <BusinessIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} /> **Department**
                                    </Typography>
                                    <Typography fontWeight="medium">{profile.department}</Typography>
                                </Stack>
                            </Box>

                            {/* Last Login */}
                            <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
                                <Stack spacing={1}>
                                    <Typography color="text.secondary" component="div">
                                        <LockIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} /> **Last Login**
                                    </Typography>
                                    <Typography fontWeight="medium">{profile.lastLogin}</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>

                {/* --- 2. HÀNH ĐỘNG HỒ SƠ (Stack chiếm 1/3) --- */}
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Profile Actions
                        </Typography>
                        <Stack spacing={1.5}>
                            <Button 
                                startIcon={<EditIcon />} 
                                variant="outlined" 
                                fullWidth
                            >
                                Edit Personal Info
                            </Button>
                            <Button 
                                startIcon={<SettingsIcon />} 
                                variant="outlined" 
                                fullWidth
                            >
                                Change Password
                            </Button>
                            <Divider sx={{ my: 1 }} />
                            <Button 
                                startIcon={<LogoutIcon />} 
                                variant="contained" 
                                color="error"
                                fullWidth
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProfilePage;