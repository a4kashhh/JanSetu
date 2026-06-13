"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, BrainCircuit, Database, Network, LineChart, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-cyan-500/30 overflow-hidden font-sans">
      
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-[family-name:var(--font-outfit)] font-black tracking-tight text-white">JanSetu AI</span>
          </div>
          <Link href="/chat" className="text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/5">
            Launch Platform
          </Link>
        </div>
      </nav>

      <div className="relative z-10 pt-32 pb-20">
        
        {/* SECTION 1: HERO */}
        <section className="max-w-7xl mx-auto px-6 pt-10 lg:pt-20 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <BrainCircuit size={14} />
                AI-Powered Eligibility Intelligence
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Find Every Government Benefit You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Eligible For.</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
                JanSetu AI uses machine learning to analyze citizen profiles and identify government schemes, scholarships, subsidies, and welfare benefits that match their eligibility.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  Check My Eligibility <ArrowRight size={18} />
                </Link>
                <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-semibold transition-all">
                  Learn How It Works
                </button>
              </div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-2xl blur-2xl" />
              <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Eligible Schemes Found</div>
                  <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck size={12}/> Verified
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    { name: 'PM-KISAN', score: 96 },
                    { name: 'Crop Insurance', score: 91 },
                    { name: 'Post-Matric Scholarship', score: 88 },
                    { name: 'Ayushman Bharat', score: 84 },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="font-semibold text-slate-200">{s.name}</span>
                      <span className="text-cyan-400 font-bold">{s.score}%</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Potential Benefits</div>
                    <div className="text-2xl font-bold text-white">₹48,000<span className="text-sm text-slate-500 font-normal">/year</span></div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Confidence Score</div>
                    <div className="text-2xl font-bold text-emerald-400">95%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM */}
        <section className="py-24 border-y border-white/5 bg-black/50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Millions of Indians Miss Benefits They Deserve</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { title: "Don't know which schemes exist", icon: Search },
                { title: "Don't know if they qualify", icon: ShieldCheck },
                { title: "Don't know how to apply", icon: Database }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <item.icon className="text-slate-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeIn} className="text-center">
              <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xl">
                JanSetu AI changes that.
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeIn} className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Intelligence Pipeline</h2>
              <p className="text-xl text-slate-400">How we process profiles in real-time.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                "Citizen Profile",
                "Machine Learning Analysis",
                "Eligibility Prediction",
                "Scheme Recommendation",
                "Benefit Estimation"
              ].map((step, i, arr) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl backdrop-blur-sm text-center flex-1 whitespace-nowrap text-slate-300 font-semibold shadow-lg"
                  >
                    {step}
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.1 }}
                      className="text-white/20 rotate-90 md:rotate-0"
                    >
                      <ArrowRight />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: AI ENGINE & ARCHITECTURE */}
        <section className="py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Powered by Machine Learning</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Our proprietary supervised learning model utilizes K-Nearest Neighbors and XGBoost architectures to map high-dimensional citizen features against government schema constraints.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: "95%", label: "Prediction Accuracy" },
                  { metric: "100+", label: "Govt Schemes" },
                  { metric: "10,000+", label: "Citizen Profiles" },
                  { metric: "50+", label: "Eligibility Parameters" }
                ].map((stat, i) => (
                  <div key={i} className="border-l-2 border-cyan-500/50 pl-4">
                    <div className="text-3xl font-bold text-white mb-1">{stat.metric}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 font-mono text-sm relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20"><BrainCircuit size={100} /></div>
              
              <div className="text-slate-500 mb-2">// Input Features Vector</div>
              <div className="text-emerald-400 mb-6">X = [Income, Occupation, State, Education, LandHolding]</div>
              
              <div className="flex justify-center my-4 text-white/30"><ArrowRight className="rotate-90" /></div>
              
              <div className="text-slate-500 mb-2">// Model Architecture</div>
              <div className="bg-white/5 border border-white/10 p-4 rounded text-blue-400 text-center font-bold mb-6">
                Ensemble Classifier (XGBoost / Random Forest)
              </div>
              
              <div className="flex justify-center my-4 text-white/30"><ArrowRight className="rotate-90" /></div>
              
              <div className="text-slate-500 mb-2">// Output Prediction Probabilities</div>
              <div className="text-cyan-400">Y_hat = [P(Scheme_1), P(Scheme_2), ..., P(Scheme_N)]</div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: EXPLAINABLE AI */}
        <section className="py-32 relative">
          <div className="absolute left-0 top-1/2 w-1/3 h-1/2 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative order-2 lg:order-1"
            >
              <div className="text-2xl font-bold text-white mb-6 border-b border-white/5 pb-4">PM-KISAN Recommendation</div>
              
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Why Recommended?</div>
              
              <div className="space-y-3 mb-8">
                {[
                  "Farmer Occupation Verified",
                  "Income Below Threshold",
                  "Land Ownership Verified (< 5 Acres)",
                  "State Eligibility Passed"
                ].map((reason, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
                <span className="text-blue-300 font-semibold">Mathematical Confidence</span>
                <span className="text-2xl font-bold text-blue-400">96.4%</span>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Explainable AI (XAI)</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                We don't just output a black-box list. Our Explainable AI engine provides deterministic reasoning for every single recommendation it makes.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Citizens and policymakers can see exactly which parameters passed or failed, ensuring absolute transparency in government benefit allocation.
              </p>
            </motion.div>

          </div>
        </section>

        {/* SECTION 7: GRAPH INTELLIGENCE */}
        <section className="py-24 border-y border-white/5 bg-black/40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div {...fadeIn} className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Knowledge Graph Visualization</h2>
              <p className="text-lg text-slate-400">Connecting sparse citizen data to dense government schema constraints.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="font-mono text-left text-sm md:text-base bg-[#0A0A0A] p-8 rounded-2xl border border-white/10 inline-block shadow-2xl relative">
                <div className="text-white font-bold mb-2 flex items-center gap-2"><User size={16}/> Citizen_ID_9824</div>
                <div className="text-slate-500">│</div>
                <div className="flex items-center gap-4 text-slate-400">├── <span className="text-blue-400">Income</span>: ₹120,000</div>
                <div className="flex items-center gap-4 text-slate-400">├── <span className="text-cyan-400">Occupation</span>: Student</div>
                <div className="flex items-center gap-4 text-slate-400">├── <span className="text-emerald-400">State</span>: Maharashtra</div>
                <div className="text-slate-500">│</div>
                <div className="flex items-center gap-4 text-white font-bold">└── <Database size={16} className="inline text-purple-400"/> Eligible_Schemes</div>
                <div className="flex items-center gap-4 text-slate-500 pl-8">├── Post-Matric Scholarship (92%)</div>
                <div className="flex items-center gap-4 text-slate-500 pl-8">└── State Transport Pass (88%)</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: FINAL CTA */}
        <section className="py-32 relative text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Stop Missing Benefits You're Eligible For.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover government schemes, subsidies, scholarships, and welfare programs using AI-powered eligibility intelligence.
            </p>
            <Link href="/chat" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.15)]">
              Check My Eligibility Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </section>
        
      </div>
    </main>
  );
}

// Minimal missing icon placeholder
function User(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
