import { Suspense } from "react";
import HeroCardPage from "./herocard/(herocard-list)/page";
import HeroCardLoading from "./herocard/(herocard-list)/loading";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect("/content")
  );
}
