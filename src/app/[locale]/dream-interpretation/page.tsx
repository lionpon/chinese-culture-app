import { cookies } from "next/headers";
import DreamClient from "./DreamClient";

export default async function DreamInterpretationPage() {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  return <DreamClient initialHasFree={!freeUsed} />;
}
