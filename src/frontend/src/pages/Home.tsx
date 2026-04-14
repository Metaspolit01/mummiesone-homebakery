import { EmptyState } from "@/components/EmptyState";
import { ItemCard } from "@/components/ItemCard";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/useBakery";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Cookie,
  Gift,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Static Data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "Cakes",
    emoji: "🎂",
    description: "Custom & celebration cakes",
    color: "from-pink-100/60 to-rose-50",
  },
  {
    name: "Chocolates",
    emoji: "🍫",
    description: "Handmade & bouquets",
    color: "from-amber-100/60 to-yellow-50",
  },
  {
    name: "Brownies",
    emoji: "🟫",
    description: "Fudgy & chewy delights",
    color: "from-orange-100/60 to-amber-50",
  },
  {
    name: "Cookies",
    emoji: "🍪",
    description: "Crispy & soft baked",
    color: "from-yellow-100/60 to-lime-50",
  },
  {
    name: "Donuts",
    emoji: "🍩",
    description: "Glazed & filled rings",
    color: "from-purple-100/60 to-pink-50",
  },
];

const CAKE_TYPES = [
  "Tea Time Cake",
  "Normal Cake",
  "Cup Cakes",
  "Bento Cake",
  "Cool Cake",
  "Custom Cake",
  "Ice Cream Cake",
  "Jar Cakes",
];

