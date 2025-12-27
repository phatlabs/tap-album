// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Tap Album',
  description: 'Claim your onchain music album',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-pItdZ4sUQvH0kGugHgdGXNqBJ38qJNmPR9U1FVLtZL1YI7Di5urN6pN1Nsx3Rp3XIan+FJxuxMxDP1WS9Yuk3A=="
          crossOrigin="anonymous"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
