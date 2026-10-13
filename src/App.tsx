import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AnimatePresence, MotionConfig, animate, motion, useInView, useScroll, useTransform, type Variants,
} from "motion/react";
import {
  ABDELLAHI_WA, CLINIC_PHONE, CLINIC_WA, GEO, PORTFOLIO, RATING, REVIEWS, SERVICES, T,
  type IconName, type Lang, type Strings,
} from "./content";

// Apple-style easing: fast start, long soft landing.
const EASE = [0.22, 1, 0.36, 1] as const;
const tel = `tel:${CLINIC_PHONE.replace(/\s/g, "")}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const M = as === "section" ? motion.section : motion.div;
  return (
    <M className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </M>
  );
}

const ICONS: Record<IconName | "star" | "wheelchair" | "check" | "phone" | "whatsapp" | "pin", ReactNode> = {
  heart: <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />,
  steth: <><path d="M6 3v6a6 6 0 0 0 12 0V3M12 15v3a3 3 0 0 0 6 0v-1" /><circle cx="18" cy="15" r="2" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" /><path d="M7.5 15h9" /></>,
  bed: <><path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  syringe: <path d="m18 2 4 4M17 7l3-3M19 9 9 19l-4 1 1-4L16 6Z" />,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="3" /><path d="M8 2v4M16 2v4M3 10h18M9 15l2 2 4-4" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.8 6.6 19.6l1.1-6L3.2 9.4l6.1-.8Z" />,
  wheelchair: <><circle cx="12" cy="4.5" r="1.8" /><path d="M12 7v7h5l2 5M12 10H8m-1 2a5 5 0 1 0 6 6" /></>,
  check: <path d="m5 12 5 5 9-10" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  whatsapp: <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.3 3.2Z M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a5 5 0 0 1-2.6-2.6l.9-1-1-2.2Z" />,
  pin: <><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11Z" /><circle cx="12" cy="10" r="2.2" /></>,
};

function Icon({ name, size = 20, fill = false, className }: { name: keyof typeof ICONS; size?: number; fill?: boolean; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} fill className={i <= Math.round(value) ? "" : "off"} />
      ))}
    </span>
  );
}

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.6, ease: EASE,
      onUpdate: (v) => { el.textContent = v.toFixed(decimals); },
    });
    return () => controls.stop();
  }, [inView, to, decimals]);
  return <span ref={ref} dir="ltr">{(0).toFixed(decimals)}</span>;
}

const Btn = motion.a;
const press = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { type: "spring", stiffness: 400, damping: 25 } } as const;

function Header({ t, onLang }: { t: Strings; onLang: () => void }) {
  const ids = ["services", "rdv", "avis", "acces"];
  return (
    <header>
      <div className="wrap nav">
        <a href="#top" className="brand">
          <span className="mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="#fff" /></svg>
          </span>
          <span>{t.name}<small>{t.city}</small></span>
        </a>
        <nav className="links" aria-label="Navigation">
          {t.nav.map((label, i) => <a key={ids[i]} href={`#${ids[i]}`}>{label}</a>)}
        </nav>
        <motion.button {...press} className="lang" type="button" onClick={onLang}>{t.langBtn}</motion.button>
        <Btn {...press} className="btn btn-primary btn-sm btn-call" href={tel}>{t.call}</Btn>
      </div>
    </header>
  );
}

