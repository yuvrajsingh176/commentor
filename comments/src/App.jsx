import "./App.css";
import CommentBox from "./Components/CommentBox";
import Data from "./Components/Data";
import Login from "./Components/Login";
import WriteBox from "./Components/WriteBox";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
