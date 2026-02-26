import { TravelPlan } from "@/models/TravelPlan";
import { notFound } from "next/navigation";
import PlanDetailsClient from "../../../components/PlanDetailsClient";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const plan = await TravelPlan.findBySlug(slug);

    if (!plan) {
      return {
        title: "Plan Not Found",
      };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    return {
      title: `${plan.title} - ${plan.days} Days Travel Plan`,
      description: plan.description,
      openGraph: {
        title: plan.title,
        description: plan.description,
        images: [
          {
            url: plan.heroImage?.url || plan.images?.[0]?.url,
            width: 1200,
            height: 630,
            alt: plan.destinationName,
          },
        ],
        type: "website",
        url: `${appUrl}/plan/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: plan.title,
        description: plan.description,
        images: [plan.heroImage?.url || plan.images?.[0]?.url],
      },
    };
  } catch (e) {
    return {
      title: "Travel Plan",
    };
  }
}

export default async function PlanPage({ params }) {
  const { slug } = params;

  try {
    const plan = await TravelPlan.findBySlug(slug);

    if (!plan) {
      notFound();
    }

    // Convert MongoDB ObjectId to string for client component
    const planData = {
      ...plan,
      _id: plan._id.toString(),
    };

    return <PlanDetailsClient plan={planData} />;
  } catch (e) {
    console.error("Error loading plan:", e);
    notFound();
  }
}
