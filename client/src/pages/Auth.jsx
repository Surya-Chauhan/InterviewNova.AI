import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Utils/firebase";
import api from "../Utils/api";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { toast } from "sonner";

function Auth({ isModel = false }) {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await api.post(`${ServerUrl}/api/auth/google`, {
        name: user.displayName,
        email: user.email,
      });

      sessionStorage.setItem("token", result.data.token);
      dispatch(setUserData(result.data.user));
      toast.success("Signed in with Google successfully!");

      if (isModel) {
        window.dispatchEvent(new CustomEvent("authSuccess"));
      }
    } catch (error) {
      console.error("Google auth error:", error);
      sessionStorage.removeItem("token");
      dispatch(setUserData(null));
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(loginEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(loginPassword)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = response.user;

      const result = await api.post(`${ServerUrl}/api/auth/email-login`, {
        uid: user.uid,
        email: user.email,
      });

      sessionStorage.setItem("token", result.data.token);
      dispatch(setUserData(result.data.user));
      toast.success("Logged in successfully!");

      if (isModel) {
        window.dispatchEvent(new CustomEvent("authSuccess"));
      }
    } catch (error) {
      console.error("Email login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(signupEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(signupPassword)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const user = userCredential.user;

      // Update Firebase profile with displayName
      await updateProfile(user, {
        displayName: signupName,
      });

      // Send to backend to create user and generate JWT
      const result = await api.post(`${ServerUrl}/api/auth/email-signup`, {
        name: signupName,
        email: signupEmail,
        uid: user.uid,
      });

      sessionStorage.setItem("token", result.data.token);
      dispatch(setUserData(result.data.user));
      toast.success("Account created successfully!");

      if (isModel) {
        window.dispatchEvent(new CustomEvent("authSuccess"));
      }
    } catch (error) {
      console.error("Email signup error:", error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        w-full
        ${isModel
          ? "py-4"
          : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`
          w-full
          ${isModel
            ? "max-w-md p-8 rounded-3xl"
            : "max-w-lg p-12 rounded-[32px]"}
          bg-white shadow-2xl border border-gray-200
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h2 className="font-semibold text-lg">InterviewNova.AI</h2>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
          <span className="block text-sm text-gray-500 mt-2">
            {mode === "login"
              ? "Sign in to continue your interview practice"
              : "Join thousands preparing for success"}
          </span>
        </h1>

        {/* Mode Toggle Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setMode("login")}
            disabled={loading}
            className={`
              flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all
              ${mode === "login"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
              }
              ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            disabled={loading}
            className={`
              flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all
              ${mode === "signup"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
              }
              ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <AnimatePresence initial={false}>
          {mode === "login" ? (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleEmailLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={loading}
                  required
                  className={`
                    w-full py-3 px-4 border border-gray-200 rounded-xl 
                    focus:ring-2 focus:ring-green-500 outline-none transition
                    ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                  `}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loading}
                    required
                    className={`
                      w-full py-3 px-4 pr-12 border border-gray-200 rounded-xl 
                      focus:ring-2 focus:ring-green-500 outline-none transition
                      ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className={`
                      absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700
                      ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                whileHover={{ opacity: loading ? 1 : 0.9 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`
                  w-full py-3 rounded-full font-semibold text-lg transition duration-300
                  ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 shadow-md"
                  }
                  text-white
                `}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="signup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleEmailSignup}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  disabled={loading}
                  required
                  className={`
                    w-full py-3 px-4 border border-gray-200 rounded-xl 
                    focus:ring-2 focus:ring-green-500 outline-none transition
                    ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                  `}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  disabled={loading}
                  required
                  className={`
                    w-full py-3 px-4 border border-gray-200 rounded-xl 
                    focus:ring-2 focus:ring-green-500 outline-none transition
                    ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                  `}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password (min 6 characters)"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    disabled={loading}
                    required
                    className={`
                      w-full py-3 px-4 pr-12 border border-gray-200 rounded-xl 
                      focus:ring-2 focus:ring-green-500 outline-none transition
                      ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className={`
                      absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700
                      ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                    className={`
                      w-full py-3 px-4 pr-12 border border-gray-200 rounded-xl 
                      focus:ring-2 focus:ring-green-500 outline-none transition
                      ${loading ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-300"}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className={`
                      absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700
                      ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                whileHover={{ opacity: loading ? 1 : 0.9 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`
                  w-full py-3 rounded-full font-semibold text-lg transition duration-300
                  ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 shadow-md"
                  }
                  text-white
                `}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <motion.button
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={{ opacity: loading ? 1 : 0.9, scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`
            w-full flex items-center justify-center gap-3 py-3 
            rounded-full shadow-md transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:opacity-90"
            }
          `}
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>

        {/* Mode Switch Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={toggleMode}
                disabled={loading}
                className={`
                  text-green-600 font-medium hover:underline transition
                  ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                `}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                disabled={loading}
                className={`
                  text-green-600 font-medium hover:underline transition
                  ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                `}
              >
                Login
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;