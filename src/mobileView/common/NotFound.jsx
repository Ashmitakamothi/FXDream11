import React from 'react';
import { Ghost, Home } from 'lucide-react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="relative">
                <div className="text-[120px] font-black text-primary/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                    404
                </div>
                <div className="w-24 h-24 bg-muted-soft rounded-full flex items-center justify-center relative z-10 border border-border/20 shadow-sm">
                    <Ghost size={48} className="text-muted-foreground" />
                </div>
            </div>
            <div className="space-y-2 relative z-10">
                <h1 className="text-2xl font-black text-foreground tracking-tight">Page Not Found</h1>
                <p className="text-muted-foreground text-sm max-w-[260px] mx-auto leading-relaxed">Oops! The page you're looking for doesn't exist or has been moved to another universe.</p>
            </div>
            <Button type="primary" size="large" icon={<Home size={18} />} onClick={() => navigate('/')} className="!rounded-2xl !h-12 px-8 font-bold !bg-primary border-none shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Back to Home
            </Button>
        </div>
    );
};

export default NotFound;