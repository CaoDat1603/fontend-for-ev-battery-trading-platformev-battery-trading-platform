import React, { useState, useEffect, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Divider, Chip, Button, Alert,
    Card, CardContent, List, ListItem, ListItemText, ListItemIcon, 
    TextField, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Icons
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import FlagIcon from '@mui/icons-material/Flag';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import ReportIcon from '@mui/icons-material/Report';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

// --- 1. DEFINITIONS (Mô phỏng dữ liệu chi tiết) ---
// Định nghĩa Status và Priority dựa trên file Management
type ComplaintStatus = 'Open' | 'Investigating' | 'Resolved' | 'Rejected';
type ComplaintPriority = 'High' | 'Medium' | 'Low';
type ComplaintType = 'User' | 'Post' | 'Transaction';

interface ComplaintDetail {
    id: string;
    reporterId: string; // ID người báo cáo
    reporterName: string; // Tên người báo cáo (thêm vào mock)
    targetType: ComplaintType; // Loại đối tượng bị khiếu nại
    targetId: string; // ID đối tượng bị khiếu nại
    targetTitle?: string; // Tên/Tiêu đề của đối tượng (nếu có)
    category: string; // Loại vi phạm (Spam, Scam, Hate Speech, etc.)
    details: string; // Mô tả chi tiết của khiếu nại
    dateSubmitted: string;
    priority: ComplaintPriority;
    status: ComplaintStatus;
    actionTaken: string; // Hành động Admin đã thực hiện
}

const mockComplaintDetails: ComplaintDetail[] = [
    { 
        id: 'c001', reporterId: 'u004', reporterName: 'Alice', 
        targetType: 'Post', targetId: 'p003', targetTitle: 'Cần bán gấp xe đời cũ',
        category: 'Inappropriate Content', details: 'Bài đăng này chứa hình ảnh không phù hợp.',
        dateSubmitted: '2025-10-29', priority: 'High', status: 'Open', actionTaken: '' 
    },
    { 
        id: 'c002', reporterId: 'u005', reporterName: 'Bob', 
        targetType: 'User', targetId: 'u001', targetTitle: 'John Doe',
        category: 'Harassment', details: 'Người dùng này spam tin nhắn quấy rối tôi.',
        dateSubmitted: '2025-10-28', priority: 'Medium', status: 'Investigating', actionTaken: '' 
    },
    { 
        id: 'c003', reporterId: 'u002', reporterName: 'Charlie', 
        targetType: 'Transaction', targetId: 't004', targetTitle: 'Transaction #004',
        category: 'Payment Fraud', details: 'Người dùng đã không thanh toán sau khi nhận hàng.',
        dateSubmitted: '2025-10-30', priority: 'High', status: 'Open', actionTaken: '' 
    },
    { 
        id: 'c004', reporterId: 'u003', reporterName: 'David', 
        targetType: 'Post', targetId: 'p001', targetTitle: 'Nhà cho thuê giá rẻ',
        category: 'Misleading Info', details: 'Giá đăng khác với giá thực tế khi liên hệ.',
        dateSubmitted: '2025-10-27', priority: 'Low', status: 'Resolved', actionTaken: 'Contacted user to fix price. Status changed to Low Priority.'
    },
];

// --- 2. HELPER FUNCTIONS ---
const getStatusChip = (status: ComplaintStatus): JSX.Element => {
    let color: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default';
    let Icon: typeof AccessTimeIcon = AccessTimeIcon;

    if (status === 'Resolved') { color = 'success'; Icon = CheckCircleIcon; } 
    else if (status === 'Rejected') { color = 'error'; Icon = BlockIcon; } 
    else if (status === 'Investigating') { color = 'info'; Icon = VpnKeyIcon; } 
    else if (status === 'Open') { color = 'warning'; Icon = AccessTimeIcon; }

    return (
        <Chip 
            label={status} 
            size="medium" // Dùng medium cho trang chi tiết
            color={color}
            icon={<Icon sx={{ fontSize: 18 }} />}
            variant="filled"
        />
    );
};

const getPriorityChip = (priority: ComplaintPriority): JSX.Element => {
    let color: 'error' | 'warning' | 'default' = 'default';
    let Icon: typeof ReportIcon = LowPriorityIcon;

    if (priority === 'High') { color = 'error'; Icon = WarningIcon; } 
    else if (priority === 'Medium') { color = 'warning'; Icon = ReportIcon; }

    return (
        <Chip 
            label={priority} 
            size="medium"
            color={color}
            icon={<Icon sx={{ fontSize: 18 }} />}
            variant="filled" 
        />
    );
};


const ComplaintDetailPage: React.FC = () => {
    const { complaintId } = useParams<{ complaintId: string }>(); 
    const navigate = useNavigate();
    const theme = useTheme();

    const [complaint, setComplaint] = useState<ComplaintDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminNotes, setAdminNotes] = useState('');
    const [action, setAction] = useState<string>('Mark Resolved'); // Mặc định là Resolved

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const foundComplaint = mockComplaintDetails.find(c => c.id === complaintId); 
            setComplaint(foundComplaint || null);
            setLoading(false);
            
            // Thiết lập ghi chú admin nếu đã có hành động trước đó
            if (foundComplaint?.actionTaken) {
                setAdminNotes(foundComplaint.actionTaken);
            }
        }, 500); 
    }, [complaintId]);

    // --- 3. ADMIN ACTIONS ---

    const handleApplyAction = () => {
        if (!complaint) return;
        
        let newStatus: ComplaintStatus = 'Resolved';
        let message = `Complaint ${complaint.id} marked as Resolved.`;

        if (action === 'Block User') {
            message = `User ${complaint.targetId} Blocked & Complaint Resolved.`;
        } else if (action === 'Take Down Post') {
            message = `Post ${complaint.targetId} Taken Down & Complaint Resolved.`;
        } else if (action === 'Mark Rejected') {
            newStatus = 'Rejected';
            message = `Complaint ${complaint.id} marked as Rejected.`;
        }

        // Cập nhật trạng thái và hành động (giả lập)
        setComplaint({ 
            ...complaint, 
            status: newStatus,
            actionTaken: adminNotes || message, // Lưu ghi chú Admin làm hành động
        });
        
        // Cần tích hợp API call thực tế ở đây
        alert(`Action Applied: ${message}\nNotes: ${adminNotes}`);
    };

    const handleGoBack = () => {
        // Quay lại trang quản lý khiếu nại
        navigate('/complaints'); 
    };
    
    // --- 4. RENDER ---
    if (loading) {
        return <Typography>Đang tải chi tiết khiếu nại...</Typography>;
    }

    if (!complaint) {
        return (
            <Alert severity="error">
                <Typography>Không tìm thấy Complaint ID: **{complaintId}**.</Typography>
                <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
                    <ArrowBackIcon sx={{ mr: 1 }}/> Quay lại Danh sách Khiếu nại
                </Button>
            </Alert>
        );
    }

    const isResolved = complaint.status === 'Resolved' || complaint.status === 'Rejected';

    return (
        <Box>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={handleGoBack} 
                sx={{ mb: 3 }}
                variant="outlined"
            >
                Quay lại Danh sách Khiếu nại
            </Button>
            
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <ReportProblemIcon color="error" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Chi Tiết Khiếu Nại: {complaint.id}
                </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                
                {/* --- A. THÔNG TIN KHIẾU NẠI & CHI TIẾT --- */}
                <Card sx={{ width: { xs: '100%', md: '65%' }, order: { xs: 2, md: 1 } }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                            Thông Tin Chung
                        </Typography>
                        
                        <List disablePadding dense>
                            {/* Priority & Status */}
                            <ListItem disableGutters>
                                <ListItemText primary="Priority" secondary={getPriorityChip(complaint.priority)} />
                                <ListItemText primary="Status" secondary={getStatusChip(complaint.status)} />
                            </ListItem>
                            <Divider component="li" sx={{ my: 1 }} />
                            
                            {/* Loại Vi Phạm */}
                            <ListItem disableGutters>
                                <ListItemIcon><FlagIcon color="warning" /></ListItemIcon>
                                <ListItemText 
                                    primary="Violation Category" 
                                    secondary={<Chip label={complaint.category} size="small" />}
                                />
                            </ListItem>
                            {/* Người Báo Cáo */}
                            <ListItem disableGutters>
                                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                                <ListItemText 
                                    primary="Reported By" 
                                    secondary={
                                        <Typography 
                                            component="span" 
                                            sx={{ fontWeight: 'bold', cursor: 'pointer', color: theme.palette.info.main }} 
                                            onClick={() => navigate(`/users/${complaint.reporterId}`)}
                                        >
                                            {complaint.reporterName} ({complaint.reporterId})
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {/* Ngày Gửi */}
                            <ListItem disableGutters>
                                <ListItemIcon><AccessTimeIcon color="action" /></ListItemIcon>
                                <ListItemText 
                                    primary="Submitted Date" 
                                    secondary={complaint.dateSubmitted}
                                />
                            </ListItem>
                            
                            <Divider sx={{ my: 3 }} />

                            {/* Thông tin Đối tượng bị Khiếu nại */}
                            <Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                                Đối Tượng Bị Khiếu Nại ({complaint.targetType})
                            </Typography>
                            <ListItem disableGutters sx={{ py: 1, border: `1px solid ${theme.palette.divider}`, borderRadius: '4px', px: 1 }}>
                                <ListItemIcon>
                                    {complaint.targetType === 'Post' ? <AssignmentIcon color="secondary" /> 
                                    : complaint.targetType === 'User' ? <PersonIcon color="secondary" /> 
                                    : <VpnKeyIcon color="secondary" />}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={complaint.targetTitle || `Target ID: ${complaint.targetId}`} 
                                    secondary={`ID: ${complaint.targetId} | Type: ${complaint.targetType}`}
                                />
                                <Button 
                                    size="small" 
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        let path = '';
                                        if (complaint.targetType === 'Post') path = '/content';
                                        else if (complaint.targetType === 'User') path = '/users';
                                        else path = '/transactions'; // Giả định
                                        
                                        navigate(`${path}/${complaint.targetId}`);
                                    }}
                                >
                                    Xem Chi Tiết
                                </Button>
                            </ListItem>
                            
                        </List>

                        <Divider sx={{ my: 3 }} />

                        {/* Mô tả chi tiết của Khiếu nại */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Mô tả Chi tiết:</Typography>
                        <Paper elevation={1} sx={{ p: 2, bgcolor: theme.palette.grey[50], borderLeft: `4px solid ${theme.palette.error.main}` }}>
                             <Typography variant="body1">
                                {complaint.details}
                            </Typography>
                        </Paper>


                    </CardContent>
                </Card>

                {/* --- B. ADMIN ACTIONS & NOTES --- */}
                <Stack spacing={3} sx={{ width: { xs: '100%', md: '35%' }, order: { xs: 1, md: 2 } }}>
                    
                    {/* HÀNH ĐỘNG XỬ LÝ */}
                    <Paper sx={{ p: 3, boxShadow: theme.shadows[3] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Khu Vực Xử Lý</Typography>
                        
                        {/* Nếu đã xử lý, hiển thị hành động đã thực hiện */}
                        {isResolved ? (
                            <Alert severity={complaint.status === 'Resolved' ? 'success' : 'error'}>
                                **Đã Xử Lý:** {complaint.status}
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    **Admin Note:** {complaint.actionTaken || "Không có ghi chú chi tiết."}
                                </Typography>
                            </Alert>
                        ) : (
                            <Stack spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="action-label">Chọn Hành Động</InputLabel>
                                    <Select
                                        labelId="action-label"
                                        value={action}
                                        label="Chọn Hành Động"
                                        onChange={(e) => setAction(e.target.value as string)}
                                    >
                                        {/* Hành động chính */}
                                        <MenuItem value={'Mark Resolved'}>✅ Mark Resolved (Không cần hành động mạnh)</MenuItem>
                                        <MenuItem value={'Mark Rejected'}>❌ Mark Rejected (Khiếu nại không hợp lệ)</MenuItem>
                                        <Divider />
                                        {/* Hành động mạnh hơn tùy theo Target Type */}
                                        {complaint.targetType === 'User' && <MenuItem value={'Block User'}>🛑 Block User Permanently</MenuItem>}
                                        {complaint.targetType === 'Post' && <MenuItem value={'Take Down Post'}>🗑️ Take Down Post</MenuItem>}
                                    </Select>
                                </FormControl>
                                
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Ghi Chú Admin (Bắt buộc nếu có hành động)"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    helperText="Tóm tắt hành động đã thực hiện hoặc lý do từ chối để lưu trữ."
                                />
                                
                                <Button 
                                    startIcon={action.includes('Block') || action.includes('Take Down') ? <WarningIcon /> : <CheckCircleIcon />} 
                                    variant="contained" 
                                    color={action.includes('Block') || action.includes('Take Down') ? 'error' : 'success'}
                                    onClick={handleApplyAction}
                                    disabled={!adminNotes && (action === 'Block User' || action === 'Take Down Post' || action === 'Mark Rejected')}
                                    sx={{ py: 1.5 }}
                                >
                                    Áp Dụng Hành Động & Hoàn Tất Review
                                </Button>
                            </Stack>
                        )}
                    </Paper>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ComplaintDetailPage;