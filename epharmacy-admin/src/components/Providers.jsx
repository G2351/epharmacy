'use client';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '../stores/store';

export default function Providers({ children, themeProps }) {
     const router = useRouter();

     return (
          <Provider store={store}>
               <NextUIProvider navigate={router.push}>
                    <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
               </NextUIProvider>
          </Provider>
     );
}