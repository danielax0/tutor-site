import { useEffect, useState } from "react";

const StudyBuddyMascot = () => {
  const [showMascot, setShowMascot] = useState(false);
  const [isBouncing, setIsBouncing] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowMascot(true), 3500);
    const stopBounceTimer = setTimeout(() => setIsBouncing(false), 6500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(stopBounceTimer);
    };
  }, []);

  if (!showMascot) return null;

  return (
    <div className="fixed bottom-4 right-2 md:bottom-8 md:right-4 z-40">
      <div className="group relative">
        {/* Text bubble: absolutely positioned so it doesn't extend the group's hover hit area */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-72 pointer-events-none">
          <div
            className="transition-all duration-300 opacity-0 translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
          >
            <div className="bg-card border border-border/70 shadow-xl rounded-2xl px-4 py-3 max-w-xs">
              <p className="text-sm text-foreground font-semibold mb-1">
                Hi, I&apos;m your Study Buddy!
              </p>
              <p className="text-xs text-muted-foreground">
                Have questions about Math, French, or English? Book a free call – I&apos;m here to help you feel confident.
              </p>
            </div>
          </div>
        </div>

        {/* Mascot — the only thing inside the group that captures hover */}
        <div className="relative">
            {/*halo*/}
            <div className="absolute -inset-3 rounded-3xl bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              // mascot tilt lift
              className={`relative origin-bottom transition-transform duration-300 outline-none ${
                isBouncing ? "animate-bounce" : ""
              } group-hover:-translate-y-1 group-hover:rotate-3`}
              aria-label="Scroll to booking section"
            >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-2xl border border-primary/40 flex items-center justify-center">
              <svg
                viewBox="0 0 80 80"
                className="w-16 h-16 text-primary-foreground"
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
            </button>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddyMascot;

