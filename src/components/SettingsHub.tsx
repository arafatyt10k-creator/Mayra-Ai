import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Mic, 
  Volume2, 
  ShieldCheck, 
  Palette, 
  Sparkles, 
  X, 
  Check, 
  Sliders, 
  Radio, 
  Info, 
  Download, 
  Trash2, 
  Lock,
  Camera,
  Monitor,
  MapPin,
  Bell,
  Globe,
  Activity,
  Zap,
  Battery,
  Layers,
  Laptop
} from "lucide-react";
import { RGBEdgeLightingConfig, RGBColorPreset } from "./RGBEdgeLighting";
import { Language } from "../lib/translations";

interface SettingsHubProps {
  onClose?: () => void;
  currentVoice?: string;
  onVoiceChange?: (voice: string) => void;
  currentRate?: number;
  onRateChange?: (rate: number) => void;
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  currentPersonality?: string;
  onPersonalityChange?: (p: string) => void;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  edgeLightingConfig?: RGBEdgeLightingConfig;
  onEdgeLightingChange?: (config: RGBEdgeLightingConfig) => void;
  onOpenActionHistory?: () => void;
  onOpenLicenseModal?: () => void;
  onOpenPermissionWizard?: () => void;
}

export const SettingsHub: React.FC<SettingsHubProps> = ({
  onClose,
  currentVoice = "Aoede",
  onVoiceChange,
  currentRate = 1.0,
  onRateChange,
  currentTheme = "cyan",
  onThemeChange,
  currentPersonality = "empathic",
  onPersonalityChange,
  currentLanguage = "en",
  onLanguageChange,
  edgeLightingConfig,
  onEdgeLightingChange,
  onOpenActionHistory,
  onOpenLicenseModal,
  onOpenPermissionWizard
}) => {
  const isBn = currentLanguage === "bn";
  const [voice, setVoice] = useState<string>(currentVoice);
  const [speechRate, setSpeechRate] = useState<number>(currentRate);
  const [theme, setTheme] = useState<string>(currentTheme);
  const [personality, setPersonality] = useState<string>(currentPersonality);
  const [lang, setLang] = useState<Language>(currentLanguage);
  
  // Edge lighting local state
  const [rgbConfig, setRgbConfig] = useState<RGBEdgeLightingConfig>(edgeLightingConfig || {
    enabled: true,
    preset: "rainbow",
    speed: "normal",
    intensity: 85,
    ambientAlwaysOn: false,
    batterySaver: false,
    reduceMotion: false
  });

  const [wakeWordActive, setWakeWordActive] = useState<boolean>(() => {
    return localStorage.getItem("maya_wake_word") === "true";
  });
  const [showWakeWordModal, setShowWakeWordModal] = useState<boolean>(false);
  const [offlineMode, setOfflineMode] = useState<boolean>(false);

  const [permissions, setPermissions] = useState<{
    mic: "granted" | "prompt" | "denied";
    camera: "granted" | "prompt" | "denied";
    geo: "granted" | "prompt" | "denied";
    notifications: "granted" | "prompt" | "denied";
  }>({
    mic: "granted",
    camera: "granted",
    geo: "prompt",
    notifications: "granted"
  });

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "microphone" as any }).then(p => {
        setPermissions(prev => ({ ...prev, mic: p.state }));
      }).catch(() => {});

      navigator.permissions.query({ name: "camera" as any }).then(p => {
        setPermissions(prev => ({ ...prev, camera: p.state }));
      }).catch(() => {});

      navigator.permissions.query({ name: "geolocation" as any }).then(p => {
        setPermissions(prev => ({ ...prev, geo: p.state }));
      }).catch(() => {});
    }
  }, []);

  const updateRgb = (updated: Partial<RGBEdgeLightingConfig>) => {
    const next = { ...rgbConfig, ...updated };
    setRgbConfig(next);
    onEdgeLightingChange?.(next);
  };

  const voices = [
    { id: "Aoede", name: "Aoede (Sweet & Gentle)", desc: isBn ? "মধুর ও শান্ত অ্যানিমে কন্ঠ" : "Warm, high-pitched companion tone" },
    { id: "Puck", name: "Puck (Energetic & Sharp)", desc: isBn ? "প্রাণবন্ত ও গতিশীল সহকারী" : "Crisp, dynamic and spirited assistant" },
    { id: "Charon", name: "Charon (Deep & Calming)", desc: isBn ? "গম্ভীর ও ধৈর্যশীল মেন্টর কন্ঠ" : "Low-pitch resonant mentor voice" },
    { id: "Fenrir", name: "Fenrir (Executive)", desc: isBn ? "তীক্ষ্ণ ও আত্মবিশ্বাসী প্রফেশনাল" : "Direct, articulate executive assistant" },
    { id: "Kore", name: "Kore (Soft & Melodic)", desc: isBn ? "নরম ও সুরেলা কথোপকথন" : "Delicate and soothing conversational voice" }
  ];

  const rgbPresets: { id: RGBColorPreset; label: string; bg: string }[] = [
    { id: "rainbow", label: isBn ? "রেইনবো আরজিবি" : "RGB Rainbow", bg: "from-pink-500 via-cyan-400 to-amber-400" },
    { id: "cyan", label: isBn ? "ইলেকট্রিক সায়ান" : "Electric Cyan", bg: "from-cyan-400 to-blue-600" },
    { id: "blue", label: isBn ? "ডিপ ব্লু" : "Deep Neon Blue", bg: "from-blue-600 to-indigo-800" },
    { id: "purple", label: isBn ? "নিওন ভায়োলেট" : "Neon Purple", bg: "from-purple-500 to-fuchsia-600" },
    { id: "amber", label: isBn ? "অ্যাম্বার গোল্ড" : "Amber Spark", bg: "from-amber-400 to-orange-600" },
    { id: "emerald", label: isBn ? "সাইবার গ্রিন" : "Cyber Emerald", bg: "from-emerald-400 to-teal-600" },
  ];

  const exportAllData = async () => {
    try {
      const res = await fetch("/api/memories");
      const memories = await res.json();
      const exportObject = {
        app: "MAYRA AI Assistant",
        exportDate: new Date().toISOString(),
        memories,
        settings: { voice, speechRate, theme, personality, wakeWordActive, lang, rgbConfig }
      };

      const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mayra_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failure:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040814] text-white flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-sky-900/30 bg-[#061026]/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
            <Settings size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold font-display tracking-wide">
              {isBn ? "সেটিংস ও গোপনীয়তা নিরীক্ষা" : "Settings & Security Audit"}
            </h2>
            <p className="text-[11px] font-mono text-cyan-300/70">
              {isBn ? "আরজিবি লাইটিং, ভাষা ও পারমিশন কন্ট্রোল" : "RGB Lighting, Language & Permissions"}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </header>

      {/* Main Settings Stream */}
      <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full space-y-5">
        
        {/* Quick Hub Launchers: Action History & License */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenActionHistory}
            className="p-3.5 rounded-2xl bg-[#081533] border border-cyan-500/30 hover:border-cyan-400 text-left transition flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Activity size={18} />
            </div>
            <div>
              <div className="text-xs font-bold font-display text-white">
                {isBn ? "কাজের ইতিহাস ও স্বাস্থ্য" : "Action History"}
              </div>
              <div className="text-[10px] font-mono text-cyan-300/70">
                {isBn ? "লগ ও ডায়াগনস্টিক" : "Logs & Diagnostics"}
              </div>
            </div>
          </button>

          <button
            onClick={onOpenLicenseModal}
            className="p-3.5 rounded-2xl bg-[#081533] border border-purple-500/30 hover:border-purple-400 text-left transition flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Zap size={18} className="fill-purple-300" />
            </div>
            <div>
              <div className="text-xs font-bold font-display text-white">
                {isBn ? "প্রো ও পিসি লিংক" : "Pro & PC Link"}
              </div>
              <div className="text-[10px] font-mono text-purple-300/70">
                {isBn ? "কোটা ও লাইসেন্স" : "Quota & License"}
              </div>
            </div>
          </button>
        </div>

        {/* 1. Language Preference (English / বাংলা) */}
        <div className="p-4 rounded-3xl bg-[#061026] border border-white/10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Globe size={16} />
            <span>{isBn ? "ভাষা নির্বাচন (Language)" : "Assistant Language"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setLang("en");
                onLanguageChange?.("en");
              }}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                lang === "en"
                  ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "bg-[#081533] border-white/5 text-slate-300"
              }`}
            >
              <div>
                <div className="text-xs font-bold font-display">English (US)</div>
                <div className="text-[10px] font-mono text-slate-400">Default global voice</div>
              </div>
              {lang === "en" && <Check size={14} className="text-cyan-400" />}
            </button>

            <button
              onClick={() => {
                setLang("bn");
                onLanguageChange?.("bn");
              }}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                lang === "bn"
                  ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "bg-[#081533] border-white/5 text-slate-300"
              }`}
            >
              <div>
                <div className="text-xs font-bold font-display">বাংলা (Bangla)</div>
                <div className="text-[10px] font-mono text-slate-400">সম্পূর্ণ বাংলা ইন্টারফেস</div>
              </div>
              {lang === "bn" && <Check size={14} className="text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* 2. RGB Edge Lighting Config (Matching Screenshot) */}
        <div className="p-4 rounded-3xl bg-[#081533] border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-cyan-400" />
              <div>
                <h4 className="text-xs font-bold font-display text-white">
                  {isBn ? "প্রিমিয়াম আরজিবি এজ লাইটিং" : "Premium RGB Edge Lighting"}
                </h4>
                <p className="text-[10px] font-mono text-slate-400">
                  {isBn ? "ফোনের স্ক্রিনের চারপাশে নিওন গ্লো এফেক্ট" : "Luminous animated glow border around screen edges"}
                </p>
              </div>
            </div>

            <button
              onClick={() => updateRgb({ enabled: !rgbConfig.enabled })}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                rgbConfig.enabled ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  rgbConfig.enabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {rgbConfig.enabled && (
            <div className="space-y-3 pt-2 border-t border-white/5">
              {/* Color Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-300">
                  {isBn ? "কালার প্রিসেট" : "Color Glow Preset"}
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {rgbPresets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => updateRgb({ preset: p.id })}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                        rgbConfig.preset === p.id
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/40"
                          : "bg-[#061026] border-white/5 text-slate-400"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${p.bg}`} />
                      <span className="text-[9px] font-mono truncate max-w-full">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>{isBn ? "গ্লো তীব্রতা" : "Glow Intensity"}</span>
                  <span className="text-cyan-300 font-bold">{rgbConfig.intensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={rgbConfig.intensity}
                  onChange={(e) => updateRgb({ intensity: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono text-slate-300">
                  {isBn ? "অ্যানিমেশন গতি" : "Animation Speed"}
                </span>
                <div className="flex gap-1">
                  {(["slow", "normal", "fast"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateRgb({ speed: s })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition ${
                        rgbConfig.speed === s
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Battery Saver & Reduce Motion Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => updateRgb({ batterySaver: !rgbConfig.batterySaver })}
                  className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition ${
                    rgbConfig.batterySaver
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                      : "bg-[#061026] border-white/5 text-slate-400"
                  }`}
                >
                  <span>{isBn ? "ব্যাটারি সেভার মোড" : "Battery Saver"}</span>
                  {rgbConfig.batterySaver && <Check size={12} />}
                </button>

                <button
                  onClick={() => updateRgb({ ambientAlwaysOn: !rgbConfig.ambientAlwaysOn })}
                  className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition ${
                    rgbConfig.ambientAlwaysOn
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-[#061026] border-white/5 text-slate-400"
                  }`}
                >
                  <span>{isBn ? "সবসময় সক্রিয়" : "Always-on Ambient"}</span>
                  {rgbConfig.ambientAlwaysOn && <Check size={12} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Voice & Speech Rate */}
        <div className="p-4 rounded-3xl bg-[#061026] border border-white/10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Volume2 size={16} />
            <span>{isBn ? "সহকারী ভয়েস মডেল" : "Assistant Voice Model"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setVoice(v.id);
                  onVoiceChange?.(v.id);
                }}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  voice === v.id
                    ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-[#081533] border-white/5 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-display">{v.name}</span>
                  {voice === v.id && <Check size={14} className="text-cyan-400" />}
                </div>
                <p className="text-[10px] font-sans text-slate-400 mt-1">{v.desc}</p>
              </button>
            ))}
          </div>

          {/* Speech Rate Slider */}
          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>{isBn ? "কথা বলার গতি" : "Speech Speed Rate"}</span>
              <span className="text-cyan-300 font-bold">{speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speechRate}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setSpeechRate(val);
                onRateChange?.(val);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* 4. Privacy & Security Audit */}
        <div className="p-4 rounded-3xl bg-[#081533] border border-cyan-500/20 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>{isBn ? "গোপনীয়তা ও পারমিশন নিরীক্ষা" : "Security & Permissions Audit"}</span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <div className="p-3 rounded-2xl bg-[#061026] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mic size={16} className="text-cyan-400" />
                <div>
                  <div className="font-bold text-white">{isBn ? "মাইক্রোফোন এক্সেস" : "Microphone Access"}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? "রিয়েল-টাইম ভয়েস ইনপুট" : "16kHz live voice stream processing"}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                {permissions.mic}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#061026] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Camera size={16} className="text-purple-400" />
                <div>
                  <div className="font-bold text-white">{isBn ? "ক্যামেরা ও কিউআর স্ক্যান" : "Camera Vision"}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? "কিউআর ও ডকুমেন্ট ভিশন" : "OCR, QR and Multimodal analysis"}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                {permissions.camera}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#061026] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Monitor size={16} className="text-blue-400" />
                <div>
                  <div className="font-bold text-white">{isBn ? "স্ক্রিন শেয়ারিং (অনুমোদন সাপেক্ষ)" : "Screen Vision Capture"}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? "স্পষ্ট ব্যবহারকারীর অনুমতি প্রয়োজন" : "Explicit Android MediaProjection authorization"}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                Opt-in
              </span>
            </div>

            {onOpenPermissionWizard && (
              <div className="pt-2">
                <button
                  onClick={onOpenPermissionWizard}
                  className="w-full py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs font-mono font-bold text-cyan-300 flex items-center justify-center gap-2 transition"
                >
                  <ShieldCheck size={14} />
                  <span>{isBn ? "পারমিশন সেটআপ উইজার্ড খুলুন" : "Open 3-Step Permission Setup Wizard"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Export Data */}
        <div className="p-4 rounded-3xl bg-[#061026] border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold font-display text-white">
              {isBn ? "সহকারী ব্যাকআপ ডেটা এক্সপোর্ট" : "Export Assistant Data"}
            </h4>
            <p className="text-[10px] font-mono text-slate-400">
              {isBn ? "স্মৃতি ও সেটিংস JSON ডাউনলোড করুন" : "Download memories, preferences, and logs as JSON"}
            </p>
          </div>

          <button
            onClick={exportAllData}
            className="px-4 py-2 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-xs font-mono text-cyan-300 rounded-xl flex items-center gap-1.5 transition"
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>
        </div>

      </div>
    </div>
  );
};
