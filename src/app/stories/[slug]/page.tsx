import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stories, getStory, studio } from "@/lib/content";
import StoryView from "./StoryView";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const story = getStory(params.slug);
  if (!story) return { title: "Story not found" };
  const title = `${story.couple} — ${story.title}`;
  const description = `${story.eventType} in ${story.location}, ${story.year}. ${story.excerpt} Captured by ${studio.fullName}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: story.cover }],
      type: "article",
    },
  };
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStory(params.slug);
  if (!story) notFound();

  const idx = stories.findIndex((s) => s.slug === story.slug);
  const next = stories[(idx + 1) % stories.length];

  return <StoryView story={story} next={next} />;
}
