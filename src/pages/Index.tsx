import ContactForm from "@/components/ContactForm";
import SubjectBadge from "@/components/SubjectBadge";
import { BookOpen, GraduationCap, Languages } from "lucide-react";
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
                        className="w-10 h-10 rounded-full object-cover"
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

        {/* Video Introduction Section */}
        <section className="container max-w-4xl mx-auto px-6 py-10 md:py-16 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 text-center tracking-tight">
                {homeData.video.title}
            </h2>
            <div className="relative group mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-card rounded-xl overflow-hidden shadow-elevated border border-border/50">
                    <iframe
                        className="w-full aspect-video"
                        src={homeData.video.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Section - Bento Box Style */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center md:text-left">
              {homeData.about.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1: Intro */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 relative overflow-hidden group transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 md:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-heading text-2xl font-semibold mb-3 text-primary">{homeData.about.card1.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {homeData.about.card1.text}
                </p>
              </div>

              {/* Card 2: Philosophy */}
              <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">{homeData.about.card2.emoji}</span>
                  {homeData.about.card2.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {homeData.about.card2.text}
                </p>
              </div>

              {/* Card 3: Background */}
              <div className="bg-gradient-to-bl from-card to-muted/30 rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">{homeData.about.card3.emoji}</span>
                  {homeData.about.card3.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {homeData.about.card3.text}
                </p>
              </div>

              {/* Card 4: Personal Touch */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 md:col-span-2 transition-all duration-300 hover:shadow-elevated hover:border-primary/30 group">
                <p className="text-foreground leading-relaxed text-lg italic text-center md:text-left border-l-4 border-secondary pl-4">
                  {homeData.about.card4.quote}
                </p>
              </div>

            </div>
          </section>

          {/* Contact Form Section */}
          <section className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
              {homeData.contact.title}
            </h2>
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50">
              <ContactForm />
            </div>
          </section>
        </div>

        {/* Calendly Booking Section */}
        <section className="lg:col-span-2 mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 md:p-14 text-center shadow-elevated overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 relative z-10">
              {homeData.cta.title}
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg md:text-xl font-light relative z-10">
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
              <span className="font-medium">{homeData.footer.email}</span>
            </a>
            <a
              href={`tel:${homeData.footer.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
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
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} {homeData.footer.copyrightName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

  );
};

export default Index;
