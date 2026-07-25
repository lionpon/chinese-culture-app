import { cookies } from "next/headers";
import CalendarClient from "./CalendarClient";

export default async function CalendarPage() {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  return <CalendarClient initialHasFree={!freeUsed} />;
}
