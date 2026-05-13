'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShieldCheck, Lock, Eye, FileText, BadgeCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  const sections = [
    {
      icon: Eye,
      title: 'Data Collection',
      content: 'We collect your phone number, name, and delivery location to facilitate orders. We do not sell this data to third parties.'
    },
    {
      icon: MapPinIcon,
      title: 'Location Usage',
      content: 'Your real-time location is only used when the app is active to help calculate delivery fees and find nearby gardeners.'
    },
    {
      icon: Lock,
      title: 'Payment Privacy',
      content: 'Digital wallet information (Wave, AfriMoney) is handled via secured encrypted gateways. We do not store your wallet PINs.'
    },
    {
      icon: UserIcon,
      title: 'Seller Information',
      content: 'Gardener application data is reviewed by our admin team and is only shared with buyers once the application is approved.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Privacy Policy</h1>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="bg-gray-50 p-8 rounded-[40px] flex flex-col items-center text-center gap-4 border border-gray-100 shadow-inner">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-[24px] flex items-center justify-center">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Your Privacy Matters</h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            At Dugama, we are committed to protecting our community members' data and maintaining trust.
          </p>
        </section>

        <div className="flex flex-col gap-6">
          {sections.map((section, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-soft flex items-center justify-center text-primary flex-shrink-0">
                <section.icon size={20} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-black text-gray-800 text-sm mb-2">{section.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-4 p-6 bg-green-50 rounded-3xl border border-green-100">
          <div className="flex items-center gap-3 mb-2 text-primary">
            <BadgeCheck size={20} />
            <h4 className="font-bold text-sm">GDPR Compliant</h4>
          </div>
          <p className="text-[10px] text-green-700/70 font-medium leading-relaxed italic">
            Our data handling processes follow international standards and local Gambian regulations to ensure your digital safety.
          </p>
        </section>
      </main>
    </div>
  );
}

function MapPinIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  );
}

function UserIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}
