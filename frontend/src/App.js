import "./App.css";
import Header from "./components/layouts/Header";

import { Route, Routes } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
      <Toaster></Toaster>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
