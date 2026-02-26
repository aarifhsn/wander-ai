import { TravelPlan } from "@/models/TravelPlan";
import HomeClient from "../components/HomeClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  let latestPlans = [];

  try {
    const plans = await TravelPlan.getLatest(3);

    // Convert MongoDB ObjectIds to strings for client component
    latestPlans = plans.map((plan) => ({
      _id: plan._id.toString(),
      slug: plan.slug,
      destinationName: plan.destinationName,
      days: plan.days,
      title: plan.title,
      subtitle: plan.subtitle,
      description: plan.description,
      heroImage: plan.heroImage,
      images: plan.images,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch latest plans:", error);
  }

  return <HomeClient latestPlans={latestPlans} />;
}
