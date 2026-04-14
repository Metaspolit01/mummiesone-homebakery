import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order/:itemId" element={<Order />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
