// app/[cardCode]/page.tsx

import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAlbumByNfcCode } from "../data/albums";

export const metadata: Metadata = {
  title: "Tap Album | Card",
};

export default function CardPage({ params }: any) {
  // raw value from the URL: /[cardCode]
  const rawCode = params?.cardCode ?? "";
  const cardCode = String(rawCode).toLowerCase();

  const album = getAlbumByNfcCode(cardCode);

  // If NO album is attached to this NFC / QR code → show “Album Not Found”
  if (!album) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #0014ff, #4000b3)",
          color: "#ffffff",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
          }}
        >
          Album Not Found
        </h1>
        <p style={{ marginBottom: "0.75rem", maxWidth: 480 }}>
          This NFC card / link is not attached to an album yet.
        </p>
        <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
          Code: <code>{rawCode}</code>
        </p>
      </main>
    );
  }

  // If we DO have an album, send them straight to /album/[albumId]
  redirect(`/album/${album.id}`);
}
