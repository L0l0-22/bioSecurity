import React, { useState } from "react";
import logo from "./assets/images/logo.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./components/SuccessModal";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: "", message: "" }); 
  const navigate = useNavigate();   

  const handleSubmit = async (e) => {        
  e.preventDefault();
  try {
    const res = await axios.post("https://bioapis.gosmart.eg/api/login", {
      email,
      password,
    });
    console.log("[Login] Success:", res.data);
    if (res.data.success) {
      // Save token with 1-day expiry
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 1 day in ms
      sessionStorage.setItem("authToken", JSON.stringify({
        token: res.data.token,
         id: res.data.id,
        expiry
      }));
      setSuccessModal({ isOpen: true, title: "Login Successful", message: "Welcome back!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);   // ⬅️ navigate after 2s
    } else {
      setSuccessModal({ 
        isOpen: true, 
        title: "Login Failed", 
        message: "Invalid credentials.", 
        type: "error" 
      });
    }
  } catch (err) {
    console.error("[Login] Error:", err);
    setSuccessModal({ isOpen: true, title: "Login Failed", message: err.message || "Invalid credentials.", type: "error" });
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className=""
          />
        </div>
        <h2 className="text-2xl font-semibold text-main dark:text-white mb-12">
          Login to Your Account
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-main text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <SuccessModal
          isOpen={successModal.isOpen}
          onClose={() => setSuccessModal({ isOpen: false, title: "", message: "" })}
          title={successModal.title}
          message={successModal.message}
          type={successModal.type} 
        />  
      </div>
    </div>
  );
}
