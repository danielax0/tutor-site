import ContactForm from "@/components/ContactForm";
import StudyBuddyMascot from "@/components/StudyBuddyMascot";
import SubjectBadge from "@/components/SubjectBadge";
import { ArrowRight, BookOpen, Brain, Calculator, Calendar, Clock, DollarSign, GraduationCap, Languages, LineChart, Mail, Menu, MessageCircle, Phone, Receipt, Sigma, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import homeData from "../content/home.json";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 8
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const updateHeight = () => {
      document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ids = ["about", "credentials", "contact", "cta"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const toggleMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen((v) => !v);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "About", href: "#about", icon: User },
    { label: "Credentials", href: "#credentials", icon: GraduationCap },
    { label: "Contact", href: "#contact", icon: MessageCircle },
    { label: "Book a Call", href: "#cta", icon: Calendar },
  ];

  const reachItems = [
    { label: "Email", href: `mailto:${homeData.footer.email}`, icon: Mail, sublabel: homeData.footer.email },
    { label: "Phone", href: `tel:${homeData.footer.phone}`, icon: Phone, sublabel: homeData.footer.phoneDisplay },
  ];

  // Playfair Display's ampersand is an ornate flourish — render "&" in the body font instead
  const plainAmp = (text: string, keyPrefix = "") =>
    text.split("&").flatMap((part, i, arr) =>
      i < arr.length - 1
        ? [part, <span key={`${keyPrefix}amp-${i}`} className="font-body">&</span>]
        : [part]
    );

  // Headline with the highlight word underlined by a hand-drawn orange stroke
  const renderHeadline = (text: string, highlight?: string) => {
    if (!highlight || !text.includes(highlight)) return plainAmp(text);
    const idx = text.indexOf(highlight);
    const before = text.slice(0, idx);
    const after = text.slice(idx + highlight.length);
    return [
      ...plainAmp(before, "b-"),
      <span key="hl" className="relative inline-block">
        {highlight}
        <svg
          aria-hidden="true"
          viewBox="0 0 220 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1 md:-bottom-2 left-0 h-2 md:h-3 w-full text-secondary"
        >
          <path
            d="M3 9 C 60 3, 160 3, 217 8"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>,
      ...plainAmp(after, "a-"),
    ];
  };

  // Map strings to their respective icons
  const iconMap: Record<string, any> = {
    "Mathematics": Calculator,
    "French": Languages,
    "English": Languages,
    "Finance": DollarSign,
    "Accounting": Receipt,
    "Philosophy": Brain,
  };

  const subjects = homeData.subjects.map(name => ({
    name,
    icon: iconMap[name] || BookOpen // Fallback icon
  }));

  const credentialIconMap: Record<string, any> = {
    "Calculus I-V": Sigma,
    "Advanced Finance": LineChart,
    "Accounting": Calculator,
    "English": BookOpen,
    "French": Languages,
    "Philosophy": Brain,
  };

  const credentials = homeData.credentials.items.map((name) => ({
    name,
    icon: credentialIconMap[name] || GraduationCap,
  }));

  return (
    <div className="min-h-screen bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Skip to main content
        </a>
        <nav
          ref={navRef}
          className={`sticky top-0 z-50 w-full transition-all duration-200 animate-fade-in ${
            isScrolled
              ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
              : "bg-background border-b border-transparent"
          }`}
        >
          <div className="container max-w-6xl mx-auto px-6 py-4 flex flex-row items-center justify-between gap-4">

            {/* Logo + Title */}
            <div className="flex items-center gap-3 min-w-0">
                <img
                    src={homeData.nav.logoUrl}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col text-left min-w-0">
                    <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-foreground tracking-tight truncate">
                        {homeData.nav.name}
                    </h1>
                    <p className="text-xs font-medium text-muted-foreground truncate">
                        {homeData.nav.title}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#cta"
                className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              >
                Book a Call
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <div
                onMouseEnter={canHover ? openMenu : undefined}
                onMouseLeave={canHover ? scheduleClose : undefined}
              >
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-controls="primary-menu"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown panel */}
          <div
            id="primary-menu"
            onMouseEnter={canHover ? openMenu : undefined}
            onMouseLeave={canHover ? scheduleClose : undefined}
            className={`absolute left-0 right-0 top-full overflow-hidden bg-background/95 backdrop-blur-lg border-b border-border shadow-lg rounded-b-2xl transition-all duration-200 ease-out ${
              isMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="container max-w-6xl mx-auto px-6 py-6 border-t border-border/60">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Subjects
                </p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject.name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium"
                    >
                      <subject.icon className="w-4 h-4 text-secondary" />
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Navigate
                  </p>
                  <ul className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.href.replace("#", "");
                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={isActive ? "location" : undefined}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted/60 text-foreground"
                            }`}
                          >
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary/15 text-secondary"
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Reach out
                  </p>
                  <ul className="flex flex-col gap-1">
                    {reachItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          <span className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                            <item.icon className="w-4 h-4" />
                          </span>
                          <div className="flex flex-col">
                            <span className="font-medium leading-tight">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.sublabel}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative animate-fade-in">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: copy */}
              <div className="text-center lg:text-left">
                <p className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                  {homeData.hero.eyebrow}
                </p>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.08]">
                  {renderHeadline(homeData.hero.headline, homeData.hero.highlight)}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {homeData.hero.subhead}
                </p>
                <a
                  href={homeData.cta.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex group items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/30"
                >
                  {homeData.hero.ctaText}
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <dl className="mt-10 flex items-stretch divide-x divide-border/60 max-w-md mx-auto lg:mx-0">
                  {homeData.hero.trustStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex-1 flex flex-col items-center lg:items-start px-4 first:pl-0 last:pr-0"
                    >
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-body text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-none">
                        {stat.value}
                      </dd>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-tight text-center lg:text-left">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right: photo */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-50" />
                <img
                  src={homeData.hero.photoUrl}
                  alt={homeData.hero.photoAlt}
                  loading="eager"
                  className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-elevated border border-border/50"
                />
              </div>

            </div>
          </div>
        </section>

      {/* Main Content */}
      <main id="main" tabIndex={-1} className="focus:outline-none">

        {/* Meet Daniel Section */}
        <section id="about" data-reveal className="pt-20 md:pt-24 pb-12" style={{ scrollMarginTop: "var(--nav-h)" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-10 text-center">
            {homeData.meetDaniel.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left: photo */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-3xl blur-xl opacity-50" />
              <img
                src={homeData.meetDaniel.photoUrl}
                alt={homeData.meetDaniel.photoAlt}
                loading="lazy"
                className="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-elevated border border-border/50"
              />
            </div>

            {/* Right: open editorial text */}
            <div className="flex flex-col gap-10">

              <div>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
                  {homeData.meetDaniel.intro.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {homeData.meetDaniel.intro.text}
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
                  {homeData.meetDaniel.philosophy.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {homeData.meetDaniel.philosophy.text}
                </p>
              </div>

            </div>
          </div>
         </div>
        </section>

        {/* Background & Credentials Section */}
        <section id="credentials" data-reveal className="pb-20 md:pb-24" style={{ scrollMarginTop: "var(--nav-h)" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <div>
            <h3 className="font-heading text-3xl md:text-4xl font-semibold mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </span>
              {plainAmp(homeData.background.title)}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {homeData.background.text}
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {credentials.map((cred) => (
                <div
                  key={cred.name}
                  className="flex items-center gap-3 py-3 border-t border-border/50 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                >
                  <span className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <cred.icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <dt className="font-medium text-foreground">{cred.name}</dt>
                </div>
              ))}
            </dl>
          </div>
         </div>
        </section>

        {/* Personal Touch Section */}
        <section data-reveal className="py-16 md:py-20">
         <div className="container max-w-6xl mx-auto px-6">
          <figure className="max-w-3xl mx-auto text-center">
            <span
              aria-hidden="true"
              className="block font-heading text-7xl md:text-8xl text-secondary leading-none"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-heading italic text-2xl md:text-3xl text-foreground leading-snug">
              {homeData.personalTouch.quote}
            </blockquote>
            <figcaption className="mt-6 text-base md:text-lg font-medium text-muted-foreground">
              — {homeData.personalTouch.author}
            </figcaption>
          </figure>
         </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" data-reveal className="py-16 md:py-24" style={{ scrollMarginTop: "var(--nav-h)" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              {homeData.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {homeData.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-5xl mx-auto">

            {/* Info panel */}
            <aside className="lg:col-span-2 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 flex flex-col gap-6">
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-3 flex items-center gap-2 text-primary">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MessageCircle className="w-5 h-5" />
                  </span>
                  {homeData.contact.info.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {homeData.contact.info.intro}
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {homeData.contact.info.replyLabel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {homeData.contact.info.replyHint}
                    </p>
                  </div>
                </li>
                <li>
                  <a
                    href={`mailto:${homeData.footer.email}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary/10">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors break-all">
                        {homeData.footer.email}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${homeData.footer.phone}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary/10">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {homeData.footer.phoneDisplay}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>

              <div>
                <hr className="border-0 border-t-2 border-border -mx-6 md:-mx-8 mb-5" />
                <p className="font-heading text-2xl font-semibold text-primary mb-3">
                  {homeData.contact.info.expect.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {homeData.contact.info.expect.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <hr className="border-0 border-t-2 border-border -mx-6 md:-mx-8 mb-5" />
                <p className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                  {homeData.contact.info.freeLesson.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {homeData.contact.info.freeLesson.note}
                </p>
              </div>

            </aside>

            {/* Form */}
            <div className="lg:col-span-3 bg-card rounded-2xl p-6 md:p-10 shadow-card border border-border/50">
              <ContactForm />
            </div>
          </div>
         </div>
        </section>

        {/* Calendly Booking Section — full-bleed navy band */}
        <section id="cta" data-reveal className="bg-primary py-20 md:py-28" style={{ scrollMarginTop: "var(--nav-h)" }}>
         <div className="container max-w-6xl mx-auto px-6 text-center">
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {homeData.cta.title}
            </h3>
            <p className="text-primary-foreground/85 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              {homeData.cta.subtitle}
            </p>
            <a
              href={homeData.cta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex group items-center gap-3 bg-secondary text-secondary-foreground px-10 py-5 rounded-full font-semibold text-lg hover:bg-secondary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40"
            >
              {homeData.cta.buttonText}
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
         </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
            <a
              href={`mailto:${homeData.footer.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 px-1 py-0.5"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium break-all">{homeData.footer.email}</span>
            </a>
            <a
              href={`tel:${homeData.footer.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 px-1 py-0.5"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{homeData.footer.phoneDisplay}</span>
            </a>
            <a
              href={homeData.footer.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 px-1 py-0.5"
            >
              <span className="font-medium">Google Business Profile</span>
            </a>
          </div>
          <hr className="mb-8 border-t border-border" />
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} {homeData.footer.copyrightName}. All rights reserved.
          </p>
        </div>
      </footer>

      <StudyBuddyMascot />
    </div>

  );
};

export default Index;
