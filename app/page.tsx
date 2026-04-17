import HeroSection from "@/components/HeroSection";
import Urls from "@/components/Urls";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/config/nextAuth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Trimly - URL Shortener",
  description: "Trimly is a free URL shortener that helps you shorten your links and track your clicks.",
};

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user.type == "admin") {
    redirect("/admin");
  }
  return (
    <>
      <HeroSection />
      <Urls />
    </>
  );
}
