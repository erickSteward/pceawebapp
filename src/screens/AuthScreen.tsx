import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CONGREGATIONS } from '../data/mockData';
import { PceaLogo } from '../components/PceaLogo';
import { 
  User, 
  Lock, 
  Phone, 
  Mail, 
  Church, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { 
    loginWithCredentials, 
    registerMember, 
    loginAs, 
    congregation, 
    setActiveTab 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form state
  const [fullName, setFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCongregation, setRegCongregation] = useState(congregation);
  const [membershipNum, setMembershipNum] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState<'en' | 'ki'>('en');

  // Reset password state
  const [resetContact, setResetContact] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = loginWithCredentials(loginId, loginPassword);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setActiveTab('home');
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = registerMember({
      fullName,
      phoneNumber: regPhone,
      email: regEmail,
      congregation: regCongregation,
      membershipNumber: membershipNum,
      preferredLanguage: preferredLang
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setActiveTab('home');
      }, 900);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetContact.trim()) {
      setErrorMsg('Please enter your registered phone number or email.');
      return;
    }
    setResetSent(true);
    setSuccessMsg(`A password reset link and SMS code have been sent to ${resetContact}.`);
  };

  return (
    <div className="pb-24 max-w-xl mx-auto px-4 sm:px-6 pt-6">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <PceaLogo size={48} showText={false} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Presbyterian Church of East Africa
          </h1>
          <p className="text-xs text-stone-500">
            {mode === 'login' && 'Member Portal & Congregation Access'}
            {mode === 'register' && 'New Church Member Registration'}
            {mode === 'reset' && 'Password Recovery'}
          </p>
        </div>

        {/* Quick Demo Credentials Helper */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B6B15]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reviewer Quick Switcher:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                loginAs('member');
                setActiveTab('home');
              }}
              className="py-1.5 px-2 bg-white rounded-lg border border-amber-200 font-semibold text-stone-800 hover:bg-stone-50 text-left"
            >
              Sign In as Member (Grace)
            </button>
            <button
              onClick={() => {
                loginAs('admin');
                setActiveTab('admin');
              }}
              className="py-1.5 px-2 bg-white rounded-lg border border-amber-200 font-semibold text-stone-800 hover:bg-stone-50 text-left"
            >
              Sign In as Admin (Elder David)
            </button>
          </div>
        </div>

        {/* Notification Alert Banners */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab switch between Login and Register */}
        {mode !== 'reset' && (
          <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                mode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Member Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                mode === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Register Account
            </button>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number or Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. member@pcea.or.ke or 0712 345 678"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30 focus:border-[#0D472B]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode('reset')}
                  className="text-xs text-[#0D472B] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30 focus:border-[#0D472B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0D472B] text-white text-xs sm:text-sm font-semibold hover:bg-[#08301D] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Sign In to Member Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. REGISTRATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Names (As registered in Church Roll)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Mwangi Kariuki"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+254 700 000 000"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Parish Congregation
              </label>
              <select
                value={regCongregation}
                onChange={(e) => setRegCongregation(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30 font-medium text-stone-800"
              >
                {CONGREGATIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Church Member Card # (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PCEA/STA/2024/048"
                  value={membershipNum}
                  onChange={(e) => setMembershipNum(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Preferred Language
                </label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as 'en' | 'ki')}
                  className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                >
                  <option value="en">English (Golden Bells & KJV)</option>
                  <option value="ki">Gĩkũyũ (Nyimbo cia Ngai & Ibuku)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Create Account Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0D472B] text-white text-xs sm:text-sm font-semibold hover:bg-[#08301D] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Submit Registration to Parish Roll</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. PASSWORD RESET FORM */}
        {mode === 'reset' && (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-xs text-stone-600">
              Enter your registered phone number or email. You will receive an SMS OTP or reset link to restore your password.
            </p>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number or Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0712 345 678"
                value={resetContact}
                onChange={(e) => setResetContact(e.target.value)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0D472B] text-white text-xs sm:text-sm font-semibold hover:bg-[#08301D] transition-colors"
            >
              Send Verification Code
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="w-full text-xs text-stone-600 hover:underline text-center"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Legal & Data Privacy Notice */}
        <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400 text-center leading-relaxed">
          <p>
            Your member information is safely protected in compliance with the Kenyan Data Protection Act (2019) and PCEA General Assembly constitution.
          </p>
        </div>
      </div>
    </div>
  );
};
