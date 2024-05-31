import React from 'react';

type PDFLayoutProps = {
  children: React.ReactNode;
}

const PDFLayout = ({ children }: PDFLayoutProps) => (
  <html>
    <head>
      <meta charSet="utf8" />
    </head>
    <body>
      {children}
    </body>
  </html>
);

export default PDFLayout;
