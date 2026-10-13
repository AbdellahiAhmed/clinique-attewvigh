export type Lang = "ar" | "fr";

export const CLINIC_PHONE = "+222 26 30 45 79";
export const CLINIC_WA = "22226304579";
export const ABDELLAHI_WA = "22243638670";
export const PORTFOLIO = "https://abdellahiahmed.vercel.app/#projects";
export const GEO = { lat: 18.091015, lng: -15.996209 };

// Real Google Maps figures (Oct 2026): 4.3 average, 16 reviews.
export const RATING = { avg: 4.3, count: 16, dist: [9, 4, 2, 0, 1] as const };

export type IconName = "heart" | "steth" | "flask" | "bed" | "syringe" | "calendar";

export const SERVICES: { icon: IconName; ar: [string, string]; fr: [string, string] }[] = [
  { icon: "heart", ar: ["استشارات متخصصة", "مع أطباء أخصائيين في عدة تخصصات."], fr: ["Consultations spécialisées", "Avec des médecins spécialistes dans plusieurs disciplines."] },
  { icon: "steth", ar: ["الطب العام", "فحص وتشخيص ومتابعة لجميع أفراد الأسرة."], fr: ["Médecine générale", "Examen, diagnostic et suivi pour toute la famille."] },
  { icon: "flask", ar: ["التحاليل الطبية", "نتائج سريعة وموثوقة."], fr: ["Analyses médicales", "Des résultats rapides et fiables."] },
  { icon: "bed", ar: ["الاستشفاء", "إقامة مريحة ورعاية تمريضية مستمرة."], fr: ["Hospitalisation", "Un séjour confortable et des soins infirmiers continus."] },
  { icon: "syringe", ar: ["العلاجات التمريضية", "حقن، ضمادات، ومتابعة الضغط والسكري."], fr: ["Soins infirmiers", "Injections, pansements, suivi tension et glycémie."] },
  { icon: "calendar", ar: ["المتابعة بعد العلاج", "مواعيد مراقبة وتذكير عبر واتساب."], fr: ["Suivi après traitement", "Rendez-vous de contrôle et rappels sur WhatsApp."] },
];

// Real public Google reviews: original Arabic + French translation.
export const REVIEWS = [
  {
    name: "Med Lemin", stars: 5, when: { ar: "منذ 4 سنوات", fr: "il y a 4 ans" },
    ar: "عيادة التوفيق عيادة مثالية فيها مجموعة من النخبة الأطباء المتميزين ونسأل الله لهم التوفيق والسداد",
    fr: "La clinique Attewvigh est un établissement exemplaire, avec une équipe de médecins d'élite. Que Dieu leur accorde réussite et sagesse.",
  },
  {
    name: "الحمد لله رب العالمين", stars: 5, when: { ar: "منذ 8 أشهر", fr: "il y a 8 mois" },
    ar: "عيادة جيدة وموفقة بإذن الله",
    fr: "Une bonne clinique, et prospère si Dieu le veut.",
  },
  {
    name: "Lemaadel Ahmedou", stars: 4, when: { ar: "منذ 3 سنوات", fr: "il y a 3 ans" },
    ar: "ماشاءالله خدمات سريعة",
    fr: "Masha'Allah, un service rapide.",
  },
];

