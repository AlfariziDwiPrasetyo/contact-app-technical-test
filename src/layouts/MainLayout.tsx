import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
