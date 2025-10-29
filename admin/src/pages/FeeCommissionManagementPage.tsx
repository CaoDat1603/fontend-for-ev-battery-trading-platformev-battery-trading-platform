import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, // <<< Sử dụng Stack thay cho Grid
    TextField, Button, Divider, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy'; 
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SaveIcon from '@mui/icons-material/Save';

// --- 1. DEFINITIONS (Giữ nguyên) ---
interface FeeSettings {
    transactionFeeRate: number; // Tỷ lệ phí giao dịch (vd: 0.05 = 5%)
    withdrawalFeeFixed: number; // Phí rút tiền cố định (VND)
    commissionRateSeller: number; // Hoa hồng từ người bán
}

interface HistoryEntry {
    date: string;
    changer: string;
    description: string;
}

const initialSettings: FeeSettings = {
    transactionFeeRate: 0.05, // 5%
    withdrawalFeeFixed: 10000, // 10,000 VND
    commissionRateSeller: 0.02, // 2%
};

const mockHistory: HistoryEntry[] = [
    { date: '2025-10-20', changer: 'Admin Jane', description: 'Tăng Phí Giao dịch lên 5%.' },
    { date: '2025-09-01', changer: 'Super Admin', description: 'Thiết lập ban đầu: Phí rút tiền 10,000 VND.' },
];

// --- 2. HELPER FUNCTIONS (Giữ nguyên) ---
const formatPercentage = (rate: number): string => `${(rate * 100).toFixed(2)}%`;
const formatVND = (amount: number): string => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const FeeCommissionManagementPage: React.FC = () => {
    const theme = useTheme();
    const [settings, setSettings] = useState<FeeSettings>(initialSettings);
    const [draftSettings, setDraftSettings] = useState<FeeSettings>(initialSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // --- 3. HANDLERS (Giữ nguyên) ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = parseFloat(value) / 100;
        
        if (name === 'withdrawalFeeFixed') {
            processedValue = parseFloat(value);
        } else if (isNaN(processedValue) || processedValue < 0) {
            processedValue = 0; 
        }

        setDraftSettings({
            ...draftSettings,
            [name]: processedValue,
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        setAlertMessage(null);
        
        setTimeout(() => {
            const changes = [];
            if (settings.transactionFeeRate !== draftSettings.transactionFeeRate) {
                changes.push(`Transaction Fee rate changed to ${formatPercentage(draftSettings.transactionFeeRate)}`);
            }
            if (settings.withdrawalFeeFixed !== draftSettings.withdrawalFeeFixed) {
                 changes.push(`Withdrawal Fee changed to ${formatVND(draftSettings.withdrawalFeeFixed)}`);
            }
            if (settings.commissionRateSeller !== draftSettings.commissionRateSeller) {
                 changes.push(`Seller Commission Rate changed to ${formatPercentage(draftSettings.commissionRateSeller)}`);
            }
            
            if (changes.length > 0) {
                setSettings(draftSettings); 
                mockHistory.unshift({
                    date: new Date().toISOString().slice(0, 10),
                    changer: 'Current Admin',
                    description: changes.join('; '),
                });
                setAlertMessage('Settings saved successfully!');
            } else {
                setAlertMessage('No changes detected.');
            }
            
            setIsSaving(false);
        }, 1000);
    };

    // --- 4. RENDER (ĐÃ CẬP NHẬT: Thay Grid bằng Stack) ---
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <PolicyIcon color="action" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Fee & Commission Management
                </Typography>
            </Stack>

            {alertMessage && (
                <Alert severity={alertMessage.includes('successfully') ? 'success' : 'info'} sx={{ mb: 3 }}>
                    {alertMessage}
                </Alert>
            )}

            {/* Thay Grid Container bằng Box hoặc Stack */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}> 

                {/* --- A. Cài đặt Hiện tại (Phần tử 1) --- */}
                <Box sx={{ flexGrow: 1, minWidth: 300, maxWidth: { md: '40%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                             <MonetizationOnIcon color="primary" />
                             <Typography variant="h6" fontWeight="bold">Current Settings</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1" color="text.secondary">Transaction Fee Rate (Total Value)</Typography>
                            <Typography variant="h4" fontWeight="bold" color="text.primary">
                                {formatPercentage(settings.transactionFeeRate)}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1" color="text.secondary">Seller Commission Rate</Typography>
                            <Typography variant="h4" fontWeight="bold" color="text.primary">
                                {formatPercentage(settings.commissionRateSeller)}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body1" color="text.secondary">Fixed Withdrawal Fee</Typography>
                            <Typography variant="h4" fontWeight="bold" color="text.primary">
                                {formatVND(settings.withdrawalFeeFixed)}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>

                {/* --- B. Form Cập nhật (Phần tử 2) --- */}
                <Box sx={{ flexGrow: 2, minWidth: 350, maxWidth: { md: '58%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Update Settings</Typography>
                        <Divider sx={{ mb: 3 }} />

                        {/* Thay Grid bên trong bằng Stack */}
                        <Stack spacing={2}> 
                            
                            {/* Phí Giao dịch & Hoa hồng Người bán (Sử dụng Stack ngang) */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Transaction Fee Rate (%)"
                                    name="transactionFeeRate"
                                    type="number"
                                    value={draftSettings.transactionFeeRate * 100}
                                    onChange={handleInputChange}
                                    inputProps={{ step: 0.01 }}
                                    helperText="Phí tính trên tổng giá trị giao dịch."
                                />
                                <TextField
                                    fullWidth
                                    label="Seller Commission Rate (%)"
                                    name="commissionRateSeller"
                                    type="number"
                                    value={draftSettings.commissionRateSeller * 100}
                                    onChange={handleInputChange}
                                    inputProps={{ step: 0.01 }}
                                    helperText="Phần trăm hoa hồng người bán phải trả."
                                />
                            </Stack>
                            
                            {/* Phí Rút tiền Cố định (Dùng Stack/Box cho phần tử đơn) */}
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Fixed Withdrawal Fee (VND)"
                                    name="withdrawalFeeFixed"
                                    type="number"
                                    value={draftSettings.withdrawalFeeFixed}
                                    onChange={handleInputChange}
                                    helperText="Phí cố định cho mỗi lần rút tiền."
                                />
                            </Box>
                            
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    sx={{ mt: 2 }}
                                >
                                    {isSaving ? 'Saving...' : 'Save All Changes'}
                                </Button>
                            </Box>

                        </Stack>
                    </Paper>
                </Box>
            </Box>

            {/* --- C. Lịch sử Thay đổi (Phần tử 3) --- */}
            <Box sx={{ mt: 3 }}>
                <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Revision History</Typography>
                    
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Changer</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockHistory.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{entry.date}</TableCell>
                                        <TableCell>{entry.changer}</TableCell>
                                        <TableCell>{entry.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    );
};

export default FeeCommissionManagementPage;