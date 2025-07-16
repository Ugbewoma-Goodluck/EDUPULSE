import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copyright } from 'lucide-react';

const DashboardFooter = () => {
    return (
        <footer className="p-5 relative">
            <Separator className="absolute top-0 left-0" />
            <p className="flex items-center justify-start gap-1">
                <Copyright size={20} /> {new Date().getFullYear()} EduPulse. All rights reserved.
            </p>
        </footer>
    );
};

export default DashboardFooter;
