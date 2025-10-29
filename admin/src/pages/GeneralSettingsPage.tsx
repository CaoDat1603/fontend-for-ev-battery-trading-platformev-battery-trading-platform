import React, { useState, type JSX } from 'react';
import { 
    Box, Typography, Paper, useTheme, Stack, 
    TextField, Button, Divider, Alert,
    FormControlLabel, Switch, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';

// --- 1. DEFINITIONS ---
interface GeneralSettings {
    isMaintenanceMode: boolean;
    defaultLanguage: 'vi' | 'en';
    maxViolationsBeforeLock: number;
    emailNotificationEnabled: boolean;
    sessionTimeoutMinutes: number;
}

const initialGeneralSettings: GeneralSettings = {
    isMaintenanceMode: false,
    defaultLanguage: 'vi',
    maxViolationsBeforeLock: 3,
    emailNotificationEnabled: true,
    sessionTimeoutMinutes: 60,
};

// --- 2. COMPONENT ---
const GeneralSettingsPage: React.FC = () => {
    const theme = useTheme();
    const [settings, setSettings] = useState<GeneralSettings>(initialGeneralSettings);
    const [draftSettings, setDraftSettings] = useState<GeneralSettings>(initialGeneralSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // --- 3. HANDLERS ---
    
    // Xử lý thay đổi TextField
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraftSettings({
            ...draftSettings,
            [name]: name === 'sessionTimeoutMinutes' || name === 'maxViolationsBeforeLock' ? parseInt(value) : value,
        });
    };

    // Xử lý thay đổi Switch
    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDraftSettings({
            ...draftSettings,
            [name]: checked,
        });
    };
    
    // Xử lý thay đổi Select
    const handleSelectChange = (e: any) => {
         const { name, value } = e.target;
         setDraftSettings({
            ...draftSettings,
            [name]: value as 'vi' | 'en',
        });
    }

    const handleSave = () => {
        setIsSaving(true);
        setAlertMessage(null);
        
        // Kiểm tra xem có thay đổi nào không
        const hasChanges = JSON.stringify(settings) !== JSON.stringify(draftSettings);

        setTimeout(() => {
            if (hasChanges) {
                setSettings(draftSettings); 
                setAlertMessage('General settings updated successfully!');
            } else {
                setAlertMessage('No changes detected.');
            }
            
            setIsSaving(false);
        }, 1000);
    };

    // --- 4. RENDER ---
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <SettingsIcon color="primary" fontSize="large" /> 
                <Typography variant="h5" fontWeight="bold">
                    General Settings
                </Typography>
            </Stack>

            {alertMessage && (
                <Alert severity={alertMessage.includes('successfully') ? 'success' : 'info'} sx={{ mb: 3 }}>
                    {alertMessage}
                </Alert>
            )}

            {/* Form Cài đặt */}
            <Paper sx={{ p: 4, borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                <Stack spacing={4}>
                    
                    {/* --- CÀI ĐẶT HỆ THỐNG --- */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                             <VisibilityIcon color="action" />
                             <Typography variant="h6" fontWeight="bold">Platform Visibility & Status</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack spacing={3}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={draftSettings.isMaintenanceMode}
                                        onChange={handleSwitchChange}
                                        name="isMaintenanceMode"
                                        color="error"
                                    />
                                }
                                label="Maintenance Mode (Tạm dừng truy cập công khai)"
                            />

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Default Language</InputLabel>
                                <Select
                                    value={draftSettings.defaultLanguage}
                                    label="Default Language"
                                    name="defaultLanguage"
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="vi">Vietnamese (vi)</MenuItem>
                                    <MenuItem value="en">English (en)</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    {/* --- CÀI ĐẶT AN TOÀN & GIỚI HẠN --- */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, mt: 3 }}>
                             <SecurityIcon color="action" />
                             <Typography variant="h6" fontWeight="bold">Safety & Limits</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Max Violations Before Account Lock"
                                name="maxViolationsBeforeLock"
                                type="number"
                                value={draftSettings.maxViolationsBeforeLock}
                                onChange={handleTextChange}
                                helperText="Số lần vi phạm tối đa trước khi hệ thống tự động khóa tài khoản người dùng."
                                sx={{ maxWidth: 300 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Admin Session Timeout (Minutes)"
                                name="sessionTimeoutMinutes"
                                type="number"
                                value={draftSettings.sessionTimeoutMinutes}
                                onChange={handleTextChange}
                                helperText="Thời gian tối đa phiên làm việc của Admin không hoạt động."
                                sx={{ maxWidth: 300 }}
                            />
                        </Stack>
                    </Box>

                    {/* --- CÀI ĐẶT THÔNG BÁO --- */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, mt: 3 }}>
                             <EmailIcon color="action" />
                             <Typography variant="h6" fontWeight="bold">Notification Settings</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={draftSettings.emailNotificationEnabled}
                                    onChange={handleSwitchChange}
                                    name="emailNotificationEnabled"
                                    color="success"
                                />
                            }
                            label="Enable System Email Notifications (Kích hoạt gửi email thông báo cho người dùng)"
                        />
                    </Box>
                    
                    <Divider sx={{ mt: 4 }} />
                    
                    {/* --- NÚT LƯU --- */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={isSaving}
                        sx={{ alignSelf: 'flex-start', mt: 3 }}
                    >
                        {isSaving ? 'Saving...' : 'Save All Settings'}
                    </Button>

                </Stack>
            </Paper>
        </Box>
    );
};

export default GeneralSettingsPage;