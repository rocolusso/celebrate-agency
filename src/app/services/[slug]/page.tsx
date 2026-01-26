import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ServiceCard from '@/components/cards/ServiceCard';
import PhotoGallery from '@/components/media/PhotoGallery';
import servicesData from '@/data/services.json';
import { formatPrice } from '@/lib/utils';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Услуга не найдена',
    };
  }

  return {
    title: `${service.nameRu} - Аниматор на детский праздник`,
    description: `Закажите аниматора ${service.nameRu} для детского праздника в Бельцах. Программа 1-1.5 часа, игры, конкурсы, вынос торта.`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Get all related services (exclude current)
  const relatedServices = servicesData
    .filter((s) => s.id !== service.id);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
        }}
      >
        <Container>
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-gray)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-hot-pink)]">
                  Главная
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-[var(--color-hot-pink)]">
                  Услуги
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-navy)] font-medium">{service.nameRu}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.nameRu}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
                {service.nameRu}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">Стоимость</p>
                    <p className="text-2xl font-bold" style={{ color: service.color }}>
                      {formatPrice(service.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">👶</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">Возраст</p>
                    <p className="text-lg font-medium text-[var(--color-navy)]">
                      {service.ageRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">Продолжительность</p>
                    <p className="text-lg font-medium text-[var(--color-navy)]">
                      {service.duration}
                    </p>
                  </div>
                </div>
              </div>

              <Button href="#contact" size="lg" className="w-full md:w-auto">
                Заказать праздник
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Description Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6">
              О программе
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="bg-[var(--color-cream)] rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
                В программу входит:
              </h3>
              <ul className="space-y-3">
                {[
                  '✨ 2 профессиональных аниматора',
                  '🎲 Интерактивные игры и конкурсы',
                  '💃 Танцы и флешмобы',
                  '🎈 Фигурки из воздушных шаров',
                  '🎂 Торжественный вынос торта',
                  '📸 Яркие эмоции и незабываемые впечатления',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-navy)]">
                    <span className="text-xl flex-shrink-0">{item.split(' ')[0]}</span>
                    <span className="text-lg">{item.substring(item.indexOf(' ') + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="section-padding bg-white">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Фотографии
            </h2>
            <PhotoGallery 
              images={service.gallery} 
              alt={`${service.nameRu} - Фотографии`} 
            />
          </Container>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-[var(--color-cream)]">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Другие персонажи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService.id} service={relatedService} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}
