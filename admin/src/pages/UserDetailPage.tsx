import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Dữ liệu giả định (Thường thì sẽ fetch từ API)
interface UserDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: 'Active' | 'Locked';
    verificationStatus: 'Verified' | 'Unverified';
    violations: number;
    activityLog: string[];
}

const mockUserDetails: Record<string, UserDetail> = {
    'u001': { 
        id: 'u001', 
        name: 'Alice Smith', 
        email: 'alice@example.com', 
        phone: '090-123-4567', 
        address: '123 Main St, New York',
        status: 'Active', 
        verificationStatus: 'Verified', 
        violations: 1, 
        activityLog: ['Logged in: 2024-10-25', 'Posted content: 2024-10-24'] 
    },
    'u003': { 
        id: 'u003', 
        name: 'Charlie Brown', 
        email: 'charlie@example.com', 
        phone: '091-987-6543', 
        address: '456 Oak Ave, California',
        status: 'Locked', 
        verificationStatus: 'Unverified', 
        violations: 5, 
        activityLog: ['Locked out: 2024-10-20 (5 violations)', 'Failed login: 2024-10-21'] 
    },
    // ... Thêm dữ liệu cho các user khác
};


const UserDetailPage: React.FC = () => {
    // Lấy user ID từ URL
    const { userId } = useParams<{ userId: string }>(); 
    const navigate = useNavigate();
    
    // Tìm kiếm chi tiết người dùng
    const user = mockUserDetails[userId || '']; 

    if (!user) {
        return (
            <Box>
                <Typography variant="h5" color="error">User not found!</Typography>
                <Button variant="contained" onClick={() => navigate('/users')} sx={{ mt: 2 }}>
                    Go back to User List
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Nút quay lại */}
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/users')} 
                sx={{ mb: 3 }}
            >
                Back to User Management
            </Button>
            
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                User ID: {user.id}
            </Typography>

            <Paper sx={{ p: 4, borderRadius: '8px' }}>
                <Stack spacing={3}>
                    {/* Thông tin cơ bản */}
                    <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                    <Divider />
                    <Stack direction="row" spacing={10}>
                        <Box>
                            <Typography color="text.secondary">Email</Typography>
                            <Typography fontWeight="medium">{user.email}</Typography>
                        </Box>
                        <Box>
                            <Typography color="text.secondary">Phone</Typography>
                            <Typography fontWeight="medium">{user.phone}</Typography>
                        </Box>
                        <Box>
                            <Typography color="text.secondary">Address</Typography>
                            <Typography fontWeight="medium">{user.address}</Typography>
                        </Box>
                    </Stack>
                    
                    {/* Trạng thái & Vi phạm */}
                    <Box sx={{ pt: 3 }}>
                        <Typography variant="h6" fontWeight="bold">Account Status</Typography>
                        <Divider />
                        <Stack direction="row" spacing={10} sx={{ mt: 2 }}>
                            <Box>
                                <Typography color="text.secondary">Account Status</Typography>
                                <Typography fontWeight="medium" color={user.status === 'Active' ? 'success.main' : 'error.main'}>
                                    {user.status}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="text.secondary">Verification</Typography>
                                <Typography fontWeight="medium" color={user.verificationStatus === 'Verified' ? 'primary.main' : 'warning.main'}>
                                    {user.verificationStatus}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="text.secondary">Total Violations</Typography>
                                <Typography fontWeight="medium" color={user.violations > 3 ? 'error.main' : 'text.primary'}>
                                    {user.violations}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    
                    {/* Nhật ký hoạt động */}
                    <Box sx={{ pt: 3 }}>
                        <Typography variant="h6" fontWeight="bold">Activity Log</Typography>
                        <Divider />
                        {user.activityLog.map((log, index) => (
                            <Typography key={index} variant="body2" sx={{ mt: 1 }}>- {log}</Typography>
                        ))}
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};

export default UserDetailPage;