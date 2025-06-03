"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import Navbar from "../components/layout/Navbar";
import { DataProvider, useDataContext } from "../features/shared";

function DocumentationLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { availableContinents, loading } = useDataContext();

  return (
    <>
      <Navbar
        availableContinents={loading ? [] : availableContinents}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className='flex min-h-screen bg-gray-50 pt-16'>
        <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <main className='flex-1 lg:ml-64'>
          <div className='p-4 lg:p-8'>{children}</div>
        </main>
      </div>
    </>
  );
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      <DocumentationLayoutContent>{children}</DocumentationLayoutContent>
    </DataProvider>
  );
}
