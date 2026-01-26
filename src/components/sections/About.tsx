import React from 'react';
import Container from '@/components/ui/Container';
import { BASE_PRICE, CITY } from '@/lib/constants';

export default function About() {
  return (
    <section className="section-padding bg-[var(--color-peach)]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-6 text-center">
            Организация детских праздников от студии «Домовой»
          </h2>

          <p className="text-lg text-[var(--color-navy)] mb-6 leading-relaxed">
            Подарите вашему ребёнку настоящий праздник, наполненный смехом, весельем и волшебством!
            Мы создаём яркие, динамичные и запоминающиеся программы продолжительностью 1–1,5 часа — 
            всё продумано до мелочей, чтобы именинник и гости остались в восторге!
          </p>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-hot-pink)] mb-4">
              💫 В стоимость программы — {BASE_PRICE} лей (в черте города {CITY}) — входит всё необходимое:
            </h3>

            <ul className="space-y-3">
              {[
                '✨ 2 аниматора — любимые персонажи на выбор в соответствии с возрастом и интересами ребёнка',
                '🎲 Интерактивные игры и флешмобы — движение, смех и море позитива!',
                '🎈 Сюрприз — фигурки из воздушных шаров, которые дети обожают',
                '🎂 Торжественный вынос торта — яркий финал праздника под аплодисменты гостей',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[var(--color-navy)]">
                  <span className="text-[var(--color-hot-pink)] font-bold flex-shrink-0">
                    {item.split(' ')[0]}
                  </span>
                  <span>{item.substring(item.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg text-[var(--color-navy)] text-center font-medium">
            С «Домовым» каждый праздник превращается в волшебную историю, 
            где мечты детей становятся реальностью!
          </p>
        </div>
      </Container>
    </section>
  );
}
