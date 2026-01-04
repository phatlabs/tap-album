// app/[cardCode]/page.tsx
import React from "react";
import Link from "next/link";
import { getAlbumByNfcCode } from "../data/albums";

// Keep this so the page is always rendered fresh
export const dynamic = "force-dynamic";

export default function CardPage({ params }: any) {
  const cardCode = String(params?.cardCode || "").toLowerCase();
  const album = getAlbumByNfcCode(cardCode);

  // If we didn't find an album for this card, show a friendly 404-style message
  if (!album) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          color: "white",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 8 }}>Card not found</h1>
          <p style={{ marginBottom: 24 }}>
            We couldn&apos;t find an album linked to the card code{" "}
            <code>{cardCode}</code>.
          </p>
          <Link href="/" style={{ textDecoration: "underline" }}>
            Back to Tap Album home
          </Link>
        </div>
      </main>
    );
  }

  // If we DO have an album, show the album info
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#020617",
        color: "white",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: 720, width: "100%" }}>
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: 12,
            marginBottom: 8,
            opacity: 0.8,
          }}
        >
          Tap Album • NFC Access
        </p>

        <h1 style={{ fontSize: 32, marginBottom: 4 }}>{album.title}</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          {album.artist} • {album.year} • {album.trackCount} tracks
        </p>

        {/* Simple audio player for first track */}
        {album.tracks[0] && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ marginBottom: 8 }}>Preview: {album.tracks[0].title}</p>
            <audio controls style={{ width: "100%" }}>
              <source src={album.tracks[0].audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          <strong>Connect with the artist</strong>
          <Link href={album.social.instagram} target="_blank">
            Instagram
          </Link>
          <Link href={album.social.youtube} target="_blank">
            YouTube
          </Link>
          <Link href={album.social.bigcartel} target="_blank">
            Shop / Merch
          </Link>
        </div>

        <Link
          href={`/album/${album.id}`}
          style={{ textDecoration: "underline", fontSize: 14 }}
        >
          View full album page
        </Link>
      </div>
    </main>
  );
}

// Metadata for SEO / link previews
export async function generateMetadata({ params }: any) {
  const cardCode = String(params?.cardCode || "").toLowerCase();
  const album = getAlbumByNfcCode(cardCode);

  if (!album) {
    return {
      title: "Card not found – Tap Album",
      description: "We couldn’t find an album linked to this NFC card.",
    };
  }

  return {
    title: `${album.title} – ${album.artist} | Tap Album`,
    description: `Exclusive tap-only access to ${album.title} by ${album.artist}.`,
  };
}
