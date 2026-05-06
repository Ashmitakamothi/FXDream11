import React from 'react';
import { MessageCircle, Mail, LifeBuoy, Plus } from 'lucide-react';
import '../../web.css';

export default function Support() {
  const faqs = [
    {
      question: "How do I join a contest?",
      answer: "Open Explore, choose a contest and tap Join. Entry fee is debited from your wallet."
    },
    {
      question: "When are winnings credited?",
      answer: "Within 5 minutes of contest settlement, directly to your wallet balance."
    },
    {
      question: "How do withdrawals work?",
      answer: "Bank withdrawals are processed in 1–2 business days after KYC verification."
    },
    {
      question: "What instruments are supported?",
      answer: "Major forex pairs, gold/silver, BTC and select index CFDs."
    }
  ];

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-8 animate-fade-in max-w-4xl">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[#0f172a] dark:text-white">Support</h1>
          <p className="text-[13px] font-medium text-gray-500 mt-1.5">We're here 24/7. Pick the fastest path.</p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Live Chat */}
          <div className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-6 shadow-card hover-lift transition-all duration-300">
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[rgba(0,166,190,0.08)] text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="mt-4 font-bold text-[16px] text-[#0f172a] dark:text-white">Live Chat</div>
            <div className="text-[12px] font-medium text-gray-500 mt-0.5">Avg. reply 2 min</div>
            <button className="h-10 w-full mt-5 rounded-xl bg-[#00A5BE] text-white text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,165,190,0.4)] hover:brightness-110 hover:shadow-[0_12px_44px_-10px_rgba(0,165,190,0.5)] active:scale-[0.98] transition-all duration-300">
              Start Chat
            </button>
          </div>

          {/* Email */}
          <div className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-6 shadow-card hover-lift transition-all duration-300">
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[rgba(0,166,190,0.08)] text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div className="mt-4 font-bold text-[16px] text-[#0f172a] dark:text-white">Email</div>
            <div className="text-[12px] font-medium text-gray-500 mt-0.5">support@fxdream11.com</div>
            <button className="h-10 w-full mt-5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all">
              Send Email
            </button>
          </div>

          {/* Help Center */}
          <div className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-6 shadow-card hover-lift transition-all duration-300">
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[rgba(0,166,190,0.08)] text-primary">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div className="mt-4 font-bold text-[16px] text-[#0f172a] dark:text-white">Help Center</div>
            <div className="text-[12px] font-medium text-gray-500 mt-0.5">Guides & tutorials</div>
            <button className="h-10 w-full mt-5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all">
              Browse Docs
            </button>
          </div>
        </div>

        {/* FAQs */}
        <section className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-8 shadow-card overflow-hidden">
          <h2 className="text-[18px] font-bold text-[#0f172a] dark:text-white mb-4">Frequently asked</h2>
          <div className="divide-y divide-border dark:divide-gray-800">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group py-4" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-[15px] text-[#0f172a] dark:text-gray-200">
                  {faq.question}
                  <Plus className="h-4 w-4 text-gray-400 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
