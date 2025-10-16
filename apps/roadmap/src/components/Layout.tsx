import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="relative flex flex-col min-h-screen font-body bg-background overflow-x-hidden">
      <Header />

      <main className="flex-1 mt-24">{/* mt-20 to account for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
