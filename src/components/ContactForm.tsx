import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const FORM_ENDPOINT = "https://formspree.io/f/xlgdnglr";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instructions: "",
    message: "",
    _gotcha: "",
  });

  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required.";
    if (!EMAIL_RE.test(value)) return "Please enter a valid email address.";
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      setStatusMessage(emailError);
      return;
    }

    if (formData._gotcha) {
      setStatusMessage("Message sent.");
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusMessage("Sending your message…");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Website Inquiry",
        }),
      });

      if (res.ok) {
        setStatusMessage("Message sent. I'll reply within 24 hours.");
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          instructions: "",
          message: "",
          _gotcha: "",
        });
      } else {
        setStatusMessage("Something went wrong. Please try again or email me directly.");
        toast({
          title: "Something went wrong",
          description: "Please try again in a moment or email me directly.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setStatusMessage("Network error. Check your connection and try again.");
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 // this looks fine, TODO: could clean up more UI elements/for more efficient
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-5000px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
          Your Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="bg-background border-border/60 focus:border-secondary focus:ring-secondary/20 transition-all duration-300 hover:border-border px-4 py-6"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={(e) => {
            const err = validateEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: err }));
          }}
          placeholder="john@example.com"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`bg-background border-border/60 focus:border-secondary focus:ring-secondary/20 transition-all duration-300 hover:border-border px-4 py-6 ${
            errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="bg-background border-border/60 focus:border-secondary focus:ring-secondary/20 transition-all duration-300 hover:border-border px-4 py-6"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="instructions"
          className="text-sm font-medium text-foreground"
        >
          Instructions
        </Label>
        <Textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Any specific requirements or preferences..."
          rows={3}
          className="bg-background border-border/60 focus:border-secondary focus:ring-secondary/20 transition-all duration-300 hover:border-border resize-none p-4"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-foreground">
          Your Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your learning goals..."
          required
          rows={3}
          className="bg-background border-border/60 focus:border-secondary focus:ring-secondary/20 transition-all duration-300 hover:border-border resize-none p-4"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/95 font-medium py-7 text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none rounded-xl"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </Button>

      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
    </form>
  );
};

export default ContactForm;
