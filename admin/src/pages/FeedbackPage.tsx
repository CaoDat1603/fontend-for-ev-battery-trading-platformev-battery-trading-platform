import React, { useState } from 'react';
import { 
    Box, Typography, Stack, Divider, 
    Paper, TextField, Select, MenuItem, InputLabel, 
    FormControl, Button, useTheme, Alert
} from '@mui/material';

// Icons
import FeedbackIcon from '@mui/icons-material/Feedback';
import SendIcon from '@mui/icons-material/Send';

const FeedbackPage: React.FC = () => {
    const theme = useTheme();
    
    const [type, setType] = useState<'Suggestion' | 'Bug Report' | 'Feature Request'>('Suggestion');
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // --- Logic giả lập gửi phản hồi ---
        console.log("Feedback Submitted:", { type, subject, details });
        
        // Reset form và hiển thị thông báo
        setIsSubmitted(true);
        setType('Suggestion');
        setSubject('');
        setDetails('');

        // Tự động ẩn thông báo sau 5 giây (mock)
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <FeedbackIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h4" fontWeight="bold">
                    Gửi Phản Hồi & Đề Xuất
                </Typography>
            </Stack>
            <Divider sx={{ mb: 4 }} />

            {isSubmitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Cảm ơn bạn! Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ xem xét sớm nhất có thể.
                </Alert>
            )}

            <Paper 
                sx={{ p: 4, maxWidth: 800, mx: 'auto', boxShadow: theme.shadows[3] }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Form Phản Hồi Hệ Thống
                </Typography>

                <Stack spacing={3}>
                    {/* Loại Phản Hồi */}
                    <FormControl fullWidth required>
                        <InputLabel id="feedback-type-label">Loại Phản Hồi</InputLabel>
                        <Select
                            labelId="feedback-type-label"
                            value={type}
                            label="Loại Phản Hồi"
                            onChange={(e) => setType(e.target.value as 'Suggestion' | 'Bug Report' | 'Feature Request')}
                        >
                            <MenuItem value={'Suggestion'}>Đề xuất cải tiến chung</MenuItem>
                            <MenuItem value={'Bug Report'}>Báo cáo lỗi (Bug Report)</MenuItem>
                            <MenuItem value={'Feature Request'}>Yêu cầu tính năng mới</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Tiêu đề */}
                    <TextField
                        label="Tiêu đề / Tóm tắt"
                        variant="outlined"
                        fullWidth
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Ví dụ: Lỗi không thể duyệt bài đăng p003"
                    />

                    {/* Chi tiết */}
                    <TextField
                        label="Mô tả chi tiết"
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={6}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        helperText={`Mô tả các bước tái tạo lỗi (nếu là Bug) hoặc chi tiết lợi ích của tính năng đề xuất (nếu là Feature Request).`}
                    />
                    
                    <Divider sx={{ mt: 2 }} />

                    {/* Nút Gửi */}
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<SendIcon />}
                        sx={{ py: 1.5 }}
                        disabled={!subject || !details}
                    >
                        Gửi Phản Hồi
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default FeedbackPage;