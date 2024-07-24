import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Nav-Head/Header";
import Nav from "./Nav-Head/Nav";

const App = () => {
  const [showNav, setShowNav] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <Header setShowNav={setShowNav} />
      <div className="flex">
        {showNav && <Nav />}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {!showNav && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg sm:hidden"
          onClick={() => setShowNav(true)}
        >
          Mở Nav
        </button>
      )}
    </div>
  );
};

export default App;
