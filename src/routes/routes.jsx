import { lazy } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore"

const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const ForgetPassword = lazy(() => import("../auth/ForgetPassword"));
const VerifyOTP = lazy(() => import("../auth/VerifyOTP"));


// Admin

// User
const Dashboard = lazy(() => import("../webView/user/Dashboard"));

//  mobile 
const DashboardUser = lazy(() => import("../mobileView/user/DashboardUser"));
const MobileContests = lazy(() => import("../mobileView/user/pages/MobileContests"));
const MobileWallet = lazy(() => import("../mobileView/user/pages/MobileWallet"));
const MobileProfile = lazy(() => import("../mobileView/user/pages/MobileProfile"));
const MobileMyContests = lazy(() => import("../mobileView/user/pages/MobileMyContests"));
const ContestDetail = lazy(() => import("../mobileView/user/pages/ContestDetail"));

const Home = () => {
    const { user } = useAuthStore();
    if (user?.roleName === "admin") {
        return <Navigate to="/admin-dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
};


const routes = [
    // Auth Routes
    { path: "/login", type: "auth", component: Login },
    { path: "/register", type: "auth", component: Register },
    { path: "/forget-password", type: "auth", component: ForgetPassword },
    { path: "/verify-otp", type: "auth", component: VerifyOTP },

    // Admin Dashboard Routes
    // { path: "/admin/contests", type: "private", component: ContestManagement, title: "ContestManagement", },
    // { path: "/admin/contests/create", type: "private", component: CreateContest, title: "CreateContest", },
    // { path: "/admin/settings", type: "private", component: PlatformSetting, title: "PlatformSettings", },
    // { path: "/admin/revenue", type: "private", component: Revenue, title: "RevenueReport", },
    // { path: "/admin/contests/:id", type: "private", component: ContestID, title: "ContestDetails", },
    // { path: "/contests", type: "private", component: Contests, title: "Contest", },
    // { path: "/admin/contests/edit/:id", type: "private", component: CreateContest, title: "EditContest", },
    // { path: '/Clients', type: 'private', component: Client, title: 'Clients' },
    // { path: '/MT5-Config', type: 'private', component: MT5GroupConfig, title: 'MT5Configuration' },
    // { path: '/MT5-jobs', type: 'private', component: MT5Jobs, title: 'MT5Jobs' },
    // { path: '/admin/contests/:id/prizes', type: 'private', component: PrizeDistribution, title: 'PrizeDistribution' },
    // { path: '/admin/contests/:id/participants', type: 'private', component: Participents, title: 'ContestParticipants' },
    // { path: '/admin/contests/:id/logs', type: 'private', component: AuditLogs, title: 'AuditLogs' },
    // { path: '/admin/contests/:contestId/mt5-executions/:executionId', type: 'private', component: JobExecution, title: 'JobExecution' },

    // Private Routes
    { path: "/", type: "private", title: "Dashboard", mobile: DashboardUser , component:Dashboard},
    { path: "/dashboard", type: "private",  title: "Dashboard", mobile: DashboardUser },
    // { path: "/admin-dashboard", type: "private", component: AdminDashboard, title: "AdminDashboard" },

    // User Dashboard Routes
    { path: "/user/contests", type: "private",  title: "Contests", mobile: MobileContests },
    { path: "/user/contests/:id", type: "private", mobile:ContestDetail, title: (params, location) => location.state?.contest?.contestName || "ContestDetails", },
    { path: "/wallet", type: "private",  title: "Wallet", mobile: MobileWallet },
    { path: "/profile", type: "private",  title: "Profile", mobile: MobileProfile },
    { path: "/my-contests", type: "private", title: "MyContests",mobile: MobileMyContests },
    { path: "/top-picks", type: "private",  title: "TopPicks", },
    { path: "/profile/change-password", type: "private",  title: "ChangePassword", },
    { path: "/profile/manage-2fa", type: "private",  title: "Manage2FA", },
    { path: '/contests/:id/trading', type: 'private',  title: (params, location) => location.state?.contest?.contestName ? `${location.state.contest.contestName}` : `Trading - ${params.contestId}` }

];

export default routes;