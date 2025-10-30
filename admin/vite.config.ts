import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,     // 👈 Đổi thành cổng bạn muốn (mặc định là 5173)
    host: true,     // Cho phép truy cập qua IP mạng LAN
    //open: true      // Tự động mở trình duyệt khi chạy `npm run dev`
  }
})