function Hero({ t, lang }: { t: Strings; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { wd: new Intl.DateTimeFormat(t.locale, { weekday: "short" }).format(d), n: d.getDate() };
  });
  const words = [...t.h1a.split(" ").map((w) => ({ w, gold: false })), ...t.h1b.split(" ").map((w) => ({ w, gold: true }))];

  return (
    <div className="hero-band" ref={ref}>
      <svg className="pattern" aria-hidden="true" width="100%" height="100%">
        <defs>
          <pattern id="star" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M32 6l7.5 18.5L58 32l-18.5 7.5L32 58l-7.5-18.5L6 32l18.5-7.5z M32 18l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="none" stroke="#fff" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star)" />
      </svg>
      <motion.div className="glow" aria-hidden="true"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

      <div className="wrap hero">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Icon name="pin" size={16} /> {t.eyebrow}
          </motion.span>
          <h1 key={lang}>
            {words.map(({ w, gold }, i) => (
              <Fragment key={i}>
                {i === t.h1a.split(" ").length && <br />}
                <span className="word">
                  <motion.span className={gold ? "gold" : undefined}
                    initial={{ y: "110%" }} animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.07 }}>
                    {w}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}>
            {t.lead}
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}>
            <Btn {...press} className="btn btn-primary" href="#rdv">{t.book}</Btn>
            <Btn {...press} className="btn btn-ghost" href={tel}><Icon name="phone" size={17} /><span dir="ltr">{CLINIC_PHONE}</span></Btn>
          </motion.div>
          <motion.div className="trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            <span><Stars value={5} size={15} /> {t.trustRating}</span>
            <span><Icon name="wheelchair" size={18} /> {t.trustAccess}</span>
          </motion.div>
        </motion.div>

        <motion.div className="card-stack" aria-hidden="true" style={{ y: cardY, rotate: cardRotate }}>
          <motion.div className="card-demo"
            initial={{ opacity: 0, y: 60, rotateX: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.35 }}>
            <h3>{t.cardTitle}</h3>
            <div className="slot-day">
              {days.map((d, i) => (
                <motion.div key={i} className={i === 1 ? "on" : undefined}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.7 + i * 0.06 }}>
                  {d.wd}<b>{d.n}</b>
                </motion.div>
              ))}
            </div>
            <div className="slots">
              {["09:00", "10:30", "12:00", "16:30"].map((s) => <span key={s} className={s === "10:30" ? "on" : undefined}>{s}</span>)}
            </div>
            <div className="wa-preview"><Icon name="whatsapp" size={22} className="wa-ic" /><div>{t.cardWa}</div></div>
          </motion.div>
          <motion.div className="toast"
            animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }}
            transition={{ duration: 5, times: [0, 0.12, 0.85, 1], repeat: Infinity, repeatDelay: 1.5, delay: 1.6 }}>
            <span className="dot"><Icon name="check" size={18} /></span>
            <span>{t.toast}<small>{t.toastSub}</small></span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Stats({ t }: { t: Strings }) {
  return (
    <div className="wrap">
      <motion.div className="stats" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <motion.div variants={fadeUp}><b><Counter to={RATING.avg} decimals={1} /><Icon name="star" size={22} fill className="gold-ic" /></b><span>{t.stats[0]}</span></motion.div>
        <motion.div variants={fadeUp}><b><Counter to={RATING.count} /></b><span>{t.stats[1]}</span></motion.div>
        <motion.div variants={fadeUp}><b><Counter to={RATING.dist[0]} /></b><span>{t.stats[2]}</span></motion.div>
        <motion.div variants={fadeUp}><b><Icon name="wheelchair" size={28} className="teal-ic" /></b><span>{t.stats[3]}</span></motion.div>
      </motion.div>
    </div>
  );
}

