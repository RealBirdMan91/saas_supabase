import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen p-6 flex justify-center items-center">
      {children}
    </div>
  );
}

export default Layout;
