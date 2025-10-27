import { Container, Box, Typography, Card, CardContent } from '@mui/material';

export const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Chào mừng đến với Giao diện Material UI
        </Typography>
        <Card raised>
          <CardContent>
            <Typography variant="body1">
              Đây là nội dung của Trang Chủ. Các component của MUI (như Card này) giúp bạn dựng layout nhanh chóng.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};