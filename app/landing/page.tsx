import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  Truck,
  Zap,
  Building2,
  BadgeCheck,
  Clock,
  Shield,
  TrendingDown,
  CheckCircle2,
  Phone,
  Mail
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commercial & Personal Vehicle Leasing in Surrey | First Flexi Lease",
  description: "Expert vehicle leasing solutions across Surrey including Woking, Guildford, Farnham & surrounding areas. Cars, vans, trucks & electric vehicles with flexible finance options.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Vehicle Leasing Solutions Across Surrey
          </h1>
          <div className="text-xl text-muted-foreground mb-8 leading-relaxed">
            <p className="mb-4">
              <strong>Looking for flexible vehicle leasing in Surrey?</strong> First Flexi Lease provides
              tailored commercial and personal vehicle leasing solutions throughout Surrey and surrounding
              areas. Whether you need a single car, a fleet of vans, or specialist vehicles, we offer
              flexible finance options designed to suit your budget and business needs.
            </p>
            <p>
              With local expertise serving Woking, Guildford, Farnham, and beyond, we make vehicle leasing
              simple, affordable, and stress-free.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#calculator">
              <Button size="lg" className="bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-6 text-lg">
                Get Your Free Quote
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-brand text-brand hover:bg-brand/10 px-8 py-6 text-lg">
              <Phone className="h-5 w-5 mr-2" />
              Call Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Proudly Serving Surrey and Beyond
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              We&apos;re your local vehicle leasing experts, providing personalized service across Surrey and
              the surrounding areas.
            </p>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-6 text-center">Our Coverage Area</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                {[
                  "Woking", "Guildford", "Farnham", "Godalming", "Cranleigh", "Haslemere",
                  "Camberley", "Aldershot", "Fleet", "Farnborough", "Bagshot", "Windlesham",
                  "Chobham", "Bisley", "Pyrford", "Send", "Ripley", "West Byfleet",
                  "Byfleet", "Cobham", "Esher", "Weybridge", "Walton-on-Thames", "Chertsey"
                ].map((area) => (
                  <div
                    key={area}
                    className="p-3 bg-card rounded-lg border border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <p className="font-medium">{area}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-8">
                Don&apos;t see your area? We serve clients throughout Surrey and the wider South East.
                <Link href="/contact" className="text-brand hover:underline ml-1">
                  Contact us
                </Link> to discuss your needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Vehicle Leasing for Every Need
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            From compact city cars to heavy-duty trucks, we provide leasing solutions for all vehicle types.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Cars */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <Car className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Cars</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Personal and company car leasing with flexible terms. Choose from hatchbacks, saloons,
                SUVs, and executive models from leading manufacturers.
              </p>
              <ul className="space-y-2 text-sm">
                {["Personal contract hire", "Business contract hire", "Short-term & long-term options", "Low mileage or high mileage plans"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Vans */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <Truck className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Vans</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Commercial van leasing for tradespeople, delivery services, and businesses. Small, medium,
                and large vans available.
              </p>
              <ul className="space-y-2 text-sm">
                {["Panel vans & crew vans", "Refrigerated vans", "Tipper vans & flatbeds", "Fleet leasing options"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Electric Vehicles */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <Zap className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Electric Vehicles</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Go green with electric car and van leasing. Reduce running costs and benefit from
                government incentives.
              </p>
              <ul className="space-y-2 text-sm">
                {["Fully electric cars & vans", "Plug-in hybrids (PHEVs)", "Home charging solutions", "Business & personal EV leasing"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Trucks & HGVs */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <Building2 className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Trucks & HGVs</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Heavy goods vehicle leasing for logistics, construction, and distribution businesses.
              </p>
              <ul className="space-y-2 text-sm">
                {["7.5-tonne trucks", "18-tonne & 26-tonne trucks", "Articulated lorries", "Customizable lease terms"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Specialist Vehicles */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <BadgeCheck className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Specialist Vehicles</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Need something specific? We can source and lease specialist vehicles tailored to your
                industry requirements.
              </p>
              <ul className="space-y-2 text-sm">
                {["Minibuses & coaches", "Tippers & construction vehicles", "Temperature-controlled vehicles", "Wheelchair-accessible vehicles"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Fleet Management */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <TrendingDown className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold">Fleet Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Comprehensive fleet leasing and management services for businesses of all sizes.
              </p>
              <ul className="space-y-2 text-sm">
                {["Multi-vehicle discounts", "Centralized fleet management", "Maintenance packages available", "Flexible upgrade options"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Flexible Finance */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Flexible Finance Options
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We offer a range of leasing structures designed to suit your financial situation and business goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Business Contract Hire (BCH)</h3>
              <p className="text-muted-foreground mb-6">
                The most popular choice for businesses. Fixed monthly payments, VAT reclaimable (if eligible),
                and no depreciation risk.
              </p>
              <ul className="space-y-3">
                {[
                  "Fixed monthly costs",
                  "No balloon payment",
                  "Maintenance packages available",
                  "Flexible contract lengths (6-60 months)"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Personal Contract Hire (PCH)</h3>
              <p className="text-muted-foreground mb-6">
                Ideal for individuals who want a new car without the commitment of ownership. Drive the
                latest models with affordable monthly payments.
              </p>
              <ul className="space-y-3">
                {[
                  "No large upfront cost",
                  "Drive a new car every few years",
                  "Road tax & breakdown cover options",
                  "Simple & hassle-free"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Finance Lease</h3>
              <p className="text-muted-foreground mb-6">
                Suitable for businesses that want to keep the vehicle off their balance sheet while
                maintaining an option to purchase at the end of the term.
              </p>
              <ul className="space-y-3">
                {[
                  "Option to purchase at end of lease",
                  "Lower monthly payments",
                  "Potential tax benefits",
                  "Ideal for commercial vehicles"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Short-Term Leasing</h3>
              <p className="text-muted-foreground mb-6">
                Need a vehicle for a shorter period? We offer flexible short-term leasing from 6 months,
                perfect for temporary projects or seasonal demand.
              </p>
              <ul className="space-y-3">
                {[
                  "Contracts from 6 months",
                  "No long-term commitment",
                  "Fast approval & delivery",
                  "Ideal for project-based work"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose First Flexi Lease?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We&apos;re not just another leasing company. Here&apos;s what sets us apart.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                <BadgeCheck className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Based in Surrey, we understand the local market and provide personalized service you can trust.
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">
                We work with multiple lenders to secure the best rates, ensuring you get maximum value.
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Approvals</h3>
              <p className="text-sm text-muted-foreground">
                Quick credit decisions and efficient processing mean you can get on the road sooner.
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Terms</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees, no surprises. We provide clear, straightforward contracts and pricing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How Vehicle Leasing Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Getting started with First Flexi Lease is simple. Here&apos;s how it works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Get a Quote",
                description: "Use our calculator or contact us directly. Tell us what vehicle you need and your budget."
              },
              {
                step: "2",
                title: "Choose Your Vehicle",
                description: "We&apos;ll help you select the right vehicle and lease structure for your needs."
              },
              {
                step: "3",
                title: "Application & Approval",
                description: "Complete a simple application. We&apos;ll handle the paperwork and secure fast approval."
              },
              {
                step: "4",
                title: "Drive Away",
                description: "Once approved, we&apos;ll arrange delivery. You&apos;ll be on the road in no time!"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Got questions? We&apos;ve got answers.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What is vehicle leasing?",
                answer: "Vehicle leasing is a long-term rental agreement where you pay a fixed monthly fee to use a car or van without owning it. At the end of the lease term, you return the vehicle or, in some cases, have the option to purchase it."
              },
              {
                question: "Who can lease a vehicle?",
                answer: "Both individuals and businesses can lease vehicles. Personal Contract Hire (PCH) is designed for individuals, while Business Contract Hire (BCH) is for companies and sole traders. Subject to credit approval."
              },
              {
                question: "What's included in my monthly payment?",
                answer: "Your monthly payment typically covers vehicle depreciation, finance charges, and any optional add-ons like maintenance or breakdown cover. Road tax is often included, but insurance is usually separate."
              },
              {
                question: "Can I end my lease early?",
                answer: "Early termination is possible but may incur fees. It&apos;s best to discuss your circumstances with us so we can explore your options and minimize any charges."
              },
              {
                question: "What happens if I exceed my mileage limit?",
                answer: "If you drive more miles than agreed, you&apos;ll pay an excess mileage charge at the end of the lease. We recommend choosing a mileage allowance that suits your needs or adjusting it mid-term if possible."
              },
              {
                question: "Do you offer maintenance packages?",
                answer: "Yes, we offer optional maintenance packages that cover servicing, tyres, and repairs. This provides peace of mind and helps you budget more effectively."
              },
              {
                question: "What areas in Surrey do you cover?",
                answer: "We serve clients across Surrey including Woking, Guildford, Farnham, Godalming, Camberley, Aldershot, and surrounding towns. We also work with customers throughout the South East."
              },
              {
                question: "How long does the approval process take?",
                answer: "Most credit applications are processed within 24-48 hours. Once approved, vehicle delivery times vary depending on availability but typically range from a few days to a few weeks."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-brand/50 hover:bg-card/80 transition-all duration-300">
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand to-brand/80 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get your free, no-obligation quote today and discover how affordable vehicle leasing can be.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#calculator">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold">
                Calculate Your Quote
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-brand/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">First Flexi Lease</h3>
              <p className="text-gray-400 mb-4">
                Your trusted vehicle leasing partner across Surrey and the South East.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-brand transition-colors">Home</Link></li>
                <li><Link href="/#calculator" className="hover:text-brand transition-colors">Calculator</Link></li>
                <li><Link href="/landing#faq" className="hover:text-brand transition-colors">FAQs</Link></li>
                <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand" />
                  <span>Call for quote</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" />
                  <span>Email us</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} First Flexi Lease. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "First Flexi Lease",
            "description": "Vehicle leasing solutions across Surrey including cars, vans, trucks, and electric vehicles with flexible finance options.",
            "areaServed": [
              {
                "@type": "City",
                "name": "Woking"
              },
              {
                "@type": "City",
                "name": "Guildford"
              },
              {
                "@type": "City",
                "name": "Farnham"
              }
            ],
            "priceRange": "££",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Vehicle Leasing Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Car Leasing",
                    "description": "Personal and business car leasing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Van Leasing",
                    "description": "Commercial van leasing for businesses"
                  }
                }
              ]
            }
          })
        }}
      />
    </main>
  );
}
