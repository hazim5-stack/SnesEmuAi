import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export function Root() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0b1e]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}