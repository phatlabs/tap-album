import { redirect } from "next/navigation";
import { getAlbumByNfcCode } from "../data/albums";

export default function CardPage({
  params,
}: {
  params: { cardCode: string };
}) {
  const { cardCode } = params;

  // Find album by NFC code
  const album = getAlbumByNfcCode(cardCode);

  // If no album, show error screen
  if (!album) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at top, #1f3bff 0, #020617 55%)",
          color: "white",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "1rem",
          }}
        >
          Album Not Found
        </h1>
        <p style={{ maxWidth: 480, opacity: 0.85, marginBottom: "0.5rem" }}>
          This NFC card / link is not attached to an album yet.
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          Code: <strong>{cardCode.toUpperCase()}</strong>
        </p>
      </main>
    );
  }

  // If album exists, redirect to /album/[albumId]
  redirect(`/album/${album.id}`);
}
