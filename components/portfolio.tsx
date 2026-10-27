"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Instagram,
  Menu,
  X,
} from "lucide-react";

const categories = [
  "All work",
  "Portraits",
  "Events & birthdays",
  "Graduation",
  "Weddings",
  "Travel & landscapes",
  "Street photography",
  "Products",
];

const photos = [
  {
    title: "Quiet confidence",
    category: "Portraits",
    number: "01",
    src: "/Birthday_portrait.JPG",
    shape: "all",
  },
  {
    title: "The day we said yes",
    category: "Weddings",
    number: "02",
    src: "/Wedding3.jpeg",
    shape: "wide",
  },
  //{
  // title: "A little more grown",
  // category: "Graduation",
  //number: "03",
  //src: "/Graduation.jpeg",
  //shape: "normal",
  // },

  {
    title: "Golden hour, somewhere",
    category: "Travel & landscapes",
    number: "03",
    src: "/Travel_1.JPG",
    shape: "tall",
  },
  {
    title: "Golden hour, somewhere",
    category: "Travel & landscapes",
    number: "04",
    src: "/Travel_3.JPG",
    shape: "tall",
  },
  {
    title: "Golden hour, somewhere",
    category: "Travel & landscapes",
    number: "05",
    src: "/Travel_2.JPG",
    shape: "tall",
  },
  {
    title: "In between moments",
    category: "Events & birthdays",
    number: "06",
    src: "/Kiddie_birthday2.jpeg",
    shape: "normal",
  },
  {
    title: "Everyday, extraordinary",
    category: "Street photography",
    number: "07",
    src: "/Street.jpg",
    shape: "tall",
  },

  // {
  //   title: "Made with care",
  //   category: "Products",
  //   number: "07",
  //   src: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1000&q=85",
  //   shape: "normal",
  // },
  {
    title: "A season to remember",
    category: "Portraits",
    number: "08",
    src: "/Portrait2.JPG",
    shape: "tall",
  },
  {
    title: "Your imagination is the limit",
    category: "Portraits",
    number: "09",
    src: "/Portrait3.JPG",
    shape: "tall",
  },
];

