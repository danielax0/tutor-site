import ContactForm from "@/components/ContactForm";
import StudyBuddyMascot from "@/components/StudyBuddyMascot";
import SubjectBadge from "@/components/SubjectBadge";
import { BookOpen, CheckCircle2, GraduationCap, Languages, Mail, Phone } from "lucide-react";
import homeData from "../content/home.json";

const Index = () => {
  // Map strings to their respective icons
  const iconMap: Record<string, any> = {
    "Mathematics": BookOpen,
    "French": Languages,
    "English": GraduationCap,
  };

  const subjects = homeData.subjects.map(name => ({
    name,
    icon: iconMap[name] || BookOpen // Fallback icon
  }));

  return (
    <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm animate-fade-in">
          <div className="container max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Logo + Title */}
            <div className="flex items-center gap-3">
                <img
                    src={homeData.nav.logoUrl}
                    alt="Logo"
                    className="w-15 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-center md:text-left">
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                        {homeData.nav.name}
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">
                        {homeData.nav.title}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {subjects.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium transition-colors hover:bg-primary/10 cursor-default"
                >
                  <subject.icon className="w-4 h-4 text-secondary" />
                  <span>{subject.name}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative animate-fade-in bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: copy */}
              <div className="text-center lg:text-left">
                <p className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                  {homeData.hero.eyebrow}
                </p>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                  {homeData.hero.headline}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {homeData.hero.subhead}
                </p>
                <a
                  href={homeData.cta.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  {homeData.hero.ctaText}
                </a>
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                  {homeData.hero.trustPills.map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border/70 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {pill}
                    </span>
                  ))}
                </div>
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
      <main>

        {/* Meet Daniel Section */}
        <section className="py-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center md:text-left">
            {homeData.meetDaniel.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

            {/* Left: photo */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
              <img
                src={homeData.meetDaniel.photoUrl}
                alt={homeData.meetDaniel.photoAlt}
                loading="lazy"
                className="relative w-full h-full min-h-[400px] object-cover rounded-2xl shadow-elevated border border-border/50"
              />
            </div>

            {/* Right: stacked cards */}
            <div className="flex flex-col gap-6 h-full">

              {/* Intro card */}
              <div className="flex-1 bg-card rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-2xl font-semibold mb-3 flex items-center gap-2 text-primary">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  {homeData.meetDaniel.intro.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {homeData.meetDaniel.intro.text}
                </p>
              </div>

              {/* Philosophy card */}
              <div className="flex-1 bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    {homeData.meetDaniel.philosophy.emoji}
                  </span>
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
        <section className="py-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-bl from-card to-muted/30 rounded-2xl p-8 md:p-10 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                {homeData.background.emoji}
              </span>
              {homeData.background.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {homeData.background.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {homeData.credentials.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-foreground text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
         </div>
        </section>

        {/* Personal Touch Section */}
        <section className="py-12 bg-gradient-to-b from-background to-muted/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:border-primary/30">
            <span
              aria-hidden="true"
              className="block font-heading text-6xl md:text-7xl text-secondary leading-none mb-0 text-center md:text-left"
            >
              &ldquo;
            </span>
            <p className="-mt-4 text-foreground leading-relaxed text-lg md:text-xl italic text-center md:text-left border-l-4 border-secondary pl-6">
              {homeData.personalTouch.quote}
            </p>
            <p className="mt-6 text-base md:text-lg font-medium text-muted-foreground text-center md:text-left border-l-4 border-transparent pl-6">
              — {homeData.personalTouch.author}
            </p>
          </div>
         </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {homeData.contact.title}
          </h2>
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50 max-w-2xl mx-auto">
            <ContactForm />
          </div>
         </div>
        </section>

        {/* Calendly Booking Section */}
        <section id="cta" className="pt-8 pb-16 bg-gradient-to-b from-background to-secondary/10 animate-fade-in" style={{ animationDelay: "0.7s" }}>
         <div className="container max-w-6xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 md:p-14 text-center shadow-elevated overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />
            <h3 className="font-feature text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 relative z-10">
              {homeData.cta.title}
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg md:text-xl font-display font-semibold tracking-tight relative z-10">
              {homeData.cta.subtitle}
            </p>
            <a
              href={homeData.cta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-10 py-5 rounded-xl font-semibold text-lg hover:bg-secondary/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-secondary/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              {homeData.cta.buttonText}
            </a>
          </div>
         </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
            <a
              href={`mailto:${homeData.footer.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium">{homeData.footer.email}</span>
            </a>
            <a
              href={`tel:${homeData.footer.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{homeData.footer.phoneDisplay}</span>
            </a>
            <a
              href={homeData.footer.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
