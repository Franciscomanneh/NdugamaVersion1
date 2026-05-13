'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'select' | 'success'>('select');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Wave' | 'AfriMoney' | 'QMoney'>('Wave');

  const presetAmounts = [50, 100, 250, 500, 1000];

  const handleDonate = () => {
    // In a real app, this would trigger payment logic and save to Firebase
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 active:scale-90 transition-transform"
            >
              <X size={20} />
            </button>

            {step === 'select' ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                    <Heart size={32} fill="currentColor" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">Support Our Farmers</h2>
                  <p className="text-gray-500 text-sm">Every dalasi helps local gardeners grow fresh produce for our community.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Amount (D)</p>
                  <div className="grid grid-cols-2 gap-3">
                    {presetAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={cn(
                          "py-4 rounded-2xl font-black transition-all border-2",
                          selectedAmount === amount
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-gray-50 border-transparent text-gray-600"
                        )}
                      >
                        D{amount}
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedAmount('custom')}
                      className={cn(
                        "py-4 rounded-2xl font-black transition-all border-2 col-span-2",
                        selectedAmount === 'custom'
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-50 border-transparent text-gray-600"
                      )}
                    >
                      {selectedAmount === 'custom' ? (
                        <input
                          autoFocus
                          type="number"
                          placeholder="Enter custom amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="bg-transparent text-center w-full outline-none placeholder:text-white/50"
                        />
                      ) : "Custom Amount"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Wave', 'AfriMoney', 'QMoney', 'Cash'].map((method: any) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={cn(
                          "py-3 rounded-xl text-xs font-bold transition-all border",
                          paymentMethod === method
                            ? "border-primary text-primary bg-green-50"
                            : "border-gray-100 text-gray-400"
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDonate}
                  className="w-full py-5 bg-primary text-white rounded-3xl font-black shadow-xl shadow-primary/30 active:scale-[0.98] transition-transform mt-2"
                >
                  Donate D{selectedAmount === 'custom' ? customAmount || 0 : selectedAmount} Now
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-6"
              >
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-primary mb-2">
                  <CheckCircle2 size={64} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Thank You!</h2>
                  <p className="text-gray-500 leading-relaxed">Your generous donation will directly support local farmers in The Gambia.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-gray-100 text-gray-800 rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
