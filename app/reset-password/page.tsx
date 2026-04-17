"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FiMail, FiLock, FiShield, FiArrowRight, FiCheckCircle, FiChevronLeft } from 'react-icons/fi'

export default function ResetPassword() {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState({ type: '', text: '' })

    const notify = (text: string, type = 'error') => setMsg({ text, type });

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        setLoading(true);
        try {
            await axios.post('/api/user/forgot-password', { email });
            setStep(1);
            setMsg({ type: 'success', text: 'OTP sent to your email.' });
        } catch (err: any) {
            notify(err.response?.data?.message || 'Email not found');
        } finally { setLoading(false); }
    }

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        if (password.length < 6) return notify('Password too short');
        setLoading(true);
        try {
            await axios.post('/api/user/reset-password', { email, otp, password });
            setStep(2);
        } catch (err: any) {
            notify(err.response?.data?.message || 'Invalid or expired OTP');
        } finally { setLoading(false); }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 selection:bg-emerald-100">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 transition-all duration-500">
                {step === 0 && (
                    <form onSubmit={handleSendOTP} className="space-y-8">
                        <div className="space-y-2 text-center">
                            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Forgot Password</h1>
                            <p className="text-gray-400 text-sm font-medium">Verify your identity to secure your account</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative group">
                                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                                <input required type="email" placeholder="Recovery Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-gray-300 transition-all" />
                            </div>
                            <button disabled={loading} type="submit" className="w-full py-5 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                {loading ? 'Processing...' : <>Send Reset Code <FiArrowRight /></>}
                            </button>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <form onSubmit={handleReset} className="space-y-8">
                        <button type="button" onClick={() => { setStep(0); setMsg({ type: '', text: '' }); }} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors"><FiChevronLeft size={20} /></button>
                        <div className="space-y-2 text-center -mt-4">
                            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Secure Reset</h1>
                            <p className="text-gray-400 text-sm font-medium italic">Sent to {email}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative group">
                                <FiShield className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                                <input required maxLength={6} type="text" placeholder="6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-300 tracking-[0.5em] transition-all" />
                            </div>
                            <div className="relative group">
                                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                                <input required type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-gray-300 transition-all" />
                            </div>
                            <button disabled={loading} type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 leading-none">
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                            <FiCheckCircle size={40} />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-none">Access Restored</h1>
                            <p className="text-gray-400 text-sm font-medium">Your password has been securely updated.</p>
                        </div>
                        <Link href="/login" className="block w-full py-5 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
                            Sign In to Account
                        </Link>
                    </div>
                )}

                {msg.text && step !== 2 && (
                    <p className={`mt-6 text-center text-[10px] font-black uppercase tracking-widest ${msg.type === 'error' ? 'text-red-500' : 'text-emerald-600'}`}>
                        {msg.text}
                    </p>
                )}
            </div>
        </main>
    )
}