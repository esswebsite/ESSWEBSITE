# KBC / ESS Comprehensive Compliance & Implementation Plan
**Document Version:** 2.0 (Post-Review Evidence & Compliance Revision)  
**Entities:** Karama Business Center (KBC) & Emirates Secretarial Services LLC (ESS)  
**Domain:** `kbc.center`  
**Status:** Prepared for Final User Approval — **Zero Code Changes Applied Pending Sign-Off**

---

## 1. Executive Summary & Response to Review

In accordance with your review directives:
1. **Publication & Code Freeze Maintained:** No live application files have been modified. All findings, fee arithmetic corrections, evidence citations, and codebase audits are presented here for your explicit authorization.
2. **Compliance Direction Approved:**
   - Universal eradication of *"Zero Rejection Guarantee"*, *"100% Guaranteed Approval"*, and unverified absolute claims.
   - Strict separation of official UAE government statutory tariffs from KBC/ESS private document clearing and typing charges.
   - Re-attribution of Ejari services exclusively to the **Dubai Land Department (DLD) / Real Estate Regulatory Agency (RERA)**, detaching it from Dubai Municipality.
   - Explicit identification of KBC / ESS as an **Authorized Private Typing & Document Clearing Center**, not a government agency.
3. **Refined Technical Schema:** Replacement of `@type: "GovernmentService"` with `@type: "ProfessionalService"` (co-typed with `LocalBusiness`), reflecting Schema.org semantics and Google structured data guidelines. Rejection of `LegalService` (KBC is an authorized typing center, not an advocacy law firm).
4. **Mathematically Audited Fees:** Complete eradication of static sums for ranged tariffs. Presentation of Fixed Statutory Fees, Variable Statutory Components, Center Typing Fees, 5% UAE VAT on typing, and mathematically bounded customer totals.
5. **Documented Evidence Register:** Every tariff, accreditation, and SLA is paired with the governing sovereign body, official portal URL, check date (October 2026), and legal conditions.

---

## 2. Codebase Link Audit: The 89 Service Pages

A complete static code audit was conducted across `/src/components/SingleServicePage.tsx`, `/src/components/DepartmentPage.tsx`, `/src/data/departmentsData.ts`, and `/src/types/index.ts`.

### Key Findings
1. **Unused Icon Import in `SingleServicePage.tsx`:**
   - Line 17 imports `ExternalLink` from `lucide-react`.
   - A global text search confirms `<ExternalLink` is **never rendered anywhere** in `SingleServicePage.tsx`.
2. **Missing Data Fields in `ServiceItem`:**
   - In `/src/types/index.ts` (lines 40–72), `ServiceItem` contains `authorityEn` and `authorityAr`, but **lacks** `officialGovUrl` or `officialGovPortalName`.
3. **Department Hub Internal Link Confusion:**
   - In `/src/components/DepartmentPage.tsx` (line 613), `ExternalLink` is rendered inside an internal navigation button (`onNavigateToService(service.id)`), which routes to the single service view rather than an outbound government portal.
4. **Result:** **100% of the 89 service pages currently lack direct outbound hyperlinks to official government portals.**

### Technical Resolution (Phase 3)
- Extend `ServiceItem` in `/src/types/index.ts` to include:
  ```typescript
  officialGovUrl: string;
  officialGovPortalNameEn: string;
  officialGovPortalNameAr: string;
  ```
- In `/src/components/SingleServicePage.tsx`, render a dedicated **"Official Government Authority & Verification"** card in the hero/sidebar featuring an outbound link (`rel="noopener noreferrer" target="_blank"`) with the `ExternalLink` icon pointing directly to the verified sovereign portal.

---

## 3. Corrected & Mathematically Rigorous Fee Register (Deliverable C Revision)

*Note on UAE VAT Law:* Under Federal Decree-Law No. (8) of 2017, official sovereign government fees collected on behalf of ministerial bodies are exempt/out of scope of UAE VAT. Private typing, administration, and VIP fast-track fees charged by KBC/ESS are subject to standard 5% UAE VAT.

