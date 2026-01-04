// app/[cardCode]/page.tsx

import { redirect } from "next/navigation";
import { getAlbumByNfcCode } from "../data/albums";

// ⭐️ THIS is the only valid type shape Next 15 expects:
export default function CardPage({
  params,
}: {
  params: { cardCode: string };
}) {
  const code = params.cardCode.toLowerCase();
  const album = getAlbumByNfcCode(code);

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
        }}
      >
        <div
          style={{
            maxWidth: 480,
            padding: 32,
            borderRadius: 24,
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,118,110,0.85))",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Album Not Found
          </h1>

          <p style={{ opacity: 0.8, marginBottom: 12 }}>
            This NFC card / link is not attached to an album yet.
          </p>

          <p style={{ opacity: 0.7, fontSize: 12 }}>
            Code: <strong>{code}</strong>
          </p>
        </div>
      </main>
    );
  }

  // ⭐️ Redirect to real album page
  redirect(`/album/${album.id}`);
}

