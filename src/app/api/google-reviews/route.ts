import { NextResponse } from 'next/server';

// Refresh from Google at most once a day.
export const revalidate = 86400;

// FITTROCK ERGONOMICS LLP on Google Maps
const DEFAULT_PLACE_ID = 'ChIJj4ngOffHwjsR_2J_IlyNKXs';

interface PlacesReview {
  name: string;
  rating: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;

  if (!apiKey) {
    return NextResponse.json({ error: 'Google reviews are not configured' }, { status: 503 });
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate },
    });

    if (!res.ok) {
      console.error('Google Places API error:', res.status, await res.text());
      return NextResponse.json({ error: 'Failed to load Google reviews' }, { status: 502 });
    }

    const place: PlaceDetails = await res.json();

    return NextResponse.json({
      rating: place.rating ?? null,
      totalReviews: place.userRatingCount ?? 0,
      mapsUrl: place.googleMapsUri ?? null,
      reviews: (place.reviews ?? []).map((r) => ({
        id: r.name,
        author_name: r.authorAttribution?.displayName || 'Google user',
        author_url: r.authorAttribution?.uri || null,
        avatar: r.authorAttribution?.photoUri || null,
        date: r.relativePublishTimeDescription || '',
        rating: r.rating,
        comment: r.originalText?.text || r.text?.text || '',
      })),
    });
  } catch (err) {
    console.error('Google Places API request failed:', err);
    return NextResponse.json({ error: 'Failed to load Google reviews' }, { status: 502 });
  }
}
