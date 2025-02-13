import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router";
import Analytics from "./pages/AnalyticsPage";
import Dashboard from "./pages/DashboardPage";
import Sales from "./pages/SalesPage";
import Settings from "./pages/SettingsPage";
import Stock from "./pages/StockPage";
import ProductsPage from "./pages/Products/ProductsPage";
import MainLayout from "./layouts/MainLayout";
import CreateProductPage from "./pages/Products/CreateProductPage";
import Invoice from "./components/Invoice/Invoice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/sales" element={<Sales />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products">
            <Route index element={<ProductsPage />} />
            <Route path="create" element={<CreateProductPage />} />
          </Route>
          <Route path="/stock" element={<Stock />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
