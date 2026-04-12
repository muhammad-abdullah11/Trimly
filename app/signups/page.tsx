"use client";

import { useState } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("Muhammad Abdullah");
  const [email, setEmail] = useState("abdullahworld111@gmail.com");
  const [password, setPassword] = useState("user1234");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("/api/auth/signups", { fullName, email, password });
      setSuccess(res.data.message || "Account created successfully! You can now log in.");
      router.push(`/verify-account/${encodeURIComponent(email)}`);
    }
    catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while creating your account. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex gap-12 py-12">
      <section className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center p-8">
        <div className="relative h-full w-full">
          <Image
            alt="Trimly Integrations"
            src="https://d1ayxb9ooonjts.cloudfront.net/web_sign_up_sign_in/96a3ebd0-465c-4275-8be6-a831bdeb8daf/images/login-integrations.png"
            fill
            className="object-cover h-full w-full"
          />

        </div>
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center py-6 md:p-12">
        <div className="w-full max-w-md">

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your Trimly account</h1>
            <p className="text-gray-500 text-sm">Start shortening links and tracking clicks</p>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#2A5BD7" d="M15.078 15.625c1.758-1.64 2.54-4.375 2.07-6.992h-6.992v2.89h3.985c-.157.938-.703 1.72-1.485 2.227z"></path><path fill="#34A853" d="M3.516 13.32a7.5 7.5 0 0 0 11.562 2.305l-2.422-1.875c-2.07 1.367-5.508.86-6.68-2.344z"></path><path fill="#FBBC02" d="M5.975 11.406a4.45 4.45 0 0 1 0-2.851L3.515 6.64c-.9 1.797-1.173 4.336 0 6.68z"></path><path fill="#EA4335" d="M5.977 8.555c.859-2.696 4.53-4.258 6.992-1.954l2.148-2.109C12.07 1.562 6.133 1.68 3.516 6.641z"></path></svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 bg-white">
              <FaFacebook className="text-blue-600 text-lg" />
              <span className="text-sm font-medium">Continue with Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 bg-white">
              <FaGithub className="text-gray-900 text-lg" />
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            handleSubmit(e);
          }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Abdullah"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-10 text-gray-900 text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white rounded-lg py-3 px-4 text-sm font-medium"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
