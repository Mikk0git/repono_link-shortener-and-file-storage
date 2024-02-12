import LinkPage from "./components/linkPage/LinkPage";
import MainContainer from "./components/mainContainer/MainContainer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/l/:id" element={<LinkPage />} /> /
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
