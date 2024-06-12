import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex overflow-hidden h-screen">{children}</main>;
}

export default Layout;
