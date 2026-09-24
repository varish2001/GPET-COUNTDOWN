import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface PinGateProps {
  onSuccess: () => void;
}

export const PinGate: React.FC<PinGateProps> = ({ onSuccess }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus the first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    if (errorMessage) {
      setErrorMessage(null);
    }

    if (!numericValue) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    // If user pasted or entered multiple numbers
    if (numericValue.length > 1) {
      handleMultiPaste(numericValue);
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = numericValue[0];
    setDigits(newDigits);

    // Auto-advance to next input
    if (index < 2) {
      inputRefs[index + 1].current?.focus();
    } else {
      // If 3rd digit is filled, check if all 3 are filled and auto-submit
      const fullPin = newDigits.join('');
      if (fullPin.length === 3) {
        verifyPin(fullPin);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move to previous input and clear it
        inputRefs[index - 1].current?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 2) {
      inputRefs[index + 1].current?.focus();
    } else if (e.key === 'Enter') {
      const fullPin = digits.join('');
      if (fullPin.length === 3) {
        verifyPin(fullPin);
      }
    }
  };

  const handleMultiPaste = (pastedText: string) => {
    const cleanNumbers = pastedText.replace(/\D/g, '').slice(0, 3).split('');
    const newDigits = ['', '', ''];
    cleanNumbers.forEach((char, idx) => {
      if (idx < 3) newDigits[idx] = char;
    });
    setDigits(newDigits);

    if (cleanNumbers.length === 3) {
      inputRefs[2].current?.focus();
      verifyPin(cleanNumbers.join(''));
    } else if (cleanNumbers.length > 0) {
      const nextFocus = Math.min(cleanNumbers.length, 2);
      inputRefs[nextFocus].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handleMultiPaste(pastedData);
  };

  const verifyPin = async (pinString: string) => {
    if (isVerifying || isSuccess) return;

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      // Secure server-side validation call
      // The client never holds the expected secret PIN
      const response = await fetch('/api/validate-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: pinString }),
      });

      const data = await response.json();

      if (data && data.success) {
        setIsSuccess(true);
        // Short celebratory settling before starting curtain reveal
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        triggerInvalidFeedback(data?.message || 'Invalid launch PIN. Please try again.');
      }
    } catch {
      triggerInvalidFeedback('Unable to verify PIN. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerInvalidFeedback = (message: string) => {
    setErrorMessage(message);
    setShake(true);
    setTimeout(() => setShake(false), 600);
    // Clear digits and refocus first
    setDigits(['', '', '']);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
      {/* Badge / Status Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 sm:mb-6 shadow-inner text-blue-400">
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Main Titles */}
      <h2
        className="text-2xl min-[360px]:text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
        style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      >
        The Wait Is Over.
      </h2>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-slate-400 max-w-sm px-2">
        Enter the 3-digit launch PIN to continue.
      </p>

      {/* PIN Box with Shake Animation on Failure */}
      <div
        className={`mt-6 sm:mt-8 flex flex-col items-center w-full transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Progress Indicator Dots */}
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-5" aria-hidden="true">
          {digits.map((digit, idx) => (
            <span
              key={`dot-${idx}`}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                digit
                  ? 'bg-amber-400 scale-110 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : 'bg-slate-700/60'
              }`}
            />
          ))}
        </div>

        {/* 3-Digit Input Grid */}
        <div
          className="flex items-center justify-center gap-2.5 min-[380px]:gap-3.5 sm:gap-5"
          onPaste={handlePaste}
        >
          {digits.map((digit, index) => (
            <input
              key={`pin-digit-${index}`}
              ref={inputRefs[index]}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={isVerifying || isSuccess}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              aria-label={`Digit ${index + 1} of 3`}
              autoComplete="off"
              className={`w-14 h-18 min-[380px]:w-16 min-[380px]:h-22 sm:w-20 sm:h-24 text-center text-2xl min-[380px]:text-3xl sm:text-4xl font-extrabold rounded-2xl bg-slate-900/90 border transition-all duration-200 outline-none text-white tabular-nums shadow-lg ${
                digit
                  ? 'border-amber-400/80 bg-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50'
                  : 'border-slate-800 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30'
              } disabled:opacity-50`}
            />
          ))}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            role="alert"
            className="mt-4 text-xs sm:text-sm font-medium text-rose-400 bg-rose-950/40 border border-rose-800/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 animate-in fade-in duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Continue Action Button */}
        <button
          type="button"
          disabled={!isComplete || isVerifying || isSuccess}
          onClick={() => verifyPin(digits.join(''))}
          className="mt-6 sm:mt-8 w-full max-w-xs py-3 sm:py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Verifying PIN...</span>
            </>
          ) : isSuccess ? (
            <span>Access Granted</span>
          ) : (
            <span>CONTINUE</span>
          )}
        </button>
      </div>

      <p className="mt-4 sm:mt-6 text-[11px] sm:text-xs text-slate-500 px-2">
        Authorized educational faculty and candidate portal access
      </p>
    </div>
  );
};
