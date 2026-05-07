import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import HeroBannerImg from '../../../assets/hero-banner.jpg';

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[200px] w-full border border-black bg-[var(--banner-bg)] transition-colors duration-300">
      <div 
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${HeroBannerImg})` }}
      ></div>
      <div className="absolute inset-y-0 left-0 w-[85%] md:w-[65%] transition-colors duration-300" style={{ background: 'linear-gradient(to right, var(--banner-bg), color-mix(in srgb, var(--banner-bg) 90%, transparent), transparent)' }}></div>
      <div className="wave-overlay relative z-10"></div>
      <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 px-5 md:px-9">
        <div className="max-w-[60%] md:max-w-[58%]">
          <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur transition-colors duration-300" style={{ backgroundColor: 'var(--banner-badge-bg)', borderColor: 'var(--banner-badge-border)', color: 'var(--banner-badge-text)' }}>
            <Trophy className="h-3 w-3 text-[#F6C453]" aria-hidden="true" />
            Mega Contest
          </div>
          <h2 className="mt-2 text-xl md:text-[28px] font-bold leading-tight tracking-tight transition-colors duration-300">
            <span style={{ color: 'var(--banner-text)' }}>Forex Champions League · <span className="text-[#22D3EE]">$50K Prize</span></span>
          </h2>
          <p className="mt-1 text-xs md:text-sm transition-colors duration-300" style={{ color: 'var(--banner-desc)' }}>Join the season's biggest trading battle. Entry from $10.</p>
          <div className="mt-3 md:hidden">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
              Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="hidden md:block relative z-10 pr-4 lg:pr-12 xl:pr-16">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
            Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
