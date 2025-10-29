// src/pages/UserManagementPage.tsx
import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Button, Chip, IconButton, Tooltip, TextField,
    Select, MenuItem, InputLabel, FormControl 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockOpenIcon from '@mui/icons-material/LockOpen';


// (Giữ nguyên định nghĩa UserData và mockUsers)
interface UserData {
    id: string;
    name: string;
    email: string;
    status: 'Active' | 'Locked';
    verificationStatus: 'Pending' | 'Verified' | 'Unverified';
    violations: number;
    registeredDate: string;
}

const mockUsers: UserData[] = [
    { id: 'u001', name: 'Alice Smith', email: 'alice@example.com', status: 'Active', verificationStatus: 'Pending', violations: 1, registeredDate: '2024-08-01' },
    { id: 'u002', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', verificationStatus: 'Verified', violations: 0, registeredDate: '2024-07-15' },
    { id: 'u003', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Locked', verificationStatus: 'Pending', violations: 5, registeredDate: '2024-09-10' },
    { id: 'u004', name: 'Diana Prince', email: 'diana@example.com', status: 'Active', verificationStatus: 'Unverified', violations: 0, registeredDate: '2024-05-20' },
    { id: 'u005', name: 'Evan Ross', email: 'evan@example.com', status: 'Active', verificationStatus: 'Pending', violations: 2, registeredDate: '2024-10-01' },
];


// (Giữ nguyên các hàm helper getStatusChip và getVerificationChip)
const getStatusChip = (status: 'Active' | 'Locked'): JSX.Element => {
    return (
        <Chip 
            label={status} 
            size="small"
            color={status === 'Active' ? 'success' : 'error'} 
            variant="outlined"
        />
    );
};

const getVerificationChip = (vStatus: 'Pending' | 'Verified' | 'Unverified'): JSX.Element => {
    let color: 'default' | 'primary' | 'warning' | 'success' = 'default';
    if (vStatus === 'Verified') color = 'success';
    else if (vStatus === 'Pending') color = 'warning';
    else if (vStatus === 'Unverified') color = 'default';

    return (
        <Chip 
            label={vStatus} 
            size="small"
            color={color}
            icon={vStatus === 'Verified' ? <VerifiedUserIcon sx={{ fontSize: 16 }} /> : undefined}
        />
    );
};


const UserManagementPage: React.FC = () => {
    const theme = useTheme();
    const [users, setUsers] = useState<UserData[]>(mockUsers); 
    const navigate = useNavigate();

    // --- STATE CHO LỌC VÀ TÌM KIẾM ---
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterVerification, setFilterVerification] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>(''); // <<< STATE MỚI CHO TÌM KIẾM
    // ---------------------------------

    // --- ACTIONS ---
    const handleRowClick = (userId: string) => {
        navigate(`/users/${userId}`); 
    };

    const handleApprove = (id: string) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, verificationStatus: 'Verified' } : user
        ));
        console.log(`User ${id} approved for verification.`);
    };

    const handleLock = (id: string) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, status: 'Locked' } : user
        ));
        console.log(`User ${id} has been locked.`);
    };

    const handleUnlock = (id: string) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, status: 'Active' } : user
        ));
        console.log(`User ${id} has been unlocked.`);
    };

    // --- LOGIC LỌC DỮ LIỆU ĐÃ CẬP NHẬT ---
    const filteredUsers = users.filter(user => {
        // Chuyển search term thành chữ thường để so sánh
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Lọc theo Status (Active/Locked)
        const statusMatch = filterStatus === 'All' || user.status === filterStatus;
        
        // Lọc theo Verification Status (Pending/Verified/Unverified)
        const verificationMatch = filterVerification === 'All' || user.verificationStatus === filterVerification;
        
        // Lọc theo Search Term (Name HOẶC Email)
        const searchMatch = 
            user.name.toLowerCase().includes(lowerCaseSearchTerm) || 
            user.email.toLowerCase().includes(lowerCaseSearchTerm);
        
        return statusMatch && verificationMatch && searchMatch;
    });
    // ---------------------------------
    
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <GroupIcon color="action" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    User Management
                </Typography>
            </Stack>

            <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                
                {/* Thanh Công cụ Tìm kiếm và Lọc (ĐÃ CẬP NHẬT) */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
                    <TextField
                        size="small"
                        placeholder="Search by Name or Email..." // Thay đổi placeholder
                        variant="outlined"
                        value={searchTerm} // Kèm state tìm kiếm
                        onChange={(e) => setSearchTerm(e.target.value)} // Kèm handler
                        InputProps={{
                            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                        }}
                        sx={{ width: { xs: '100%', sm: '300px' } }}
                    />
                    
                    {/* Lọc theo Account Status */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Account Status</InputLabel>
                        <Select
                            value={filterStatus}
                            label="Account Status"
                            onChange={(e) => setFilterStatus(e.target.value as string)}
                        >
                            <MenuItem value="All">All Statuses</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Locked">Locked</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Lọc theo Verification Status */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Verification</InputLabel>
                        <Select
                            value={filterVerification}
                            label="Verification"
                            onChange={(e) => setFilterVerification(e.target.value as string)}
                        >
                            <MenuItem value="All">All Verification</MenuItem>
                            <MenuItem value="Verified">Verified</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Unverified">Unverified</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="primary">Export Data</Button>

                </Stack>

                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Registered</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Verification</TableCell>
                                <TableCell align="center">Violations</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Dùng filteredUsers */}
                            {filteredUsers.map((user) => ( 
                                <TableRow 
                                    key={user.id} 
                                    hover
                                    onClick={(e) => {
                                        // Ngăn chặn click vào hàng khi click vào nút
                                        if (e.target instanceof HTMLElement && e.target.closest('button')) {
                                            return; 
                                        }
                                        handleRowClick(user.id);
                                    }}
                                    sx={{ 
                                        cursor: 'pointer', // Thêm con trỏ tay
                                        '&:last-child td, &:last-child th': { border: 0 } 
                                    }}
                                >
                                    <TableCell component="th" scope="row">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.registeredDate}</TableCell>
                                    <TableCell align="center">{getStatusChip(user.status)}</TableCell>
                                    <TableCell align="center">{getVerificationChip(user.verificationStatus)}</TableCell>
                                    <TableCell align="center">
                                        <Typography color={user.violations > 2 ? 'error' : 'text.primary'} fontWeight="bold">
                                            {user.violations}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            
                                            {/* Nút Phê duyệt */}
                                            {user.verificationStatus === 'Pending' && (
                                                <Button 
                                                    variant="contained" 
                                                    color="success" 
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={(e) => {e.stopPropagation(); handleApprove(user.id);}} // Dừng lan truyền sự kiện
                                                    sx={{ minWidth: 100 }}
                                                >
                                                    Approve
                                                </Button>
                                            )}

                                            {/* Nút Khóa / Mở khóa */}
                                            {user.status === 'Active' ? (
                                                <Button 
                                                    variant="outlined"
                                                    color="error" 
                                                    size="small"
                                                    startIcon={<BlockIcon />}
                                                    onClick={(e) => {e.stopPropagation(); handleLock(user.id);}} // Dừng lan truyền sự kiện
                                                    sx={{ minWidth: 100 }}
                                                >
                                                    Lock
                                                </Button>
                                            ) : (
                                                <Button 
                                                    variant="contained"
                                                    color="warning"
                                                    size="small"
                                                    startIcon={<LockOpenIcon />}
                                                    onClick={(e) => {e.stopPropagation(); handleUnlock(user.id);}} // Dừng lan truyền sự kiện
                                                    sx={{ minWidth: 100 }}
                                                >
                                                    Unlock
                                                </Button>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Box>
    );
};

export default UserManagementPage;