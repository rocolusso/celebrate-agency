import type { IconName } from "./copy";

export function Icon({ name }: { name: IconName }) {
  const p = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "star":
      return (
        <svg {...p}>
          <path d="M12 2l2.6 6.4L21 9.3l-4.9 4.4L17.5 20 12 16.6 6.5 20l1.4-6.3L3 9.3l6.4-.9z" />
        </svg>
      );
    case "music":
      return (
        <svg {...p}>
          <path d="M9 3v12.3A3.5 3.5 0 1 0 11 18.5V8l8-2v7.3A3.5 3.5 0 1 0 21 16.5V2z" transform="translate(-1 1) scale(.95)" />
        </svg>
      );
    case "gift":
      return (
        <svg {...p}>
          <path d="M3 8h18v4H3zM4 13h7v8H5a1 1 0 0 1-1-1zM13 13h7v7a1 1 0 0 1-1 1h-6zM11 8h2v13h-2zM12 8C9.5 8 7.5 6.8 7.5 5.2 7.5 3.8 9 3 10.2 3.6 11.4 4.2 12 6 12 8zM12 8c2.5 0 4.5-1.2 4.5-2.8C16.5 3.8 15 3 13.8 3.6 12.6 4.2 12 6 12 8z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <path d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4zM12 9a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fillRule="evenodd" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M12 21s-8-5.3-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.8C20 15.7 12 21 12 21z" />
        </svg>
      );
  }
}
