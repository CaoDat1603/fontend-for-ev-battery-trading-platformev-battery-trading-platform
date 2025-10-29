import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Màu xanh chủ đạo gần giống trong hình mẫu
const PRIMARY_BLUE = '#05aa10ff'; 
const SECONDARY_COLOR = '#ffc107'; 

// Định nghĩa Theme
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_BLUE,
      light: '#06e014ff',
      dark: '#1cff2b94',
      contrastText: '#ffffff',
    },
    secondary: {
      main: SECONDARY_COLOR,
      contrastText: '#000000',
    },
    error: {
        main: red.A400,
    },
    background: {
      default: '#f4f6f8', // Màu nền nhẹ cho Dashboard
      paper: '#ffffff',
    },
    text: {
      primary: '#333333', // Màu chữ đậm
      secondary: '#777777', // Màu chữ phụ
    },
  },
  typography: {
    fontFamily: [
      'Roboto', 
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    // Tùy chỉnh Drawer (Sidebar)
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(0, 0, 0, 0.08)', 
          boxShadow: 'none',
        },
      },
    },
    // Tùy chỉnh AppBar (Header)
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)', 
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme;