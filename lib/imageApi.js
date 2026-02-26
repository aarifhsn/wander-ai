export async function fetchDestinationImages(destination, count = 5) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination + " travel")}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    return data.results.map((img) => ({
      url: img.urls.regular,
      thumb: img.urls.small,
      alt: img.alt_description || destination,
      photographer: img.user.name,
      photographerUrl: img.user.links.html,
    }));
  } catch (e) {
    console.error("Unsplash API Error:", e);
    // Fallback to placeholder images
    return Array(count)
      .fill(null)
      .map((_, i) => ({
        url: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop`,
        thumb: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop`,
        alt: destination,
      }));
  }
}
