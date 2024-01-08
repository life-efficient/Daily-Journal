import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/utils/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';


const font = Inter({ subsets: ["latin"] });

export const viewport = {
    // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
    themeColor: config.colors.main,
    width: "device-width",
    initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme={config.colors.theme} className={font.className} style={{height: "100%"}}>
            {config.domainName && (
                <head>
                    <PlausibleProvider domain={config.domainName} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet"></link>
                </head>
            )}
            <body style={{height: "100%"}}>
                <AppRouterCacheProvider>
                    {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
                    <ClientLayout>{children}</ClientLayout>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
