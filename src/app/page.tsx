import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Features from '@/components/sections/Features';
import ContactFormSection from '@/components/sections/ContactFormSection';
import servicesData from '@/data/services.json';

export default function Home() {
  return (
    <main>
      <Hero
        title="Яркие праздники для ваших детей"
        subtitle="Профессиональные аниматоры в Бельцах"
        ctaText="Заказать праздник"
        ctaHref="#contact"
        backgroundImage="/images/hero/hero-bg.jpg"
      />
      <About />
      <ServicesGrid services={servicesData} />
      <Features />
      <ContactFormSection />
    </main>
  );
}
