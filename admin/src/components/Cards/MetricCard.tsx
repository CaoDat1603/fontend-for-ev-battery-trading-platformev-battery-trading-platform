// src/components/Cards/MetricCard.tsx
import React from 'react';
import { Box, Typography, Paper, useTheme, Stack } from '@mui/material'; // Đã thay Grid bằng Stack
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Giả lập Component Biểu đồ nhỏ
interface MiniChartProps {
    color: string;
    isPositive: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ color, isPositive }) => (
    <Box 
        sx={{ 
            height: '60px', 
            width: '100%', 
            background: isPositive 
                ? `linear-gradient(to right, ${color} 50%, #f0f0f0 50%)`
                : `linear-gradient(to right, ${color} 30%, #f0f0f0 70%)`,
            opacity: 0.7,
            borderRadius: '4px'
        }} 
    />
);

interface MetricCardProps {
    title: string;
    value: string;
    subValue?: string;
    comparisonPercentage: number; 
    comparisonPeriod: string;     
    chartColor: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    subValue,
    comparisonPercentage,
    comparisonPeriod,
    chartColor,
}) => {
    const theme = useTheme();
    const isPositive = comparisonPercentage >= 0;
    const comparisonColor = isPositive ? theme.palette.success.main : theme.palette.error.main;

    return (
        <Paper 
            sx={{ 
                p: 2, 
                borderRadius: '8px', 
                boxShadow: theme.shadows[1],
                height: '100%',
            }}
        >
            {/* KHẮC PHỤC: Dùng Stack thay cho Grid container */}
            <Stack 
                direction="row" // Xếp ngang
                spacing={2} 
                alignItems="center" // Căn giữa theo chiều dọc
            >
                {/* Vùng Thông tin (Tương đương Grid 7) */}
                <Box sx={{ flexGrow: 1 }}> 
                    <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        fontWeight="bold" 
                        textTransform="uppercase"
                        gutterBottom
                    >
                        {title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                        <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mr: 1 }}>
                            {value}
                        </Typography>
                        {subValue && (
                            <Typography variant="subtitle2" color="text.secondary" sx={{ pb: '2px' }}>
                                {subValue}
                            </Typography>
                        )}
                    </Box>
                    
                    {/* Phần trăm so sánh (Dùng Box display: flex) */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isPositive 
                            ? <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5, color: comparisonColor }} /> 
                            : <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5, color: comparisonColor }} />
                        }
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 'bold', 
                                color: comparisonColor 
                            }}
                        >
                            {Math.abs(comparisonPercentage)}% {isPositive ? 'Increase' : 'Decrease'} 
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                            since {comparisonPeriod}
                        </Typography>
                    </Box>

                </Box>
                
                {/* Vùng Biểu đồ (Tương đương Grid 5) */}
                <Box sx={{ width: '100px' }}> {/* Thiết lập độ rộng cố định/tương đối cho biểu đồ */}
                    <MiniChart color={chartColor} isPositive={isPositive} />
                </Box>
            </Stack>
        </Paper>
    );
};