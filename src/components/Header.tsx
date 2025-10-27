import React, { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import type { MouseEvent } from 'react'; 
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Box,
  Avatar
} from '@mui/material';

// ********** Đảm bảo logo đã được đổi tên và Alt text được cập nhật sau này **********
import MyLogo from '../assets/my-logo.jpg'; 

// Import các icon từ MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Import Component 
import { LocationPopover } from './popovers/LocationDialog';
import { CategoryMenu } from './popovers/CategoryMenu';
import { SavedPostsPopover, type SavedPost } from './popovers/SavedPostsPopover';
import { NotificationPopover } from './popovers/NotificationPopover'; 
import { AccountMenuPopover } from './popovers/AccountMenuPopover';

// --- Dữ liệu Tin đã lưu giả định (Tạm thời đặt ở đây) ---
const mockSavedPosts: SavedPost[] = [
    { 
        id: '1', 
        imagePath: 'https://cdn.chotot.com/CK6Dr1fDxlyaV6WLe_GKd9W-n8eKR6qskJ6j8053KIY/preset:view/plain/a5cec488c3e01ac58b69f98f7ac28b95-2954240447799733789.jpg',
        name: 'Toyota Yaris Cross 2024 1.5 D-CVT',
        price: '730.000.000 VNĐ', 
        details: '35.852 km',
    }
];

// --- Dữ liệu người dùng giả định ---
const mockUser = {
    name: 'Đạt Cao',
    avatarUrl: 'https://cdn.chotot.com/uac2/26732157', // Thay bằng URL ảnh đại diện giả định
    followers: 0,
    following: 0,
    eCoin: 0,
};


// Import constants
import { LOCATION_STORAGE_KEY, DEFAULT_CITY } from '../utils/constants';

// --- Khai báo kiểu dữ liệu cho Tỉnh/Thành phố và Quận/Huyện (Cần thiết cho TS) ---
interface Location {
    id: string;
    name: string;
    districts?: Location[];
}

// --- 1. Custom Component cho Vùng chọn Khu vực (ĐÃ SỬA) ---
interface LocationSelectProps {
    // Sửa kiểu onClick để chấp nhận event
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    city: Location | null;
    district: Location | null;
}

