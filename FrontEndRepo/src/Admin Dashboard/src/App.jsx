import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Orders from "./scenes/orders/orders";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import NewUser from "./scenes/new-user";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import NewProduct from "./scenes/new-product/new-product";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import DeleteUserOrProduct from "./scenes/delete-productoruser/delete-productoruser";
import "./index.css";

function AdminDashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/new-user" element={<NewUser />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/delete-user-product" element={<DeleteUserOrProduct />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminDashboard;
