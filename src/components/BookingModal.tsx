import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, Building, ArrowRight, ShieldCheck, Truck, Crown } from 'lucide-react';
import { ServiceItem, Language, BookingSubmission } from '../types';
import { SERVICES, DEPARTMENTS } from '../data/departmentsData';
import { TRANSLATIONS } from '../data/translations';
import { DepartmentLogo } from './DepartmentLogo';

interface BookingModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  initialChannel?: 'flagship' | 'vip_majlis' | 'doorstep_van';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  language,
  onClose,
  preselectedService,
  initialChannel = 'flagship',
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const defaultService = preselectedService || SERVICES[0];

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultService.id);
  const [selectedChannel, setSelectedChannel] = useState<'flagship' | 'vip_majlis' | 'doorstep_van'>(
    initialChannel
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-12');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');

  // Client Details Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmed State
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || defaultService;

  const timeSlots = [
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = language === 'ar' ? 'الاسم مطلوب' : 'Full name is required';
    }
    if (!phone.trim() || phone.trim().length < 8) {
      errors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Valid UAE phone is required';
    }
    if (!email.trim() || !email.includes('@')) {
      errors.email = language === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Valid email is required';
    }
    if (selectedChannel === 'doorstep_van' && !address.trim()) {
      errors.address = language === 'ar' ? 'العنوان مطلوب للحافلة المتنقلة' : 'Location address in Dubai is required for doorstep van';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 4) {
      if (validateStep4()) {
        const randRef = `ESS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const booking: BookingSubmission = {
          serviceId: activeService.id,
          departmentId: activeService.departmentId,
          channel: selectedChannel,
          fullName,
          phone,
          email,
          companyName,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          address,
          notes,
          referenceNumber: randRef,
        };
        setConfirmedBooking(booking);
        setStep(5);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#01403F] via-[#095E63] to-[#128B94] text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-200 uppercase tracking-wider block">
              {language === 'ar' ? 'نظام الحجز المعتمد' : 'Official Appointment System'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              {t.bookingModalTitle}
            </h2>
          </div>

          <button
            onClick={handleResetAndClose}
            className="text-teal-100 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span className={step >= 1 ? 'text-[#128B94] font-bold' : ''}>
              1. {t.bookingStep1}
            </span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#128B94] font-bold' : ''}>
              2. {t.bookingStep2}
            </span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#128B94] font-bold' : ''}>
              3. {t.bookingStep3}
            </span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#128B94] font-bold' : ''}>
              4. {t.bookingStep4}
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {language === 'ar' ? 'اختر المعاملة الحكومية المطلوبة:' : 'Select the Government Transaction:'}
              </h3>

              <div className="space-y-2.5">
                {SERVICES.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <label
                      key={service.id}
                      className={`block p-4 rounded-lg border text-left rtl:text-right cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#128B94] bg-teal-50/70 text-slate-900 ring-2 ring-[#128B94]'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                      }`}
                    >
                      <input
                        type="radio"
                        name="bookingService"
                        value={service.id}
                        checked={isSelected}
                        onChange={() => setSelectedServiceId(service.id)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white p-1 border border-slate-200 shrink-0 flex items-center justify-center">
                          <DepartmentLogo deptId={service.departmentId} className="w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#128B94]">
                              {language === 'ar' ? service.authorityAr : service.authorityEn}
                            </span>
                            <span className="text-xs font-mono font-bold tabular-nums text-slate-600">
                              {(service.govFee + service.serviceFee).toLocaleString()} AED
                            </span>
                          </div>
                          <div className="text-sm font-bold mt-0.5 text-slate-900 truncate">
                            {language === 'ar' ? service.titleAr : service.titleEn}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Channel & Experience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {language === 'ar' ? 'اختر قناة الخدمة المفضلة:' : 'Select Service Experience Channel:'}
              </h3>

              <div className="grid grid-cols-1 gap-3.5">
                {/* Channel 1 */}
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all block ${
                    selectedChannel === 'flagship'
                      ? 'border-[#128B94] bg-teal-50/70 text-slate-900 ring-2 ring-[#128B94]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="bookingChannel"
                    value="flagship"
                    checked={selectedChannel === 'flagship'}
                    onChange={() => setSelectedChannel('flagship')}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-[#128B94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold">{t.channelCenter}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {language === 'ar'
                          ? 'مواقف سيارات خاصة، كاونترات رقمية سريعة، ضيافة كاملة في فرعنا.'
                          : 'Flagship happiness center, VIP valet parking, fast biometric pods.'}
                      </p>
                    </div>
                  </div>
                </label>

                {/* Channel 2 */}
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all block ${
                    selectedChannel === 'vip_majlis'
                      ? 'border-[#128B94] bg-teal-50/70 text-slate-900 ring-2 ring-[#128B94]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="bookingChannel"
                    value="vip_majlis"
                    checked={selectedChannel === 'vip_majlis'}
                    onChange={() => setSelectedChannel('vip_majlis')}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-[#128B94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#128B94]">{t.channelMajlis}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {language === 'ar'
                          ? 'أجنحة خاصة، مدير علاقات تنفيذي مخصص، إنجاز المعاملات الفورية بدون أي انتظار.'
                          : 'Private luxury suites, dedicated corporate officer, zero-queue fast track.'}
                      </p>
                    </div>
                  </div>
                </label>

                {/* Channel 3 */}
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all block ${
                    selectedChannel === 'doorstep_van'
                      ? 'border-[#128B94] bg-teal-50/70 text-slate-900 ring-2 ring-[#128B94]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="bookingChannel"
                    value="doorstep_van"
                    checked={selectedChannel === 'doorstep_van'}
                    onChange={() => setSelectedChannel('doorstep_van')}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#128B94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold">{t.channelVan}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {language === 'ar'
                          ? 'نرسل حافلة المعاملات الحكومية المتنقلة الفاخرة مباشرة إلى فيلتك أو برجك في دبي.'
                          : 'We dispatch our luxury government mobile van directly to your villa or tower.'}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'اختر تاريخ الموعد:' : 'Select Appointment Date:'}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-10"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'اختر الوقت المتاح:' : 'Select Available Time Slot:'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 text-xs font-bold rounded-md transition-all cursor-pointer tabular-nums ${
                        selectedTimeSlot === slot
                          ? 'bg-[#128B94] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Applicant Details */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  {t.applicantNameLabel} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor / Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                />
                {formErrors.fullName && (
                  <p className="text-xs text-rose-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    {t.applicantPhoneLabel} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    {t.applicantEmailLabel} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  {t.applicantCompanyLabel}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Global FZCO (if corporate transaction)"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                />
              </div>

              {selectedChannel === 'doorstep_van' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    {t.applicantAddressLabel} *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Villa 14, Frond E, Palm Jumeirah OR Al Fattan Tower DIFC"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                  />
                  {formErrors.address && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.address}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  {t.applicantNotesLabel}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'ar' ? 'أي ملاحظات أو مستندات خاصة تود تجهيزها مسبقاً' : 'Any specific requirements or prior file details'}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#128B94]"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Instant Confirmation */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-[#128B94] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-[#128B94] uppercase tracking-wider">
                {t.bookingConfirmation}
              </span>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {language === 'ar' ? 'تم تسجيل وتأكيد موعدكم بنجاح' : 'Your Official Appointment is Confirmed'}
              </h3>

              <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200 text-left rtl:text-right space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">{t.appointmentReference}</span>
                  <span className="text-sm font-bold font-mono text-[#128B94]">
                    {confirmedBooking.referenceNumber}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700">
                  <p>
                    <strong>{language === 'ar' ? 'الخدمة:' : 'Service:'}</strong>{' '}
                    {language === 'ar' ? activeService.titleAr : activeService.titleEn}
                  </p>
                  <p>
                    <strong>{language === 'ar' ? 'القناة:' : 'Channel:'}</strong>{' '}
                    {confirmedBooking.channel === 'vip_majlis'
                      ? t.channelMajlis
                      : confirmedBooking.channel === 'doorstep_van'
                      ? t.channelVan
                      : t.channelCenter}
                  </p>
                  <p>
                    <strong>{language === 'ar' ? 'الموعد:' : 'Date & Time:'}</strong>{' '}
                    {confirmedBooking.date} · {confirmedBooking.timeSlot}
                  </p>
                  <p>
                    <strong>{language === 'ar' ? 'المتقدم:' : 'Applicant:'}</strong>{' '}
                    {confirmedBooking.fullName} ({confirmedBooking.phone})
                  </p>
                  {confirmedBooking.address && (
                    <p>
                      <strong>{language === 'ar' ? 'الموقع:' : 'Location:'}</strong>{' '}
                      {confirmedBooking.address}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                {t.smsNotice}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep((p) => p - 1)}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.prevStepBtn}
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#128B94] hover:bg-[#01403F] rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <span>{step === 4 ? t.confirmBookingBtn : t.nextStepBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          ) : (
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 text-xs sm:text-sm font-bold text-white bg-[#128B94] hover:bg-[#01403F] rounded-md transition-colors cursor-pointer"
            >
              {t.closeBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
