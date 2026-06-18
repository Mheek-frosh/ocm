import './globals.css';

export const metadata = {
  title: 'Optima Construct — Decision Platform for Construction Leaders',
  description: 'Optima Construct helps construction leaders protect margins, reduce risk, and improve delivery outcomes across their portfolio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