const HOW_IT_WORKS = [
  {
    emoji: "🛒",
    title: "Browse & Choose",
    desc: "Filter by category, find your perfect treat, and click Order.",
  },
  {
    emoji: "📅",
    title: "Book in Advance",
    desc: "Select delivery date at least 1 day ahead. Choose pickup or door delivery.",
  },
  {
    emoji: "💳",
    title: "Pay & Enjoy",
    desc: "Pay via UPI or cash. Door delivery charges paid separately to Rapido.",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden gradient-primary"
      data-ocid="home.hero_section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center gap-7 max-w-2xl mx-auto"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/30 text-primary-foreground rounded-full px-5 py-2 text-sm font-body font-medium shadow-warm border border-white/40">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Freshly baked with love
          </div>

          {/* Brand heading */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-primary-foreground font-bold leading-[1.05] tracking-tight">
            Mummies
            <br />
            <span className="italic opacity-85">One</span>
          </h1>

          {/* Subheading */}
          <p className="text-primary-foreground/80 font-body text-lg md:text-xl leading-relaxed max-w-lg">
            Homemade treats crafted with the finest ingredients. Custom cakes,
            artisan chocolates &amp; more — delivered with love in Hyderabad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-1">
            <Link to="/products" data-ocid="home.order_now_button">
              <Button
                size="lg"
                className="gradient-accent text-primary-foreground border-0 font-body font-semibold px-8 shadow-warm hover:shadow-elevated hover:opacity-95 transition-smooth"
              >
                Order Now
                <ChevronRight className="w-5 h-5 ml-1" aria-hidden="true" />
              </Button>
            </Link>
            <a href="tel:7013386529" data-ocid="home.hero_call_button">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white/50 text-primary-foreground hover:bg-white/30 font-body font-semibold px-6 transition-smooth"
              >
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                Call Us
              </Button>
            </a>
          </div>

          {/* Highlight badges */}
          <div className="flex flex-wrap gap-4 justify-center pt-1">
            {["100% Homemade", "1-Day Advance", "Custom Orders"].map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1.5 bg-white/25 text-primary-foreground/90 text-sm font-body font-medium px-4 py-1.5 rounded-full border border-white/40"
              >
                <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function CategoriesSection() {
  return (
    <section
      className="bg-muted/30 py-14 md:py-20"
      data-ocid="home.categories_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-3">
            Explore Our Menu
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            From celebration cakes to homemade chocolates — something sweet for
            every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/products"
                search={{ category: cat.name }}
                data-ocid={`home.category.${i + 1}`}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-warm transition-smooth group text-center block"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-smooth`}
                  aria-hidden="true"
                >
                  <span className="text-3xl">{cat.emoji}</span>
                </div>
                <div>
                  <p className="font-display text-foreground font-semibold text-sm leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-body mt-0.5 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="font-display text-foreground font-semibold text-lg mb-4 flex items-center gap-2">
            <span aria-hidden="true">🎂</span> Cake Varieties
          </h3>
          <div className="flex flex-wrap gap-2">
            {CAKE_TYPES.map((type) => (
              <span
                key={type}
                className="bg-muted text-foreground text-sm font-body px-3 py-1 rounded-full border border-border"
              >
                {type}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Featured Items ───────────────────────────────────────────────────────────

function FeaturedItemsSection() {
  const { data: items, isLoading } = useItems();
  const featured = items?.filter((i) => i.available).slice(0, 6) ?? [];

  return (
    <section
      className="bg-background py-14 md:py-20"
      data-ocid="home.featured_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-2">
              Today's Picks
            </h2>
            <p className="text-muted-foreground font-body">
              Freshly available — order before they're gone!
            </p>
          </div>
          <Link
            to="/products"
            data-ocid="home.view_all_button"
            className="hidden sm:flex items-center gap-1 text-primary font-body text-sm font-medium hover:underline transition-smooth"
          >
            View All <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div data-ocid="home.featured_loading_state">
            <PageLoader />
          </div>
        ) : featured.length === 0 ? (
          <div data-ocid="home.featured_empty_state">
            <EmptyState
              icon={<Cookie className="w-10 h-10 text-muted-foreground" />}
              title="Menu coming soon"
              description="Our baker is preparing something delicious. Check back soon or call us to place an order!"
              action={{
                label: "Call to Order",
                onClick: () => {
                  window.location.href = "tel:7013386529";
                },
              }}
            />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="home.featured_list"
          >
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ItemCard item={item} index={i} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex sm:hidden justify-center mt-8">
          <Link to="/products" data-ocid="home.view_all_mobile_button">
            <Button variant="outline" className="font-body">
              View All Items{" "}
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section
      className="bg-muted/30 py-14 md:py-20"
      data-ocid="home.how_it_works_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Ordering is easy — fresh bakes delivered to your door.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-warm transition-smooth"
            >
              <div
                className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-2xl shadow-warm"
                aria-hidden="true"
              >
                {step.emoji}
              </div>
              <p className="font-display text-foreground font-semibold">
                {step.title}
              </p>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Custom Cake CTA ──────────────────────────────────────────────────────────

function CustomCakeSection() {
  return (
    <section
      className="bg-background py-14 md:py-20"
      data-ocid="home.custom_cake_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4" aria-hidden="true">
              ✨
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground font-bold mb-3">
              Want Something Special?
            </h2>
            <p className="text-primary-foreground/75 font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Request a custom cake for birthdays, anniversaries, or any
              occasion. Tell us your dream cake and we'll make it a reality!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/order/$itemId"
                params={{ itemId: "custom" }}
                data-ocid="home.custom_request_button"
              >
                <Button
                  size="lg"
                  className="gradient-accent text-primary-foreground border-0 font-body font-semibold px-8 shadow-warm hover:shadow-elevated hover:opacity-95 transition-smooth"
                >
                  <Gift className="w-5 h-5 mr-2" aria-hidden="true" />
                  Request Custom Cake
                </Button>
              </Link>
              <a href="tel:7013386529" data-ocid="home.custom_call_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-body font-semibold px-6 transition-smooth"
                >
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  Discuss on Call
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      className="bg-muted/30 py-14 md:py-20"
      data-ocid="home.contact_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Have a question or ready to order? We're just a call away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 hover:shadow-warm transition-smooth"
          >
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center">
              <Phone
                className="w-7 h-7 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="w-full">
              <p className="font-display text-foreground font-semibold mb-1">
                Call Now
              </p>
              <p className="text-muted-foreground text-sm font-body mb-3">
                Speak directly with us
              </p>
              <a
                href="tel:7013386529"
                data-ocid="home.call_now_button"
                className="block"
              >
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground border-0 font-body font-semibold w-full shadow-warm hover:shadow-elevated hover:opacity-95 transition-smooth"
                >
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  7013386529
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 hover:shadow-warm transition-smooth"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-foreground font-semibold mb-1">
                Location
              </p>
              <p className="text-muted-foreground text-sm font-body">
                Hyderabad, India
              </p>
              <p className="text-muted-foreground text-xs font-body mt-2">
                Delivery via Rapido
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 hover:shadow-warm transition-smooth"
          >
            <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center">
              <span className="text-2xl" aria-hidden="true">
                🕐
              </span>
            </div>
            <div>
              <p className="font-display text-foreground font-semibold mb-1">
                Ordering
              </p>
              <p className="text-muted-foreground text-sm font-body">
                Advance booking only
              </p>
              <p className="text-muted-foreground text-xs font-body mt-2">
                Minimum 1 day in advance
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-2xl mx-auto bg-card border border-border rounded-xl p-5 text-center"
        >
          <p className="text-muted-foreground text-sm font-body leading-relaxed">
            <span className="font-semibold text-foreground">Payment note:</span>{" "}
            Item prices include product cost only. Delivery charges are paid
            separately to Rapido. We accept{" "}
            <span className="text-foreground font-medium">UPI</span> and{" "}
            <span className="text-foreground font-medium">
              Cash on Delivery
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedItemsSection />
      <HowItWorksSection />
      <CustomCakeSection />
      <ContactSection />
    </Layout>
  );
}
