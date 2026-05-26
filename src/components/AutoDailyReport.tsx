import { generateReport } from "@/lib/report";

export default async function AutoDailyReport() {
  const today = new Date().toISOString().slice(0, 10);
  await generateReport(today);
  return null;
}
