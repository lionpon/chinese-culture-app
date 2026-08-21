import { cookies } from "next/headers";
import CalendarClient from "./CalendarClient";

const VALID_EVENTS = [
  "wedding", "engagement", "business", "travel", "moving", "contract",
  "sacrifice", "construction", "medical", "funeral", "education", "meeting", "renovation",
];

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { date?: string; event?: string };
}) {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get("cc_free_used")?.value === "1";
  // Deep-link prefill from guide date-check tool (?date=YYYY-MM-DD&event=wedding)
  const initialDate =
    typeof searchParams.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.date)
      ? searchParams.date
      : "";
  const initialEvent =
    typeof searchParams.event === "string" && VALID_EVENTS.includes(searchParams.event)
      ? searchParams.event
      : "";
  return (
    <CalendarClient
      initialHasFree={!freeUsed}
      initialDate={initialDate}
      initialEvent={initialEvent}
    />
  );
}
