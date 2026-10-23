export type Lang = "ru" | "ro";

export const COPY = {
  ru: {
    tag: "Аниматоры в Бельцах",
    l1: "НОВОГОДНИЕ",
    l2: "ГЕРОИ",
    ribbon: ["Сказка не за горами!"],
    badges: ["Игры и конкурсы", "Танцы и хороводы", "Поздравления и подарки", "Фото с героями", "Море радости и смеха"],
    cta: ["Пригласите сказку", "на ваш праздник!"],
    /** Текст для экранных дикторов и поисковиков на десктопе, где текст запечён в картинке */
    sr: "Новогодние герои: аниматоры в Бельцах. Сказка не за горами! Дед Мороз, Снегурочка и весёлые эльфы уже готовы к встрече с вами. Увлекательные игры и конкурсы, зажигательные танцы и хороводы, волшебные поздравления и вручение подарков, красивые фотографии с героями. Пригласите сказку на ваш праздник!",
  },
  ro: {
    tag: "Animatori în Bălți",
    l1: "PERSONAJELE",
    l2: "DE ANUL NOU",
    ribbon: ["Povestea magică", "este tot mai aproape!"],
    badges: ["Jocuri și concursuri", "Dansuri și hore", "Felicitări și cadouri", "Fotografii cu personajele", "Multă bucurie și emoții"],
    cta: ["Invitați magia sărbătorilor", "la evenimentul vostru!"],
    sr: "Personajele de Anul Nou: animatori în Bălți. Povestea magică este tot mai aproape! Moș Crăciun, Crăciunița și elfii veseli sunt deja gata să vă întâlnească. Jocuri și concursuri captivante, dansuri energice și hore în jurul bradului, felicitări magice și oferirea cadourilor, fotografii spectaculoase alături de personajele de poveste. Invitați magia sărbătorilor la evenimentul vostru!",
  },
} as const;

export const ICONS = ["star", "music", "gift", "camera", "heart"] as const;
export type IconName = (typeof ICONS)[number];
