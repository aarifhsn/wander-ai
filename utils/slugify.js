export function slugify(destination, days) {
  const cleanDestination = destination
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return `${cleanDestination}-${days}-days`;
}

export function parseSlug(slug) {
  const parts = slug.split("-");
  const daysIndex = parts.indexOf("days");

  if (daysIndex === -1 || daysIndex === 0) {
    return null;
  }

  const days = parseInt(parts[daysIndex - 1]);
  const destination = parts.slice(0, daysIndex - 1).join(" ");

  return { destination, days };
}
