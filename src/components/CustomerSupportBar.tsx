import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface CustomerSupportBarProps {
  language: Language;
}

export const CustomerSupportBar: React.FC<CustomerSupportBarProps> = ({ language }) => {
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackPhone.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowCallbackModal(false);
        setCallbackPhone('');
        setCallbackName('');
      }, 2500);
    }
  };

  return (
    <>
      {/* Floating Bottom Quick Action Strip */}
      <aside aria-label="Customer Support Bar" className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 z-30 flex items-center gap-2">
        {/* Callback Button */}
        <button
          onClick={() => setShowCallbackModal(true)}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 bg-white text-slate-800 hover:bg-slate-50 text-xs font-bold rounded-full shadow-lg border border-slate-300 transition-all cursor-pointer"
          title="Request 15-min corporate callback"
        >
          <Phone className="w-3.5 h-3.5 text-[#128B94]" />
          <span>{language === 'ar' ? 'طلب معاودة اتصال' : 'Request Callback'}</span>
        </button>

        {/* WhatsApp Floating Action Button in Brand Teal */}
        <a
          href="https://wa.me/97143426666?text=Hello%20Karama%20Business%20Center%20and%20Emirates%20Secretarial%20Services,%20I%20would%20like%20to%20inquire%20about%20government%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#128B94] hover:bg-[#01403F] text-white text-xs font-bold rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
          title="Direct WhatsApp Support Desk"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">
            {language === 'ar' ? 'محادثة واتساب فورية' : 'Live WhatsApp Desk'}
          </span>
        </a>
      </aside>

      {/* Callback Request Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowCallbackModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Callback Request Confirmed'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'ar'
                    ? 'سيتواصل معكم أحد مستشارينا المعتمدين خلال 15 دقيقة.'
                    : 'A certified relationship officer will contact you within 15 minutes.'}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#128B94] uppercase mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'استجابة سريعة' : '15-Min Priority Response'}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'ar' ? 'طلب معاودة اتصال من مستشار' : 'Request Corporate Callback'}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {language === 'ar'
                    ? 'أدخل رقم هاتفك وسيقوم مستشار حكومي بالتواصل معك فوراً.'
                    : 'Speak directly with our senior government transaction advisors.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder={language === 'ar' ? 'الاسم الكريم' : 'Your Full Name'}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#128B94]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#128B94]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold text-white bg-[#128B94] hover:bg-[#01403F] rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    {language === 'ar' ? 'إرسال الطلب الآن' : 'Call Me Back'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
