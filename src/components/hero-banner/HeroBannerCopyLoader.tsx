"use client";

import dynamic from "next/dynamic";
import type { HeroBannerCopyProps } from "./HeroBannerCopy";

// ssr: false допустим только в клиентском компоненте, поэтому загрузчик отдельный
const HeroBannerCopy = dynamic(() => import("./HeroBannerCopy"), { ssr: false });

export default function HeroBannerCopyLoader(props: HeroBannerCopyProps) {
  return <HeroBannerCopy {...props} />;
}
