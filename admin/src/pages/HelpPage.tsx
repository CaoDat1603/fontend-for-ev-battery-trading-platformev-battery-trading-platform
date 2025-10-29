import React from 'react';
import { 
    Box, Typography, Stack, Divider, 
    Accordion, AccordionSummary, AccordionDetails, 
    Paper, List, ListItem, ListItemIcon, ListItemText, useTheme, Button 
} from '@mui/material';

// Icons
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import BugReportIcon from '@mui/icons-material/BugReport';

// Dữ liệu giả lập cho Câu hỏi thường gặp (FAQs)
const faqs = [
    {
        question: "Làm thế nào để duyệt một bài đăng mới?",
        answer: "Truy cập mục **'Content Moderation'**, chọn bài đăng có trạng thái **'Pending'**. Xem xét nội dung, kiểm tra người dùng vi phạm. Sau đó, nhấn nút **'Approve Post'** hoặc **'Reject / Take Down'** ở cột bên phải."
    },
    {
        question: "Điều gì xảy ra khi tôi 'Lock' (Khóa) một tài khoản?",
        answer: "Việc Khóa tài khoản sẽ ngay lập tức vô hiệu hóa khả năng đăng nhập và tương tác của người dùng đó trên hệ thống. Tài khoản sẽ giữ nguyên trạng thái 'Locked' cho đến khi được Admin mở khóa thủ công."
    },
    {
        question: "Làm sao để báo cáo lỗi hoặc sự cố kỹ thuật?",
        answer: "Vui lòng xem phần **'Technical Support'** dưới đây để gửi email trực tiếp đến đội ngũ IT. Hãy cung cấp càng nhiều thông tin chi tiết (URL, thời gian xảy ra lỗi, ảnh chụp màn hình) càng tốt."
    },
    {
        question: "Tôi có thể thay đổi phí giao dịch ở đâu?",
        answer: "Tất cả các cài đặt liên quan đến tài chính và phí hệ thống đều nằm trong mục **'Finance Settings'** trên thanh Sidebar."
    },
];

const HelpPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <HelpOutlineIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4" fontWeight="bold">
                    Trợ Giúp & Hỗ Trợ
                </Typography>
            </Stack>
            <Divider sx={{ mb: 4 }} />

            {/* --- 1. CÂU HỎI THƯỜNG GẶP (FAQs) --- */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Câu Hỏi Thường Gặp (FAQs)
            </Typography>
            <Box sx={{ mb: 4 }}>
                {faqs.map((faq, index) => (
                    <Accordion key={index} elevation={1}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography fontWeight="medium">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* --- 2. THÔNG TIN HỖ TRỢ & LIÊN HỆ --- */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Thông Tin Hỗ Trợ
            </Typography>
            <Paper sx={{ p: 3, boxShadow: theme.shadows[2] }}>
                <List disablePadding>
                    {/* Hỗ trợ Vận hành/Nội dung */}
                    <ListItem disableGutters>
                        <ListItemIcon><SupportAgentIcon color="info" /></ListItemIcon>
                        <ListItemText 
                            primary="Hỗ Trợ Vận Hành (Nội dung/Người dùng)" 
                            secondary="operation.support@admin-domain.com"
                        />
                        <Button variant="outlined" size="small" href="mailto:operation.support@admin-domain.com">Email</Button>
                    </ListItem>

                    <Divider component="li" sx={{ my: 1 }} />
                    
                    {/* Hỗ trợ Kỹ thuật */}
                    <ListItem disableGutters>
                        <ListItemIcon><BugReportIcon color="error" /></ListItemIcon>
                        <ListItemText 
                            primary="Báo Cáo Lỗi & Sự Cố Kỹ Thuật" 
                            secondary="tech.support@admin-domain.com"
                        />
                        <Button variant="outlined" size="small" href="mailto:tech.support@admin-domain.com">Email</Button>
                    </ListItem>

                    <Divider component="li" sx={{ my: 1 }} />
                    
                    {/* Tài liệu Admin */}
                    <ListItem disableGutters>
                        <ListItemIcon><EmailIcon color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="Truy Cập Tài Liệu Hướng Dẫn" 
                            secondary="SOPs, Quy tắc kiểm duyệt, Chính sách"
                        />
                        <Button variant="contained" color="secondary" size="small">View Docs</Button>
                    </ListItem>
                </List>
            </Paper>

        </Box>
    );
};

export default HelpPage;