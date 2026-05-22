import { Suspense } from "react";
import HeroCardPage from "./herocard/page";
import HeroCardLoading from "./herocard/loading";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect("/herocard")
  );
}
