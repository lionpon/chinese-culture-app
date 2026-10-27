import { cookies } from "next/headers";
import NamingClient from "./NamingClient";

export default async function NamingPage({ searchParams }: {
  searchParams?: { gender?: string; year?: string };
}) {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  const gender = searchParams?.gender === "male" || searchParams?.gender === "female" ? searchParams.gender : undefined;
  const yearNum = searchParams?.year ? parseInt(searchParams.year) : NaN;
  const birthYear = !isNaN(yearNum) && yearNum >= 1900 && yearNum <= 2100 ? String(yearNum) : undefined;
  return <NamingClient initialHasFree={!freeUsed} initialGender={gender} initialBirthYear={birthYear} />;
}
