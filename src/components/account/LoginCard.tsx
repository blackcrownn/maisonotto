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
      addToast({ type: "error", message: "Hata", description: "Lütfen tüm alanları doldurun." });
      return;
    }
    addToast({ type: "info", message: "Giriş Başarılı", description: `Hoş geldiniz, ${email} (Demo Giriş)` });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      addToast({ type: "error", message: "Hata", description: "Lütfen zorunlu alanları doldurun." });
      return;
    }
    addToast({ type: "info", message: "Kayıt Başarılı", description: `Hesabınız oluşturuldu: ${fullName} (Demo Kayıt)` });
  };

  const switchToRegister = () => {
    setActiveTab("register");
    setEmail("");
    setPassword("");
    setFullName("");
    setShowPassword(false);
  };

  const switchToLogin = () => {
    setActiveTab("login");
    setEmail("");
    setPassword("");
    setFullName("");
    setShowPassword(false);
  };

  /* ── Shared sub-components ───────────────────────── */

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    icon,
    rightSlot,
    required = false,
    minLength,
  }: {
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    rightSlot?: React.ReactNode;
    required?: boolean;
    minLength?: number;
  }) => (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-sans, Inter, sans-serif)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#555",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "50px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
          padding: "0 16px",
          gap: "12px",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#000")}
        onBlur={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#ddd")}
      >
        <span style={{ color: "#aaa", flexShrink: 0, display: "flex", alignItems: "center" }}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          style={{
            flex: 1,
            height: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
            fontWeight: 300,
            color: "#111",
            fontFamily: "var(--font-sans, Inter, sans-serif)",
          }}
        />
        {rightSlot && (
          <span style={{ color: "#aaa", flexShrink: 0, display: "flex", alignItems: "center" }}>{rightSlot}</span>
        )}
      </div>
    </div>
  );

  const PrimaryButton = ({ label }: { label: string }) => (
    <button
      type="submit"
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "#111",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "var(--font-sans, Inter, sans-serif)",
        cursor: "pointer",
        letterSpacing: "0.02em",
        transition: "background-color 0.15s",
      }}
      onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#000")}
      onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111")}
    >
      {label}
    </button>
  );

  const Divider = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e8e8e8" }} />
      <span
        style={{
          fontSize: "11px",
          color: "#aaa",
          fontFamily: "var(--font-sans, Inter, sans-serif)",
          fontWeight: 300,
          letterSpacing: "0.12em",
        }}
      >
        veya
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e8e8e8" }} />
    </div>
  );

  const OutlineButton = ({
    label,
    icon,
    onClick,
  }: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "transparent",
        color: "#111",
        border: "1px solid #d0d0d0",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "var(--font-sans, Inter, sans-serif)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        transition: "background-color 0.15s, border-color 0.15s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f8f8f8";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#bbb";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#d0d0d0";
      }}
    >
      {icon && <span style={{ color: "#888", display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </button>
  );

  /* ── Card wrapper styles ─────────────────────────── */

  const cardStyle: React.CSSProperties = {
    width: "480px",
    maxWidth: "90%",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "48px 44px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "32px",
  };

  const brandTagStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontFamily: "var(--font-sans, Inter, sans-serif)",
    fontWeight: 400,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: "10px",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
    fontSize: "30px",
    fontWeight: 300,
    color: "#111",
    letterSpacing: "0.01em",
    marginBottom: "10px",
    lineHeight: 1.2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans, Inter, sans-serif)",
    fontSize: "13px",
    fontWeight: 300,
    color: "#999",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    fontFamily: "var(--font-sans, Inter, sans-serif)",
    fontSize: "12px",
    fontWeight: 300,
    color: "#aaa",
    paddingTop: "4px",
  };

  const footerLinkStyle: React.CSSProperties = {
    color: "#111",
    fontWeight: 500,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    cursor: "pointer",
    marginLeft: "4px",
    background: "none",
    border: "none",
    fontSize: "12px",
    fontFamily: "var(--font-sans, Inter, sans-serif)",
  };

  const forgotStyle: React.CSSProperties = {
    textAlign: "right",
    marginTop: "6px",
  };

  const forgotBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    fontSize: "12px",
    fontFamily: "var(--font-sans, Inter, sans-serif)",
    fontWeight: 300,
    color: "#aaa",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  };

  /* ── Render ──────────────────────────────────────── */

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <span style={brandTagStyle}>MAISON OTTO</span>
        <h1 style={headingStyle}>
          {activeTab === "login" ? "Hoş geldiniz" : "Hesap Oluştur"}
        </h1>
        <p style={subtitleStyle}>
          {activeTab === "login"
            ? "Hesabınıza giriş yaparak alışverişe devam edin."
            : "Kayıt olarak siparişlerinizi ve favorilerinizi takip edin."}
        </p>
      </div>

      {activeTab === "login" ? (
        <form onSubmit={handleLoginSubmit} style={formStyle}>
          {/* Email */}
          <InputField
            label="E-Posta Adresi"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="isim@adres.com"
            icon={<Mail size={16} />}
            required
          />

          {/* Password */}
          <div>
            <InputField
              label="Şifre"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#aaa", display: "flex", alignItems: "center" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
            />
            <div style={forgotStyle}>
              <button
                type="button"
                style={forgotBtnStyle}
                onClick={() =>
                  addToast({
                    type: "info",
                    message: "Şifremi Unuttum",
                    description: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi (Demo).",
                  })
                }
              >
                Şifremi Unuttum?
              </button>
            </div>
          </div>

          {/* Actions */}
          <PrimaryButton label="Giriş Yap" />
          <Divider />
          <OutlineButton label="Hesap Oluştur" icon={<User size={15} />} onClick={switchToRegister} />

          {/* Footer */}
          <p style={footerStyle}>
            Maison Otto üyesi değil misiniz?
            <button type="button" style={footerLinkStyle} onClick={switchToRegister}>
              Kayıt Olun
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} style={formStyle}>
          {/* Full Name */}
          <InputField
            label="Ad Soyad"
            type="text"
            value={fullName}
            onChange={setFullName}
            placeholder="Adınız Soyadınız"
            icon={<User size={16} />}
            required
          />

          {/* Email */}
          <InputField
            label="E-Posta Adresi"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="isim@adres.com"
            icon={<Mail size={16} />}
            required
          />

          {/* Password */}
          <InputField
            label="Şifre"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="En az 6 karakter"
            icon={<Lock size={16} />}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#aaa", display: "flex", alignItems: "center" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
            minLength={6}
          />

          {/* Actions */}
          <PrimaryButton label="Kayıt Ol" />
          <Divider />
          <OutlineButton label="Giriş Yap" icon={<Lock size={15} />} onClick={switchToLogin} />

          {/* Footer */}
          <p style={footerStyle}>
            Zaten üye misiniz?
            <button type="button" style={footerLinkStyle} onClick={switchToLogin}>
              Giriş Yapın
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
