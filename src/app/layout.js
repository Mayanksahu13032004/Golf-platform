import "./globals.css";

import {
  AuthProvider,
} from "@/context/AuthContext";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster position="top-right" />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}