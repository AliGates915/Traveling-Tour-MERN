import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
  return (
    <AuthContextProvider>
    <SearchContextProvider>
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
