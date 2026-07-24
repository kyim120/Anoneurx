import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Github } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import logoImg from "@/assets/logo.svg";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022" />
    <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00" />
    <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF" />
    <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900" />
  </svg>
);

const Auth = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const { updateLoginHistory } = useUserContext();
  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const user = {
          _id: data._id,
          email: data.email,
          name: data.name,
          roles: data.roles || [data.role]
        };

        login(user, data.token);
        updateLoginHistory(loginData.email);

        toast({
          title: "Login Successful!",
          description: `Welcome back, ${user.name}!`,
        });

        navigate(redirectTo ? decodeURIComponent(redirectTo) : "/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
        toast({
          title: "Login Failed",
          description: data.message || "Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Network error. Please try again.");
      toast({
        title: "Connection Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const brandMap = {
    cloud: "ANONEURX CLOUD",
    apps: "ANONEURX STORE",
  };

  const getBrandName = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('cloud')) return brandMap.cloud;
    if (path.includes('apps') || path.includes('store')) return brandMap.apps;
    return "ANONEURX";
  };

  const brandName = getBrandName();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
            <CardHeader className="text-center pb-2 pt-8">
              <div className="flex flex-col items-center mb-6">
                <img src={logoImg} alt="Logo" className="w-20 h-20 mb-4 animate-scale-in object-contain" />
                <h3 className="text-xl font-brand text-white tracking-[0.2em] animate-fade-in text-center px-4">
                  WELCOME TO {brandName}
                </h3>
                <p className="text-gray-400 text-sm mt-3">Access your professional workspace</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    className="bg-white/10 text-white placeholder:text-gray-400"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">

                  <Input
                    type="password"
                    id="login-password"
                    placeholder="Enter your password"
                    className="bg-white/10 text-white placeholder:text-gray-400"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <div className="flex justify-end px-1">
                    <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-2"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#121212] px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* <div className="flex justify-center gap-3">
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => toast({ title: "Github", description: "Integration coming soon" })}>
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10" onClick={() => toast({ title: "Google", description: "Integration coming soon" })}>
                  <GoogleIcon />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => toast({ title: "Microsoft", description: "Integration coming soon" })}>
                  <MicrosoftIcon />
                </Button>
              </div> */}
              <p className="text-center text-xs text-gray-500">
                New here? <Link to="/pay/signup" className="text-blue-400 hover:text-blue-300">Open a bank account</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Auth;