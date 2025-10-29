import React, { useState, useEffect, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Divider, Chip, Button, Alert,
    Card, CardContent, List, ListItem, ListItemText, ListItemIcon, 
    TextField,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // ICON MỚI

// --- 1. DEFINITIONS ---
interface PostDetail {
    id: string;
    title: string;
    content: string; 
    category: string;
    authorId: string;
    author: string;
    type: 'Sale' | 'Request';
    status: 'Pending' | 'Approved' | 'Rejected';
    isSpam: boolean;
    isVerified: boolean;
    dateSubmitted: string;
    relatedComplaintIds: string[]; 
    adminNotes: string; 
}

const mockPostDetails: PostDetail[] = [
    { 
        id: 'p001', 
        title: 'Bán pin Lithium-Ion LG mới 200Ah', 
        content: 'Đây là nội dung chi tiết của tin đăng p001. Pin mới 100%, có đầy đủ giấy tờ nhập khẩu. Liên hệ 09x-xxx-xxxx để xem hàng trực tiếp.',
        category: 'Batteries', authorId: 'u001', author: 'Alice Smith', type: 'Sale', 
        status: 'Pending', isSpam: false, isVerified: false, dateSubmitted: '2025-10-20', 
        relatedComplaintIds: [], adminNotes: '' 
    },
    { 
        id: 'p002', 
        title: 'Cần mua gấp 50 cell pin xe điện cũ', 
        content: 'Tôi đang tìm mua 50 cell pin xe điện đã qua sử dụng, yêu cầu dung lượng còn trên 70%. Cần gấp trong tuần này.',
        category: 'Request', authorId: 'u003', author: 'Charlie Brown', type: 'Request', 
        status: 'Approved', isSpam: false, isVerified: true, dateSubmitted: '2025-10-18', 
        relatedComplaintIds: [], adminNotes: 'Standard user. Approved and Verified.'
    },
    { 
        id: 'p003', 
        title: '!!!!! CÁCH KIẾM TIỀN NHANH CHÓNG !!!!!', 
        content: 'Cơ hội đổi đời chỉ trong 1 tuần. Nhắn tin Zalo ngay để nhận đường link. Cam kết lãi 1000% sau 3 ngày. [Nội dung lặp lại lặp lại lặp lại...]',
        category: 'Uncategorized/Spam', authorId: 'spam_bot', author: 'Spam Advertiser 1', type: 'Sale', 
        status: 'Pending', isSpam: true, isVerified: false, dateSubmitted: '2025-10-25', 
        relatedComplaintIds: ['c006', 'c007'], adminNotes: 'High likelihood of scam/spam. Requires immediate rejection.'
    },
];

// --- 2. HELPER FUNCTIONS ---
const getStatusChip = (status: 'Pending' | 'Approved' | 'Rejected'): JSX.Element => {
    let color: 'default' | 'success' | 'error' | 'warning' = 'default';
    if (status === 'Approved') color = 'success';
    else if (status === 'Rejected') color = 'error';
    else if (status === 'Pending') color = 'warning';

    return (
        <Chip 
            label={status} 
            size="small"
            color={color}
            variant="filled"
        />
    );
};

const PostDetailPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); 
    const navigate = useNavigate();
    const theme = useTheme();

    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminNotes, setAdminNotes] = useState('');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const foundPost = mockPostDetails.find(p => p.id === postId); 
            
            setPost(foundPost || null);
            if (foundPost) {
                setAdminNotes(foundPost.adminNotes);
            }
            setLoading(false);
        }, 500); 
    }, [postId]);

    // --- 3. ADMIN ACTIONS (Giữ nguyên) ---

    const updateStatus = (newStatus: 'Approved' | 'Rejected') => {
        if (post) {
            setPost({ ...post, status: newStatus });
            alert(`Post ${post.id} status changed to ${newStatus}!`);
        }
    };

    const toggleVerification = () => {
        if (post) {
            setPost({ ...post, isVerified: !post.isVerified });
            alert(`Post ${post.id} verification toggled to ${!post.isVerified}.`);
        }
    };
    
    const handleViewAuthor = () => {
        if (post) {
            navigate(`/users/${post.authorId}`); 
        }
    };

    const handleViewComplaints = () => {
        if (post?.relatedComplaintIds.length) {
            navigate(`/complaints?targetId=${post.id}`);
        }
    };

    // CHỨC NĂNG MỚI: Quay lại trang kiểm duyệt nội dung
    const handleGoBack = () => {
        navigate('/content'); // Giả định Route của trang danh sách là /content-moderation
    };
    
    // --- 4. RENDER ---
    if (loading) {
        return <Typography>Loading Post Details...</Typography>;
    }

    if (!post) {
        const displayId = postId || 'N/A';
        return (
            <Alert severity="error">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight="bold">Post ID:</Typography>
                    <Chip label={displayId} color="error" size="small" variant="outlined" />
                    <Typography>not found in the database. Please check URL or Mock Data.</Typography>
                </Stack>
                <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
                    <ArrowBackIcon sx={{ mr: 1 }}/> Go back to Moderation List
                </Button>
            </Alert>
        );
    }

    return (
        <Box>
            {/* THÊM NÚT QUAY LẠI */}
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={handleGoBack} 
                sx={{ mb: 3 }}
            >
                Back to Content Moderation
            </Button>
            
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <AssignmentIcon color="secondary" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Post Detail: {post.title}
                </Typography>
                {post.isSpam && <Chip label="SPAM SUSPECT" color="error" size="medium" icon={<FlagIcon />} />}
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                
                {/* --- A. THÔNG TIN CƠ BẢN & NỘI DUNG --- (Giữ nguyên) */}
                <Card sx={{ width: { xs: '100%', md: '65%' } }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h5" color="text.secondary">
                                ID: **{post.id}**
                            </Typography>
                            {getStatusChip(post.status)}
                        </Stack>
                        
                        <Divider sx={{ mb: 2 }} />

                        {/* Metadata */}
                        <List disablePadding dense>
                            <ListItem disableGutters>
                                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                                <ListItemText 
                                    primary="Author" 
                                    secondary={
                                        <Box 
                                            component="span" 
                                            sx={{ fontWeight: 'bold', cursor: 'pointer', color: theme.palette.info.main }} 
                                            onClick={handleViewAuthor}
                                        >
                                            {post.author} ({post.authorId})
                                        </Box>
                                    }
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemIcon><AccessTimeIcon color="action" /></ListItemIcon>
                                <ListItemText 
                                    primary="Submitted Date" 
                                    secondary={post.dateSubmitted}
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemIcon>
                                    {post.isVerified ? <VerifiedIcon color="success" /> : <VerifiedIcon color="disabled" />}
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Verification Status" 
                                    secondary={post.isVerified ? 'VERIFIED' : 'Not Verified'}
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemIcon><AssignmentIcon color="action" /></ListItemIcon>
                                <ListItemText 
                                    primary="Type / Category" 
                                    secondary={`${post.type} / ${post.category}`}
                                />
                            </ListItem>
                        </List>

                        <Divider sx={{ my: 3 }} />

                        {/* Nội dung chi tiết */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Full Content:</Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.grey[100], whiteSpace: 'pre-wrap' }}>
                             <Typography variant="body1">
                                {post.content}
                            </Typography>
                        </Paper>


                    </CardContent>
                </Card>

                {/* --- B. ADMIN ACTIONS & NOTES --- (Giữ nguyên) */}
                <Stack spacing={3} sx={{ width: { xs: '100%', md: '35%' } }}>
                    
                    {/* HÀNH ĐỘNG KIỂM DUYỆT */}
                    <Paper sx={{ p: 3, boxShadow: theme.shadows[2] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Moderation Actions</Typography>
                        <Stack spacing={1}>
                            
                            {/* Duyệt/Từ chối */}
                            {post.status !== 'Approved' && (
                                <Button 
                                    startIcon={<CheckCircleIcon />} 
                                    variant="contained" 
                                    color="success" 
                                    onClick={() => updateStatus('Approved')}
                                >
                                    Approve Post
                                </Button>
                            )}
                            {post.status !== 'Rejected' && (
                                <Button 
                                    startIcon={<BlockIcon />} 
                                    variant="outlined" 
                                    color="error" 
                                    onClick={() => updateStatus('Rejected')}
                                >
                                    Reject / Take Down
                                </Button>
                            )}
                            
                            <Divider sx={{ my: 1 }} />
                            
                            {/* Gắn nhãn Đã kiểm định */}
                             <Button 
                                variant={post.isVerified ? "contained" : "outlined"}
                                color="primary" 
                                size="medium"
                                startIcon={<VerifiedIcon />}
                                onClick={toggleVerification}
                            >
                                {post.isVerified ? 'Remove Verification' : 'Mark as Verified'}
                            </Button>
                            
                            <Divider sx={{ my: 1 }} />
                            
                            {/* Xử lý Khiếu nại */}
                            <Button 
                                startIcon={<ReportProblemIcon />} 
                                variant="contained" 
                                color={post.relatedComplaintIds.length > 0 ? 'warning' : 'inherit'}
                                disabled={post.relatedComplaintIds.length === 0}
                                onClick={handleViewComplaints}
                            >
                                View Related Complaints ({post.relatedComplaintIds.length})
                            </Button>
                        </Stack>
                    </Paper>
                    
                    {/* GHI CHÚ CỦA ADMIN */}
                    <Paper sx={{ p: 3, boxShadow: theme.shadows[2] }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Admin Notes</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Internal Notes"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                        />
                        <Button size="small" variant="contained" color="primary" sx={{ mt: 1 }}>Save Notes</Button>
                    </Paper>

                </Stack>
            </Stack>
        </Box>
    );
};

export default PostDetailPage;