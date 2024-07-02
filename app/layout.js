import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nanterre Dom tool",
  description: "Création DigitalWorks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
       <Head>
       <title>{metadata.title}</title>
       <meta name="description" content={metadata.description} />
       <link rel="icon" href="/faveicon.ico" />
       </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
