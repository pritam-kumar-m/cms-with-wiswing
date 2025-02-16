"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/Layout/Layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
