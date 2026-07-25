import { cookies } from "next/headers";
import NamingClient from "./NamingClient";

export default async function NamingPage() {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  return <NamingClient initialHasFree={!freeUsed} />;
}
