import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getLatestHomeVersionPath } from "./config/versionRoutes";
// Marketing Website Pages
import HomeV3Page from "./pages/Home/v3";
import HomeV4Page from "./pages/Home/v4";
import HomeV9Page from "./pages/Home/v9";
import HomeV10Page from "./pages/Home/v10";
import HomeV11Page from "./pages/Home/v11";
import StudioPage from "./pages/Platform/Studio";
import StudioV1Page from "./pages/Platform/Studio/v1";
import StudioV3Page from "./pages/Platform/Studio/v3";
import StudioDashboard from "./pages/Platform/Studio/Dashboard";
import SecurityPage from "./pages/Platform/Security";
import IQAPage from "./pages/Platform/IQA";
import GuardrailsPage from "./pages/Platform/Guardrails";
import PlatformOverviewPage from "./pages/Platform/Overview";
import MarketplacePage from "./pages/Solutions/Marketplace";
import HorizontalSolutionsPage from "./pages/Solutions/Horizontal";
import BFSISolutionsPage from "./pages/Solutions/Vertical/BFSI";
import RetailSolutionsPage from "./pages/Solutions/Vertical/Retail";
import UseCaseDemoPage from "./pages/Solutions/Demo";
import DevelopersPage from "./pages/Developers";
import DevelopersV2Page from "./pages/Developers/v2";
import PrelaunchPage from "./pages/Prelaunch";
import PrelaunchV0Page from "./pages/Prelaunch/v0";
import PrelaunchV1Page from "./pages/Prelaunch/v1";
import PrelaunchV2Page from "./pages/Prelaunch/v2";
import PrelaunchV3Page from "./pages/Prelaunch/v3";
import PrelaunchV4Page from "./pages/Prelaunch/v4";
import PrelaunchV5Page from "./pages/Prelaunch/v5";
import PrelaunchV6Page from "./pages/Prelaunch/v6";
import PrelaunchV7Page from "./pages/Prelaunch/v7";
import PrelaunchV8Page from "./pages/Prelaunch/v8";
import BlogPage from "./pages/Resources/Blog";
import BlogPostPage from "./pages/Resources/Blog/EndOfManualCompany";

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const latestHome = getLatestHomeVersionPath();

const App: React.FC = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Marketing Website Routes (Public) — `/` always forwards to newest Home (see versionRoutes) */}
        <Route path="/" element={<Navigate to={latestHome} replace />} />
        <Route path="/v3" element={<HomeV3Page />} />
        <Route path="/v4" element={<HomeV4Page />} />
        <Route path="/v9" element={<HomeV9Page />} />
        <Route path="/v10" element={<HomeV10Page />} />
        <Route path="/v11" element={<HomeV11Page />} />
        <Route path="/platform/overview" element={<PlatformOverviewPage />} />
        <Route path="/platform/studio" element={<StudioPage />} />
        <Route path="/platform/studio/v1" element={<StudioV1Page />} />
        <Route path="/platform/studio/v3" element={<StudioV3Page />} />
        <Route path="/platform/studio/dashboard" element={<StudioDashboard />} />
        <Route path="/platform/security" element={<SecurityPage />} />
        <Route path="/platform/ai-gateway" element={<SecurityPage />} />
        <Route path="/platform/iqa" element={<IQAPage />} />
        <Route path="/platform/guardrails" element={<GuardrailsPage />} />
        <Route path="/solutions/marketplace" element={<MarketplacePage />} />
        <Route path="/solutions/horizontal" element={<HorizontalSolutionsPage />} />
        <Route path="/solutions/vertical/bfsi" element={<BFSISolutionsPage />} />
        <Route path="/solutions/vertical/retail" element={<RetailSolutionsPage />} />
        <Route path="/solutions/demo" element={<UseCaseDemoPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/developers/v2" element={<DevelopersV2Page />} />
        <Route path="/prelaunch" element={<PrelaunchPage />} />
        <Route path="/prelaunch/v0" element={<PrelaunchV0Page />} />
        <Route path="/prelaunch/v1" element={<PrelaunchV1Page />} />
        <Route path="/prelaunch/v2" element={<PrelaunchV2Page />} />
        <Route path="/prelaunch/v3" element={<PrelaunchV3Page />} />
        <Route path="/prelaunch/v4" element={<PrelaunchV4Page />} />
        <Route path="/prelaunch/v5" element={<PrelaunchV5Page />} />
        <Route path="/prelaunch/v6" element={<PrelaunchV6Page />} />
        <Route path="/prelaunch/v7" element={<PrelaunchV7Page />} />
        <Route path="/prelaunch/v8" element={<PrelaunchV8Page />} />
        <Route path="/resources/blog" element={<BlogPage />} />
        <Route path="/resources/blog/end-of-manual-company" element={<BlogPostPage />} />
        <Route path="/signup" element={<PrelaunchPage />} />
        <Route path="/signin" element={<PrelaunchPage />} />

        {/* Catch-all redirect to latest home */}
        <Route path="*" element={<Navigate to={latestHome} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

