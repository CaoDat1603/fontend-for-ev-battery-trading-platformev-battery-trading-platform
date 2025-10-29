// src/hooks/useAdminBadges.ts

import { useState, useEffect } from 'react';

// *****************************************************************************
// 1. TYPES & INTERFACES 
// *****************************************************************************

interface AdminBadges {
    /** Trạng thái có thông báo hệ thống hoặc tin nhắn chưa đọc hay không. */
    hasUnreadNotifications: boolean;
    // Thêm các badge admin khác ở đây nếu cần:
    // Ví dụ: hasPendingApprovals: boolean;
}

export interface AdminStatus {
    /** Trạng thái các huy hiệu (chấm đỏ) của Admin. */
    badges: AdminBadges;
    /** Hàm đánh dấu tất cả thông báo là đã đọc. */
    markNotificationsRead: () => void;
}

// *****************************************************************************
// 2. CUSTOM HOOK
// *****************************************************************************

/**
 * Hook tùy chỉnh để quản lý trạng thái huy hiệu (badges) của người dùng Admin 
 * trên Dashboard (Notifications, Mail...).
 * * @param isLoggedIn - Trạng thái đăng nhập.
 * @returns Đối tượng AdminStatus chứa trạng thái badges và các hàm thay đổi trạng thái.
 */
export const useAdminBadges = (isLoggedIn: boolean): AdminStatus => {
    
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(isLoggedIn);

    useEffect(() => {
        // Fetch trạng thái thông báo khi đăng nhập thay đổi.
        if (!isLoggedIn) {
            setHasUnreadNotifications(false);
        } else {
            // Giả định có thông báo mới khi đăng nhập
            setHasUnreadNotifications(true); 
        }
    }, [isLoggedIn]); 

    /** Hàm đánh dấu thông báo là đã đọc. */
    const markNotificationsRead = () => {
        setHasUnreadNotifications(false);
    };

    return {
        badges: { hasUnreadNotifications },
        markNotificationsRead
    };
};