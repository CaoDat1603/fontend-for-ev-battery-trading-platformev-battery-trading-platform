import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Button, Chip, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import SearchIcon from '@mui/icons-material/Search';
import FlagIcon from '@mui/icons-material/Flag'; // Icon cho spam/flag

// (Thêm định nghĩa PostData và mockPosts ở đây)
interface PostData {
    id: string;
    title: string;
    author: string;
    type: 'Sale' | 'Request';
    status: 'Pending' | 'Approved' | 'Rejected';
    isSpam: boolean;
    isVerified: boolean;
    dateSubmitted: string;
}

const mockPosts: PostData[] = [
    { id: 'p001', title: 'Bán pin Lithium-Ion LG mới 200Ah', author: 'user001', type: 'Sale', status: 'Pending', isSpam: false, isVerified: false, dateSubmitted: '2025-10-20' },
    { id: 'p002', title: 'Cần mua gấp 50 cell pin xe điện cũ', author: 'user003', type: 'Request', status: 'Approved', isSpam: false, isVerified: true, dateSubmitted: '2025-10-18' },
    { id: 'p003', title: '!!!!! CÁCH KIẾM TIỀN NHANH CHÓNG !!!!!', author: 'spam_bot', type: 'Sale', status: 'Pending', isSpam: true, isVerified: false, dateSubmitted: '2025-10-25' },
    { id: 'p004', title: 'Thanh lý lô pin Tesla Model 3', author: 'user005', type: 'Sale', status: 'Rejected', isSpam: false, isVerified: false, dateSubmitted: '2025-10-15' },
    { id: 'p005', title: 'Hợp tác kinh doanh pin năng lượng mặt trời', author: 'user002', type: 'Sale', status: 'Pending', isSpam: false, isVerified: false, dateSubmitted: '2025-10-22' },
];


// Hàm Helper cho Chip Status
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
            variant="outlined"
        />
    );
};


const ContentModerationPage: React.FC = () => {
    const theme = useTheme();
    const [posts, setPosts] = useState<PostData[]>(mockPosts);
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterDate, setFilterDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate();
    
    // --- ACTIONS ---
    const handleRowClick = (postId: string) => {
        // Điều hướng đến trang chi tiết tin đăng: /content/:postId
        navigate(`/content/${postId}`); 
    };

    const updatePostStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
        setPosts(posts.map(post => 
            post.id === id ? { ...post, status: newStatus } : post
        ));
        console.log(`Post ${id} status updated to ${newStatus}.`);
    };

    const toggleVerification = (id: string, currentStatus: boolean) => {
        setPosts(posts.map(post => 
            post.id === id ? { ...post, isVerified: !currentStatus } : post
        ));
        console.log(`Post ${id} verification status toggled.`);
    };
    
    // Lọc dữ liệu hiển thị
    const filteredPosts = posts.filter(post => {
        // Lọc theo Status
        const statusMatch = filterStatus === 'All' || post.status === filterStatus;

        // Lọc theo Title (Tìm kiếm)
        const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Lọc theo Ngày (chỉ khớp nếu filterDate có giá trị)
        const dateMatch = !filterDate || post.dateSubmitted === filterDate;
        
        return statusMatch && searchMatch && dateMatch;
    });

return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <VisibilityIcon color="action" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    Content Moderation
                </Typography>
            </Stack>

            <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                
                {/* Thanh Công cụ Lọc/Tìm kiếm (ĐÃ CẬP NHẬT) */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
                    <TextField
                        size="small"
                        placeholder="Search post titles..."
                        variant="outlined"
                        value={searchTerm} // Kèm state tìm kiếm
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                        }}
                        sx={{ width: { xs: '100%', sm: '250px' } }}
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
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Lọc theo Ngày */}
                    <TextField
                        size="small"
                        label="Submitted Date"
                        type="date" // Dùng type date để hiển thị lịch chọn
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="primary">Review Spam List</Button>
                </Stack>

                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Submitted</TableCell>
                                <TableCell align="center">Spam</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPosts.map((post) => (
                                <TableRow 
                                    key={post.id} 
                                    hover
                                    // <<< THÊM ONCLICK VÀ CON TRỎ >>>
                                    onClick={(e) => {
                                        // Ngăn không cho click vào hàng nếu click vào nút/chip
                                        if (e.target instanceof HTMLElement && e.target.closest('button, .MuiChip-root')) {
                                            return; 
                                        }
                                        handleRowClick(post.id);
                                    }}
                                    sx={{ 
                                        cursor: 'pointer', // Thêm con trỏ tay
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        ...(post.isSpam && { bgcolor: theme.palette.error.light + '1A' }) 
                                    }}
                                >
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell sx={{ fontWeight: post.isSpam ? 'bold' : 'normal', color: post.isSpam ? theme.palette.error.dark : 'text.primary' }}>
                                        {post.isSpam && <FlagIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.error.dark }} />}
                                        {post.title}
                                    </TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>
                                        <Chip label={post.type} size="small" color={post.type === 'Sale' ? 'primary' : 'secondary'} />
                                    </TableCell>
                                    <TableCell>{post.dateSubmitted}</TableCell>
                                    <TableCell align="center">
                                        {post.isSpam ? <Chip label="SPAM" size="small" color="error" /> : 'No'}
                                    </TableCell>
                                    <TableCell align="center">{getStatusChip(post.status)}</TableCell>
                                    
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            
                                            {/* Nút Phê duyệt/Từ chối */}
                                            {post.status === 'Pending' && (
                                                <>
                                                    <Button 
                                                        variant="contained" 
                                                        color="success" 
                                                        size="small"
                                                        onClick={() => updatePostStatus(post.id, 'Approved')}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button 
                                                        variant="outlined" 
                                                        color="error" 
                                                        size="small"
                                                        onClick={() => updatePostStatus(post.id, 'Rejected')}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}

                                            {/* Nút Gắn nhãn "Đã kiểm định" */}
                                            {post.status === 'Approved' && (
                                                <Button 
                                                    variant={post.isVerified ? "contained" : "outlined"}
                                                    // Đã sửa lỗi: Dùng spread operator để chỉ thêm color khi cần
                                                    {...(post.isVerified && { color: "primary" })} 
                                                    size="small"
                                                    startIcon={<VerifiedIcon />}
                                                    onClick={() => toggleVerification(post.id, post.isVerified)}
                                                    sx={{ minWidth: 120 }}
                                                >
                                                    {post.isVerified ? 'Verified' : 'Verify'}
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

export default ContentModerationPage;