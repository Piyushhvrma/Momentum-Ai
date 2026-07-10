
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";
import AuthVisual from "../components/auth/AuthVisual";

import {
  RiArrowRightLine,
  RiCheckLine,
  RiEyeLine,
  RiEyeOffLine,
  RiFlashlightLine,
  RiLockLine,
  RiMailLine,
  RiShieldCheckLine,
  RiUserLine,
} from "react-icons/ri";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 6,
      letter: /[a-zA-Z]/.test(form.password),
      number: /\d/.test(form.password),
    }),
    [form.password],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await registerUser({
        name,
        email,
        password: form.password,
      });

      login(response.data.user, response.data.token);

      toast.success("Your StudyBuddy account is ready!", {
        id: loadingToast,
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        { id: loadingToast },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <AuthVisual mode="register" />

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
              Build better study habits
            </div>

            <h1 className="auth-heading">
              Create your
              <span className="auth-heading-gradient"> learning workspace.</span>
            </h1>

            <p className="auth-description">
              Track progress, organize your resources and collaborate with
              friends from one focused platform.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="name" className="auth-label">
                  Full name
                </label>

                <div className="auth-input-wrapper">
                  <RiUserLine className="auth-input-icon" />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="auth-input"
                    required
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    placeholder="Create a secure password"
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

                {form.password && (
                  <div className="auth-password-checks">
                    <PasswordCheck
                      valid={passwordChecks.length}
                      label="6+ chars"
                    />
                    <PasswordCheck
                      valid={passwordChecks.letter}
                      label="Letter"
                    />
                    <PasswordCheck
                      valid={passwordChecks.number}
                      label="Number"
                    />
                  </div>
                )}
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <RiArrowRightLine />
                  </>
                )}
              </motion.button>
            </form>

            <div className="auth-security-note">
              <RiShieldCheckLine className="text-green-600 text-lg shrink-0 mt-0.5" />
              <p>
                We only store the information required to manage your learning
                account and progress.
              </p>
            </div>

            <div className="auth-divider">
              <span />
              <p>Already have an account?</p>
              <span />
            </div>

            <Link to="/login" className="auth-secondary-button">
              Sign in to StudyBuddy
              <RiArrowRightLine />
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function PasswordCheck({ valid, label }) {
  return (
    <div className={`auth-password-check ${valid ? "valid" : ""}`}>
      <RiCheckLine />
      {label}
    </div>
  );
}
