import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen p-6 flex justify-center items-center">
      {children}
    </main>
  );
}

export default Layout;
