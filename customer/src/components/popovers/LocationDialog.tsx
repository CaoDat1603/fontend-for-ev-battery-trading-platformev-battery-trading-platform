//*******************************************//
//  COMPONENT POPOVER CHỌN KHU VỰC HiỂN THỊ TIN //
//******************************************//

import React, { useState, useMemo, useCallback } from 'react';
import { 
    // Thay thế Dialog bằng Popover
    Popover, Button, Box, IconButton, TextField, List, ListItem, ListItemText, 
    Radio, InputAdornment, Typography, useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 

// --- Giả định Dữ liệu ---
interface Location {
    id: string;
    name: string;
    districts?: Location[];
}

const initialCities: Location[] = [
    { id: 'all', name: 'Toàn quốc', districts: [] },
    { id: 'hcm', name: 'Tp Hồ Chí Minh', districts: [
        { id: 'all_dist', name: 'Tất cả' },
        { id: 'thuduc', name: 'Thành phố Thủ Đức' },
        { id: 'q1', name: 'Quận 1' },
        { id: 'q3', name: 'Quận 3' },
        { id: 'q4', name: 'Quận 4' },
        { id: 'q5', name: 'Quận 5' },
    ]},
    { id: 'hn', name: 'Hà Nội', districts: [{ id: 'all_hn', name: 'Tất cả' }, { id: 'bd', name: 'Ba Đình' }] },
    { id: 'dn', name: 'Đà Nẵng', districts: [{ id: 'all_dn', name: 'Tất cả' }] },
    { id: 'ct', name: 'Cần Thơ' },
    { id: 'bdinh', name: 'Bình Dương' },
    { id: 'ag', name: 'An Giang' },
];

// Định nghĩa các màn hình (View States)
type View = 'MAIN' | 'CITY_SELECT' | 'DISTRICT_SELECT';

interface LocationPopoverProps {
    open: boolean;
    // Thay thế onClose bằng handleClose (chuẩn Popover)
    handleClose: () => void;
    // Anchor element: Đây là nút "Chọn khu vực"
    anchorEl: HTMLElement | null; 
    onSelect: (city: Location | null, district: Location | null) => void;
    currentCity: Location | null;
    currentDistrict: Location | null;
}

export const LocationPopover: React.FC<LocationPopoverProps> = ({ 
    open, handleClose, anchorEl, onSelect, currentCity, currentDistrict
}) => {
    const theme = useTheme();
    
    // State quản lý View hiện tại trong Popover
    const [currentView, setCurrentView] = useState<View>('MAIN');
    // State tạm thời giữ giá trị đang được chọn
    const [tempCity, setTempCity] = useState<Location | null>(currentCity);
    const [tempDistrict, setTempDistrict] = useState<Location | null>(currentDistrict);
    
    // Reset view và giá trị tạm khi Popover mở
    React.useEffect(() => {
        if (open) {
            setCurrentView('MAIN');
            setTempCity(currentCity);
            setTempDistrict(currentDistrict);
        }
    }, [open, currentCity, currentDistrict]);

    const availableDistricts = useMemo(() => {
        if (!tempCity || tempCity.id === 'all' || !tempCity.districts) {
            return [];
        }
        return tempCity.districts;
    }, [tempCity]);

    const handleApply = useCallback(() => {
        if (tempCity) {
            const finalDistrict = (tempCity.id === 'all' || !availableDistricts.length) 
                ? null 
                : tempDistrict;
            onSelect(tempCity, finalDistrict);
            handleClose(); // Tắt Popover sau khi áp dụng
        }
    }, [tempCity, tempDistrict, onSelect, handleClose, availableDistricts]);

    const handleCityChange = (city: Location) => {
        setTempCity(city);
        setTempDistrict(null); 
        setCurrentView('MAIN');
    };

    const handleDistrictChange = (district: Location) => {
        setTempDistrict(district);
        setCurrentView('MAIN');
    };

    // --- RENDER HEADER/TITLE TÙY THUỘC VIEW ---
    const renderTitle = (title: string, showBack: boolean = false) => (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderBottom: currentView !== 'MAIN' ? `1px solid ${theme.palette.divider}` : 'none' 
            }}
        >
            {showBack && (
                <IconButton onClick={() => setCurrentView('MAIN')} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
            )}
            <Typography 
                variant="h6" 
                component="div" 
                fontWeight={600} 
                sx={{ 
                    flexGrow: 1,
                    textAlign: 'center',
                    // Căn lề lại nếu có nút Back
                    mr: showBack ? 4 : 0 
                }}
            >
                {title}
            </Typography>
        </Box>
    );

    // --- RENDER MÀN HÌNH CHÍNH (Khu vực) ---
    const renderMainView = () => (
        <Box sx={{ minWidth: 280 }}>
            {renderTitle('Khu vực')} 
            <Box sx={{ p: 2 }}>
                
                {/* Chọn Tỉnh/Thành */}
                <Box
                    sx={{
                        // Đã thay thế style input thành box để mô phỏng hình ảnh
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '4px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        mb: 2,
                        position: 'relative',
                    }}
                    onClick={() => setCurrentView('CITY_SELECT')}
                >
                    <Typography variant="caption" color="error" component="div" fontSize={10} sx={{ lineHeight: 1 }}>
                        Chọn tỉnh thành *
                    </Typography>
                    <Typography variant="body1" fontWeight="normal" lineHeight={1.5}>
                        {tempCity ? tempCity.name : 'Toàn quốc'}
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }} />
                </Box>

                {/* Chọn Quận/Huyện */}
                <Box
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '4px',
                        padding: '8px 12px',
                        position: 'relative',
                        // Logic vô hiệu hóa
                        backgroundColor: tempCity?.id === 'all' ? '#f0f0f0' : 'white',
                        color: tempCity?.id === 'all' ? theme.palette.text.disabled : 'inherit',
                        pointerEvents: tempCity?.id === 'all' ? 'none' : 'auto',
                        cursor: tempCity?.id === 'all' ? 'default' : 'pointer',
                    }}
                    onClick={() => {
                        if (tempCity && tempCity.id !== 'all') {
                            setCurrentView('DISTRICT_SELECT');
                        }
                    }}
                >
                    <Typography 
                        variant="caption" 
                        color={tempCity?.id === 'all' ? theme.palette.text.disabled : 'error'} 
                        component="div" 
                        fontSize={10} 
                        sx={{ lineHeight: 1 }}
                    >
                        Chọn quận huyện *
                    </Typography>
                    <Typography variant="body1" fontWeight="normal" lineHeight={1.5}>
                        {tempDistrict?.name || 'Chọn quận huyện'}
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }} />
                </Box>
            </Box>
            
            {/* Nút Áp dụng */}
            <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                    variant="contained"
                    color="ecycle" 
                    fullWidth
                    size="large"
                    onClick={handleApply}
                    // Yêu cầu: Phải có tỉnh (tempCity) được chọn
                    disabled={!tempCity} 
                >
                    Áp dụng
                </Button>
            </Box>
        </Box>
    );

    // --- RENDER MÀN HÌNH CHỌN TỈNH/THÀNH ---
    const renderCitySelectView = () => (
        <Box sx={{ minWidth: 300, minHeight: 400 }}>
            {renderTitle('Tỉnh thành', true)} 
            <Box sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm tỉnh thành"
                    size="small"
                    sx={{ mb: 2, bgcolor: '#f0f0f0', borderRadius: '4px' }}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                        sx: { bgcolor: 'background.default', borderRadius: '4px' } // Tinh chỉnh màu nền input
                    }}
                />
                
                <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {initialCities.map((city) => (
                        <ListItem
                            key={city.id}
                            onClick={() => handleCityChange(city)}
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f0f0f0' } }}
                            secondaryAction={
                                <Radio
                                    checked={tempCity?.id === city.id}
                                    color="default"
                                    name="city-radio-buttons"
                                />
                            }
                        >
                            <ListItemText primary={city.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );

    // --- RENDER MÀN HÌNH CHỌN QUẬN/HUYỆN ---
    const renderDistrictSelectView = () => (
        <Box sx={{ minWidth: 300, minHeight: 400 }}>
            {renderTitle('Quận huyện', true)} 
            <Box sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm quận huyện"
                    size="small"
                    sx={{ mb: 2, bgcolor: '#f0f0f0', borderRadius: '4px' }}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                        sx: { bgcolor: 'background.default', borderRadius: '4px' } // Tinh chỉnh màu nền input
                    }}
                />
                
                <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {availableDistricts.map((district) => (
                        <ListItem
                            key={district.id}
                            onClick={() => handleDistrictChange(district)}
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f0f0f0' } }}
                            secondaryAction={
                                // Theo hình ảnh, Radio button được check có màu vàng
                                <Radio
                                    checked={tempDistrict?.id === district.id}
                                    color="warning" 
                                    name="district-radio-buttons"
                                />
                            }
                        >
                            <ListItemText primary={district.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );


    // --- Logic hiển thị View ---
    const currentRenderer = () => {
        switch (currentView) {
            case 'CITY_SELECT':
                return renderCitySelectView();
            case 'DISTRICT_SELECT':
                return renderDistrictSelectView();
            case 'MAIN':
            default:
                return renderMainView();
        }
    };

    return (
        <Popover 
            open={open} 
            anchorEl={anchorEl} // Neo vào element đã truyền vào
            onClose={handleClose} 
            // Căn chỉnh vị trí Popover để nó nằm thẳng hàng với nút Anchor
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            // Tắt hiệu ứng làm mờ nền (backdrop)
            slotProps={{
                root: {
                    disablePortal: true, // Thường dùng cho Popover
                },
                backdrop: {
                    sx: {
                        backgroundColor: 'transparent', // Giữ nền trong suốt
                    }
                }
            }}
            // Không cần Close icon vì Popover tự tắt khi click ngoài
        >
            {currentRenderer()}
        </Popover>
    );
};