// *****************************************************************************
// 1. TYPES & CONSTANTS
// *****************************************************************************

export interface Location {
    id: string;
    name: string;
}

export interface SavedPost {
    id: number;
    title: string;
}

export interface UserInfo {
    id: string;
    name: string;
    avatarUrl: string;
    eCoin: number;
}

export const LOCATION_STORAGE_KEY = 'ecycle_user_location';
export const DEFAULT_CITY: Location = { id: 'all', name: 'Toàn quốc' };

export const mockUser: UserInfo = {
    id: 'user123',
    name: 'Khách hàng A',
    avatarUrl: 'https://placehold.co/150x150/02e110/white?text=A',
    eCoin: 1500,
};

export const mockSavedPosts: SavedPost[] = [
    { id: 1, title: 'Bán xe Lead cũ giá rẻ' },
    { id: 2, title: 'Điện thoại Iphone 14' },
];

// Kiểu style cơ bản cho Popover
export const popoverStyle: React.CSSProperties = { 
    position: 'absolute', 
    padding: '20px', 
    backgroundColor: 'white', 
    border: '1px solid #ccc', 
    zIndex: 1000, 
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    minWidth: '200px',
};

// Base types for all popovers
export interface BasePopoverProps {
    open: boolean;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
}

export const MyLogo = 'https://placehold.co/100x42/02e110/white?text=Ecycle';
