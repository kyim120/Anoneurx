
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    const roleRoutes = {
      'ceo': '/dashboard/ceo',
      'content-manager': '/dashboard/content-manager',
      'finance-manager': '/dashboard/finance',
      'hr': '/dashboard/hr',
      'hod': '/dashboard/hod',
      'employee': '/dashboard/employee',
      'intern': '/dashboard/intern',
      'student': '/dashboard/student',
      'client': '/dashboard/client',
      'research-collaborator': '/dashboard/research-collaborator',
      'auditor': '/dashboard/auditor'
    };

    // Get primary role (first role in array or fallback)
    const primaryRole = Array.isArray(user.roles) ? user.roles[0] : user.role;
    const targetRoute = roleRoutes[primaryRole as keyof typeof roleRoutes] || '/dashboard/profile';
    
    // Always redirect from base dashboard route to role-specific route
    if (window.location.pathname === '/dashboard') {
      navigate(targetRoute, { replace: true });
    }
  }, [navigate]);

  return null; // This will be handled by the routing in App.tsx
};

export default Dashboard;
