'use client';

import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { DONATION_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const DonateWidget: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [isSimulatingCheckout, setIsSimulatingCheckout] = useState<boolean>(false);
  const [showStatusNotice, setShowStatusNotice] = useState<boolean>(false);

  const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleProceedToPayment = () => {
    if (finalAmount <= 0) return;
    setIsSimulatingCheckout(true);

    setTimeout(() => {
      setIsSimulatingCheckout(false);
      setShowStatusNotice(true);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
      {/* Frequency Toggle */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8 border border-slate-200">
        <button
          onClick={() => setFrequency('one-time')}
          className={cn(
            'flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all',
            frequency === 'one-time'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-900'
          )}
        >
          One-Time Support
        </button>
        <button
          onClick={() => setFrequency('monthly')}
          className={cn(
            'flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all',
            frequency === 'monthly'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-900'
          )}
        >
          Sustaining Monthly Contribution
        </button>
      </div>

      {/* Preset Amounts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {DONATION_CONFIG.defaultOptions.map((opt) => {
          const isSelected = !isCustom && selectedAmount === opt.amount;
          return (
            <button
              key={opt.amount}
              onClick={() => {
                setSelectedAmount(opt.amount);
                setIsCustom(false);
              }}
              className={cn(
                'py-3 px-4 rounded-xl border font-extrabold text-sm sm:text-base flex flex-col items-center justify-center transition-all',
                isSelected
                  ? 'bg-blue-950 text-amber-400 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-900 hover:bg-slate-50'
              )}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] font-normal text-slate-400 mt-0.5">
                {frequency === 'monthly' ? '/ month' : 'single'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Amount Input */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Or Enter Custom Amount (₹)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
            ₹
          </span>
          <input
            type="number"
            placeholder="e.g. 10000"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setIsCustom(true);
            }}
            onFocus={() => setIsCustom(true)}
            className={cn(
              'w-full pl-8 pr-4 py-3 text-base font-bold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all',
              isCustom ? 'border-amber-400 bg-white ring-2 ring-amber-400/20' : 'border-slate-300'
            )}
          />
        </div>
      </div>

      {/* Contribution Summary Box */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 font-medium">Selected Contribution</span>
          <p className="text-2xl font-black text-blue-950">
            ₹{finalAmount.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-slate-500 ml-1">
              {frequency === 'monthly' ? 'per month' : ''}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Public Fund</span>
        </div>
      </div>

      {/* Payment Action Button */}
      <button
        onClick={handleProceedToPayment}
        disabled={finalAmount <= 0 || isSimulatingCheckout}
        className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
      >
        {isSimulatingCheckout ? (
          <span>Connecting Gateway...</span>
        ) : (
          <>
            <HeartHandshake className="w-5 h-5 text-slate-950" />
            Proceed to Donate ₹{finalAmount.toLocaleString('en-IN')}
          </>
        )}
      </button>

      {/* Security & Integration Notice */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Encrypted Gateway Integration Point</span>
        </div>

        {showStatusNotice && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 text-left space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Gateway Integration Stub Ready
            </div>
            <p className="text-slate-600 leading-relaxed">
              Donation workflow prepared for ₹{finalAmount.toLocaleString('en-IN')}. In production, this trigger connects directly to the official gateway URL constant: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900">{DONATION_CONFIG.paymentGatewayUrl}</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
