import React from 'react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { BASE_PRICE, CITY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'О нас - Студия праздников Домовой',
  description: 'Профессиональная организация детских праздников в Бельцах. Опытные аниматоры, яркие программы, довольные дети.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
              О студии «Домовой»
            </h1>
            <p className="text-xl text-[var(--color-gray)]">
              Создаём незабываемые праздники для ваших детей с 2015 года
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* About Text */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6">
                Организация детских праздников от студии «Домовой»
              </h2>
              <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-4">
                Подарите вашему ребёнку настоящий праздник, наполненный смехом, весельем и волшебством!
                Мы создаём яркие, динамичные и запоминающиеся программы продолжительностью 1–1,5 часа — 
                всё продумано до мелочей, чтобы именинник и гости остались в восторге!
              </p>
            </div>

            {/* Base Program */}
            <div className="bg-[var(--color-peach)] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-6">
                💫 Базовая программа — {BASE_PRICE} лей
              </h3>
              <p className="text-lg text-[var(--color-navy)] mb-6">
                В стоимость программы (в черте города {CITY}) входит всё необходимое для идеального торжества:
              </p>
              <ul className="space-y-4">
                {[
                  '✨ 2 аниматора — любимые персонажи на выбор в соответствии с возрастом и интересами ребёнка',
                  '🎲 Интерактивные игры и флешмобы — движение, смех и море позитива!',
                  '🎈 Сюрприз — фигурки из воздушных шаров, которые дети обожают',
                  '🎂 Торжественный вынос торта — яркий финал праздника под аплодисменты гостей',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.split(' ')[0]}</span>
                    <span className="text-lg text-[var(--color-navy)]">
                      {item.substring(item.indexOf(' ') + 1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6 text-center">
                Почему выбирают нас?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🎭',
                    title: 'Профессиональные аниматоры',
                    description: 'Опытные артисты с актёрским образованием',
                  },
                  {
                    icon: '🎨',
                    title: 'Яркие костюмы',
                    description: 'Качественные костюмы любимых персонажей',
                  },
                  {
                    icon: '🎉',
                    title: 'Индивидуальный подход',
                    description: 'Программа адаптируется под возраст детей',
                  },
                  {
                    icon: '⭐',
                    title: 'Довольные клиенты',
                    description: 'Сотни успешно проведённых праздников',
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-[var(--color-cream)] rounded-xl p-6">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-gray)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-4">
                Готовы заказать праздник?
              </h2>
              <p className="text-lg text-[var(--color-gray)] mb-6">
                Свяжитесь с нами, и мы создадим незабываемое событие для вашего ребёнка!
              </p>
              <Button href="/contact" size="lg">
                Связаться с нами
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
