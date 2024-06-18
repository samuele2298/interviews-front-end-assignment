// components/RootLayout.tsx
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;