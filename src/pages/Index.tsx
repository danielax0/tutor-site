import ContactForm from "@/components/ContactForm";
import SubjectBadge from "@/components/SubjectBadge";
import { BookOpen, GraduationCap, Languages } from "lucide-react";

const Index = () => {
  const subjects = [
    { name: "Mathematics", icon: BookOpen },
    { name: "French", icon: Languages },
    { name: "English", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="gradient-hero text-primary-foreground py-16 px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Sarah Mitchell
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Personal Tutor
          </p>
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
              >
                <subject.icon className="w-4 h-4" />
                <span className="font-medium">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Section */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Me
            </h2>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <p className="text-muted-foreground leading-relaxed text-lg">
                With over 10 years of experience in education, I am passionate about helping students achieve their academic goals. I specialize in Mathematics, French, and English, offering personalized tutoring sessions tailored to each student's unique learning style.
                <br /><br />
                My teaching philosophy centers on building strong foundations while making learning enjoyable and engaging. Whether you're preparing for exams, need help with homework, or want to advance your language skills, I'm here to guide you every step of the way.
                <br /><br />
                I hold a Master's degree in Education and have worked with students of all ages, from elementary school to university level. My goal is to not only help you succeed academically but also to instill a lifelong love of learning.
              </p>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border">
              <ContactForm />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container max-w-6xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            © {new Date().getFullYear()} Sarah Mitchell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
