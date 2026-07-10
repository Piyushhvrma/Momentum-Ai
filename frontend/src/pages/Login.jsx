
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import AuthVisual from "../components/auth/AuthVisual";

import {
  RiArrowRightLine,
  RiEyeLine,
  RiEyeOffLine,
  RiFlashlightLine,
  RiLockLine,
  RiMailLine,
  RiShieldCheckLine,
} from "react-icons/ri";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = form.email.trim();

    if (!email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Signing you in...");

    try {
      const response = await loginUser({
        email,
        password: form.password,
      });

      login(response.data.user, response.data.token);

      toast.success(`Welcome back, ${response.data.user.name}!`, {
        id: loadingToast,
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
        { id: loadingToast },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <AuthVisual mode="login" />

        <section className="auth-form-panel">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="auth-form-wrapper"
          >
            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">
                <RiFlashlightLine />
              </div>

              <div>
                <h1 className="text-lg font-bold">StudyBuddy</h1>
                <p className="text-xs text-white/50">
                  Your learning workspace
                </p>
              </div>
            </div>

            <div className="auth-eyebrow">
              <span className="auth-status-dot" />
              Secure student workspace
            </div>

            <h1 className="auth-heading">
              Welcome back to your
              <span className="auth-heading-gradient"> learning journey.</span>
            </h1>

            <p className="auth-description">
              Continue tracking your progress, organizing resources and
              collaborating with your study partners.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="auth-label">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <RiMailLine className="auth-input-icon" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="auth-label">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <RiLockLine className="auth-input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="auth-input auth-input-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="auth-password-toggle"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? undefined : { y: -1 }}
                whileTap={loading ? undefined : { scale: 0.99 }}
                className="auth-submit-button"
              >
                {loading ? (
                  <>
                    <span className="auth-button-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue to dashboard
                    <RiArrowRightLine />
                  </>
                )}
              </motion.button>
            </form>

            <div className="auth-security-note">
              <RiShieldCheckLine className="text-green-600 text-lg shrink-0 mt-0.5" />
              <p>
                Your password is securely hashed and protected requests use
                authenticated access tokens.
              </p>
            </div>

            <div className="auth-divider">
              <span />
              <p>New to StudyBuddy?</p>
              <span />
            </div>

            <Link to="/register" className="auth-secondary-button">
              Create your free account
              <RiArrowRightLine />
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
