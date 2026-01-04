// app/[cardCode]/page.tsx
import React from "react";
import { redirect } from "next/navigation";
import { getAlbumByNfcCode } from "../data/albums";

type CardPageProps = {
  params: {
    cardCode: string;
  };
};

export default function CardPage({ params }: CardPageProps) {
  const album = getAlbumByNfcCode(params.cardCode);

  // If NFC code / URL is bad, send them home
  if (!album) {
    redirect("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 16px",
        background:
          "radial-gradient(circle at top left, #4f46e5 0, #020617 60%)",
        color: "white",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1080 }}>
        {/* Top text */}
        <header
          style={{
            marginBottom: 32,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#9ca3af",
                marginBottom: 8,
              }}
            >
              Tap Album
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>
              {album.title}
            </h1>
            <p style={{ fontSize: 16, color: "#e5e7eb" }}>
              by <strong>{album.artist}</strong> • {album.year} •{" "}
              {album.trackCount} tracks
            </p>
          </div>
        </header>

        {/* Tracks */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Tracks</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {album.tracks.map((track) => (
              <li
                key={track.id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(148,163,184,0.3)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>
                  {track.id}. {track.title}
                </span>
                <span style={{ opacity: 0.8 }}>{track.duration}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Social links */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {album.social.instagram && (
            <a
              href={album.social.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, textDecoration: "underline" }}
            >
              Instagram
            </a>
          )}
          {album.social.youtube && (
            <a
              href={album.social.youtube}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, textDecoration: "underline" }}
            >
              YouTube
            </a>
          )}
          {album.social.website && (
            <a
              href={album.social.website}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, textDecoration: "underline" }}
            >
              Website
            </a>
          )}
          {album.social.bigcartel && (
            <a
              href={album.social.bigcartel}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, textDecoration: "underline" }}
            >
              Store
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
