"use client";

import { DataProvider, useDataContext } from "./features/shared";
import { Navbar } from "./components/layout";

function PEC4LayoutContent({ children }: { children: React.ReactNode }) {
  const { availableContinents, loading } = useDataContext();

  return (
    <>
      <Navbar availableContinents={loading ? [] : availableContinents} />
      <div className='pt-16'>{children}</div>
    </>
  );
}

export default function PEC4Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <PEC4LayoutContent>{children}</PEC4LayoutContent>
    </DataProvider>
  );
}