function Services({ t, lang }: { t: Strings; lang: Lang }) {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="sec-head"><h2>{t.svcTitle}</h2><span className="note">{t.svcNote}</span></Reveal>
        <motion.div className="services" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {SERVICES.map((s) => (
            <motion.article key={s.icon} className="svc" variants={fadeUp}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
              <div className="ic"><Icon name={s.icon} size={22} /></div>
              <h3>{s[lang][0]}</h3>
              <p>{s[lang][1]}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Booking({ t, lang }: { t: Strings; lang: Lang }) {
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("name") || !get("phone") || !get("date")) { setError(t.fErr); return; }
    setError("");
    const lines = [t.waHello, "", `${t.waName} : ${get("name")}`, `${t.waPhone} : ${get("phone")}`,
      `${t.waSvc} : ${get("svc")}`, `${t.waDate} : ${get("date")}`];
    if (get("msg")) lines.push(`${t.waMsg} : ${get("msg")}`);
    window.open(`https://wa.me/${CLINIC_WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  }

  return (
    <section id="rdv" className="tight">
      <div className="wrap">
        <Reveal className="booking">
          <div>
            <h2>{t.bkTitle}</h2>
            <p className="intro">{t.bkIntro}</p>
            <motion.ol className="steps" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {t.steps.map((s, i) => (
                <motion.li key={s} variants={fadeUp}><span className="n">{i + 1}</span><span>{s}</span></motion.li>
              ))}
            </motion.ol>
          </div>
          <form onSubmit={submit} noValidate>
            <div className="field"><label htmlFor="f-name">{t.fName}</label><input id="f-name" name="name" autoComplete="name" required /></div>
            <div className="field"><label htmlFor="f-phone">{t.fPhone}</label><input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required /></div>
            <div className="field"><label htmlFor="f-svc">{t.fSvc}</label>
              <select id="f-svc" name="svc">
                {SERVICES.map((s) => <option key={s.icon}>{s[lang][0]}</option>)}
                <option>{t.fUnsure}</option>
              </select>
            </div>
            <div className="field"><label htmlFor="f-date">{t.fDate}</label><input id="f-date" name="date" type="date" min={today} required /></div>
            <div className="field full"><label htmlFor="f-msg">{t.fMsg}</label><textarea id="f-msg" name="msg" /></div>
            <AnimatePresence>
              {error && (
                <motion.p className="form-err" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button {...press} className="btn btn-wa" type="submit"><Icon name="whatsapp" size={20} />{t.fSend}</motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews({ t, lang }: { t: Strings; lang: Lang }) {
  const max = RATING.count;
  return (
    <section id="avis" className="tight">
      <div className="wrap">
        <Reveal className="sec-head"><h2>{t.rvTitle}</h2></Reveal>
        <div className="reviews">
          <Reveal className="score">
            <div className="big"><Counter to={RATING.avg} decimals={1} /></div>
            <Stars value={RATING.avg} size={18} />
            <div className="sub">{t.rvSub}</div>
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div className="bar" key={star}>
                <span>{star}</span>
                <i><motion.em initial={{ width: 0 }} whileInView={{ width: `${(RATING.dist[i] / max) * 100}%` }}
                  viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.08 }} /></i>
                <span>{RATING.dist[i]}</span>
              </div>
            ))}
          </Reveal>
          <div>
            <motion.div className="quotes" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {REVIEWS.map((r) => (
                <motion.figure key={r.name} className="quote" variants={fadeUp}>
                  <Stars value={r.stars} />
                  <p>{r[lang]}</p>
                  <footer><span>{r.name}</span><span>{r.when[lang]}</span></footer>
                </motion.figure>
              ))}
            </motion.div>
            <p className="src">{t.rvSrc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Access({ t }: { t: Strings }) {
  return (
    <section id="acces" className="tight">
      <div className="wrap access">
        <Reveal className="info">
          <h2>{t.acTitle}</h2>
          <dl>
            <div><dt>{t.acAddrL}</dt><dd>{t.acAddr}</dd></div>
            <div><dt>{t.acPhoneL}</dt><dd><a href={tel} dir="ltr">{CLINIC_PHONE}</a></dd></div>
            <div><dt>{t.acHoursL}</dt><dd>{t.acHours}</dd></div>
            <div><dt>{t.acA11yL}</dt><dd>{t.acA11y}</dd></div>
          </dl>
          <Btn {...press} className="btn btn-primary" target="_blank" rel="noopener"
            href={`https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`}>
            <Icon name="pin" size={18} />{t.acDir}
          </Btn>
        </Reveal>
        <Reveal className="map">
          <iframe title="Clinique Attewvigh" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${GEO.lat},${GEO.lng}&z=16&output=embed`} />
        </Reveal>
      </div>
    </section>
  );
}

function Pro({ t }: { t: Strings }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <section id="pro" className="tight">
      <div className="wrap">
        <div className="pro" ref={ref}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.span className="tag" variants={fadeUp}>{t.proTag}</motion.span>
            <motion.h2 variants={fadeUp}>{t.proTitle}</motion.h2>
            <motion.p className="intro" variants={fadeUp}>{t.proIntro}</motion.p>
            <motion.ul className="feat" variants={stagger}>
              {t.feat.map((f) => <motion.li key={f} variants={fadeUp}><Icon name="check" size={14} className="feat-ic" />{f}</motion.li>)}
            </motion.ul>
            <motion.div variants={fadeUp}>
              <Btn {...press} className="btn btn-wa" target="_blank" rel="noopener"
                href={`https://wa.me/${ABDELLAHI_WA}?text=${encodeURIComponent(t.proMsg)}`}>
                <Icon name="whatsapp" size={20} />{t.proCta}
              </Btn>
            </motion.div>
          </motion.div>

          <div className="dash-stage">
            <motion.div className="dash" style={{ scale, rotateX, opacity }}>
              <div className="dash-top"><i /><i /><i /><span>{t.dashTitle}</span><em>{t.dashNote}</em></div>
              <div className="dash-kpis">
                <div><b><Counter to={12} /></b><span>{t.kpis[0]}</span></div>
                <div><b><Counter to={3} /></b><span>{t.kpis[1]}</span></div>
                <div><b><Counter to={48} /></b><span>{t.kpis[2]}</span></div>
              </div>
              <table>
                <thead><tr>{t.th.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <motion.tbody variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
                  {t.rows.map(([name, time, svc, status]) => (
                    <motion.tr key={name} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}>
                      <td>{name}</td><td dir="ltr">{time}</td><td>{svc}</td>
                      <td><span className={`pill ${status}`}>{status === "ok" ? t.ok : t.wait}</span></td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem("attewvigh-lang") as Lang) || "ar"; } catch { return "ar"; }
  });
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("attewvigh-lang", lang); } catch { /* private mode */ }
  }, [lang]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="demo"><b>{t.demoStrong}</b> {t.demoRest}</div>
      <Header t={t} onLang={() => setLang(lang === "ar" ? "fr" : "ar")} />
      <AnimatePresence mode="wait">
        <motion.div key={lang} initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }} transition={{ duration: 0.35, ease: EASE }}>
          <main id="top">
            <Hero t={t} lang={lang} />
            <Stats t={t} />
            <Services t={t} lang={lang} />
            <Booking t={t} lang={lang} />
            <Reviews t={t} lang={lang} />
            <Access t={t} />
            <Pro t={t} />
            <div className="wrap">
              <Reveal className="final">
                <h2>{t.fnTitle}</h2>
                <p>{t.fnText}</p>
                <div className="cta-row">
                  <Btn {...press} className="btn btn-primary" href="#rdv">{t.book}</Btn>
                  <Btn {...press} className="btn btn-ghost" href={tel}>{t.call}</Btn>
                </div>
              </Reveal>
            </div>
          </main>
          <div className="wrap">
            <footer className="site">
              <span>{t.ftCopy}</span>
              <span>{t.ftBy} <a href={PORTFOLIO} target="_blank" rel="noopener">Abdellahi Ahmed</a></span>
            </footer>
          </div>
        </motion.div>
      </AnimatePresence>
      <nav className="mbar" aria-label="Actions">
        <a className="btn btn-ghost" href={tel}><Icon name="phone" size={17} />{t.call}</a>
        <a className="btn btn-wa" href="#rdv">{t.book}</a>
      </nav>
    </MotionConfig>
  );
}
