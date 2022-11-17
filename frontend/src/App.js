import "./App.css";
import Header from "./components/layouts/header/Header";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>{/* <Route path='/home' element={<Header></Header>}/> */}</Routes>
    </div>
  );
}

export default App;
