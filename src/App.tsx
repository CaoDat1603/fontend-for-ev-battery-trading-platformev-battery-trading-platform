// src/App.tsx (Ví dụ cấu hình định tuyến chuẩn)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material'; // Thêm Box và Toolbar
import { Header } from './components/Header'; // Giả định component Header
import { Footer } from './components/Footer'; // Giả định component Footer
import { HomePage } from './pages/HomePage'; 
import { EcycleCategoryPage } from './pages/EcycleCategoryPage';

// Placeholder cho các trang chưa có component cụ thể
const PlaceholderPage = ({ title }: { title: string }) => (
    <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ color: '#1976d2' }}>{title}</h1>
        <p>Đây là trang danh mục sản phẩm. Nội dung sẽ được cập nhật sau.</p>
    </div>
);

const App: React.FC = () => {
    return (
        <Router>
            {/* 1. HEADER CỐ ĐỊNH (STICKY) */}
            {/* Box này bọc Header và giữ nó cố định ở vị trí trên cùng */}
            <Box 
                sx={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 1100, // Đảm bảo Header luôn hiển thị trên cùng
                    backgroundColor: 'white', // Tránh bị trong suốt
                    boxShadow: 2 // Thêm shadow nhẹ cho Header nổi bật hơn
                }}
            >
                <Header /> 
            </Box>
            
            {/* 2. KHOẢNG ĐỆM: Dùng Toolbar rỗng để tạo khoảng trống bằng chiều cao Header 
                (giúp nội dung không bị Header che mất khi cuộn)
            */}


            {/* 3. NỘI DUNG CHÍNH (MAIN CONTENT) */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                    {/* Đảm bảo đường dẫn gốc (/) trỏ về HomePage */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Các Routes chính */}
                    <Route path="/o-to-dien" element={<EcycleCategoryPage />} /> 
                    <Route path="/xe-may-dien" element={<PlaceholderPage title="Xe Máy Điện" />} />
                    <Route path="/pin-xe-dien" element={<PlaceholderPage title="Pin Xe Điện" />} />
                </Routes>
            </Box>

            {/* 4. FOOTER */}
            <Footer />
        </Router>
    );
};

export default App;
