import React, { useState, useEffect, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Divider, Chip, Button, Alert,
    Card, CardContent, List, ListItem, ListItemText, ListItemIcon, 
    TextField, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Icons
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import PersonIcon from '@mui/icons-material/Person';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// --- 1. DEFINITIONS (Mô phỏng dữ liệu chi tiết) ---
interface TransactionDetail {
    id: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    currency: 'VND' | 'USD';
    type: 'Deposit' | 'Withdrawal' | 'Purchase' | 'Sale';
    status: 'Completed' | 'Failed' | 'Pending' | 'Reversed';
    isDisputed: boolean; 
    dateCreated: string;
    dateCompleted: string | null;
    paymentMethod: string;
    itemReferenceId: string | null; // ID của sản phẩm/dịch vụ liên quan
    adminNotes: string; // Ghi chú của Admin
}

const mockTransactionDetails: TransactionDetail[] = [
    { 
        id: 't001', buyerId: 'u002', sellerId: 'u001', amount: 5000000, currency: 'VND', 
        type: 'Purchase', status: 'Completed', isDisputed: false, 
        dateCreated: '2025-10-25', dateCompleted: '2025-10-25', paymentMethod: 'Bank Transfer',
        itemReferenceId: 'p005', adminNotes: ''
    },
    { 
        id: 't004', buyerId: 'N/A', sellerId: 'u001', amount: 200, currency: 'USD', 
        type: 'Withdrawal', status: 'Failed', isDisputed: true, 
        dateCreated: '2025-10-20', dateCompleted: null, paymentMethod: 'PayPal',
        itemReferenceId: null, adminNotes: 'Seller u001 claim: System error on withdrawal, user needs refund.'
    },
    { 
        id: 't005', buyerId: 'u005', sellerId: 'u002', amount: 12000000, currency: 'VND', 
        type: 'Purchase', status: 'Completed', isDisputed: true, 
        dateCreated: '2025-10-18', dateCompleted: '2025-10-18', paymentMethod: 'E-Wallet',
        itemReferenceId: 'p010', adminNotes: 'Buyer u005 claims item not as described. Currently under review for potential refund/reversal.'
    },
];

// --- 2. HELPER FUNCTIONS ---

// Chip cho Status
const getStatusChip = (status: TransactionDetail['status']): JSX.Element => {
    let color: 'success' | 'error' | 'warning' | 'info' = 'warning';
    let Icon: typeof AccessTimeIcon = AccessTimeIcon;

    if (status === 'Completed') { color = 'success'; Icon = CheckCircleOutlineIcon; } 
    else if (status === 'Failed') { color = 'error'; Icon = ErrorOutlineIcon; } 
    else if (status === 'Reversed') { color = 'error'; Icon = ErrorOutlineIcon; }
    else if (status === 'Pending') { color = 'warning'; Icon = AccessTimeIcon; }

    return (
        <Chip 
            label={status} 
            size="medium"
            color={color}
            icon={<Icon sx={{ fontSize: 18 }} />}
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


const TransactionDetailPage: React.FC = () => {
    const { transactionId } = useParams<{ transactionId: string }>(); 
    const navigate = useNavigate();
    const theme = useTheme();

    const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [newAdminNotes, setNewAdminNotes] = useState('');
    const [action, setAction] = useState<'Reverse' | 'Complete' | 'Mark Resolved' | 'Mark Disputed'>('Mark Resolved');


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const foundTransaction = mockTransactionDetails.find(tx => tx.id === transactionId); 
            
            setTransaction(foundTransaction || null);
            setLoading(false);
            
            // Khởi tạo ghi chú admin bằng ghi chú hiện có
            if (foundTransaction?.adminNotes) {
                setNewAdminNotes(foundTransaction.adminNotes);
            }
        }, 500); 
    }, [transactionId]);

    // --- 3. ADMIN ACTIONS ---

    const handleApplyAction = () => {
        if (!transaction) return;
        
        let newStatus: TransactionDetail['status'] = transaction.status;
        let newDisputeStatus: boolean = transaction.isDisputed;
        let message = `Transaction ${transaction.id} notes updated.`;

        if (action === 'Reverse') {
            newStatus = 'Reversed';
            newDisputeStatus = false;
            message = `Transaction ${transaction.id} successfully **REVERSED** and dispute marked as resolved.`;
        } else if (action === 'Complete') {
            newStatus = 'Completed';
            newDisputeStatus = false;
            message = `Transaction ${transaction.id} manually **COMPLETED**.`;
        } else if (action === 'Mark Resolved') {
            newDisputeStatus = false;
            message = `Dispute for Transaction ${transaction.id} **RESOLVED** without status change.`;
        } else if (action === 'Mark Disputed') {
            newDisputeStatus = true;
            message = `Transaction ${transaction.id} **MARKED AS DISPUTED**.`;
        }


        // Cập nhật trạng thái và hành động (giả lập)
        setTransaction({ 
            ...transaction, 
            status: newStatus,
            isDisputed: newDisputeStatus,
            adminNotes: newAdminNotes,
        });

        alert(`Action Applied: ${message}\nNotes: ${newAdminNotes}`);
    };

    const handleGoBack = () => {
        navigate('/transactions'); 
    };
    
    // --- 4. RENDER ---
    if (loading) {
        return <Typography>Đang tải chi tiết giao dịch...</Typography>;
    }

    if (!transaction) {
        return (
            <Alert severity="error">
                <Typography>Không tìm thấy Transaction ID: **{transactionId}**.</Typography>
                <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
                    <ArrowBackIcon sx={{ mr: 1 }}/> Quay lại Danh sách Giao dịch
                </Button>
            </Alert>
        );
    }

    const isPendingOrFailed = transaction.status === 'Pending' || transaction.status === 'Failed';
    const isDisputed = transaction.isDisputed;

    return (
        <Box>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={handleGoBack} 
                sx={{ mb: 3 }}
                variant="outlined"
            >
                Quay lại Danh sách Giao dịch
            </Button>
            
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <MonetizationOnIcon color="primary" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Chi Tiết Giao Dịch: {transaction.id}
                </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                
                {/* --- A. THÔNG TIN CHUNG VÀ CHI TIẾT --- */}
                <Card sx={{ width: { xs: '100%', md: '65%' } }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6" fontWeight="bold" color="text.secondary">
                                Thông Tin Cơ Bản
                            </Typography>
                            {isDisputed && (
                                <Chip 
                                    label="DISPUTED" 
                                    color="error" 
                                    variant="filled" 
                                    icon={<ReportProblemIcon />} 
                                    size="medium" 
                                />
                            )}
                        </Stack>
                        
                        <Divider sx={{ my: 2 }} />

                        {/* Tổng quan */}
                        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                            <Paper sx={{ p: 2, bgcolor: theme.palette.primary.light + '20', flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary">Amount</Typography>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    {formatCurrency(transaction.amount, transaction.currency)}
                                </Typography>
                            </Paper>
                            <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100], flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary">Type</Typography>
                                <Typography variant="h6" fontWeight="bold">{transaction.type}</Typography>
                            </Paper>
                            <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100], flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary">Status</Typography>
                                {getStatusChip(transaction.status)}
                            </Paper>
                        </Stack>

                        {/* Chi tiết các bên */}
                        <List disablePadding dense>
                            <Divider component="li" sx={{ my: 1 }} />
                            <ListItem disableGutters>
                                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                                <ListItemText 
                                    primary="Buyer ID (Người Mua/Gửi Tiền)" 
                                    secondary={transaction.buyerId !== 'N/A' ? (
                                        <Typography 
                                            component="span" 
                                            sx={{ fontWeight: 'bold', cursor: 'pointer', color: theme.palette.info.main }} 
                                            onClick={() => navigate(`/users/${transaction.buyerId}`)}
                                        >
                                            {transaction.buyerId}
                                        </Typography>
                                    ) : "N/A"}
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemIcon><PersonIcon color="secondary" /></ListItemIcon>
                                <ListItemText 
                                    primary="Seller ID (Người Bán/Rút Tiền)" 
                                    secondary={transaction.sellerId !== 'N/A' ? (
                                        <Typography 
                                            component="span" 
                                            sx={{ fontWeight: 'bold', cursor: 'pointer', color: theme.palette.info.main }} 
                                            onClick={() => navigate(`/users/${transaction.sellerId}`)}
                                        >
                                            {transaction.sellerId}
                                        </Typography>
                                    ) : "N/A"}
                                />
                            </ListItem>
                            
                            <Divider component="li" sx={{ my: 1 }} />
                            
                            <ListItem disableGutters>
                                <ListItemIcon><AccountBalanceWalletIcon color="action" /></ListItemIcon>
                                <ListItemText 
                                    primary="Payment Method" 
                                    secondary={transaction.paymentMethod}
                                />
                                <ListItemText 
                                    primary="Transaction Date" 
                                    secondary={transaction.dateCreated}
                                />
                            </ListItem>
                            
                            <ListItem disableGutters>
                                <ListItemIcon><CheckCircleOutlineIcon color="action" /></ListItemIcon>
                                <ListItemText 
                                    primary="Completed Date" 
                                    secondary={transaction.dateCompleted || "N/A"}
                                />
                                {transaction.itemReferenceId && (
                                    <ListItemText 
                                        primary="Item/Content ID" 
                                        secondary={
                                            <Button 
                                                size="small" 
                                                onClick={() => navigate(`/content/${transaction.itemReferenceId}`)}
                                            >
                                                {transaction.itemReferenceId}
                                            </Button>
                                        }
                                    />
                                )}
                            </ListItem>
                            
                        </List>

                        <Divider sx={{ my: 3 }} />

                        {/* Ghi chú Admin */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Admin Notes (History):</Typography>
                        <Paper elevation={1} sx={{ p: 2, bgcolor: theme.palette.info.light + '1A', whiteSpace: 'pre-wrap' }}>
                             <Typography variant="body2" fontStyle="italic">
                                {transaction.adminNotes || "Chưa có ghi chú nào được lưu."}
                            </Typography>
                        </Paper>


                    </CardContent>
                </Card>

                {/* --- B. ADMIN ACTIONS --- */}
                <Stack spacing={3} sx={{ width: { xs: '100%', md: '35%' } }}>
                    
                    <Paper sx={{ p: 3, boxShadow: theme.shadows[3] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Khu Vực Xử Lý & Ghi Chú</Typography>
                        
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="action-label">Chọn Hành Động</InputLabel>
                                <Select
                                    labelId="action-label"
                                    value={action}
                                    label="Chọn Hành Động"
                                    onChange={(e) => setAction(e.target.value as any)}
                                >
                                    {/* Hành động chính */}
                                    <MenuItem value={'Mark Resolved'} disabled={!isDisputed}>✅ Mark Dispute Resolved</MenuItem>
                                    <MenuItem value={'Mark Disputed'} disabled={isDisputed}>🚩 Mark as Disputed</MenuItem>
                                    <Divider />
                                    {/* Hành động quản lý trạng thái */}
                                    <MenuItem value={'Reverse'} disabled={!isPendingOrFailed && !isDisputed}>🔁 Reverse Transaction (Refund/Rollback)</MenuItem>
                                    <MenuItem value={'Complete'} disabled={!isPendingOrFailed}>✔️ Manually Complete Transaction</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Ghi Chú Admin Mới"
                                value={newAdminNotes}
                                onChange={(e) => setNewAdminNotes(e.target.value)}
                                helperText="Tóm tắt hành động và lý do để lưu trữ."
                            />
                            
                            <Button 
                                startIcon={action.includes('Reverse') ? <WarningIcon /> : <CheckCircleOutlineIcon />} 
                                variant="contained" 
                                color={action.includes('Reverse') ? 'error' : 'primary'}
                                onClick={handleApplyAction}
                                disabled={!newAdminNotes} // Yêu cầu có ghi chú khi thực hiện hành động
                                sx={{ py: 1.5 }}
                            >
                                Apply Action & Update Notes
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
        </Box>
    );
};

export default TransactionDetailPage;