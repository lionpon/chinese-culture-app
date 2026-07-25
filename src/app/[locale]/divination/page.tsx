import { cookies } from "next/headers";
import DivinationClient from "./DivinationClient";

export default async function DivinationPage() {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  return <DivinationClient initialHasFree={!freeUsed} />;
}
