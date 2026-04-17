"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { MdVerified, MdMarkEmailRead } from "react-icons/md";
import { RiLoader4Line } from "react-icons/ri";
import { TbAlertCircle } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";

interface VerifyAccountClientProps {
  email: string;
}

type Status = "idle" | "loading" | "success" | "error";

const OTP_LENGTH = 6;

const VerifyAccountClient = ({ email }: VerifyAccountClientProps) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const decodedEmail = decodeURIComponent(email);

  const focusNext = (index: number) => {
    if (index + 1 < OTP_LENGTH) inputRefs.current[index + 1]?.focus();
  };

  const focusPrev = (index: number) => {
    if (index - 1 >= 0) inputRefs.current[index - 1]?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = val;
    setDigits(next);
    if (val) focusNext(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !digits[index]) focusPrev(index);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...digits];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setDigits(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleSubmit = async () => {
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setStatus("error");
      setMessage("Please enter all 6 digits of the OTP.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await axios.post("/api/user/verify-account", { email: decodedEmail, otp });
      setStatus("success");
      setMessage(res.data.message || "Account verified successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setStatus("error");
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setDigits(Array(OTP_LENGTH).fill(""));
    setStatus("idle");
    setMessage("");
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const isComplete = digits.every((d) => d !== "");

  if (status === "success") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-5">
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50">
              <MdVerified className="text-emerald-500 text-5xl" />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Account Verified!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your email <span className="font-semibold text-gray-700">{decodedEmail}</span> has been successfully verified. You can now log in to your account.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
          >
            Go to Login <HiArrowRight />
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-1">
            <MdMarkEmailRead className="text-emerald-500 text-4xl" />
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Verify your account</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-800">{decodedEmail}</span>.
            Enter it below to verify your account.
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              disabled={status === "loading"}
              className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 text-gray-900
                ${digit ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-gray-50"}
                ${status === "loading" ? "opacity-60 cursor-not-allowed" : "hover:border-emerald-400 focus:border-emerald-500 focus:bg-emerald-50"}
              `}
            />
          ))}
        </div>

        {status === "error" && message && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
            <TbAlertCircle className="text-lg shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "loading" || !isComplete}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
            ${isComplete && status !== "loading"
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {status === "loading" ? (
            <>
              <RiLoader4Line className="animate-spin text-lg" />
              Verifying...
            </>
          ) : (
            <>
              Verify Account <HiArrowRight />
            </>
          )}
        </button>

        <div className="text-center">
          <button
            onClick={handleReset}
            disabled={status === "loading"}
            className="text-sm text-gray-400 hover:text-emerald-500 transition-colors duration-150 disabled:cursor-not-allowed"
          >
            Clear & try again
          </button>
        </div>
      </div>
    </main>
  );
};

export default VerifyAccountClient;
