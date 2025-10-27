import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export const App = () => {
  // Cấu trúc chuẩn: Header cố định, nội dung trang thay đổi bên dưới
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
        <HomePage />
      </main>
      <Footer />
    </>
  );
};
