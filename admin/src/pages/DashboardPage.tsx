// src/pages/DashboardPage.tsx
import React from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Divider, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    useTheme, 
    Stack // <<< ĐÃ THÊM STACK
} from '@mui/material';
import { MetricCard } from '../components/Cards/MetricCard';
import SalesChart from '../components/Charts/SalesChart'; 
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';

// --- DỮ LIỆU GIẢ ĐỊNH (Giữ nguyên) ---
const metrics = [
    {
        title: 'Doanh thu',
        value: '$2,027',
        subValue: 'USD',
        comparisonPercentage: -12,
        comparisonPeriod: 'last week',
        chartColor: '#ff0000',
    },
    {
        title: 'Lượt Khách hàng',
        value: '227',
        comparisonPercentage: 0,
        comparisonPeriod: 'yesterday',
        chartColor: '#05aa10ff',
    },
    {
        title: 'Sản phẩm bán ra',
        value: '127',
        comparisonPercentage: 12,
        comparisonPeriod: 'last week',
        chartColor: '#05aa10ff',
    },
    {
        title: 'Thanh toán đang chờ',
        value: '12',
        comparisonPercentage: 25,
        comparisonPeriod: 'last week',
        chartColor: '#ffc107',
    },
];

const topSellingItems = [
    { name: 'Eco-Bag R-100', sales: 150, image: 'https://via.placeholder.com/40/0000FF/FFFFFF?text=B1' },
    { name: 'Renewable Bottle V2', sales: 120, image: 'https://via.placeholder.com/40/FF0000/FFFFFF?text=B2' },
    { name: 'Recycled Paper Set', sales: 90, image: 'https://via.placeholder.com/40/00FF00/FFFFFF?text=B3' },
    { name: 'Solar Charger Mini', sales: 85, image: 'https://via.placeholder.com/40/FFFF00/000000?text=S1' },
    { name: 'Compost Bin', sales: 60, image: 'https://via.placeholder.com/40/FFA500/FFFFFF?text=CB' },
];

const DashboardPage: React.FC = () => {
    const theme = useTheme();
    const userName = 'Admin';

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
                Welcome, {userName}!
            </Typography>

            {/* --- 1. METRIC CARDS ROW (Dùng Stack thay Grid) --- */}
            {/* chia 4 cột (md: 25%) */}
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                sx={{ mb: 4 }}
            >
                {metrics.map((metric, index) => (
                    <Box key={index} sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                        <MetricCard {...metric} chartColor={metric.chartColor} />
                    </Box>
                ))}
            </Stack>

            {/* --- 2. SALES CHART & TOP SELLING ROW (Dùng Stack thay Grid) --- */}
            {/* chia 8/4 (md: 66.67% / 33.33%) */}
            <Stack 
                direction={{ xs: 'column', md: 'row' }} 
                spacing={3}
            >
                
                {/* 2.1. Sales Chart */}
                <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Month wise sales
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <SalesChart /> 
                    </Paper>
                </Box>

                {/* 2.2. Top Selling Items */}
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1], height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Top Selling Item
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        
                        <List disablePadding>
                            {topSellingItems.map((item, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 1, borderBottom: index < topSellingItems.length - 1 ? `1px solid ${theme.palette.divider}` : 'none' }}>
                                    <ListItemAvatar>
                                        <Avatar src={item.image} alt={item.name} variant="rounded" sx={{ width: 40, height: 40 }}/>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={item.name} 
                                        secondary={`Sold: ${item.sales} units`}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                    <Typography variant="body2" color="primary" fontWeight="bold">
                                        #{index + 1}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Stack>
            
            {/* --- 3. KHU VỰC DƯỚI (Dùng Stack thay Grid) --- */}
            {/* chia 6/6 (md: 50% / 50%) */}
            <Stack 
                direction={{ xs: 'column', md: 'row' }} 
                spacing={3} 
                sx={{ mt: 3 }}
            >
                 {/* Item 1: Recent Customers */}
                 <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1], height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Recent Customers
                        </Typography>
                        <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                            <GroupIcon sx={{ mr: 1 }}/>
                            [Bảng khách hàng gần đây]
                        </Box>
                    </Paper>
                </Box>
                
                {/* Item 2: Pending Messages */}
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: theme.shadows[1], height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Pending Messages
                        </Typography>
                        <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                            <MessageIcon sx={{ mr: 1 }}/>
                            [Danh sách tin nhắn cần phản hồi]
                        </Box>
                    </Paper>
                </Box>
            </Stack>

        </Box>
    );
};

export default DashboardPage;