const packages = [
  {
    name: "The Essential",
    price: "₱2,500",
    note: "A little time, beautifully kept.",
    items: [
      "Up to 1 hour of shooting",
      "1 location",
      "15 edited high-resolution photos",
      "Online gallery delivery",
    ],
    featured: false,
  },
  {
    name: "The Story",
    price: "₱4,000",
    note: "For the chapters worth remembering.",
    items: [
      "Up to 2 hours of shooting",
      "Up to 2 nearby locations",
      "50 edited high-resolution photos",
      "Online gallery delivery",
      "Pre-session consultation",
    ],
    featured: true,
  },
  {
    name: "The Full Chapter",
    price: "₱7,500",
    note: "Room for the whole story to unfold.",
    items: [
      "Up to 4 hours of coverage",
      "Event or lifestyle session",
      "100 edited high-resolution photos",
      "Priority gallery delivery",
      "Pre-session consultation",
    ],
    featured: false,
  },
];

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  package: string;
  date: string;
  location: string;
  details: string;
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    service: "Portraits",
    package: "The Story",
    date: "",
    location: "",
    details: "",
  });

  const filteredPhotos = useMemo(
    () =>
      activeCategory === "All work"
        ? photos
        : photos.filter((photo) => photo.category === activeCategory),
    [activeCategory]
  );

  const openBooking = (service?: string, packageName?: string) => {
    setForm((old) => ({
      ...old,
      ...(service ? { service } : {}),
      ...(packageName ? { package: packageName } : {}),
    }));
    setSent(false);
    setSubmitError("");
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const update = (key: keyof BookingForm, value: string) =>
    setForm((old) => ({ ...old, [key]: value }));

  // Existing booking API integration — unchanged in its database mapping.
  const submitBooking = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: form.name,
          email: form.email,
          phone: form.phone,
          event_type: form.service,
          event_date: form.date || null,
          event_location: form.location,
          package_name: form.package,
          message: form.details,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Unable to save your inquiry. Please try again."
        );
      }

      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "A connection error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="bg-[#24231f] text-center px-4 py-2 text-[9px] tracking-[.18em] uppercase text-white/80">
        Now accepting inquiries for portrait sessions & special occasions
      </div>

      <header className="container-wide flex h-[86px] items-center justify-between border-b border-[#dedbd3]">
        <a href="#home" className="flex items-center gap-3" aria-label="Tanners Photography home">
          <span className="flex h-10 w-10 items-center justify-center border border-[#24231f]">
            <Camera size={18} strokeWidth={1.3} />
          </span>
          <span>
            <span className="serif block text-[20px] leading-none tracking-[-.04em]">Tanners</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[.28em]">Photography</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className="nav-link text-[11px] tracking-wide" href="#portfolio">Portfolio</a>
          <a className="nav-link text-[11px] tracking-wide" href="#about">About</a>
          <a className="nav-link text-[11px] tracking-wide" href="#packages">Packages</a>
          <a className="nav-link text-[11px] tracking-wide" href="#contact">Contact</a>
        </nav>

        <button className="btn-primary hidden md:inline-flex" onClick={() => openBooking()}>
          Book a session <ArrowUpRight size={14} />
        </button>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <nav className="border-b border-[#dedbd3] px-5 py-5 flex flex-col gap-5 md:hidden">
          {["Portfolio", "About", "Packages", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary" onClick={() => openBooking()}>
            Book a session <ArrowUpRight size={14} />
          </button>
        </nav>
      )}

      <section id="home" className="container-wide grid gap-10 py-12 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-16 md:py-16">
        <div className="order-2 md:order-1">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8b6b4a]" />
            Photography for the beautifully ordinary
          </p>

          <h1 className="serif max-w-[620px] text-[clamp(3.5rem,7vw,6.6rem)] leading-[.98] tracking-[-.065em]">
            Stories,<br />honestly <em className="font-normal text-[#8b6b4a]">told.</em>
          </h1>

          <p className="mt-7 max-w-[390px] text-[13px] leading-7 text-[#77746d]">
            Photographs for the people, places, and fleeting moments you want to remember. Thoughtful imagery, made to feel like you.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#portfolio">
              Explore the work <ArrowRight size={14} />
            </a>
            <button className="btn-outline" onClick={() => openBooking()}>
              Book a session
            </button>
          </div>

          <div className="mt-14 flex items-center gap-5 border-t border-[#dedbd3] pt-5">
            <span className="serif text-[32px] italic text-[#8b6b4a]"></span>
            <p className="max-w-[220px] text-[10px] leading-5 tracking-wide text-[#77746d]">
              Portraits, celebrations, landscapes, and the little things in between.
            </p>
          </div>
        </div>

        <div className="order-1 grid grid-cols-[1.05fr_.8fr] items-end gap-3 md:order-2 md:gap-4">
          <div className="image-frame h-[340px] md:h-[570px]">
            <img src="/Portrait.jpg" alt="Editorial portrait in soft natural light" className="h-full w-full object-cover" />
          </div>
          <div className="pb-8">
            <div className="image-frame h-[210px] md:h-[330px]">
              <img src="/Wedding.jpeg" alt="A wedding day captured in a quiet, candid moment" className="h-full w-full object-cover" />
            </div>
            <p className="eyebrow mt-4">The art of remembering</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dedbd3] bg-[#efede6]">
        <div className="container-wide grid grid-cols-2 gap-6 py-7 md:grid-cols-4 md:py-9">
          {[
            ["01", "Personal portraits"],
            ["02", "Milestone moments"],
            ["03", "Places & details"],
            ["04", "Made with intention"],
          ].map(([n, label]) => (
            <div key={n} className="flex items-center gap-3">
              <span className="serif text-[22px] italic text-[#8b6b4a]">{n}</span>
              <span className="text-[10px] uppercase tracking-[.12em] text-[#625e56]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="container-wide section-pad">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">A collection of moments</p>
            <h2 className="serif text-5xl tracking-[-.05em] md:text-6xl">
              Selected work<span className="text-[#8b6b4a]">.</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-[12px] leading-6 text-[#77746d]">
            A little look into the stories I get to tell. Every frame is an invitation to slow down and notice.
          </p>
        </div>

        <div className="mt-9 flex gap-2 overflow-x-auto border-b border-[#dedbd3] pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-3 py-2 text-[10px] transition ${activeCategory === category
                  ? "bg-[#24231f] text-white"
                  : "text-[#77746d] hover:text-[#24231f]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Original gallery layout and aspect ratios preserved */}
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 md:gap-x-5 md:gap-y-10">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.number}
              className={
                photo.shape === "wide" && activeCategory === "All work"
                  ? "col-span-2 md:col-span-2"
                  : ""
              }
            >
              <div
                className={`image-frame ${photo.shape === "tall"
                    ? "aspect-[3/4]"
                    : photo.shape === "wide"
                      ? "aspect-[16/8]"
                      : "aspect-[4/5]"
                  }`}
              >
                <img
                  src={photo.src}
                  alt={`${photo.title} — ${photo.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[12px]">{photo.title}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[.15em] text-[#77746d]">
                    {photo.category}
                  </p>
                </div>
                <span className="serif text-[15px] italic text-[#8b6b4a]">
                  {photo.number}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-[#77746d]">Your story could be next.</p>
          <button onClick={() => openBooking()} className="btn-outline mt-4">
            Let's make something meaningful <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <section id="about" className="bg-[#eae7df]">
        <div className="container-wide grid gap-10 py-16 md:grid-cols-2 md:items-center md:gap-20 md:py-24">
          <div className="image-frame aspect-[5/4] md:aspect-[4/5] md:max-h-[570px]">
            <img
              src="/Me.jpeg"
              alt="Camera and photography equipment in a thoughtful workspace"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="py-3 md:py-10">
            <p className="eyebrow mb-5">Behind the lens</p>
            <h2 className="serif text-5xl leading-[1.05] tracking-[-.05em] md:text-6xl">
              Not just how it looked. <em className="text-[#8b6b4a]">How it felt.</em>
            </h2>
            <p className="mt-7 text-[13px] leading-7 text-[#625e56]">
              I believe the best photographs feel honest. The unscripted laughter, the quiet in-between, the details that might seem small today but mean everything later.
            </p>
            <p className="mt-4 text-[13px] leading-7 text-[#625e56]">
              Tanners Photography is built around a simple idea: create space for people to be themselves, then preserve those moments with care. Whether it is a portrait, a milestone, or a place that stays with you, your story deserves to be told thoughtfully.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="serif text-3xl italic text-[#8b6b4a]">Tanners</span>
              <span className="h-px w-12 bg-[#b8b1a5]" />
              <span className="eyebrow">Photographer & storyteller</span>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="container-wide section-pad">
        <div className="mx-auto max-w-[650px] text-center">
          <p className="eyebrow mb-4">Simple, thoughtful options</p>
          <h2 className="serif text-5xl tracking-[-.05em] md:text-6xl">The experience</h2>
          <p className="mx-auto mt-5 max-w-[440px] text-[12px] leading-6 text-[#77746d]">
            Every story is different. Start with a collection, and we can tailor the details to your occasion.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`relative flex flex-col border p-7 md:p-8 ${pkg.featured
                  ? "border-[#24231f] bg-[#eeebe4]"
                  : "border-[#dedbd3] bg-[#faf9f6]"
                }`}
            >
              {pkg.featured && (
                <span className="absolute right-5 top-5 text-[8px] uppercase tracking-[.18em] text-[#8b6b4a]">
                  Most chosen
                </span>
              )}
              <p className="eyebrow">{pkg.name}</p>
              <p className="serif mt-5 text-4xl tracking-[-.04em]">
                {pkg.price}
                <span className="ml-1 text-[11px] tracking-normal text-[#77746d]">/ session</span>
              </p>
              <p className="mt-3 min-h-10 text-[11px] leading-5 text-[#77746d]">{pkg.note}</p>
              <div className="my-6 h-px bg-[#dedbd3]" />
              <ul className="flex-1 space-y-4">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[11px] leading-5">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#8b6b4a]" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openBooking("Portraits", pkg.name)}
                className={pkg.featured ? "btn-primary mt-8 w-full" : "btn-outline mt-8 w-full"}
              >
                Choose this package <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] leading-5 text-[#77746d]">
          Sample prices for the first version. Travel fees, extended coverage, prints, and custom projects may be quoted separately.
        </p>
      </section>

      <section className="bg-[#24231f] text-[#f7f5f0]">
        <div className="container-wide grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <div>
            <p className="eyebrow !text-[#b7a58f] mb-4">The next chapter starts here</p>
            <h2 className="serif max-w-[650px] text-5xl leading-[1.05] tracking-[-.05em] md:text-7xl">
              Let's make a memory <em className="text-[#c6a985]">of it.</em>
            </h2>
            <p className="mt-5 max-w-[430px] text-[12px] leading-6 text-white/60">
              Tell me what you are celebrating, dreaming up, or hoping to remember. We'll take it from there.
            </p>
          </div>
          <button
            onClick={() => openBooking()}
            className="inline-flex items-center justify-center gap-3 bg-[#f7f5f0] px-6 py-4 text-[10px] uppercase tracking-[.15em] text-[#24231f] hover:bg-[#d9c9b5]"
          >
            Inquire about a session <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      <footer id="contact" className="container-wide">
        <div className="grid gap-8 border-b border-[#dedbd3] py-10 md:grid-cols-3 md:items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#24231f]">
              <Camera size={18} strokeWidth={1.3} />
            </span>
            <span>
              <span className="serif block text-[20px] leading-none">Tanners</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[.28em]">Photography</span>
            </span>
          </a>
          <p className="text-[11px] leading-6 text-[#77746d] md:text-center">
            Thoughtful photographs. Honest stories.<br />Made to be kept.
          </p>
          <div className="flex items-center gap-5 md:justify-end">
            <a
              href="https://www.instagram.com/trstn_blc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[.13em] hover:text-[#8b6b4a]"
            >
              <Instagram className="mr-2 inline" size={14} /> Instagram
            </a>
            <button
              onClick={() => openBooking()}
              className="text-[10px] uppercase tracking-[.13em] hover:text-[#8b6b4a]"
            >
              Get in touch <ArrowUpRight className="ml-1 inline" size={13} />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 py-5 text-[9px] uppercase tracking-[.12em] text-[#77746d] md:flex-row">
          <span>© {new Date().getFullYear()} Tanners Photography</span>
          <span>Made with care, for moments that matter.</span>
        </div>
      </footer>

      {bookingOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <div className="my-auto max-h-[94vh] w-full max-w-[650px] overflow-y-auto bg-[#f7f5f0] p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#dedbd3] pb-5">
              <div>
                <p className="eyebrow mb-2">A note to the photographer</p>
                <h2 id="booking-title" className="serif text-4xl tracking-[-.04em]">
                  Start your booking.
                </h2>
                <p className="mt-2 text-[11px] text-[#77746d]">
                  Share a few details and we'll start planning your session.
                </p>
              </div>
              <button className="p-2" onClick={() => setBookingOpen(false)} aria-label="Close booking form">
                <X size={20} />
              </button>
            </div>

            {sent ? (
              <div className="py-12 text-center">
                <Check className="mx-auto text-[#8b6b4a]" size={32} />
                <h3 className="serif mt-4 text-3xl">Your inquiry has been received.</h3>
                <p className="mx-auto mt-3 max-w-sm text-[12px] leading-6 text-[#77746d]">
                  Thank you for reaching out. Your booking inquiry has been saved, and I will get back to you soon.
                </p>
                <button onClick={() => setBookingOpen(false)} className="btn-primary mt-6">
                  Back to the website
                </button>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="field-label">Your name *</span>
                    <input className="field" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Full name" />
                  </label>
                  <label>
                    <span className="field-label">Email address *</span>
                    <input className="field" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@example.com" />
                  </label>
                  <label>
                    <span className="field-label">Phone / Messenger (optional)</span>
                    <input className="field" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Best way to reach you" />
                  </label>
                  <label>
                    <span className="field-label">Photography service *</span>
                    <select className="field" value={form.service} onChange={(e) => update("service", e.target.value)}>
                      {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="field-label">Package *</span>
                    <select className="field" value={form.package} onChange={(e) => update("package", e.target.value)}>
                      {packages.map((p) => <option key={p.name}>{p.name}</option>)}
                      <option>Custom quote</option>
                    </select>
                  </label>
                  <label>
                    <span className="field-label">Preferred date</span>
                    <input
                      className="field"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="field-label">Location / venue</span>
                    <input className="field" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Where would you like the shoot?" />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="field-label">Tell me a little about your plans</span>
                    <textarea className="field min-h-[100px] resize-y" value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="Occasion, number of people, style you love, or anything else..." />
                  </label>
                </div>

                <p className="text-[10px] leading-5 text-[#77746d]">
                  Your booking inquiry will be saved securely so Tanners Photography can follow up with you.
                </p>

                {submitError && (
                  <p role="alert" className="text-[12px] leading-5 text-red-700">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(false)}
                    className="btn-outline"
                    disabled={isSubmitting}
                  >
                    Not right now
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Sending inquiry..." : "Send booking inquiry"}
                    {!isSubmitting && <ArrowRight size={14} />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}