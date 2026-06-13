import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GradientBar } from "@/components/ui/gradient-bar";
import { Brain, Database, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground font-sans flex flex-col pt-20">
      
      <div className="flex-1 max-w-[1000px] mx-auto px-6 md:px-12 py-20 w-full">
        <div className="mb-16">
          <div className="text-[#FF6B2B] text-[11px] font-bold uppercase tracking-widest mb-4">HOW IT WORKS</div>
          <h1 className="text-[48px] font-black text-white tracking-[-2px] leading-[1.1] mb-6">
            The Intelligence Pipeline
          </h1>
          <p className="text-[18px] text-white/45 max-w-2xl leading-relaxed">
            We don't use simple rules or basic filters. JanSetu AI uses advanced high-dimensional feature matching to guarantee you see exactly the schemes you're entitled to, and nothing you're not.
          </p>
        </div>

        <div className="space-y-12">
          
          <div className="bg-[#161616] border border-white/5 rounded-[16px] p-8 md:p-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-[#FF6B2B]/15 text-[#FF6B2B] flex items-center justify-center font-black text-xl shrink-0">1</div>
              <h2 className="text-[24px] font-bold text-white tracking-[-0.5px]">Citizen Profiling</h2>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed ml-[72px]">
              We collect exactly 5 data points: Occupation, Social Category, State, Land Holding (if applicable), and Income. This takes less than 30 seconds. Unlike government portals that demand your entire life history upfront, we only extract the mathematically necessary features to begin prediction.
            </p>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-[16px] p-8 md:p-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-[#FF6B2B]/15 text-[#FF6B2B] flex items-center justify-center font-black text-xl shrink-0">2</div>
              <h2 className="text-[24px] font-bold text-white tracking-[-0.5px]">GraphSAGE Embedding</h2>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed ml-[72px] mb-6">
              Your profile is instantly vectorized. We map your attributes against our massive Knowledge Graph containing over 100+ active state and central government schemes. Our engine checks your vector against complex eligibility constraints simultaneously.
            </p>
            <div className="ml-[72px] bg-black/50 p-6 rounded-[12px] border border-white/5 font-mono text-[13px] text-[#f59e0b]">
              Vector = [State:21, Income:150k, Job:Farmer, Land:2, Cat:OBC]<br/>
              Matches = SELECT schemes WHERE vector ∈ eligibility_boundary
            </div>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-[16px] p-8 md:p-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-[#FF6B2B]/15 text-[#FF6B2B] flex items-center justify-center font-black text-xl shrink-0">3</div>
              <h2 className="text-[24px] font-bold text-white tracking-[-0.5px]">Probabilistic Ranking</h2>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed ml-[72px]">
              Not all schemes are equal. If you are eligible for 12 schemes, we use a custom scoring algorithm to rank them. We calculate a "Match Confidence Score" and prioritize schemes that yield the highest immediate financial benefit or the easiest application process.
            </p>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-[16px] p-8 md:p-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-[#FF6B2B]/15 text-[#FF6B2B] flex items-center justify-center font-black text-xl shrink-0">4</div>
              <h2 className="text-[24px] font-bold text-white tracking-[-0.5px]">XAI (Explainable Output)</h2>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed ml-[72px]">
              We never give you a black-box result. Our interface explicitly shows you the boolean logic behind every recommendation. You will see exactly *why* you matched: "✓ Income &lt; 2L", "✓ Resident of Maharashtra", etc. You get total transparency.
            </p>
          </div>

        </div>
      </div>

      </main>
      <Footer />
      <GradientBar />
    </>
  );
}
