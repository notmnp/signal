import { redirect } from "next/navigation";

// The Daily Habit Log is the effective landing screen: the root always
// redirects to /log on every load.
export default function Home() {
  redirect("/log");
}
