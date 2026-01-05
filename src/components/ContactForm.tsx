import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const FORM_ENDPOINT = "https://formspree.io/f/xlgdnglr";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instructions: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

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
        });
      } else {
        // Formspree returns JSON with details sometimes, but we don’t need to parse it
        toast({
          title: "Something went wrong",
          description: "Please try again in a moment or email me directly.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20"
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
          placeholder="john@example.com"
          required
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20"
        />
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
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20"
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
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20 resize-none"
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
          rows={6}
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-6 text-base transition-all duration-200 hover:shadow-elevated disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-sm text-muted-foreground">
        First lesson is free.
      </p>
    </form>
  );
};

export default ContactForm;
