import MainContainer from "./components/mainContainer/MainContainer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<MainContainer />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