export const T = {
  ar: {
    demoStrong: "نسخة تجريبية", demoRest: "مقترحة لمصحة التوفيق — المحتوى قابل للتعديل معكم",
    name: "مصحة التوفيق", city: "نواكشوط",
    nav: ["الخدمات", "المواعيد", "آراء المرضى", "الموقع"],
    call: "اتصل بنا", book: "احجز موعدًا",
    eyebrow: "مصحة التوفيق · نواكشوط",
    h1a: "رعاية طبية متخصصة،", h1b: "قريبة منكم",
    lead: "فريق من الأطباء الأخصائيين في خدمتكم. احجزوا موعدكم عبر واتساب في أقل من دقيقة.",
    trustRating: "4.3 على Google · 16 تقييمًا", trustAccess: "مدخل وموقف مهيآن للكراسي المتحركة",
    cardTitle: "اختر موعدك", cardWa: "تم إرسال طلبك إلى المصحة عبر واتساب. سنؤكد موعدك قريبًا.",
    toast: "طلب موعد جديد", toastSub: "عبر واتساب · منذ لحظات",
    stats: ["التقييم على Google", "تقييمًا من المرضى", "تقييمات بخمس نجوم", "مهيأة للكراسي المتحركة"],
    svcTitle: "خدماتنا", svcNote: "قائمة أولية — نعدّلها حسب تخصصاتكم",
    bkTitle: "احجز موعدك عبر واتساب",
    bkIntro: "املأ الاستمارة وسيُفتح واتساب برسالة جاهزة إلى المصحة. بلا انتظار على الهاتف.",
    steps: ["اختر التخصص والتاريخ", "أرسل الطلب عبر واتساب", "تؤكد المصحة موعدك"],
    fName: "الاسم الكامل", fPhone: "رقم الهاتف", fSvc: "التخصص", fDate: "التاريخ المفضل",
    fMsg: "ملاحظة (اختياري)", fSend: "إرسال عبر واتساب", fUnsure: "لست متأكدًا",
    fErr: "يرجى إدخال الاسم ورقم الهاتف والتاريخ.",
    waHello: "السلام عليكم، أود حجز موعد في مصحة التوفيق.",
    waName: "الاسم", waPhone: "الهاتف", waSvc: "التخصص", waDate: "التاريخ", waMsg: "ملاحظة",
    rvTitle: "ماذا يقول مرضانا", rvSub: "16 تقييمًا على Google", rvSrc: "تقييمات حقيقية منشورة على خرائط Google.",
    acTitle: "الموقع والوصول",
    acAddrL: "العنوان", acAddr: "32R3+CG3، نواكشوط، موريتانيا",
    acPhoneL: "الهاتف", acHoursL: "أوقات العمل", acHours: "سيتم تأكيدها مع المصحة",
    acA11yL: "إمكانية الوصول", acA11y: "مدخل وموقف مهيآن للكراسي المتحركة",
    acDir: "الاتجاهات على خرائط Google",
    proTag: "للمصحة فقط · ليس جزءًا من الموقع", proTitle: "النسخة الرسمية لموقعكم",
    proIntro: "هذه النسخة التجريبية مبنية على معلوماتكم العامة. النسخة الرسمية تضيف أدوات تُسهّل عملكم اليومي:",
    feat: ["لوحة تحكم لإدارة طلبات المواعيد", "صفحة لكل طبيب وتخصصاته", "تذكير المرضى بمواعيدهم عبر واتساب", "الظهور في نتائج بحث Google", "صوركم وشعاركم وأوقات العمل", "نطاق خاص واستضافة وصيانة"],
    proCta: "ناقش النسخة الرسمية مع عبد الله",
    proMsg: "السلام عليكم عبد الله، رأيت النسخة التجريبية لموقع مصحة التوفيق وأود مناقشة النسخة الرسمية.",
    dashTitle: "لوحة المواعيد", dashNote: "بيانات توضيحية",
    kpis: ["طلبات اليوم", "بانتظار التأكيد", "هذا الأسبوع"],
    th: ["المريض", "الموعد", "التخصص", "الحالة"],
    rows: [["مريم", "09:00", "الطب العام", "ok"], ["محمد", "10:30", "استشارة متخصصة", "wait"], ["فاطمة", "11:15", "التحاليل الطبية", "ok"], ["أحمد", "16:30", "المتابعة", "wait"]],
    ok: "مؤكد", wait: "بانتظار",
    fnTitle: "صحتكم أمانة لدينا", fnText: "احجزوا موعدكم الآن أو اتصلوا بنا مباشرة. فريقنا في خدمتكم.",
    ftCopy: "© مصحة التوفيق — نواكشوط", ftBy: "تصميم وتطوير:",
    langBtn: "Français", locale: "ar-MR",
  },
  fr: {
    demoStrong: "Maquette", demoRest: "proposée à la Clinique Attewvigh — contenu à valider ensemble",
    name: "Clinique Attewvigh", city: "Nouakchott",
    nav: ["Services", "Rendez-vous", "Avis", "Accès"],
    call: "Appeler", book: "Prendre rendez-vous",
    eyebrow: "Clinique Attewvigh · Nouakchott",
    h1a: "Des soins spécialisés,", h1b: "près de chez vous",
    lead: "Une équipe de médecins spécialistes à votre service. Réservez votre rendez-vous sur WhatsApp en moins d'une minute.",
    trustRating: "4,3 sur Google · 16 avis", trustAccess: "Entrée et parking accessibles en fauteuil roulant",
    cardTitle: "Choisissez votre créneau", cardWa: "Votre demande a été envoyée à la clinique sur WhatsApp. Nous confirmons votre rendez-vous très vite.",
    toast: "Nouvelle demande de rendez-vous", toastSub: "via WhatsApp · à l'instant",
    stats: ["Note sur Google", "avis de patients", "avis 5 étoiles", "Accessible en fauteuil roulant"],
    svcTitle: "Nos services", svcNote: "Liste indicative — à adapter à vos spécialités",
    bkTitle: "Réservez sur WhatsApp",
    bkIntro: "Remplissez le formulaire : WhatsApp s'ouvre avec un message prêt à envoyer à la clinique. Plus d'attente au téléphone.",
    steps: ["Choisissez la spécialité et la date", "Envoyez la demande sur WhatsApp", "La clinique confirme votre rendez-vous"],
    fName: "Nom complet", fPhone: "Téléphone", fSvc: "Spécialité", fDate: "Date souhaitée",
    fMsg: "Message (facultatif)", fSend: "Envoyer sur WhatsApp", fUnsure: "Je ne sais pas",
    fErr: "Merci d'indiquer votre nom, votre téléphone et la date.",
    waHello: "Bonjour, je souhaite prendre rendez-vous à la Clinique Attewvigh.",
    waName: "Nom", waPhone: "Téléphone", waSvc: "Spécialité", waDate: "Date", waMsg: "Message",
    rvTitle: "Ce que disent nos patients", rvSub: "16 avis sur Google", rvSrc: "Avis réels publiés sur Google Maps, traduits de l'arabe.",
    acTitle: "Accès & localisation",
    acAddrL: "Adresse", acAddr: "32R3+CG3, Nouakchott, Mauritanie",
    acPhoneL: "Téléphone", acHoursL: "Horaires", acHours: "À confirmer avec la clinique",
    acA11yL: "Accessibilité", acA11y: "Entrée et parking accessibles en fauteuil roulant",
    acDir: "Itinéraire Google Maps",
    proTag: "Pour la clinique · ne fait pas partie du site", proTitle: "La version officielle de votre site",
    proIntro: "Cette maquette est construite à partir de vos informations publiques. La version officielle ajoute des outils qui simplifient votre quotidien :",
    feat: ["Tableau de bord des demandes de rendez-vous", "Une page par médecin et spécialité", "Rappels de rendez-vous aux patients sur WhatsApp", "Visibilité dans les recherches Google", "Vos photos, logo et horaires", "Nom de domaine, hébergement et maintenance"],
    proCta: "Discuter de la version officielle avec Abdellahi",
    proMsg: "Bonjour Abdellahi, j'ai vu la maquette du site de la Clinique Attewvigh et je souhaite discuter de la version officielle.",
    dashTitle: "Rendez-vous", dashNote: "Données d'exemple",
    kpis: ["Demandes aujourd'hui", "À confirmer", "Cette semaine"],
    th: ["Patient", "Heure", "Spécialité", "Statut"],
    rows: [["Mariem", "09:00", "Médecine générale", "ok"], ["Mohamed", "10:30", "Consultation spécialisée", "wait"], ["Fatimetou", "11:15", "Analyses médicales", "ok"], ["Ahmed", "16:30", "Suivi", "wait"]],
    ok: "Confirmé", wait: "En attente",
    fnTitle: "Votre santé, notre engagement", fnText: "Réservez dès maintenant ou appelez-nous directement. Notre équipe est à votre écoute.",
    ftCopy: "© Clinique Attewvigh — Nouakchott", ftBy: "Conception & développement :",
    langBtn: "العربية", locale: "fr-FR",
  },
} as const;

export type Strings = (typeof T)[Lang];
