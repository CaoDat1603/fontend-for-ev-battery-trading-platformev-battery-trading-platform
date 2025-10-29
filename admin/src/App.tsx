import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';

// Pages (Mục 2)
import DashboardPage from './pages/DashboardPage'; 
import UserManagementPage from './pages/UserManagementPage';
import ContentModerationPage from './pages/ContentModerationPage';
import TransactionManagementPage from './pages/TransactionManagementPage';
import ComplaintHandlingPage from './pages/ComplaintManagementPage';
import FeeCommissionManagementPage from './pages/FeeCommissionManagementPage';
import GeneralSettingsPage from './pages/GeneralSettingsPage';

import UserDetailPage from './pages/UserDetailPage';
import PostDetailPage from './pages/PostDetailPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import TransactionDetailPage from './pages/TransactionDetailPage';

import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import FeedbackPage from './pages/FeedbackPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Tuyến đường sử dụng Layout Admin (Sidebar + Header) */}
      <Route path="/" element={<MainLayout />}> 
        {/* Index route: Khi đường dẫn là '/', render DashboardPage */}
        <Route index element={<DashboardPage />} /> 
        <Route path="users" element={<UserManagementPage />} />
        <Route path="content" element={<ContentModerationPage />} />
        <Route path="transactions" element={<TransactionManagementPage />} />
        <Route path="complaints" element={<ComplaintHandlingPage />} />
        <Route path="finance" element={<FeeCommissionManagementPage />} />
        <Route path="settings" element={<GeneralSettingsPage />} />

        <Route path="users/:userId" element={<UserDetailPage />} />
        <Route path="/content/:postId" element={<PostDetailPage />} />
        <Route path="complaints/:complaintId" element={<ComplaintDetailPage />} />
        <Route path="transactions/:transactionId" element={<TransactionDetailPage />} />

        <Route path="profile" element={<ProfilePage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="feedback" element={<FeedbackPage />} />

        {/* Thêm các route khác tương ứng với Sidebar */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
      
      {/* Tuyến đường không sử dụng layout (nếu cần: Login, Register) */}
      {/* <Route path="/login" element={...} /> */}
    </Routes>
  );
};

export default App;