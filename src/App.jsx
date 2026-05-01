import { Routes, Route } from "react-router-dom";
import Layout      from "./components/Layout";
import HomePage    from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import EssaysPage  from "./pages/EssaysPage";
import EssayDetail from "./pages/EssayDetail";
import DashboardsPage from "./pages/DashboardsPage"
import ContactPage from "./pages/ContactPage";



export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/projects"            element={<ProjectsPage />} />
        <Route path="/projects/:slug"      element={<ProjectDetail />} />
        <Route path="/essays"              element={<EssaysPage />} />
        <Route path="/essays/:slug"        element={<EssayDetail />} />
        <Route path="/dashboards" element={<DashboardsPage />} />
        <Route path="/contact"             element={<ContactPage />} />
        
      </Routes>
    </Layout>
  );
}
