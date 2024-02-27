import LinkPage from "./components/linkPage/LinkPage";
import MainContainer from "./components/mainContainer/MainContainer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotePage from "./components/notePage/NotePage";
import FilePage from "./components/filePage/FilePage";
import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import { useState } from "react";
import { MenuButtonContext } from "./contexts/MenuButtonContext";

function App() {
  const [isMenuButtonClicked, setIsMenuButtonClicked] = useState(false);

  return (
    <>
      <MenuButtonContext.Provider
        value={{ isMenuButtonClicked, setIsMenuButtonClicked }}
      >
        <Router>
          <Topbar />
          <main>
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/l/:id" element={<LinkPage />} />
              <Route path="/n/:id" element={<NotePage />} />
              <Route path="/f/:id" element={<FilePage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </MenuButtonContext.Provider>
    </>
  );
}

export default App;
