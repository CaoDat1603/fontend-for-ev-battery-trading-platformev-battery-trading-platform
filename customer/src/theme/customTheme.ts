// src/theme/customTheme.ts

import { 
    createTheme, 
    type ThemeOptions, 
    // ********** CẦN THIẾT: IMPORT CÁC TYPES NÀY **********
    type Palette, 
    type PaletteColor, 
    type PaletteColorOptions, 
} from '@mui/material/styles';

// --- 1. Định nghĩa Màu Custom Ecycle ---
const ECYCLE_COLOR = '#1cff2bff'; 
const ECYCLE_COLOR_HOVER = '#1cff2b94';

// --- 2. Định nghĩa Palette Module Augmentation (TypeScript Convention) ---
// Bước này cần các types PaletteColor và PaletteColorOptions đã được import
declare module '@mui/material/styles' {
  interface Palette {
    ecycle: PaletteColor;
  }
  interface PaletteOptions {
    ecycle?: PaletteColorOptions;
  }
}

// Khai báo thuộc tính 'color' mới cho Button
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ecycle: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    ecycle: true;
  }
}


// Định nghĩa màu gốc
const primaryColor = '#1976D2'; 
const secondaryColor = '#D32F2F'; 

// --- 3. Tạo Theme Options ---
export const customTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: '#f5f5f5',
    },
    // Bổ sung: Thêm bảng màu TÙY CHỈNH 'ecycle'
    ecycle: { 
      main: ECYCLE_COLOR,
      light: ECYCLE_COLOR,
      dark: ECYCLE_COLOR_HOVER, 
      contrastText: '#000000', 
    },
  } as any, 

  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    }
  },

  components: {
    // Tùy chỉnh Component Button 
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'ecycle' as any },
          style: {
            backgroundColor: ECYCLE_COLOR,
            color: '#000000', 
            fontWeight: 700,
            '&:hover': {
              backgroundColor: ECYCLE_COLOR_HOVER,
            },
            '&:active': {
               backgroundColor: ECYCLE_COLOR_HOVER,
            },
          },
        },
      ],
    },

    // Tùy chỉnh Component IconButton 
    MuiIconButton: {
      variants: [
        {
          props: { color: 'ecycle' as any },
          style: {
            backgroundColor: ECYCLE_COLOR,
            borderRadius: '0 8px 8px 0',
            padding: '10px',
            '&:hover': {
              backgroundColor: ECYCLE_COLOR_HOVER,
            }
          }
        }
      ]
    }
  },
});