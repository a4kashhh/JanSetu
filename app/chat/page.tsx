"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type WizardStep = "role" | "category" | "state" | "income" | "results";

export default function WizardPage() {
  const [step, setStep] = useState<WizardStep>("role");
  const [profile, setProfile] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  // States for inputs
  const [tempInput, setTempInput] = useState<string>("");

  const updateProfile = (key: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleRoleSelect = (role: string) => {
    updateProfile("occupation", role);
    setStep("category");
    setTempInput("");
  };

  const handleCategorySelect = (category: string) => {
    updateProfile("category", category);
    setStep("state");
    setTempInput("");
  };

  const handleLandInput = () => {
    if (tempInput) {
      updateProfile("landHolding", parseFloat(tempInput));
      setStep("state");
      setTempInput("");
    }
  };

  const handleStateSelect = (stateName: string) => {
    const isSkippingIncome = profile.occupation === "Worker" || profile.occupation === "Unemployed";
    
    if (isSkippingIncome) {
      const finalProfile = { ...profile, state: stateName, income: 25000 };
      setProfile(finalProfile);
      setTempInput("");
      fetchRecommendations(finalProfile);
    } else {
      updateProfile("state", stateName);
      setStep("income");
      setTempInput("");
    }
  };

  const fetchRecommendations = async (finalProfile: any) => {
    setIsLoading(true);
    setStep("results");
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: finalProfile }),
      });
      const data = await response.json();
      if (response.ok && data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncomeInput = () => {
    if (tempInput) {
      const finalProfile = { ...profile, income: parseInt(tempInput, 10) };
      setProfile(finalProfile);
      fetchRecommendations(finalProfile);
    }
  };

  const renderRoleStep = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Welcome to JanSetu AI</h2>
      <p className="text-slate-500 text-lg mb-10">Select your current role to get personalized government scheme recommendations.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'Student', icon: 'school', title: 'Student', desc: 'Scholarships & Education' },
          { id: 'Farmer', icon: 'agriculture', title: 'Farmer', desc: 'Agriculture & Subsidies' },
          { id: 'Business', icon: 'storefront', title: 'Business / Startup', desc: 'Loans & MSME' },
          { id: 'Worker', icon: 'construction', title: 'Worker', desc: 'Labor & Employment' },
          { id: 'Unemployed', icon: 'search', title: 'Jobseeker', desc: 'Skill Dev & Unemployment' },
        ].map((role) => (
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#004FE5]/40 transition-all text-left group flex flex-col items-start"
          >
            <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-[#004FE5]/5 transition-colors">
              <span className="material-symbols-outlined text-[36px] text-slate-700 group-hover:text-[#004FE5]">{role.icon}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#004FE5] transition-colors">{role.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{role.desc}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderCategoryStep = () => {
    const isFarmer = profile.occupation === "Farmer";
    
    if (isFarmer) {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Land Holding</h2>
          <p className="text-slate-500 text-lg mb-10">How many acres of land do you own?</p>
          <div className="flex flex-col gap-4">
            <input 
              type="number" 
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="e.g. 5"
              className="w-full p-4 text-center text-2xl font-bold rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#004FE5]/20 focus:border-[#004FE5]"
            />
            <button 
              onClick={handleLandInput}
              disabled={!tempInput}
              className="w-full bg-[#004FE5] text-white p-4 rounded-2xl font-bold text-lg disabled:opacity-50 hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
            >
              Continue <ArrowRight size={20} />
            </button>
            <button onClick={() => setStep("role")} className="text-slate-500 font-medium py-2 hover:text-slate-800 flex justify-center items-center gap-2 mt-4"><ArrowLeft size={16}/> Back</button>
          </div>
        </motion.div>
      );
    }
    
    if (profile.occupation === "Business") {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Business Stage</h2>
          <p className="text-slate-500 text-lg mb-10">Select your current business stage to find targeted MSME schemes.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Ideation (No Revenue)', 'Early Stage Startup', 'Growing MSME', 'Established Business'].map((cat) => (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#004FE5]/40 transition-all font-bold text-lg text-slate-800"
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <button onClick={() => setStep("role")} className="text-slate-500 font-medium py-2 hover:text-slate-800 flex justify-center items-center gap-2 mt-8 w-full"><ArrowLeft size={16}/> Back</button>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Social Category</h2>
        <p className="text-slate-500 text-lg mb-10">Please select your category to find specific schemes.</p>
        
        <div className="grid grid-cols-2 gap-4">
          {['General', 'OBC', 'SC', 'ST'].map((cat) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#004FE5]/40 transition-all font-bold text-xl text-slate-800"
            >
              {cat}
            </motion.button>
          ))}
        </div>
        <button onClick={() => setStep("role")} className="text-slate-500 font-medium py-2 hover:text-slate-800 flex justify-center items-center gap-2 mt-8 w-full"><ArrowLeft size={16}/> Back</button>
      </motion.div>
    );
  };

  const renderStateStep = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">State of Residence</h2>
      <p className="text-slate-500 text-lg mb-10">Where do you currently live?</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {["Chhattisgarh", "Maharashtra", "Karnataka", "Delhi", "Gujarat", "Punjab", "Haryana", "Uttar Pradesh", "Bihar", "Rajasthan", "Tamil Nadu", "Kerala"].map((s) => (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            key={s}
            onClick={() => handleStateSelect(s)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#004FE5]/40 transition-all font-medium text-slate-700"
          >
            {s}
          </motion.button>
        ))}
      </div>
      <button onClick={() => setStep("category")} className="text-slate-500 font-medium py-2 hover:text-slate-800 flex justify-center items-center gap-2 mt-8 w-full"><ArrowLeft size={16}/> Back</button>
    </motion.div>
  );

  const renderIncomeStep = () => {
    const isBusiness = profile.occupation === "Business";
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          {isBusiness ? "Annual Business Revenue" : "Annual Family Income"}
        </h2>
        <p className="text-slate-500 text-lg mb-10">
          {isBusiness ? "What is your approximate annual turnover or revenue in Rupees?" : "What is your approximate annual family income in Rupees?"}
        </p>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
            <input 
              type="number" 
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder={isBusiness ? "e.g. 5000000" : "e.g. 250000"}
              className="w-full p-4 pl-12 text-center text-2xl font-bold rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#004FE5]/20 focus:border-[#004FE5]"
            />
          </div>
          <button 
            onClick={handleIncomeInput}
            disabled={!tempInput}
            className="w-full bg-[#004FE5] text-white p-4 rounded-2xl font-bold text-lg disabled:opacity-50 hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            View Recommendations <ArrowRight size={20} />
          </button>
          <button onClick={() => setStep("state")} className="text-slate-500 font-medium py-2 hover:text-slate-800 flex justify-center items-center gap-2 mt-4"><ArrowLeft size={16}/> Back</button>
        </div>
      </motion.div>
    );
  };

  const renderResultsStep = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#004FE5]/20 border-t-[#004FE5] rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-800">Running ML Engine...</h2>
          <p className="text-slate-500">Calculating scheme eligibility probabilities</p>
        </div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your Recommendations</h2>
          </div>
          <button 
            onClick={() => { setStep("role"); setProfile({}); setRecommendations([]); }}
            className="bg-slate-100 text-slate-700 font-semibold px-6 py-2 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Start Over
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-4">Extracted Features</h3>
              <div className="space-y-4 text-sm">
                <div><span className="text-slate-500 block">Occupation</span><span className="font-bold text-lg text-[#004FE5]">{profile.occupation}</span></div>
                {profile.category && <div><span className="text-slate-500 block">Category</span><span className="font-bold text-slate-800">{profile.category}</span></div>}
                {profile.landHolding && <div><span className="text-slate-500 block">Land Holding</span><span className="font-bold text-slate-800">{profile.landHolding} Acres</span></div>}
                <div><span className="text-slate-500 block">State</span><span className="font-bold text-slate-800">{profile.state}</span></div>
                <div><span className="text-slate-500 block">Income</span><span className="font-bold text-slate-800">₹{profile.income?.toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          {/* Scheme Results */}
          <div className="md:col-span-2 space-y-4">
            {recommendations.length > 0 ? recommendations.map((rec, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className={`bg-white rounded-2xl p-6 border shadow-sm relative overflow-hidden group transition-all ${rec.score >= 70 ? 'border-emerald-200' : 'border-slate-200 opacity-70'}`}
              >
                <div className={`absolute top-0 right-0 text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wide ${rec.score >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {rec.score}% MATCH
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 pr-20">{rec.scheme.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{rec.scheme.description}</p>
                
                <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {rec.reasons.map((r: string, i: number) => (
                    <div key={i} className="flex gap-2 items-start text-sm text-slate-700">
                      {r.startsWith("✓") ? (
                        <span className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5 shrink-0">check_circle</span>
                      ) : (
                        <span className="material-symbols-outlined text-rose-500 text-[18px] mt-0.5 shrink-0">cancel</span>
                      )}
                      <span>{r.substring(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                   <div className="font-bold text-xl text-[#004FE5]">₹{rec.scheme.estimatedBenefits?.toLocaleString() || "Varries"}</div>
                   <a 
                     href={rec.scheme.applicationLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className={`font-bold uppercase tracking-wider text-white px-6 py-2.5 rounded-xl transition-colors text-sm ${rec.score >= 70 ? 'bg-[#004FE5] hover:bg-blue-700 shadow-md shadow-blue-500/20' : 'bg-slate-400 hover:bg-slate-500'}`}
                   >
                     Apply Now
                   </a>
                </div>
              </motion.div>
            )) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
                No schemes match your exact profile.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <div className="p-5 border-b border-slate-200 bg-white shadow-sm z-10 relative">
        <div className="flex items-center justify-center gap-2.5">
          <h1 className="text-3xl font-[family-name:var(--font-outfit)] font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#004FE5] to-indigo-600">
            JanSetu AI
          </h1>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "role" && renderRoleStep()}
          {step === "category" && renderCategoryStep()}
          {step === "state" && renderStateStep()}
          {step === "income" && renderIncomeStep()}
          {step === "results" && renderResultsStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
