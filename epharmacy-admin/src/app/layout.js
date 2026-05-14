import { Toaster } from 'sonner';
import getMetadata from '@/configs/site.config';
import Providers from '@/components/Providers';
import { fontSans } from '@/configs/font.config';

import '@/styles/global.scss';

export async function generateMetadata() {
  return getMetadata('Trang chủ');
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className} bg-color-50`}>
        <Providers themeProps={{ defaultTheme: 'green' }}>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}