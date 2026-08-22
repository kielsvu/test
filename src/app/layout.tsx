import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
  title: "Jhner.dev | Agustin Jhoner",
  description: "Personal portfolio of Agustin Jhoner, a computer programming student focused on frontend development and modern web interfaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
      </body>
    </html>
  );
}
