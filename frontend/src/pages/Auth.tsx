import { useEffect, useState, type SetStateAction } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { authService } from "../services/authService";
import { signinSchema, signupSchema } from "../validators/authValidator";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<
    "signin" | "signup" | "forgot"
  >("signin");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true }); // prevent going back
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (currentView === "signup") {
        const parsed = signupSchema.safeParse(formData);
        if (!parsed.success) {
          parsed.error.issues.forEach((err) => toast.error(err.message));
          setLoading(false);
          return;
        }
        const data = await authService.register(
          parsed.data.name,
          parsed.data.email,
          parsed.data.password,
          parsed.data.confirmPassword
        );
        await login(data.token);
        navigate("/");
        toast.success("Account created successfully!");
        setCurrentView("signin");
      } else if (currentView === "signin") {
        const parsed = signinSchema.safeParse(formData);
        if (!parsed.success) {
          parsed.error.issues.forEach((err) => toast.error(err.message));
          setLoading(false);
          return;
        }
        const data = await authService.login(
          parsed.data.email,
          parsed.data.password
        );
        login(data.token);
        navigate("/");
        toast.success("Signed in successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const switchView = (view: SetStateAction<"signin" | "signup" | "forgot">) => {
    setCurrentView(view);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* animated bg omitted for brevity */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {currentView === "signin" && "Welcome Back"}
              {currentView === "signup" && "Create Account"}
              {currentView === "forgot" && "Reset Password"}
            </h1>
            <p className="text-gray-400 text-sm">
              {currentView === "signin"
                ? "Sign in to continue"
                : currentView === "signup"
                ? "Join us today!"
                : "We’ll send you a reset link"}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            {currentView === "signup" && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
              />
            </div>

            {currentView !== "forgot" && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
                  placeholder="••••••••"
                />
              </div>
            )}

            {currentView === "signup" && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {loading
                ? "Please wait..."
                : currentView === "signin"
                ? "Sign In"
                : currentView === "signup"
                ? "Create Account"
                : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              {currentView === "signin" && (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => switchView("signup")}
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Sign up
                  </button>
                </>
              )}
              {currentView === "signup" && (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => switchView("signin")}
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
              {currentView === "forgot" && (
                <>
                  Remember your password?{" "}
                  <button
                    onClick={() => switchView("signin")}
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
