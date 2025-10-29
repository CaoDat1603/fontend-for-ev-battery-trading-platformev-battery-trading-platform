import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Chip, TextField, Select, MenuItem, InputLabel, FormControl, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon cho Khiếu nại

// --- 1. DEFINITIONS ---
interface TransactionData {
    id: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    currency: 'VND' | 'USD';
    type: 'Deposit' | 'Withdrawal' | 'Purchase' | 'Sale';
    status: 'Completed' | 'Failed' | 'Pending';
    isDisputed: boolean; // Trạng thái khiếu nại
    dateCreated: string; // Định dạng YYYY-MM-DD
}

const mockTransactions: TransactionData[] = [
    { id: 't001', buyerId: 'u002', sellerId: 'u001', amount: 5000000, currency: 'VND', type: 'Purchase', status: 'Completed', isDisputed: false, dateCreated: '2025-10-25' },
    { id: 't002', buyerId: 'u003', sellerId: 'N/A', amount: 100, currency: 'USD', type: 'Deposit', status: 'Completed', isDisputed: false, dateCreated: '2025-10-24' },
    { id: 't003', buyerId: 'u004', sellerId: 'u005', amount: 1500000, currency: 'VND', type: 'Sale', status: 'Pending', isDisputed: false, dateCreated: '2025-10-25' },
    { id: 't004', buyerId: 'N/A', sellerId: 'u001', amount: 200, currency: 'USD', type: 'Withdrawal', status: 'Failed', isDisputed: true, dateCreated: '2025-10-20' },
    { id: 't005', buyerId: 'u005', sellerId: 'u002', amount: 12000000, currency: 'VND', type: 'Purchase', status: 'Completed', isDisputed: true, dateCreated: '2025-10-18' },
];

// --- 2. HELPER FUNCTIONS ---

// Chip cho Status
const getStatusChip = (status: 'Completed' | 'Failed' | 'Pending'): JSX.Element => {
    let color: 'success' | 'error' | 'warning' = 'warning';
    let Icon: typeof AccessTimeIcon = AccessTimeIcon;

    if (status === 'Completed') {
        color = 'success';
        Icon = CheckCircleOutlineIcon;
    } else if (status === 'Failed') {
        color = 'error';
        Icon = ErrorOutlineIcon;
    }

    return (
        <Chip 
            label={status} 
            size="small"
            color={color}
            icon={<Icon sx={{ fontSize: 16 }} />}
            variant="outlined"
        />
    );
};

// Định dạng tiền tệ
const formatCurrency = (amount: number, currency: 'VND' | 'USD'): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency === 'VND' ? 0 : 2,
    }).format(amount);
};


