
import { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            <head>
                <title></title>
                <meta name="description" content="" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
