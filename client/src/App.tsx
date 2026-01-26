// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Context
// import { UserProvider } from "./context/UserProvider";

// // Layouts
// import MainLayout from "./pages/user/MainLayout";
// import UserLayout from "./pages/user/UserLayout";
// import AdminLayout from "./pages/admin/AdminLayout";

// // Common
// import NotFound from "./pages/common/NotFound";

// // User Pages
// import Home from "./pages/user/Home";
// import About from "./pages/user/About";
// import Calculators from "./pages/user/Calculators";
// import Advertise from "./pages/user/Advertise";
// import FAQ from "./pages/user/FAQ";
// import Contact from "./pages/user/Contact";
// import UserLogin from "./pages/user/UserLogin";
// import UserSignup from "./pages/user/UserSignup";
// import GoogleCallback from "./pages/user/GoogleCallback";
// import KnowledgeList from "./pages/user/KnowledgeList";
// import KnowledgeDetail from "./pages/user/KnowledgeDetail";
// import UserProfile from "./pages/user/UserProfile";
// import MyActivity from "./pages/user/MyActivity";
// import RoadmapPage from "./pages/user/RoadmapPage";

// // Admin Pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminEditor from "./pages/admin/AdminEditor";
// import AllContents from "./pages/admin/AllContents";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminProfile from "./pages/admin/AdminProfile";
// import AdminRoadmapEditor from "./pages/admin/AdminRoadmapEditor";
// import AllRoadmap from "./pages/admin/AllRoadmap";

// // Utils
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App(): JSX.Element {
//   return (
//     <Routes>
//       {/* ===================== PUBLIC ROUTES ===================== */}
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/calculators" element={<Calculators />} />
//         <Route path="/advertise" element={<Advertise />} />
//         <Route path="/faqs" element={<FAQ />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/user/login" element={<UserLogin />} />
//       </Route>

//       <Route path="/user/signup" element={<><Navbar /><UserSignup /></>} />
//       <Route path="/user/google/callback" element={<GoogleCallback />} />

//       <Route path="*" element={<NotFound />} />

//       {/* ===================== USER ROUTES ===================== */}
//       <Route
//         element={
//           <UserProvider>
//             <UserLayout />
//           </UserProvider>
//         }
//       >
//         <Route path="/knowledge" element={<><KnowledgeList /><Footer /></>} />
//         <Route
//           path="/knowledge/:slug"
//           element={
//             <ProtectedRoute roleRequired="user">
//               <><KnowledgeDetail /><Footer /></>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/profile"
//           element={
//             <ProtectedRoute roleRequired="user">
//               <UserProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/activity"
//           element={
//             <ProtectedRoute roleRequired="user">
//               <MyActivity />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/roadmap"
//           element={
//             <ProtectedRoute roleRequired="user">
//               <><RoadmapPage /><Footer /></>
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* ===================== ADMIN ROUTES ===================== */}
//       <Route element={<AdminLayout />}>
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/content/new"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminEditor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/content/:id"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminEditor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/contents"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AllContents />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminUsers />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/profile"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/roadmap"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminRoadmapEditor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/roadmaps/:id"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AdminRoadmapEditor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/roadmaps"
//           element={
//             <ProtectedRoute roleRequired="admin">
//               <AllRoadmap />
//             </ProtectedRoute>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// }
