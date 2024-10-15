import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import AddGame from "./Views/AddGame/AddGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/addGame" element={<AddGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
