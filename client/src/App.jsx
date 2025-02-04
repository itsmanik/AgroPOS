import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router";
import Analytics from "./pages/AnalyticsPage";
import Dashboard from "./pages/DashboardPage";
import Sales from "./pages/SalesPage";
import Settings from "./pages/SettingsPage";
import Stock from "./pages/StockPage";
import ProductsPage from "./pages/ProductsPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/sales" element={<Sales />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
