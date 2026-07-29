import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useUserContext } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/services/apiClient";
import { ArrowLeft, Loader2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import logoSvg from "@/assets/logo.svg";
import { LoginComponent } from "./LoginComponent";
import { SignupComponent } from "./SignupComponent";
import { ConnectAuth } from "./ConnectAuth";

type Mode = "login" | "signup" | "connect" | "forgot" | "verify" | "reset";
const MODES: Mode[] = ["login", "signup", "connect", "forgot", "verify", "reset"];

const fieldClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawMode = searchParams.get("mode") as Mode | null;
  const mode: Mode = rawMode && MODES.includes(rawMode) ? rawMode : "login";
  const redirectTo = searchParams.get("redirect");

  const { updateLoginHistory } = useUserContext();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [forgotForm, setForgotForm] = useState({
    email: "",
    code: "",
    password: "",
    confirm: "",
  });

  const setMode = (next: Mode) => {
    setError(null);
    const params = new URLSearchParams(searchParams);
    params.set("mode", next);
    setSearchParams(params, { replace: false });
  };

  const brandName = useMemo(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("cloud")) return "Anoneurx Cloud";
    if (path.includes("apps") || path.includes("store")) return "Anoneurx Store";
    if (path.includes("blackwall")) return "Black Wall";
    if (path.includes("nexora")) return "Nexora";
    return "Anoneurx";
  }, []);

  const finishLogin = (data: any, emailInput?: string, nameInput?: string) => {
    const user = {
      _id: data._id,
      email: data.email ?? emailInput ?? "",
      name: data.name ?? nameInput ?? emailInput ?? "User",
      roles: data.roles || (data.role ? [data.role] : ["user"]),
    };
    login(user, data.token);
    updateLoginHistory(user.email);
    toast({ title: "Welcome back", description: `Signed in as ${user.name}.` });
    navigate(redirectTo ? decodeURIComponent(redirectTo) : "/dashboard");
  };

  const handleLoginSubmit = async ({
    email,
    password,
    keepSignedIn,
  }: {
    email: string;
    password?: string;
    keepSignedIn?: boolean;
  }) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiClient.post<any>("/auth/login", {
        email,
        password,
        remember: keepSignedIn,
      });
      if (!data?.token) throw new Error(data?.message || "Invalid email or password.");
      finishLogin(data, email);
    } catch (err: any) {
      const msg = err?.message || "Invalid email or password.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    setError(null);
    setLoading(true);
    try {
      await apiClient.post("/auth/signup", { name, email, password });
      toast({ title: "Account created", description: "Check your inbox for a verification code." });
    } catch (err: any) {
      const msg = err?.message || "Failed to create account.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async ({ email, code }: { email: string; code: string }) => {
    setError(null);
    setLoading(true);
    try {
      await apiClient.post("/auth/verify", { email, code });
      toast({ title: "Verified", description: "Your email is confirmed." });
      setMode("login");
    } catch (err: any) {
      const msg = err?.message || "Verification failed.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiClient.post("/auth/forgot-password", { email: forgotForm.email });
      toast({ title: "Code sent", description: `We emailed a code to ${forgotForm.email}.` });
      setMode("verify");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotForm.password !== forgotForm.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await apiClient.post("/auth/reset-password", {
        email: forgotForm.email,
        code: forgotForm.code,
        password: forgotForm.password,
      });
      toast({ title: "Password updated", description: "You can sign in with your new password." });
      setMode("login");
    } catch (err: any) {
      setError(err?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "github" | "google" | "microsoft") => {
    try {
      const data = await apiClient.get<{ url?: string }>(`/auth/oauth/${provider}`);
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No redirect URL returned.");
    } catch {
      toast({
        title: `${provider[0].toUpperCase()}${provider.slice(1)} sign-in`,
        description: "This provider isn't configured yet.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[440px]">
          <div className="glass backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-2xl shadow-2xl px-7 py-9 sm:px-10">
            {mode === "login" && (
              <LoginComponent
                brandName={brandName}
                loading={loading}
                error={error}
                onNavigateToSignup={() => setMode("signup")}
                onNavigateToForgot={() => setMode("forgot")}
                onNavigateToConnect={() => setMode("connect")}
                onSubmitLogin={handleLoginSubmit}
                onSocialLogin={handleSocial}
              />
            )}

            {mode === "signup" && (
              <SignupComponent
                brandName={brandName}
                loading={loading}
                error={error}
                onNavigateToLogin={() => setMode("login")}
                onSubmitSignup={handleSignupSubmit}
                onVerifyCode={handleVerifySubmit}
              />
            )}

            {mode === "connect" && <ConnectAuth />}

            {mode === "forgot" && (
              <div>
                <div className="flex flex-col items-center justify-center text-center mb-6">
                  <img src={logoSvg} alt="Anoneurx" className="w-16 h-16 object-contain mb-2" />
                  <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
                </div>

                <h1 className="text-2xl font-semibold text-white mb-1.5">Reset password</h1>
                <p className="text-sm text-gray-400 mb-7">Enter your email and we'll send a verification code.</p>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={forgotForm.email}
                    onChange={(e) => setForgotForm({ ...forgotForm, email: e.target.value })}
                    required
                    className={fieldClass}
                  />

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send code"}
                  </Button>
                </form>
              </div>
            )}

            {mode === "verify" && (
              <div>
                <div className="flex flex-col items-center justify-center text-center mb-6">
                  <img src={logoSvg} alt="Anoneurx" className="w-16 h-16 object-contain mb-2" />
                  <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
                </div>

                <h1 className="text-2xl font-semibold text-white mb-1.5">Verify your email</h1>
                <p className="text-sm text-gray-400 mb-7">Enter the 6-digit code we sent to your inbox.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleVerifySubmit({ email: forgotForm.email, code: forgotForm.code });
                  }}
                  className="space-y-4"
                >
                  <div className="flex justify-center py-2">
                    <InputOTP
                      maxLength={6}
                      value={forgotForm.code}
                      onChange={(v) => setForgotForm({ ...forgotForm, code: v })}
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} className="border-white/15 text-white h-11 w-11" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                  </Button>
                </form>
              </div>
            )}

            {mode === "reset" && (
              <div>
                <div className="flex flex-col items-center justify-center text-center mb-6">
                  <img src={logoSvg} alt="Anoneurx" className="w-16 h-16 object-contain mb-2" />
                  <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
                </div>

                <h1 className="text-2xl font-semibold text-white mb-1.5">New password</h1>
                <p className="text-sm text-gray-400 mb-7">Choose a strong password you haven't used before.</p>

                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="New password"
                    value={forgotForm.password}
                    onChange={(e) => setForgotForm({ ...forgotForm, password: e.target.value })}
                    required
                    className={fieldClass}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={forgotForm.confirm}
                    onChange={(e) => setForgotForm({ ...forgotForm, confirm: e.target.value })}
                    required
                    className={fieldClass}
                  />

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update password"}
                  </Button>
                </form>
              </div>
            )}
          </div>

          <p className="text-center text-[11px] text-white/80 mt-6">Protected by Anoneurx Identity</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Auth;
