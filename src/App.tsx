import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./features/auth/auth.context";
import { ContactProvider } from "./features/contacts/contacts.context";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;
