import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Git Down | Github File Download",
  description:
    "github-folder-tree is a React custom hook that allows you to fetch and process the contents of a GitHub folder. It retrieves information about the files and subfolders in the specified folder, including their names, file types, download URLs, SHA hashes, sizes, and paths",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-900 text-white">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
