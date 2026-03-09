import ContactForm from "@/components/ContactForm";
import SubjectBadge from "@/components/SubjectBadge";
import { BookOpen, GraduationCap, Languages } from "lucide-react";
import StudyBuddyMascot from "@/components/StudyBuddyMascot";

const Index = () => {
  const subjects = [
    { name: "Mathematics", icon: BookOpen },
    { name: "French", icon: Languages },
    { name: "English", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm animate-fade-in">
        <div className="container max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Daniel Axentii
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              Personal Tutor
            </p>
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
          Meet Your Tutor
        </h2>
        <div className="relative group mx-auto">
          <div className="absolute -inset-1  from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-card rounded-xl overflow-hidden shadow-elevated border border-border/50">

            <video
              className="w-full aspect-video object-cover"
              controls
              poster=""
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Mobile-only quick intro */}
      <section className="container max-w-4xl mx-auto px-6 pt-2 pb-10 md:hidden">
        <a href="#contactform" className="block">
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="shrink-0">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/90 to-secondary shadow-lg" />
              <svg
                viewBox="0 0 80 80"
                className="relative z-10 w-16 h-16 text-primary-foreground"
                aria-hidden="true"
              >
                  <rect x="12" y="10" width="48" height="60" rx="12" fill="white" />
                  <rect x="16" y="16" width="40" height="6" rx="3" fill="#e5e7eb" />
                  <circle cx="30" cy="34" r="5" fill="#0f172a" />
                  <circle cx="46" cy="34" r="5" fill="#0f172a" />
                  <circle cx="28" cy="32" r="2" fill="#facc15" />
                  <circle cx="44" cy="32" r="2" fill="#facc15" />
                  <path
                      d="M26 48c4 4 10 4 14 0"
                      stroke="#0f172a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                  />
                  <path
                      d="M10 50c6 4 10 10 12 18"
                      stroke="#0f172a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                  />
                  <path
                      d="M58 50c-4 6-6 12-6 18"
                      stroke="#0f172a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                  />
              </svg>
            </div>
          </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
                Learning on the go?
              </h2>
              <p className="text-muted-foreground text-sm">
                Tap here to jump straight to the contact section and book your free call.
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Section - Bento Box Style */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center md:text-left">
              About Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1: Intro */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 relative overflow-hidden group transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 md:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-heading text-2xl font-semibold mb-3 text-primary">Academic Excellence</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  With over 4 years of experience tutoring, I am passionate about helping students achieve their academic goals. I specialize in Mathematics, French, and English, offering personalized tutoring sessions tailored to each student's unique learning style.
                </p>
              </div>

              {/* Card 2: Philosophy */}
              <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">🌱</span>
                  Teaching Philosophy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  My teaching philosophy centers on building strong foundations while making learning enjoyable. I help students at any level—whether improving grades, conquering homework, or deeply grasping concepts.
                </p>
              </div>

              {/* Card 3: Background */}
              <div className="bg-gradient-to-bl from-card to-muted/30 rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">🎓</span>
                  Background
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Currently studying finance at a top university in Canada, I've worked with students from elementary to university level. My goal isn't just academic success, but instilling a lifelong love of learning.
                </p>
              </div>

              {/* Card 4: Personal Touch */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 md:col-span-2 transition-all duration-300 hover:shadow-elevated hover:border-primary/30 group">
                <p className="text-foreground leading-relaxed text-lg italic text-center md:text-left border-l-4 border-secondary pl-4">
                  "Growing up I had many tutors of my own, so I have a deep understanding of what it means to be a student. I use my direct knowledge of teaching to make sure my students understand concepts, and achieve their true potential."
                </p>
              </div>

            </div>
          </section>

          {/* Contact Form Section */}
          <section className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
              Get in Touch
            </h2>
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50">
              <ContactForm />
            </div>
          </section>
        </div>

        {/* Calendly Booking Section */}
        <section id={"contactform"} className="lg:col-span-2 mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 md:p-14 text-center shadow-elevated overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 relative z-10">
              Ready to Get Started?
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg md:text-xl font-light relative z-10">
              Book a free introductory call to discuss your learning goals and see if we're a good fit.
            </p>
            <a
              href="https://calendly.com/danielaxentii/phone-call"
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
              Schedule a Free Call
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
            <a
              href="mailto:daxentii57@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-medium">daxentii57@gmail.com</span>
            </a>
            <a
              href="tel:+14372288921"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-medium">+1 (437) 228-8921</span>
            </a>
            <a
              href="https://share.google/lmPB4WW9TO7KWJUX2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-medium">Google Business Profile</span>
            </a>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Daniel Axentii. All rights reserved.
          </p>
        </div>
      </footer>

      <StudyBuddyMascot />
    </div>
  );
};

export default Index;
