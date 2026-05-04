import React from 'react';
import { Rocket, Home } from 'lucide-react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                <Rocket size={48} className="text-primary" />
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl font-black text-foreground tracking-tight">Coming Soon</h1>
                <p className="text-muted-foreground text-sm max-w-[260px] mx-auto leading-relaxed">
                    We're working hard to bring you this feature. Something amazing is on its way, stay tuned!
                </p>
            </div>
            <Button type="primary" size="large" icon={<Home size={18} />} onClick={() => navigate('/')} className="!rounded-2xl !h-12 px-8 font-bold !bg-primary border-none shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Back to Home
            </Button>
        </div>
    );
};

export default ComingSoon;