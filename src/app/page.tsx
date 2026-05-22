import { Suspense } from "react";
import HeroCardPage from "./herocard/page";
import HeroCardLoading from "./herocard/loading";
import { redirect } from "next/navigation";

/**
 * Redirects the current request to the "/herocard" route.
 *
 * @returns The result of initiating the redirect to `/herocard`.
 */
export default function Home() {
  return (
    redirect("/herocard")
  );
}
