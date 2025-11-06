import "./globals.css";

export const metadata = {
  title: "استرجاع فني للمقاولات",
  description: "زجاج | ألمنيوم | أنظمة أمنية — تنفيذ احترافي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