const TransactionManagementPage: React.FC = () => {
    const theme = useTheme();
    const [transactions, setTransactions] = useState<TransactionData[]>(mockTransactions);
    const navigate = useNavigate();

    // --- 3. STATE CHO LỌC VÀ TÌM KIẾM ---
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterType, setFilterType] = useState<string>('All');
    const [filterDispute, setFilterDispute] = useState<string>('All');
    const [filterDate, setFilterDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); // Tìm kiếm theo ID người dùng

    // --- 4. ACTIONS ---
    const handleRowClick = (transactionId: string) => {
        // Điều hướng đến trang chi tiết giao dịch: /transactions/:transactionId
        navigate(`/transactions/${transactionId}`); 
    };

    const handleToggleDispute = (id: string, currentStatus: boolean) => {
        setTransactions(transactions.map(tx => 
            tx.id === id ? { ...tx, isDisputed: !currentStatus } : tx
        ));
        console.log(`Transaction ${id} dispute status toggled.`);
    };

    // --- 5. LOGIC LỌC DỮ LIỆU ---
    const filteredTransactions = transactions.filter(tx => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Lọc theo Status (Completed/Failed/Pending)
        const statusMatch = filterStatus === 'All' || tx.status === filterStatus;

        // Lọc theo Type (Deposit/Withdrawal/Purchase/Sale)
        const typeMatch = filterType === 'All' || tx.type === filterType;

        // Lọc theo Dispute (Yes/No)
        const disputeMatch = filterDispute === 'All' || 
                             (filterDispute === 'Yes' && tx.isDisputed) || 
                             (filterDispute === 'No' && !tx.isDisputed);
        
        // Lọc theo Ngày
        const dateMatch = !filterDate || tx.dateCreated === filterDate;
        
        // Lọc theo ID người dùng (Buyer/Seller)
        const searchMatch = tx.buyerId.toLowerCase().includes(lowerCaseSearchTerm) || 
                            tx.sellerId.toLowerCase().includes(lowerCaseSearchTerm) ||
                            tx.id.toLowerCase().includes(lowerCaseSearchTerm);
        
        return statusMatch && typeMatch && disputeMatch && dateMatch && searchMatch;
    });
    
    // --- 6. RENDER ---
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <MonetizationOnIcon color="primary" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Transaction Management
                </Typography>
            </Stack>

            <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                
                {/* Thanh Công cụ Lọc/Tìm kiếm */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
                    
                    <TextField
                        size="small"
                        placeholder="Search by Txn ID, Buyer ID, Seller ID..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Failed">Failed</MenuItem>
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
                            <MenuItem value="Purchase">Purchase</MenuItem>
                            <MenuItem value="Sale">Sale</MenuItem>
                            <MenuItem value="Deposit">Deposit</MenuItem>
                            <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Lọc theo Dispute Status */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Dispute</InputLabel>
                        <Select
                            value={filterDispute}
                            label="Dispute"
                            onChange={(e) => setFilterDispute(e.target.value as string)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Yes">Disputed</MenuItem>
                            <MenuItem value="No">No Dispute</MenuItem>
                        </Select>
                    </FormControl>

                     {/* Lọc theo Ngày */}
                    <TextField
                        size="small"
                        label="Date"
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 120 }}
                    />

                </Stack>

                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>Txn ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Buyer ID</TableCell>
                                <TableCell>Seller ID</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="center">Dispute</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((tx) => (
                                <TableRow 
                                    key={tx.id} 
                                    hover
                                    onClick={(e) => {
                                        if (e.target instanceof HTMLElement && e.target.closest('button')) {
                                            return; 
                                        }
                                        handleRowClick(tx.id);
                                    }}
                                    sx={{ 
                                        cursor: 'pointer',
                                        // Tô màu nếu có khiếu nại
                                        ...(tx.isDisputed && { bgcolor: theme.palette.warning.light + '1A' }) 
                                    }}
                                >
                                    <TableCell>{tx.id}</TableCell>
                                    <TableCell>
                                        <Chip label={tx.type} size="small" color={tx.type.includes('Sale') || tx.type.includes('Purchase') ? 'primary' : 'default'} />
                                    </TableCell>
                                    <TableCell>{tx.buyerId}</TableCell>
                                    <TableCell>{tx.sellerId}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        {formatCurrency(tx.amount, tx.currency)}
                                    </TableCell>
                                    <TableCell>{tx.dateCreated}</TableCell>
                                    <TableCell align="center">
                                        {tx.isDisputed ? 
                                            <Chip 
                                                label="Disputed" 
                                                size="small" 
                                                color="warning" 
                                                icon={<ReportProblemIcon sx={{ fontSize: 16 }} />}
                                            /> : 
                                            'No'
                                        }
                                    </TableCell>
                                    <TableCell align="center">{getStatusChip(tx.status)}</TableCell>
                                    
                                    <TableCell align="center">
                                        <Button
                                            variant={tx.isDisputed ? "contained" : "outlined"}
                                            color={tx.isDisputed ? "warning" : "inherit"}
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleDispute(tx.id, tx.isDisputed);
                                            }}
                                        >
                                            {tx.isDisputed ? 'Resolve' : 'Mark Dispute'}
                                        </Button>
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

export default TransactionManagementPage;