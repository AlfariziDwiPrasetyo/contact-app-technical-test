import { Home, LogOut, UserPlus, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../features/auth/auth.context";

function Navbar() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <Link to={"/"} className="text-xl font-bold text-foreground">
              Kontak
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={isHomepage ? "/create" : "/"}>
              <Button
                className="gap-2"
                variant={isHomepage ? "default" : "outline"}
              >
                {isHomepage ? (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Tambah Kontak</span>
                  </>
                ) : (
                  <>
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
