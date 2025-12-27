// app/[cardCode]/page.tsx
import { redirect } from "next/navigation";
import { getAlbumByNfcCode } from "../data/albums";

type CardPageProps = {
  params: {
    cardCode: string;
  };
};

export default function CardCodePage({ params }: CardPageProps) {
  const { cardCode } = params;

  // Look up album by NFC / QR code
  const album = getAlbumByNfcCode(cardCode);

  // If we find a match, redirect straight to the album page
  if (album) {
    redirect(`/album/${album.id}`);
  }

  // If no album is attached to this NFC code yet, show a friendly message
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #192bff 0, #050a30 55%, #020314 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <p style={{ opacity: 0.8, fontSize: 12, letterSpacing: 2 }}>
          TAP ALBUM
        </p>
        <h1 style={{ marginTop: 12, fontSize: 24, fontWeight: 700 }}>
          Album Not Found
        </h1>
        <p style={{ marginTop: 10, opacity: 0.75, fontSize: 14 }}>
          This NFC card / link is not attached to an album yet.
        </p>
        <p
          style={{
            marginTop: 16,
            fontSize: 12,
            opacity: 0.6,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Code: <span style={{ fontWeight: 600 }}>{cardCode}</span>
        </p>
      </div>
    </main>
  );
}
