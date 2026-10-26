import React, { useState, useMemo, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PhoneCall,
  Calendar,
  Sparkles,
  Shield,
  MessageCircle,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types';

interface FaqPageProps {
  language: Language;
  onNavigateToHome: () => void;
  onNavigateToContact: () => void;
  onOpenBooking: () => void;
}

interface FaqItemData {
  id: string;
  category: 'residency' | 'corporate' | 'labor' | 'medical' | 'fees' | 'vip';
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  language,
  onNavigateToHome,
  onNavigateToContact,
  onOpenBooking,
}) => {
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ChevronLeft : ChevronRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', labelEn: 'All Questions', labelAr: 'كافة الأسئلة' },
    { id: 'residency', labelEn: 'Visas & Golden Visa', labelAr: 'الإقامات والتأشيرة الذهبية' },
    { id: 'corporate', labelEn: 'Company Setup & DED', labelAr: 'الشركات ورخص دبي' },
    { id: 'labor', labelEn: 'Labor & Tasheel', labelAr: 'العمل وتسهيل' },
    { id: 'medical', labelEn: 'DHA Medical & ID', labelAr: 'الفحص الطبي والهوية' },
    { id: 'fees', labelEn: 'Government Fees', labelAr: 'الرسوم وطرق الدفع' },
    { id: 'vip', labelEn: 'VIP & Mobile Van', labelAr: 'مجلس VIP والحافلة' },
  ];

  const faqData: FaqItemData[] = [
    {
      id: 'faq-1',
      category: 'residency',
      questionEn: 'How does ESS fast-track Dubai 10-Year Golden Visa applications?',
      questionAr: 'كيف يسرع مركز الإمارات إنجاز الإقامة الذهبية لمدة 10 سنوات بدبي؟',
      answerEn:
        'As an accredited GDRFA Amer partner, ESS conducts upfront eligibility auditing of property deeds, bank deposits, or professional credentials. Once verified, files are nominated directly through ministerial VIP APIs, cutting standard processing from weeks to 24–48 hours.',
      answerAr:
        'بصفتنا شريكاً رسمياً معتمداً لمركز آمر والإدارة العامة للإقامة، نقوم بالتدقيق المسبق الفوري على صكوك الملكية، والودائع البنكية، أو المؤهلات التخصصية. ويتم رفع الطلب عبر مسار الربط المباشر ليصدر الاعتماد خلال 24 إلى 48 ساعة فقط.',
    },
    {
      id: 'faq-2',
      category: 'corporate',
      questionEn: 'Can I obtain a Dubai DED Instant License without physical office space?',
      questionAr: 'هل يمكن إصدار رخصة تجارية فورية من اقتصادية دبي دون مقر عمل فعلي؟',
      answerEn:
        'Yes. Under Dubai Economy & Tourism (DET) regulations, eligible commercial and professional activities qualify for an Instant License with an initial 1-year virtual address waiver (Ejari grace period). ESS issues your trade license and electronic MOA in less than 2 hours.',
      answerAr:
        'نعم، تتيح دائرة الاقتصاد والسياحة بدبي لأكثر من 1,000 نشاط تجاري ومهني إصدار "الرخصة الفورية" دون اشتراط عقد إيجار (إيجاري) للسنة الأولى. يكمل خبراؤنا حجز الاسم التجاري وإصدار الرخصة وعقد التأسيس الإلكتروني خلال ساعتين فقط.',
    },
    {
      id: 'faq-3',
      category: 'medical',
      questionEn: 'What is the fastest turnaround time for DHA Express Medical Fitness?',
      questionAr: 'ما هي أسرع مدة لاستلام نتيجة الفحص الطبي للإقامة من هيئة الصحة بدبي؟',
      answerEn:
        'Through our VIP coordination channel, applicants receive express blood tests and chest X-rays with official DHA electronic certification generated in as little as 4 hours, compared to 24–48 hours for standard municipal centers.',
      answerAr:
        'عبر مسار كبار الشخصيات VIP المنسق مع هيئة الصحة بدبي، يتم أخذ عينات الدم والأشعة السينية دون أي طوابير انتظار وتصدر شهادة اللياقة الطبية الرسمية المعتمدة إلكترونياً خلال 4 ساعات فقط.',
    },
    {
      id: 'faq-4',
      category: 'labor',
      questionEn: 'How do you handle MoHRE Tasheel Labor Card issuance and fines?',
      questionAr: 'كيف يتم إصدار وتجديد بطاقات العمل عبر تسهيل وتسوية الغرامات؟',
      answerEn:
        'Our authorized Tasheel typing officers process electronic work permits, quota increases, and Wage Protection System (WPS) compliance directly in the Ministry of Human Resources & Emiratisation system. We also lodge formal fine reduction petitions for delayed renewals.',
      answerAr:
        'يقوم طباعونا المعتمدون في تسهيل بتقديم تصاريح العمل الإلكترونية، ورفع الكوتة، وتدقيق حماية الأجور (WPS) في نظام وزارة الموارد البشرية والتوطين فوراً، كما نتولى تقديم طلبات الإعفاء أو تخفيض الغرامات العمالية المترتبة.',
    },
    {
      id: 'faq-5',
      category: 'fees',
      questionEn: 'Are government fees separate from ESS service typing fees?',
      questionAr: 'هل تنفصل رسوم الخزينة الحكومية عن أتعاب الطباعة الخاصة بالمركز؟',
      answerEn:
        'Absolutely. In accordance with UAE consumer transparency laws, every quotation and invoice itemizes the exact government treasury fee (deposited into official ministry accounts) separately from the accredited typing and consultant fee. You receive genuine official receipts with each transaction.',
      answerAr:
        'بكل تأكيد. التزاماً بقوانين الشفافية وحماية المستهلك، توضح كل فاتورة رسمية رسم الخزينة الحكومية المودع في حساب الوزارة بشكل منفصل عن أتعاب الطباعة والاستشارة المعتمدة، مع تسليمك إيصالات الدفع الحكومية الرسمية فور صدورها.',
    },
    {
      id: 'faq-6',
      category: 'vip',
      questionEn: 'How does the Doorstep Mobile Government Service Van operate?',
      questionAr: 'كيف تعمل خدمة الحافلة المتنقلة الحكومية عند باب المكتب أو المنزل؟',
      answerEn:
        'Our customized luxury Mercedes mobile van travels to any residential or corporate location in Dubai upon booking. Inside, an authorized typing and biometrics officer uses secure mobile terminals to execute typing, passport scanning, and priority processing right at your doorstep.',
      answerAr:
        'تنتقل حافلتنا الفارهة المجهزة بالكامل إلى أي موقع تختاره في دبي (فيلا، برج سكني، أو مقر شركة). يصحب الحافلة ضابط معاملات معتمد مزود بأجهزة مسح رقمية وتواصل مشفر لإنجاز المعاملة وتبصيم كافة أفراد العائلة أو الموظفين بأقصى درجات الراحة.',
    },
    {
      id: 'faq-7',
      category: 'residency',
      questionEn: 'What documents are required to sponsor family members for Dubai residency?',
      questionAr: 'ما هي الوثائق المطلوبة لكفالة أفراد الأسرة على إقامة دبي؟',
      answerEn:
        'Standard requirements include: Sponsor’s original Emirates ID & Passport with valid visa, certified Ejari tenancy contract, verified salary certificate or labor contract (minimum salary AED 4,000 or AED 3,000 + accommodation), attested marriage certificate, and attested birth certificates for children.',
      answerAr:
        'المستندات الأساسية: الهوية الإماراتية الأصلية وجواز السفر للكفيل مع إقامة سارية، عقد إيجار مصدق (إيجاري)، شهادة راتب أو عقد عمل مصدق براتب لا يقل عن 4,000 درهم (أو 3,000 + سكن)، عقد زواج مصدق رسمياً من الخارجية، وشهادات ميلاد الأبناء مصدقة.',
    },
    {
      id: 'faq-8',
      category: 'corporate',
      questionEn: 'Can ESS assist with Corporate Bank Account Opening in Dubai?',
      questionAr: 'هل يقدم المركز المساعدة في فتح الحسابات البنكية التجارية للشركات؟',
      answerEn:
        'Yes. Through our executive banking desk partnerships with top UAE tier-1 banks (ENBD, FAB, Mashreq, ADCB), we prepare your corporate compliance profile, business plan, and shareholder documentation to ensure smooth account onboarding without lengthy delays.',
      answerAr:
        'نعم، عبر مكتب الشراكات المصرفية مع كبرى البنوك الإماراتية (الإمارات دبي الوطني، بنك أبوظبي الأول، المشرق، وأبوظبي التجاري)، نجهز الملف القانوني وخطة العمل وسجلات الشركاء لتسهيل فتح الحساب التجاري للشركة دون رفض أو تأخير.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const qEn = item.questionEn.toLowerCase();
        const aEn = item.answerEn.toLowerCase();
        const qAr = item.questionAr.toLowerCase();
        const aAr = item.answerAr.toLowerCase();
        return qEn.includes(q) || aEn.includes(q) || qAr.includes(q) || aAr.includes(q);
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Structured Data for Google Search SEO
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((item) => ({
        '@type': 'Question',
        name: isAr ? item.questionAr : item.questionEn,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr ? item.answerAr : item.answerEn,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-structured-data';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('faq-structured-data');
      if (el) el.remove();
    };
  }, [isAr]);

  return (
    <div className="min-h-screen bg-slate-50 pt-18 sm:pt-22 lg:pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateToHome}
              className="hover:text-[#128B94] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {isAr ? 'الأسئلة الشائعة وقاعدة المعرفة' : 'Frequently Asked Questions'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#01403F] via-[#085C5E] to-[#128B94] text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-200">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? 'قاعدة المعرفة والاستفسارات الحكومية المعتمدة لعام 2026'
                  : 'Official 2026 Government Regulations Knowledge Base'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {isAr ? 'الأسئلة الشائعة والإجابات الرسمية' : 'Dubai Government Services FAQ & Guidance'}
            </h1>

            <p className="text-sm sm:text-base text-teal-50/90 leading-relaxed">
              {isAr
                ? 'إجابات واضحة ومحدثة وفق أحدث اشتراطات وزارة الموارد البشرية، والجوازات والهجرة (آمر)، واقتصادية دبي، وهيئة الصحة. كل ما تحتاج معرفته عن المستندات، والرسوم، والمدد الزمنية.'
                : 'Authoritative answers regarding GDRFA Amer visas, Golden Visa eligibility, DED Instant Licenses, MoHRE Tasheel labor rules, and DHA express medical testing.'}
            </p>

            {/* Live Search */}
            <div className="pt-3 max-w-2xl">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isAr
                      ? 'ابحث في الأسئلة (مثلاً: الإقامة الذهبية، الرسوم، الفحص الطبي، الحافلة)...'
                      : 'Search FAQs (e.g. Golden Visa, fees, medical fitness, mobile van)...'
                  }
                  className="w-full bg-white text-slate-900 placeholder-slate-400 pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3.5 rounded-xl shadow-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-20 sm:top-22 lg:top-24 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#128B94] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {isAr ? 'لم يتم العثور على سؤال مطابق' : 'No matching questions found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isAr ? 'تواصل مع فريقنا للمساعدة الفورية' : 'Connect with our government advisors for instant answers'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#128B94] text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'عرض كافة الأسئلة' : 'Show All Questions'}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 shadow-xs hover:border-slate-300"
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {isAr ? faq.questionAr : faq.questionEn}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-teal-50 text-[#128B94]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-teal-50/20">
                    <p>{isAr ? faq.answerAr : faq.answerEn}</p>
                    <div className="mt-4 pt-3 border-t border-teal-100/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {isAr ? 'المصدر: اللوائح الرسمية لحكومة دبي' : 'Source: Official Dubai Government Regulations'}
                      </span>
                      <button
                        onClick={onOpenBooking}
                        className="font-bold text-[#128B94] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isAr ? 'تقديم المعاملة الآن' : 'Initiate Transaction'}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Support Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 to-[#01403F] rounded-2xl p-8 sm:p-10 text-white shadow-lg">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'استشارة مجانية فورية' : 'Free Government Advisory'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {isAr ? 'هل لديك حالة خاصة أو استفسار لم تجد إجابته؟' : 'Have a complex file or question not listed here?'}
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                {isAr
                  ? 'مستشارونا القانونيون متواجدون على مدار الساعة للإجابة على كافة تفاصيل الرخص والإقامات وتخفيض الغرامات.'
                  : 'Speak directly with our senior government PROs and legal consultants for immediate evaluation.'}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <a
                href="https://wa.me/97143426666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'محادثة واتساب فورية' : 'WhatsApp Consultant'}</span>
              </a>
              <button
                onClick={onNavigateToContact}
                className="w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-teal-300" />
                <span>{isAr ? 'عرض قنوات الاتصال والموقع' : 'Contact Us & Location'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