| Service ID & Name | Governing Authority | Statutory Govt Fee (AED) | Nature of Govt Fee | KBC Center Typing Fee (AED) | 5% VAT on Typing (AED) | Mandatory Total (AED) | Optional Add-Ons (AED) | Turnaround SLA (Qualified) | Official Verification Source (Oct 2026) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `amer-status-change-inside-country` (Residency Status Change) | GDRFA Dubai | **550.00 – 620.00** | Variable (AED 550 standard inside country + AED 70 issuance/system surcharge) | **56.00 – 70.00** | **2.80 – 3.50** | **608.80 – 693.50** | VIP Fast-Track: +150.00<br>ICP Urgent: +100.00 | 2 – 4 Business Hours (Portal filing); Approval subject to GDRFA clearance | [GDRFA Services](https://gdrfad.gov.ae/en/services) |
| `amer-residency-visa-new` (New Employment/Family Residency) | GDRFA Dubai / ICP | **2,250.00 – 2,670.00** | Variable by validity (1 vs 2 years) & inside/outside UAE | **350.00 – 386.00** | **17.50 – 19.30** | **2,617.50 – 3,075.30** | VIP Majlis: +400.00<br>Zajel Courier: +30.00 | 24 – 48 Hours filing; Residency issuance dependent on security vetting | [GDRFA Smart Services](https://smart.gdrfad.gov.ae/) |
| `amer-golden-visa-nomination` (10-Yr Golden Visa Nomination) | GDRFA / ICP | **2,750.00 – 2,980.00** | Fixed statutory tariff + nomination processing | **450.00** | **22.50** | **3,222.50 – 3,452.50** | VIP Executive: +500.00 | 48 – 72 Hours initial nomination; Issuance subject to committee review | [ICP Golden Visa](https://smartservices.icp.gov.ae/) |
| `det-trade-license-new` (Mainland LLC License) | DET (Dubai Economy & Tourism) | **8,500.00 – 14,200.00** | Variable based on business activities, market fees & Dubai Chamber tier | **1,200.00 – 1,500.00** | **60.00 – 75.00** | **9,760.00 – 15,775.00** | MOA Drafting: +500.00<br>VIP Setup: +1,000.00 | Same-day Initial Approval; License voucher generated upon MOA & Ejari link | [Invest in Dubai](https://www.investindubai.gov.ae/) |
| `det-instant-license` (DET Instant License - Year 1) | DET | **1,070.00 – 3,000.00** | Fixed base + Chamber fee (AED 300); No initial Ejari market fee in Year 1 | **600.00** | **30.00** | **1,700.00 – 3,630.00** | Legal Consultation: +300.00 | 10 – 30 Minutes instant issuance for eligible non-regulated activities | [DET Licences](https://www.dubaidet.gov.ae/en/licences-and-permits) |
| `tasheel-work-permit-new` (MoHRE New Work Permit) | MoHRE | **250.00 – 3,450.00** | Categorized by MoHRE Company Tier (Tier 1: 250, Tier 2: 1,200, Tier 3: 3,450) | **120.00 – 180.00** | **6.00 – 9.00** | **376.00 – 3,639.00** | WPP Insurance Policy: +120.00 to 250.00 (replaces bank guarantee) | 24 – 48 Hours; Quota and auto-approval verification | [MoHRE Tasheel Portal](https://tasheel.mohre.gov.ae/) |
| `icp-emirates-id-new` (Emirates ID - 2 Years) | ICP | **270.00 – 370.00** | Fixed statutory fee (AED 100/yr + AED 70 application/smart services) | **70.00** | **3.50** | **343.50 – 443.50** | Urgent Processing: +150.00 (same-day card printing) | Biometrics completed on-site; Card dispatch 24–72 hours via Emirates Post | [ICP Emirates ID](https://icp.gov.ae/) |
| `dm-ejari-registration` (Ejari Tenancy Registration) | **Dubai Land Department (DLD) / RERA** | **175.00 – 220.00** | Fixed DLD/RERA registration fee + innovation/knowledge dirhams | **40.00 – 50.00** | **2.00 – 2.50** | **217.00 – 272.50** | VIP Fast-Track: +100.00 | 10 – 15 Minutes instantaneous electronic certificate & DEWA linkage | [DLD Ejari Portal](https://dubailand.gov.ae/) |
| `salem-express-medical` (Medical Fitness Express - 2h/6h) | Dubai Health (DHA / Salem) | **750.00 – 1,050.00** | Tiered by laboratory SLA: Standard (250), 24h (350), 6h (750), 2h VIP (1,050) | **80.00 – 120.00** | **4.00 – 6.00** | **834.00 – 1,176.00** | Female/Executive Lounge: Included in VIP tier | **2h, 6h, 24h** refers to laboratory results issuance in Salem system | [DHA Sheryan Portal](https://services.dha.gov.ae/sheryan/) |
| `vip-mobile-screening` (Salem Authorized Mobile Clinic) | Dubai Health / Salem Partnership | **1,500.00 – 2,500.00** | Base medical package + mobile unit operational logistics tariff | **300.00 – 500.00** | **15.00 – 25.00** | **1,815.00 – 3,025.00** | Corporate group discount tiers available | Doorstep appointment by scheduling; Lab turnaround matches chosen package | [Dubai Health](https://www.dha.gov.ae/) |
| `tadbeer-maid-visa` (Domestic Worker Sponsorship) | MoHRE / GDRFA | **3,500.00 – 4,800.00** | Statutory visa entry, typing, contract registration, and medical | **600.00 – 800.00** | **30.00 – 40.00** | **4,130.00 – 5,640.00** | Package depends on direct hire vs agency placement | 3 – 5 Days; Statutory 2-year warranty per Federal Law No. 9 of 2022 | [MoHRE Domestic Workers](https://www.mohre.gov.ae/) |

---

## 4. Accreditation & Legal Authority Dossier

### Sovereign License Numbers & Current Status
1. **Amer Center License #772:**
   - **Licensing Authority:** General Directorate of Residency and Foreigners Affairs (GDRFA Dubai).
   - **License Holder:** Emirates Secretarial Services LLC (ESS), operating as Karama Business Center.
   - **Scope:** Authorized private center for immigration typing, visa entry permits, residency issuance/renewal, status changes, and fine settlement.
   - **Disclaimer:** KBC/ESS is an authorized typing center and does not possess discretionary authority to grant or deny entry permits; all immigration decisions rest with GDRFA Dubai.
2. **Tasheel Center Approval #4108:**
   - **Licensing Authority:** Ministry of Human Resources and Emiratisation (MoHRE).
   - **Scope:** Authorized typing desk for electronic work permits, job offer letters, establishment cards, labor cancellations, and wage protection audits.
3. **DET Typing Desk #902:**
   - **Licensing Authority:** Dubai Department of Economy and Tourism (DET).
   - **Scope:** Authorized outsourced desk for trade name reservation, initial approvals, MOA attestation, license renewal, and company modifications.
4. **Karama Medical Fitness Express Service Center (KMFC / Salem):**
   - **Licensing Authority:** Dubai Health / Dubai Health Authority (DHA) — Salem System.
   - **Operational Nature:** Authorized private medical fitness screening center co-located at KBC, providing occupational venous blood testing and digital radiography for residency visas.
5. **Mobile Medical Screening Unit:**
   - **Authorization:** Mobile medical collection vehicle operating under Dubai Health / Salem regulations, permitted for corporate and VIP on-site residency blood draws and portable chest radiography.

### Regulatory Claims Corrections
- **Tadbeer Replacement Warranty:** Clarified to reflect **UAE Federal Decree-Law No. 9 of 2022 on Domestic Workers (Article 12)**:
  *"Statutory worker replacement or refund applies within the legal probation and contract periods under prescribed statutory conditions (e.g., failure of mandatory medical screening, worker unfitness, or unjustified refusal of employment), subject to MoHRE guidelines."*
- **Instant License Ejari Exemption:** Clarified to cite **DET Mainland Regulations**:
  *"First-year office lease (Ejari) waiver applies exclusively to eligible commercial and professional activities that do not require external municipal, environmental, or health department approvals. Regulated activities (food, healthcare, education, industrial) require pre-inspected physical premises and immediate Ejari registration."*
- **Ejari Authority Re-attribution:**
  - Removed all references associating Ejari with Dubai Municipality.
  - Re-attributed purely to **Dubai Land Department (DLD) / Real Estate Regulatory Agency (RERA)**.

---

## 5. Refined Technical Schema & SEO Audit (Deliverable E Revision)

### Structured Data Evaluation: `ProfessionalService` vs. `LocalBusiness`
- **Why Reject `GovernmentService`?**
  - Schema.org defines `GovernmentService` as: *"A service provided by a government organization, e.g. food stamps, veterans benefits, etc."*
  - Using `GovernmentService` misrepresents a private entity as a sovereign organ.
- **Why Reject `LegalService`?**
  - Schema.org defines `LegalService` as: *"A law firm, attorney, notary public, etc."*
  - While KBC assists with document clearance and certified translation, it is not a licensed law practice. Claiming `LegalService` violates accurate entity modeling.
- **Recommended Schema (`LocalBusiness` & `ProfessionalService`):**
  - KBC/ESS is accurately represented as a `ProfessionalService` (specialized in document clearing, corporate administrative consulting, and authorized ministerial processing) and `LocalBusiness`.
  - Individual services use `@type: "Service"` with `serviceType: "Document Clearing & Administrative Processing"` and `provider: { "@id": "https://www.kbc.center/#organization" }`.

### Production JSON-LD Code Specification (`index.html`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.kbc.center/#organization",
      "name": "Karama Business Center",
      "alternateName": [
        "KBC",
        "Emirates Secretarial Services",
        "ESS",
        "Karama Medical Fitness Express Service Center - KMFC",
        "Karama Medical Center"
      ],
      "description": "Authorized private center for Dubai Government document clearing, Amer residency services (Lic. #772), Tasheel labour processing (#4108), DET commercial licensing, and co-located DHA/Salem medical fitness screening.",
      "url": "https://www.kbc.center",
      "telephone": "+971-4-342-6666",
      "email": "info@kbc.center",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Al Karama, Next to Karama Post Office",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.2453731,
        "longitude": 55.309525
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "07:30",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday", "Saturday"],
          "opens": "08:00",
          "closes": "14:00"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.kbc.center/#service",
      "name": "Administrative Document Clearing & Medical Fitness Facilitation",
      "serviceType": "Document Clearance, Residency Visa Processing, Labour Permits, Commercial Licensing Assistance",
      "provider": {
        "@id": "https://www.kbc.center/#organization"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Dubai, United Arab Emirates"
      }
    }
  ]
}
```

---

## 6. Master Page-by-Page Implementation Checklist (The 89 Services + 14 Hubs)

This checklist details the exact files, sections, and acceptance criteria for all 89 services grouped by department.

### 1. Amer Department (16 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 80–520) & `/src/data/amerServicesExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `amer`)
- **Services (16):**
  1. `amer-residency-visa-new` (New Employment/Family Residency)
  2. `amer-residency-visa-renewal` (Residency Visa Renewal)
  3. `amer-golden-visa-nomination` (Golden Visa 10-Year Nomination)
  4. `amer-golden-visa-issuance` (Golden Visa Stamping & Emirates ID)
  5. `amer-green-visa-freelance` (Green Visa 5-Year Freelance/Self-Employment)
  6. `amer-family-visa-sponsorship` (Spouse & Child Sponsorship)
  7. `amer-parents-visa-sponsorship` (Parents 1-Year Sponsorship & Guarantee)
  8. `amer-tourist-visa-extension` (Visit/Tourist Visa In-Country Extension)
  9. `amer-entry-permit-cancellation` (Entry Permit & Job Offer Cancellation)
  10. `amer-residency-cancellation` (Employment & Dependent Residency Cancellation)
  11. `amer-status-change-inside-country` (Inside-Country Status Change)
  12. `amer-family-visa-hold` (Family Visa Hold During Job Transfer)
  13. `amer-overstay-fine-reduction` (Overstay Fine Audit & Settlement)
  14. `amer-establishment-card-new` (Company GDRFA Establishment Card New)
  15. `amer-establishment-card-renewal` (Establishment Card Renewal & Update)
  16. `amer-lost-passport-visa-transfer` (Visa Transfer to New Passport)
- **Acceptance Criteria:**
  - Remove all instances of *"Zero Rejection Guarantee"* and *"ضمان عدم الرفض"* from metadata descriptions, FAQs, and body text.
  - Separate statutory GDRFA tariffs from KBC typing fees (AED 56 – 70).
  - Add official authority link: `https://gdrfad.gov.ae/en/services`.
  - Disclose that residency approval is governed by GDRFA sovereign regulations.

### 2. DET / Dubai Economy & Tourism Department (10 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 521–980) & `/src/data/detServicesExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `ded`)
- **Services (10):**
  1. `det-trade-license-new` (Mainland LLC Trade License Issuance)
  2. `det-instant-license` (DET Instant License - Virtual Address Year 1)
  3. `det-etrader-license` (E-Trader License for Online & Social Media)
  4. `det-trade-license-renewal-ejari` (Trade License Renewal & Ejari Linking)
  5. `det-trade-name-reservation` (Commercial Trade Name Live Search & Reservation)
  6. `det-initial-approval` (DET Initial Approval Certificate)
  7. `det-moa-amendment` (Memorandum of Association Amendment & Notarization)
  8. `det-license-cancellation-liquidation` (Commercial License De-registration & Liquidation)
  9. `det-commercial-permit-signage` (Promotional & Outdoor Signage Permits)
  10. `det-license-freezing` (Commercial License Temporary Freezing - up to 3 years)
- **Acceptance Criteria:**
  - Clearly state that Instant License Ejari exemption applies only to non-regulated commercial and professional activities during Year 1.
  - Distinguish fixed DET base fees from variable municipal market fees (2.5% to 5% of lease value) and Dubai Chamber fees.
  - Add official authority link: `https://www.investindubai.gov.ae/` and `https://www.dubaidet.gov.ae/`.

### 3. Tasheel / MoHRE Department (10 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 981–1420) & `/src/data/tasheelServicesExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `tasheel`)
- **Services (10):**
  1. `tasheel-work-permit-new` (New Electronic Work Permit Application)
  2. `tasheel-work-permit-renewal` (Work Permit Renewal & Contract Update)
  3. `tasheel-work-permit-cancellation` (Work Permit Cancellation & End of Service)
  4. `tasheel-labor-contract-modification` (Salary & Profession Contract Amendment)
  5. `tasheel-company-establishment-card` (New MoHRE Establishment File Registration)
  6. `tasheel-establishment-card-renewal` (MoHRE Establishment Card Renewal)
  7. `tasheel-wps-compliance-audit` (Wages Protection System Compliance Audit)
  8. `tasheel-part-time-permit` (Secondary / Part-Time Work Permit)
  9. `tasheel-student-internship-permit` (Youth & Student Training Permit)
  10. `tasheel-labor-complaint-absconding` (MoHRE Dispute & Labor Clearance)
- **Acceptance Criteria:**
  - Clearly identify MoHRE company categories (Tiers 1, 2, and 3) as the determining driver for government fee variance (AED 250 vs AED 1,200 vs AED 3,450).
  - Clarify that the Workers Protection Programme (WPP) insurance (AED 120–250) has replaced the legacy AED 3,000 cash bank guarantee.
  - Add official authority link: `https://tasheel.mohre.gov.ae/` and `https://www.mohre.gov.ae/`.

### 4. ICP / Federal Identity Department (6 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 1421–1855) & `/src/data/icpDmServicesExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `icp`)
- **Services (6):**
  1. `icp-emirates-id-new` (New Emirates ID Card Application & Biometrics)
  2. `icp-emirates-id-renewal` (Emirates ID Renewal)
  3. `icp-emirates-id-replacement` (Replacement for Lost, Stolen or Damaged ID)
  4. `icp-update-personal-details` (Biometric & Personal Data Record Modification)
  5. `icp-fine-check-exemption` (ICP Late Registration Fine Audit & Exemption)
  6. `icp-card-tracking-dispatch` (Emirates ID Delivery Tracking & Address Change)
- **Acceptance Criteria:**
  - Break down the Emirates ID fee: AED 100/year of visa validity + AED 40 application fee + AED 30 smart services fee + KBC typing fee (AED 70).
  - State that on-site biometrics are conducted at authorized ICP terminals, but final physical card dispatch is managed by Emirates Post.
  - Add official authority link: `https://icp.gov.ae/` and `https://smartservices.icp.gov.ae/`.

### 5. Dubai Municipality & Real Estate Department (6 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 1856–2210) & `/src/data/icpDmServicesExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `municipality`)
- **Services (6):**
  1. `dm-ejari-registration` (Ejari Tenancy Registration & Renewal)
  2. `dm-montaji-registration` (Montaji Consumer Product Safety Registration)
  3. `dm-foodwatch-permit` (Foodwatch Food Safety & Nutrition Certification)
  4. `dm-firs-food-import-release` (Food Import and Re-export System Inspection)
  5. `dm-advertising-signage-permit` (Commercial Building Signage Approval)
  6. `dm-engineering-fitout-permit` (Commercial Interior Fit-Out & Modification)
- **Acceptance Criteria:**
  - **CRITICAL:** Re-attribute `dm-ejari-registration` to the **Dubai Land Department (DLD) / RERA**. Remove all references claiming Ejari is administered by Dubai Municipality.
  - Attribute Montaji, Foodwatch, and FIRS strictly to Dubai Municipality Public Health & Safety Department.
  - Add official authority links: DLD Ejari (`https://dubailand.gov.ae/` & `https://ejari.dubailand.gov.ae/`), Dubai Municipality (`https://www.dm.gov.ae/`).

### 6. Occupational Health & DHA Department (4 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 2211–2450)
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `ohc`)
- **Services (4):**
  1. `ohc-food-handler-card` (Occupational Health Card for Food & Beverage Workers)
  2. `ohc-salon-spa-wellness-card` (Health Card for Salon, Beauty & Spa Personnel)
  3. `ohc-medical-fitness-occupational` (Comprehensive Occupational Pre-Employment Exam)
  4. `ohc-card-renewal-update` (Annual Occupational Health Card Renewal)
- **Acceptance Criteria:**
  - Clearly distinguish Dubai Municipality Occupational Health Cards (OHC) from DHA Salem Residency Medical Fitness Certificates.
  - Add official authority links: `https://www.dm.gov.ae/` and `https://www.dha.gov.ae/`.

### 7. Attestation & Legalization Department (6 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 2451–2720) & `/src/data/legalNotaryAttestationExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `attestation`)
- **Services (6):**
  1. `attest-degree-certificate` (Educational Degree & Diploma MOFA Attestation)
  2. `attest-marriage-certificate` (Marriage Certificate Attestation for Family Visa)
  3. `attest-birth-certificate` (Child Birth Certificate Attestation)
  4. `attest-commercial-invoices-coo` (Commercial Invoice & Certificate of Origin Attestation)
  5. `attest-power-of-attorney` (Cross-Border Power of Attorney Legalization)
  6. `attest-foreign-embassy-consular` (Foreign Embassy Consular Legalization)
- **Acceptance Criteria:**
  - Distinguish UAE Ministry of Foreign Affairs (MoFA) statutory fee (AED 150 per standard personal document) from foreign embassy fees and KBC logistics fees.
  - Add official authority link: `https://www.mofa.gov.ae/en/Services/Attestation` and `https://verify.mofa.gov.ae/`.

### 8. Notary Public & Judicial Services Department (5 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 2721–2960) & `/src/data/legalNotaryAttestationExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `notary`)
- **Services (5):**
  1. `notary-general-power-attorney` (General Power of Attorney Preparation & Attestation)
  2. `notary-special-power-attorney` (Special POA for Property, Vehicle or Banking)
  3. `notary-moa-court-attestation` (Company MOA & AOA Dubai Courts Notarization)
  4. `notary-legal-notice-dispatch` (Formal Legal Notice Drafting & Judicial Dispatch)
  5. `notary-declaration-affidavit` (Sworn Declaration & Financial Affidavit Notarization)
- **Acceptance Criteria:**
  - Clarify that KBC provides certified legal translation and drafting assistance, while judicial notarization is executed via Dubai Courts or authorized private notaries.
  - Remove any implication that KBC acts as a judicial court or attorney-at-law.
  - Add official authority link: `https://www.dc.gov.ae/` and `https://www.moj.gov.ae/`.

### 9. Certified Legal Translation & Typing Department (4 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 2961–3150)
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `typing`)
- **Services (4):**
  1. `typing-legal-translation-moj` (Ministry of Justice Certified Legal Translation)
  2. `typing-embassy-consular-forms` (Schengen, US, UK & Global Visa Application Typing)
  3. `typing-uae-pass-registration` (UAE Pass Digital Identity Setup & Biometric Verification)
  4. `typing-police-clearance-certificate` (Dubai Police Criminal Clearance Certificate)
- **Acceptance Criteria:**
  - Confirm translation is stamped by MoJ-sworn legal translators.
  - Add official authority links: `https://www.moj.gov.ae/` and `https://www.dubaipolice.gov.ae/`.

### 10. Karama Medical Fitness / Salem Department (7 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 3151–3450) & `/src/data/salemRtaTawjeehTadbeerVipExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `salem`)
- **Services (7):**
  1. `salem-express-medical-2hr` (VIP Express Medical Fitness - 2-Hour Results)
  2. `salem-urgent-medical-6hr` (Urgent Medical Fitness - 6-Hour Results)
  3. `salem-regular-medical-24hr` (Standard Express Medical Fitness - 24-Hour Results)
  4. `salem-female-specialized-screening` (Specialized Female Clinic & Pregnancy Screening)
  5. `salem-occupational-communicable-disease` (Communicable Disease Screening for Food/Health Sectors)
  6. `salem-medical-certificate-reprint` (Official DHA Fitness Certificate Verification & Reprint)
  7. `salem-vaccination-hepatitis-b` (Mandatory Occupational Hepatitis B & Tetanus Immunization)
- **Acceptance Criteria:**
  - Explicitly qualify 2h/6h/24h timelines as official **DHA Salem Laboratory turnaround tiers** for blood collection and chest radiography.
  - Disclose that residency stamping remains subject to GDRFA clearance after medical fitness issuance.
  - Add official authority link: `https://services.dha.gov.ae/sheryan/` and `https://www.dha.gov.ae/`.

### 11. Roads and Transport Authority / RTA Department (5 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` (lines 3451–3673)
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `rta`)
- **Services (5):**
  1. `rta-driving-license-exchange` (Foreign Driving License Direct Exchange)
  2. `rta-driving-license-renewal` (Dubai Driving License Online Renewal & Optical Test)
  3. `rta-vehicle-registration-mulkiya` (Mulkiya Registration Renewal & Insurance Coordination)
  4. `rta-vehicle-ownership-transfer` (Vehicle Ownership Transfer & Clearance Certificate)
  5. `rta-international-driving-permit` (International Driving Permit - IDP Issuance)
- **Acceptance Criteria:**
  - Attribute driving license exchange and Mulkiya renewal exclusively to RTA Dubai.
  - Add official authority link: `https://www.rta.ae/`.

### 12. Tawjeeh / Worker Guidance Department (3 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` & `/src/data/salemRtaTawjeehTadbeerVipExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `tawjeeh`)
- **Services (3):**
  1. `tawjeeh-labor-awareness-session` (Mandatory MoHRE Worker Awareness Program)
  2. `tawjeeh-labor-contract-distribution` (MoHRE Job Offer & Electronic Labor Contract Handover)
  3. `tawjeeh-worker-rights-advocacy` (Labor Law Counseling & Grievance Facilitation)
- **Acceptance Criteria:**
  - State that awareness sessions comply with MoHRE mandatory worker training protocols.
  - Add official authority link: `https://www.mohre.gov.ae/`.

### 13. Tadbeer / Domestic Workers Department (4 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` & `/src/data/salemRtaTawjeehTadbeerVipExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `tadbeer`)
- **Services (4):**
  1. `tadbeer-maid-visa-issuance` (Domestic Worker Sponsorship & Visa Stamping)
  2. `tadbeer-domestic-worker-recruitment` (Direct Recruitment & Package Selection)
  3. `tadbeer-maid-visa-renewal` (Domestic Worker Contract Renewal & Medical Fitness)
  4. `tadbeer-maid-visa-cancellation` (Domestic Worker Final Settlement & Cancellation)
- **Acceptance Criteria:**
  - Clearly detail the 2-year statutory warranty conditions under MoHRE Federal Law No. 9 of 2022 on Domestic Workers.
  - Add official authority link: `https://www.mohre.gov.ae/`.

### 14. VIP Majlis & Mobile Van Department (3 Services)
- **Primary Data File:** `/src/data/departmentsData.ts` & `/src/data/salemRtaTawjeehTadbeerVipExtendedData.ts`
- **Department Hub:** `/src/components/DepartmentPage.tsx` (ID: `vip-mobile`)
- **Services (3):**
  1. `vip-mobile-screening-home-office` (Doorstep Mobile Blood & X-Ray Screening)
  2. `vip-executive-majlis-clearance` (Private Executive Majlis Accelerated Processing)
  3. `vip-corporate-mass-screening` (On-Site Corporate Workforce Health Screening)
- **Acceptance Criteria:**
  - Define the Mobile Medical Unit as an authorized screening vehicle operating under Dubai Health / Salem standards.
  - Detail optional logistics tariffs separate from statutory medical tests.

---

## 7. Approval & Execution Flow

```
+-----------------------------------------------------------------------------------+
|                           PHASE 1: COMPLIANCE SANITIZATION                       |
|  - Eradicate "Zero Rejection Guarantee" & "Guaranteed Approval" across all files |
|  - Re-attribute Ejari to Dubai Land Department (DLD/RERA) in all references       |
|  - Establish KBC/ESS as Authorized Private Center in headers, footers & metadata  |
+---------------------------------------------------------+-------------------------+
                                                          |
                                                          v
+-----------------------------------------------------------------------------------+
|                        PHASE 2: EVIDENCE & SLA INTEGRATION                       |
|  - Populate verified statutory fee breakdowns + typing fee + VAT across data      |
|  - Qualify 2h / 6h / 24h SLAs to laboratory processing under DHA Salem             |
|  - Add detailed statutory warranties for Tadbeer and activity bounds for DET      |
+---------------------------------------------------------+-------------------------+
                                                          |
                                                          v
+-----------------------------------------------------------------------------------+
|                       PHASE 3: TECHNICAL SCHEMA & LINK WIRING                    |
|  - Update index.html JSON-LD to ProfessionalService / LocalBusiness               |
|  - Add officialGovUrl fields to ServiceItem data models                           |
|  - Render outbound verification link with ExternalLink icon on all 89 pages       |
|  - Audit canonicals, OpenGraph tags, and breadcrumbs                              |
+-----------------------------------------------------------------------------------+
```

**Next Step:** Awaiting user explicit authorization to execute Phase 1, Phase 2, and Phase 3 code implementations.
