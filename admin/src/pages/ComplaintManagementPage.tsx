import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Chip, TextField, Select, MenuItem, InputLabel, FormControl, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';

// --- 1. DEFINITIONS (Giữ nguyên) ---
interface ComplaintData {
    id: string;
    type: 'User' | 'Post' | 'Transaction';
    targetId: string; // ID của mục bị khiếu nại (User ID, Post ID, or Txn ID)
    reporterId: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Investigating' | 'Resolved' | 'Rejected';
    dateReported: string; // Định dạng YYYY-MM-DD
}

const mockComplaints: ComplaintData[] = [
    { id: 'c001', type: 'Post', targetId: 'p003', reporterId: 'u004', priority: 'High', status: 'Open', dateReported: '2025-10-29' },
    { id: 'c002', type: 'User', targetId: 'u001', reporterId: 'u005', priority: 'Medium', status: 'Investigating', dateReported: '2025-10-28' },
    { id: 'c003', type: 'Transaction', targetId: 't004', reporterId: 'u002', priority: 'High', status: 'Open', dateReported: '2025-10-30' },
    { id: 'c004', type: 'Post', targetId: 'p001', reporterId: 'u003', priority: 'Low', status: 'Resolved', dateReported: '2025-10-27' },
    { id: 'c005', type: 'User', targetId: 'u003', reporterId: 'u005', priority: 'Medium', status: 'Rejected', dateReported: '2025-10-26' },
];

// --- 2. HELPER FUNCTIONS ---

// Chip cho Status (Giữ nguyên)
const getStatusChip = (status: ComplaintData['status']): JSX.Element => {
    let color: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default';
    let Icon: typeof AccessTimeIcon = AccessTimeIcon;

    if (status === 'Resolved') {
        color = 'success';
        Icon = TaskAltIcon;
    } else if (status === 'Rejected') {
        color = 'error';
    } else if (status === 'Investigating') {
        color = 'info';
    } else if (status === 'Open') {
        color = 'warning';
    }

    return (
        <Chip 
            label={status} 
            size="small"
            color={color}
            icon={Icon !== AccessTimeIcon ? <Icon sx={{ fontSize: 16 }} /> : undefined}
            variant="outlined"
        />
    );
};

// Chip cho Priority (ĐÃ SỬA LỖI variant="filled")
const getPriorityChip = (priority: ComplaintData['priority']): JSX.Element => {
    let color: 'error' | 'warning' | 'default' = 'default';
    let Icon: typeof ReportIcon = LowPriorityIcon;

    if (priority === 'High') {
        color = 'error';
        Icon = WarningIcon;
    } else if (priority === 'Medium') {
        color = 'warning';
        Icon = ReportIcon;
    }

    return (
        <Chip 
            label={priority} 
            size="small"
            color={color}
            icon={<Icon sx={{ fontSize: 16 }} />}
            variant="filled" // SỬA: Dùng "filled" thay cho "contained"
        />
    );
};


const ComplaintManagementPage: React.FC = () => {
    const theme = useTheme();
    const [complaints, setComplaints] = useState<ComplaintData[]>(mockComplaints);
    const navigate = useNavigate();

    // --- 3. STATE CHO LỌC VÀ TÌM KIẾM (Giữ nguyên) ---
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterType, setFilterType] = useState<string>('All');
    const [filterPriority, setFilterPriority] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // --- 4. ACTIONS (Giữ nguyên) ---
    const handleRowClick = (complaintId: string) => {
        navigate(`/complaints/${complaintId}`); 
    };

    const updateComplaintStatus = (id: string, newStatus: ComplaintData['status']) => {
        setComplaints(complaints.map(c => 
            c.id === id ? { ...c, status: newStatus } : c
        ));
        console.log(`Complaint ${id} status updated to ${newStatus}.`);
    };

    // --- 5. LOGIC LỌC DỮ LIỆU (Giữ nguyên) ---
    const filteredComplaints = complaints.filter(c => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const statusMatch = filterStatus === 'All' || c.status === filterStatus;
        const typeMatch = filterType === 'All' || c.type === filterType;
        const priorityMatch = filterPriority === 'All' || c.priority === filterPriority;
        const searchMatch = c.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                            c.targetId.toLowerCase().includes(lowerCaseSearchTerm) || 
                            c.reporterId.toLowerCase().includes(lowerCaseSearchTerm);
        
        return statusMatch && typeMatch && priorityMatch && searchMatch;
    });
    
    // --- 6. RENDER (Giữ nguyên) ---
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <ReportIcon color="error" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Complaint Management
                </Typography>
            </Stack>

            <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                
                {/* Thanh Công cụ Lọc/Tìm kiếm */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
                    
                    <TextField
                        size="small"
                        placeholder="Search by ID, Target, Reporter..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                        }}
                        sx={{ width: { xs: '100%', sm: '300px' } }}
                    />
                    
                    {/* Lọc theo Status */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filterStatus}
                            label="Status"
                            onChange={(e) => setFilterStatus(e.target.value as string)}
                        >
                            <MenuItem value="All">All Statuses</MenuItem>
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Investigating">Investigating</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Lọc theo Type */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={filterType}
                            label="Type"
                            onChange={(e) => setFilterType(e.target.value as string)}
                        >
                            <MenuItem value="All">All Types</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Post">Post</MenuItem>
                            <MenuItem value="Transaction">Transaction</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Lọc theo Priority */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={filterPriority}
                            label="Priority"
                            onChange={(e) => setFilterPriority(e.target.value as string)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>

                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>Complaint ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Target ID</TableCell>
                                <TableCell>Reporter ID</TableCell>
                                <TableCell align="center">Priority</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredComplaints.map((c) => (
                                <TableRow 
                                    key={c.id} 
                                    hover
                                    onClick={(e) => {
                                        if (e.target instanceof HTMLElement && e.target.closest('button, .MuiSelect-root')) {
                                            return; 
                                        }
                                        handleRowClick(c.id);
                                    }}
                                    sx={{ 
                                        cursor: 'pointer',
                                        ...(c.priority === 'High' && { bgcolor: theme.palette.error.light + '1A' }) 
                                    }}
                                >
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={c.type} 
                                            size="small" 
                                            color={c.type === 'User' ? 'primary' : (c.type === 'Post' ? 'secondary' : 'default')} 
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{c.targetId}</TableCell>
                                    <TableCell>{c.reporterId}</TableCell>
                                    <TableCell align="center">{getPriorityChip(c.priority)}</TableCell>
                                    <TableCell>{c.dateReported}</TableCell>
                                    <TableCell align="center">{getStatusChip(c.status)}</TableCell>
                                    
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            {/* Nút Cập nhật trạng thái */}
                                            {c.status === 'Open' && (
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateComplaintStatus(c.id, 'Investigating');
                                                    }}
                                                >
                                                    Start Investigate
                                                </Button>
                                            )}
                                            {c.status === 'Investigating' && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateComplaintStatus(c.id, 'Resolved');
                                                    }}
                                                >
                                                    Resolve
                                                </Button>
                                            )}
                                            {/* Nút Reject */}
                                            {(c.status === 'Open' || c.status === 'Investigating') && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateComplaintStatus(c.id, 'Rejected');
                                                    }}
                                                >
                                                    Reject
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

export default ComplaintManagementPage;