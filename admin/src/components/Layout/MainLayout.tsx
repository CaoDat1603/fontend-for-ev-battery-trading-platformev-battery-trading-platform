import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Dùng Outlet để render các child route
import Header from '../Header/Header'; 
import Sidebar from '../Sidebar/Sidebar'; 

const DRAWER_WIDTH = 240; 
const COLLAPSED_WIDTH = 70;


const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(true); 

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* 1. Header */}
      <Header 
        drawerWidth={DRAWER_WIDTH} 
        open={open} 
        handleDrawerToggle={handleDrawerToggle}
      />
      
      {/* 2. Sidebar */}
      <Sidebar 
        drawerWidth={DRAWER_WIDTH} 
        collapsedWidth={COLLAPSED_WIDTH} // <<< KHẮC PHỤC LỖI TS TẠI ĐÂY
        open={open}
        />
      
      {/* 3. Vùng Nội dung Chính */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, 
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: (theme) => theme.palette.background.default, // Áp dụng màu nền Dashboard
        }}
      >
        <Toolbar /> {/* Thêm Toolbar để tạo khoảng trống bằng chiều cao Header */}
        <Outlet /> {/* Nơi các trang (DashboardPage, CustomersPage, ...) sẽ được render */}
      </Box>
    </Box>
  );
};

export default MainLayout;