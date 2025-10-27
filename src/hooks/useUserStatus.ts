// *****************************************************************************
// 2. CUSTOM HOOK
// *****************************************************************************
import { useState, useEffect } from 'react';

interface UserBadges {
    hasUnreadNotifications: boolean;
    hasActiveAuctions: boolean;
}

export interface UserStatus {
    badges: UserBadges;
    markNotificationsRead: () => void;
    markAuctionsSeen: () => void;
}

export const useUserStatus = (isLoggedIn: boolean): UserStatus => {
    // Giả lập trạng thái của chấm đỏ (badges)
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(isLoggedIn);
    const [hasActiveAuctions, setHasActiveAuctions] = useState(isLoggedIn); 

    useEffect(() => {
        // Reset trạng thái khi đăng xuất/đăng nhập thay đổi (cho mục đích mock)
        if (isLoggedIn) {
            setHasUnreadNotifications(true);
            setHasActiveAuctions(true);
        } else {
            setHasUnreadNotifications(false);
            setHasActiveAuctions(false);
        }
    }, [isLoggedIn]);

    const markNotificationsRead = () => {
        setHasUnreadNotifications(false);
    };

    const markAuctionsSeen = () => {
        setHasActiveAuctions(false);
    };

    return {
        badges: { hasUnreadNotifications, hasActiveAuctions },
        markNotificationsRead,
        markAuctionsSeen,
    };
};
