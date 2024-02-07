import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Add from "./pages/Add";
import Users from "./Pages/Users";
// import Update from "./pages/Update";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;