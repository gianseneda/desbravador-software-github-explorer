import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import { Home, Repo } from "@pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:owner/:repo" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
