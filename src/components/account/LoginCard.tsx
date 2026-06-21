"use client";

import { useState } from "react";
import { useToastStore } from "@/store/toastStore";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginCard() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { addToast } = useToastStore();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({
        type: "error",
        message: "Hata",
        description: "Lütfen tüm alanları doldurun.",
      });
      return;
    }
    addToast({
      type: "info",
      message: "Giriş Başarılı",
      description: `Hoş geldiniz, ${email} (Demo Giriş)`,
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      addToast({
        type: "error",
        message: "Hata",
        description: "Lütfen zorunlu alanları doldurun.",
      });
      return;
    }
    addToast({
      type: "info",
      message: "Kayıt Başarılı",
      description: `Hesabınız oluşturuldu: ${fullName} (Demo Kayıt)`,
    });
  };

  return (
    <div className="w-[480px] max-w-[90%] bg-white rounded-[24px] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-light">
          MAISON OTTO
        </span>
        <h1 className="font-serif text-[32px] font-light text-black mb-3 tracking-wide">
          {activeTab === "login" ? "Giriş Yap" : "Kayıt Ol"}
        </h1>
        <p className="font-sans text-xs text-neutral-400 font-light tracking-wide max-w-[320px] mx-auto leading-relaxed">
          {activeTab === "login" 
            ? "Hesabınıza giriş yaparak alışverişe devam edin." 
            : "Kayıt olarak siparişlerinizi ve favorilerinizi takip edin."}
        </p>
      </div>

      {activeTab === "login" ? (
        /* SIGN IN FORM */
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-[20px]">
          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2 font-normal">
              E-Posta Adresi
            </label>
            <div className="relative flex items-center border border-[#d8d8d8] rounded-[14px] bg-white focus-within:border-black transition-colors px-5 h-[56px] gap-3.5">
              <Mail size={18} className="text-neutral-400 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="isim@adres.com"
                className="w-full h-full text-sm bg-transparent outline-none border-none p-0 text-black font-light placeholder-neutral-400 focus:ring-0"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2 font-normal">
              Şifre
            </label>
            <div className="relative flex items-center border border-[#d8d8d8] rounded-[14px] bg-white focus-within:border-black transition-colors px-5 h-[56px] gap-3.5">
              <Lock size={18} className="text-neutral-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-full text-sm bg-transparent outline-none border-none p-0 text-black font-light placeholder-neutral-400 focus:ring-0"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => {
                  addToast({
                    type: "info",
                    message: "Şifremi Unuttum",
                    description: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi (Demo).",
                  });
                }}
                className="text-[11px] text-neutral-400 hover:text-black underline underline-offset-2 transition-colors font-light"
              >
                Şifremi Unuttum?
              </button>
            </div>
          </div>

          {/* Action Elements with 16px Spacing (space-y-4) */}
          <div className="space-y-4 pt-2">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[56px] bg-[#111] hover:bg-black/90 transition-all text-white font-sans text-sm font-normal rounded-[14px] active:scale-[0.99] duration-150 shadow-sm flex justify-center items-center"
            >
              Giriş Yap
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-light">veya</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            {/* Secondary Switch Tab Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setEmail("");
                setPassword("");
                setShowPassword(false);
              }}
              className="w-full h-[56px] border border-neutral-300 hover:bg-neutral-50/50 bg-transparent text-black transition-all font-sans text-sm font-normal rounded-[14px] flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <User size={14} className="text-neutral-400" />
              Hesap Oluştur
            </button>
          </div>

          {/* Footer text */}
          <div className="text-center pt-4">
            <p className="text-xs text-neutral-400 font-light">
              Maison Otto üyesi değil misiniz?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setEmail("");
                  setPassword("");
                  setShowPassword(false);
                }}
                className="text-black font-normal underline underline-offset-2 hover:text-neutral-700 transition-colors ml-1"
              >
                Kayıt Olun
              </button>
            </p>
          </div>
        </form>
      ) : (
        /* REGISTER FORM */
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-[20px]">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2 font-normal">
              Ad Soyad
            </label>
            <div className="relative flex items-center border border-[#d8d8d8] rounded-[14px] bg-white focus-within:border-black transition-colors px-5 h-[56px] gap-3.5">
              <User size={18} className="text-neutral-400 flex-shrink-0" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="w-full h-full text-sm bg-transparent outline-none border-none p-0 text-black font-light placeholder-neutral-400 focus:ring-0"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2 font-normal">
              E-Posta Adresi
            </label>
            <div className="relative flex items-center border border-[#d8d8d8] rounded-[14px] bg-white focus-within:border-black transition-colors px-5 h-[56px] gap-3.5">
              <Mail size={18} className="text-neutral-400 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="isim@adres.com"
                className="w-full h-full text-sm bg-transparent outline-none border-none p-0 text-black font-light placeholder-neutral-400 focus:ring-0"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2 font-normal">
              Şifre
            </label>
            <div className="relative flex items-center border border-[#d8d8d8] rounded-[14px] bg-white focus-within:border-black transition-colors px-5 h-[56px] gap-3.5">
              <Lock size={18} className="text-neutral-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="En az 6 karakter"
                className="w-full h-full text-sm bg-transparent outline-none border-none p-0 text-black font-light placeholder-neutral-400 focus:ring-0"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Action Elements with 16px Spacing (space-y-4) */}
          <div className="space-y-4 pt-2">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[56px] bg-[#111] hover:bg-black/90 transition-all text-white font-sans text-sm font-normal rounded-[14px] active:scale-[0.99] duration-150 shadow-sm flex justify-center items-center"
            >
              Kayıt Ol
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-light">veya</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            {/* Secondary Switch Tab Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setEmail("");
                setPassword("");
                setShowPassword(false);
              }}
              className="w-full h-[56px] border border-neutral-300 hover:bg-neutral-50/50 bg-transparent text-black transition-all font-sans text-sm font-normal rounded-[14px] flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Lock size={14} className="text-neutral-400" />
              Giriş Yap
            </button>
          </div>

          {/* Footer text */}
          <div className="text-center pt-4">
            <p className="text-xs text-neutral-400 font-light">
              Zaten üye misiniz?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setEmail("");
                  setPassword("");
                  setShowPassword(false);
                }}
                className="text-black font-normal underline underline-offset-2 hover:text-neutral-700 transition-colors ml-1"
              >
                Giriş Yapın
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
