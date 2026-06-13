import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GradientBar } from "@/components/ui/gradient-bar";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground font-sans flex flex-col pt-20">
      
      <div className="flex-1 max-w-[800px] mx-auto px-6 md:px-12 py-20 w-full">
        <div className="mb-16">
          <div className="text-[#FF6B2B] text-[11px] font-bold uppercase tracking-widest mb-4">ABOUT JANSETU</div>
          <h1 className="text-[48px] font-black text-white tracking-[-2px] leading-[1.1] mb-6">
            Bridging the gap between policy and people.
          </h1>
        </div>

        <div className="space-y-16">
          
          <section>
            <h2 className="text-[28px] font-black text-white tracking-[-1px] mb-6">The Current Problem</h2>
            <div className="text-[16px] text-white/60 leading-relaxed space-y-6">
              <p>
                The Indian government spends thousands of crores every year on welfare schemes, subsidies, and scholarships. Yet, an estimated <strong>₹2 Lakh Crore</strong> in benefits goes unclaimed annually. Why?
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong className="text-white/90">Information Asymmetry:</strong> Schemes are announced in dense gazettes or buried on unnavigable department websites.</li>
                <li><strong className="text-white/90">Eligibility Confusion:</strong> The rules for who qualifies are incredibly complex, depending on exact income brackets, land ownership size, social category, and state of residence.</li>
                <li><strong className="text-white/90">Fragmented Discovery:</strong> There is no single place to simply ask: "What am I eligible for?" Citizens must manually hunt through dozens of portals.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[28px] font-black text-white tracking-[-1px] mb-6">The JanSetu Solution</h2>
            <div className="text-[16px] text-white/60 leading-relaxed space-y-6">
              <p>
                JanSetu AI is designed to flip the model entirely. Instead of making the citizen search for the scheme, <strong>we bring the scheme to the citizen</strong>.
              </p>
              <div className="bg-[#161616] border border-white/10 p-8 rounded-[14px]">
                <p className="text-white font-medium text-[18px] leading-relaxed mb-4">
                  "Our mission is to ensure zero eligible citizens are left behind due to a lack of technical literacy or awareness."
                </p>
              </div>
              <p>
                We have ingested over 100+ active government schemes into a high-dimensional Knowledge Graph. By taking just 5 data points from a user (in under 2 minutes), our machine learning engine can deterministically predict exactly which schemes they qualify for, calculate the estimated financial benefit, and provide direct application links.
              </p>
              <p>
                No bureaucratic jargon. No complex forms. Just fast, accurate, actionable intelligence.
              </p>
            </div>
          </section>

        </div>
      </div>

      </main>
      <Footer />
      <GradientBar />
    </>
  );
}