// --- 1. Custom Component cho Vùng chọn Khu vực (KHÔNG ĐỔI) ---
const LocationSelect: React.FC<LocationSelectProps> = ({ onClick, city, district }) => {
    
    // Logic hiển thị text:
    let displayLocation = 'Chọn khu vực';
    if (city && city.id !== 'all') {
        displayLocation = city.name;
        if (district && district.id !== 'all_dist') {
            displayLocation = district.name;
        } 
        
    } else if (city && city.id === 'all') {
        displayLocation = 'Toàn quốc';
    }

    return (
        <Button
            onClick={onClick}
            sx={{
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 'bold',
                padding: '8px 16px',
                '&:hover': {
                    backgroundColor: '#e0e0e0',
                },
                maxWidth: 200,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}
            startIcon={<LocationOnIcon sx={{ color: '#02e110ff' }} />}
            endIcon={<KeyboardArrowDownIcon />}
        >
            {displayLocation}
        </Button>
    );
};

// --- 2. Custom Component cho Thanh Tìm kiếm (ĐÃ SỬA) ---
const SearchBar = () => (
  <Box
    sx={{
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1, 
      maxWidth: 800, 
      marginRight: 2,
    }}
  >
    <InputBase
      placeholder="Tìm xe cộ..."
      sx={{
        ml: 2,
        flex: 1,
        fontSize: '1rem',
        color: 'text.secondary',
      }}
      startAdornment={
        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.2rem' }} />
      }
    />
    {/* Nút Tìm kiếm: Dùng color="ecycle". Các style (backgroundColor, borderRadius, hover) đã ở trong customTheme.ts */}
    <IconButton
      type="submit"
      color="ecycle" // <--- SỬ DỤNG MÀU TỪ THEME
      aria-label="search"
    >
      <SearchIcon sx={{ color: 'black' }} />
    </IconButton>
  </Box>
);





// --- 3. Component Chính: Header (ĐÃ SỬA) ---
export const Header = () => {



// ********** STATE CHO TÀI KHOẢN **********
    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const isAccountOpen = Boolean(anchorElAccount);
    
    const isLoggedIn = true; // Ví dụ: Đặt thành TRUE để test trạng thái đã đăng nhập
    const currentUser = isLoggedIn ? mockUser : null;
    
    // Xử lý mở Popover Tài khoản
    const handleAccountMenuOpen = (event: ReactMouseEvent<HTMLElement>) => {
        setAnchorElAccount(event.currentTarget);
    };

    // Xử lý đóng Popover Tài khoản
    const handleAccountMenuClose = () => {
        setAnchorElAccount(null);
    };

    // --- HÀM CHUYỂN HƯỚNG ĐĂNG NHẬP (Giả định) ---
    const handleLoginRedirect = () => {
        console.log("Redirecting to Login Page...");
        // Ở đây, bạn sẽ sử dụng router (ví dụ: useRouter của Next.js, hoặc useNavigate của React Router)
        // router.push('/dang-nhap'); 
    };
// ********** STATE CHO MENU VỊ TRÍ **********
    
    // State để lưu trữ tham chiếu đến nút anchor
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    // Khởi tạo state bằng giá trị mặc định tạm thời (sẽ bị ghi đè bởi localStorage)
    const [selectedCity, setSelectedCity] = useState<Location | null>(DEFAULT_CITY);
    const [selectedDistrict, setSelectedDistrict] = useState<Location | null>(null);

// ********** HIỆU ỨNG 1: ĐỌC DỮ LIỆU TỪ LOCAL STORAGE KHI COMPONENT MOUNT **********
    useEffect(() => {
        try {
            const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
            if (savedLocation) {
                const { city, district } = JSON.parse(savedLocation);
                
                // Đảm bảo dữ liệu đọc ra hợp lệ
                if (city) {
                    setSelectedCity(city);
                }
                setSelectedDistrict(district || null);
            }
        } catch (error) {
            console.error("Could not load location from local storage", error);
            // Nếu lỗi, vẫn giữ giá trị mặc định
            setSelectedCity(DEFAULT_CITY);
            setSelectedDistrict(null);
        }
    }, []); // Chỉ chạy một lần khi component được mount

    // Xử lý chọn khu vực và GHI DỮ LIỆU VÀO LOCAL STORAGE
    const handleSelectLocation = (city: Location | null, district: Location | null) => {
        const finalCity = city || DEFAULT_CITY;
        const finalDistrict = district || null;

        setSelectedCity(finalCity);
        setSelectedDistrict(finalDistrict);

        // ********** GHI DỮ LIỆU MỚI VÀO LOCAL STORAGE **********
        try {
            const locationToSave = JSON.stringify({ 
                city: finalCity, 
                district: finalDistrict 
            });
            localStorage.setItem(LOCATION_STORAGE_KEY, locationToSave);
        } catch (error) {
            console.error("Could not save location to local storage", error);
        }
    };

    // 3. Xử lý mở Popover
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // 4. Xử lý đóng Popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isPopoverOpen = Boolean(anchorEl);

// ********** STATE CHO MENU DANH MỤC **********
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorElMenu);
    
    // Xử lý mở Menu
    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    // Xử lý đóng Menu
    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

// ********** STATE MỚI CHO TIN ĐÃ LƯU **********
    const [anchorElSaved, setAnchorElSaved] = useState<null | HTMLElement>(null);
    const isSavedOpen = Boolean(anchorElSaved);
    
    // Dùng dữ liệu rỗng để test trạng thái rỗng, hoặc dùng mockSavedPosts để test trạng thái có dữ liệu
    const userSavedPosts: SavedPost[] = mockSavedPosts; // Thay thế bằng [] để test trạng thái rỗng
    
    // Xử lý mở Popover Tin đã lưu
    const handleSavedOpen = (event: ReactMouseEvent<HTMLElement>) => {
        if (!isLoggedIn) {
            handleLoginRedirect(); // Nếu chưa đăng nhập, chuyển hướng
            return;
        }
        setAnchorElSaved(event.currentTarget); // Nếu đã đăng nhập, mở Popover
    };

    // Xử lý đóng Popover Tin đã lưu
    const handleSavedClose = () => {
        setAnchorElSaved(null);
    };

// ********** STATE MỚI CHO THÔNG BÁO **********
    const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
    const isNotiOpen = Boolean(anchorElNoti);
    
    // Xử lý mở Popover Thông báo
    const handleNotiOpen = (event: ReactMouseEvent<HTMLElement>) => {
        if (!isLoggedIn) {
            handleLoginRedirect(); // Nếu chưa đăng nhập, chuyển hướng
            return;
        }
        setAnchorElNoti(event.currentTarget); // Nếu đã đăng nhập, mở Popover
    };

    // Xử lý đóng Popover Thông báo
    const handleNotiClose = () => {
        setAnchorElNoti(null);
    };





// **********************************************************************************
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar sx={{
        paddingX: 3,
        minHeight: 64,
        gap: 2,
      }}>

        {/* 1. Menu Icon */}
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={handleMenuOpen} // Dùng hàm mở Menu mới
            >
            <MenuIcon />
        </IconButton>

        {/* 2. Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px' }}>
          <img 
            src={MyLogo}
            alt="Ecycle Logo" // Đã cập nhật Alt text
            style={{ 
              height: '42px', 
              cursor: 'pointer',
              borderRadius: '8px', 
            }}
          />
        </Box>

        {/* 3. Vùng chọn Khu vực: Truyền handleClick vào onClick */}
                <LocationSelect 
                    onClick={handleClick} // <--- TRUYỀN HÀM XỬ LÝ MỞ POPUP
                    city={selectedCity}
                    district={selectedDistrict}
                />

        {/* 4. Thanh Tìm kiếm */}
        <SearchBar />

        {/* 5. Các nút Hành động */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* ********** NÚT ĐẤU GIÁ (Đơn giản) ********** */}
            <IconButton 
                color="inherit" 
                aria-label="auction"
                onClick={() => { console.log("Auction button clicked"); }} 
                >
                <GavelIcon />
            </IconButton>
            {/* ************************************** */}
          
          
          {/* ********** NÚT ĐÁNH DẤU (TIN ĐÃ LƯU) ********** */}
            <IconButton 
                color="inherit" 
                aria-label="favorites"
                onClick={handleSavedOpen} // <--- THÊM ONCLICK
                >
                <FavoriteBorderIcon />
            </IconButton>
           {/* ********************************************* */}

           {/* ********** NÚT THÔNG BÁO ********** */}
            <IconButton 
                    color="inherit" 
                    aria-label="notifications"
                    onClick={handleNotiOpen} // <--- THÊM ONCLICK
                    >
                    <NotificationsNoneIcon />
                </IconButton>
            {/* ************************************ */}
          
          {/* Nút Đăng nhập */}
          {!isLoggedIn && (
          <Button 
            variant="outlined" 
            color="inherit" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '8px', 
              borderColor: '#f0f0f0',
              marginLeft: 1,
              paddingX: 2,
            }}
          >
            Đăng nhập
          </Button> )}

        {/* Nút Quản lý tin */}
          {isLoggedIn && (
          <Button 
            variant="outlined" 
            color="inherit" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '8px', 
              borderColor: '#f0f0f0',
              marginLeft: 1,
              paddingX: 2,
            }}
          >
            Quản lý tin
          </Button> )}

          {/* Nút Đăng tin: Dùng color="ecycle". Các style (backgroundColor, hover, color) đã ở trong customTheme.ts */}
          <Button
            variant="contained"
            color="ecycle"
            sx={{
              // Chỉ giữ lại các style layout/padding, loại bỏ style màu/font đã có trong theme
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px', 
              paddingX: 2,
            }}
            startIcon={<LocalOfferIcon />}
          >
            Đăng tin
          </Button>
          
          {/* ********** NÚT TÀI KHOẢN ********** */}
            {/* Nút này sẽ thay đổi icon dựa trên trạng thái đăng nhập */}
            <Button 
                variant="outlined" 
                color="inherit" 
                aria-label="Tài khoản và Menu"
                onClick={handleAccountMenuOpen} // <--- THÊM ONCLICK
                sx={{
                    minWidth: 0, 
                    padding: '8px 10px', 
                    borderColor: '#d4d4d4ff',
                    textTransform: 'none',
                    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                        margin: 0, 
                    },
                }}
                // Hiển thị Avatar khi đã đăng nhập
                startIcon={
                    isLoggedIn ? (
                        <Avatar 
                            alt={mockUser.name} 
                            src={mockUser.avatarUrl} 
                            sx={{ width: 24, height: 24 }}
                        />
                    ) : (
                        <AccountCircleIcon sx={{ fontSize: '24px' }} />
                    )
                } 
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '20px' }} />}
            >
            {/* Không có nội dung text */}
            </Button>
            {/* ************************************ */}
        </Box>
      </Toolbar>

        {/* ********** POPVER TÀI KHOẢN MỚI ********** */}
            <AccountMenuPopover
                open={isAccountOpen}
                anchorEl={anchorElAccount}
                handleClose={handleAccountMenuClose}
                isLoggedIn={isLoggedIn} // <--- TRUYỀN TRẠNG THÁI
                user={currentUser}     // <--- TRUYỀN DỮ LIỆU
            />
        {/* ******************************************** */}

       {/* Component Popover */}
            <LocationPopover
                open={isPopoverOpen} // Kiểm tra nếu anchorEl có giá trị
                handleClose={handleClose}
                anchorEl={anchorEl} // <--- TRUYỀN THAM CHIẾU NÚT
                onSelect={handleSelectLocation}
                currentCity={selectedCity}
                currentDistrict={selectedDistrict}
            />

        {/* ********** TÍCH HỢP CATEGORY MENU MỚI ********** */}
            <CategoryMenu
                open={isMenuOpen}
                anchorEl={anchorElMenu}
                handleClose={handleMenuClose}
            />
        {/* ************************************************* */}

        {/* ********** POPVER TIN ĐÃ LƯU MỚI ********** */}
            <SavedPostsPopover
                open={isSavedOpen}
                anchorEl={anchorElSaved}
                handleClose={handleSavedClose}
                savedPosts={userSavedPosts} // Truyền dữ liệu giả định
            />
        {/* ******************************************** */}

        {/* ********** POPVER THÔNG BÁO MỚI ********** */}
            <NotificationPopover
                open={isNotiOpen}
                anchorEl={anchorElNoti}
                handleClose={handleNotiClose}
            />
            {/* ******************************************** */}
    </AppBar>
  );
};