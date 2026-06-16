import './globals.css';

export const metadata = {
  title: 'Optima Construct — Construction Intelligence',
  description: 'AI-powered construction intelligence platform for executive decision making.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
