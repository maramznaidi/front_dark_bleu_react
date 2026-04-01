import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import "./App.css";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        
        {/* <Route path="/book/:id" element={<BookDetails />} /> */}
        {/* <Route path="/my-borrows" element={<MyBorrows />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
