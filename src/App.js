import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import FAQ from "./components/FAQ.js";
import Layout from "./components/Layout.js";
import Tour from "./components/Tour.js";
import TourList from "./components/TourList.js";
import TourDetail from "./components/TourDetail.js";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="tour" element={<Tour />} >
            <Route index element={<TourList/>}/>
            <Route path=":id" element={<TourDetail/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
