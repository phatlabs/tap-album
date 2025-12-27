// app/[cardCode]/page.tsx

import { redirect } from "next/navigation";
import { getAlbumByNfcCode } from "../data/albums";

// NOTE: do NOT put "use client" at the top of this file.

export default function CardPage({
  params,
}: {
  params: { cardCode: string };
}) {
  const code = params.cardCode.toLowerCase();
  const album = getAlbumByNfcCode(code);

  // If no album is linked to this NFC / code, show a message
  if (!album) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #1d4ed8, #020617 60%)",
          color: "white",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            padding: 32,
            borderRadius: 24,
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,118,110,0.85))",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(148,163,184,0.15)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 8,
              letterSpacing: 0.4,
            }}
          >
            Album Not Found
          </h1>

          <p
            style={{
              fontSize: 14,
              opacity: 0.85,
              marginBottom: 16,
            }}
          >
            This NFC card / link is not attached to an album yet.
          </p>

          <p
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              opacity: 0.8,
              marginBottom: 24,
            }}
          >
            Code:{" "}
            <span
              style={{
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 999,
                backgroundColor: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(148,163,184,0.7)",
              }}
            >
              {code}
            </span>
          </p>

          <div
            style={{
              fontSize: 12,
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            Link this NFC code to an album in <strong>app/data/albums.ts</strong>{" "}
            and fans will be auto-redirected to your tap album page.
          </div>
        </div>
      </main>
    );
  }

  // If we *do* have an album, send them to /album/[albumId]
  redirect(`/album/${album.id}`);
}
