// app/[cardCode]/page.tsx

import type { Metadata } from "next";
import { getAlbumByNfcCode } from "../data/albums";

export const metadata: Metadata = {
  title: "Tap Album | Card Debug",
};

// force Next 15 to treat this as dynamic
export const dynamic = "force-dynamic";

export default function CardPage({ params }: any) {
  const rawCode = params?.cardCode ?? "";
  const cardCode = String(rawCode).toLowerCase();

  const album = getAlbumByNfcCode(cardCode);

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
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: 8 }}>
          Debug: No album for this code
        </h1>
        <p style={{ marginBottom: 8 }}>Raw code from URL:</p>
        <code
          style={{
            padding: "4px 8px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 4,
          }}
        >
          {rawCode}
        </code>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "radial-gradient(circle at top, #facc15, #0f172a)",
        color: "#ffffff",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: 8 }}>
        Debug: Card found
      </h1>
      <p style={{ marginBottom: 8 }}>cardCode from URL:</p>
      <code
        style={{
          padding: "4px 8px",
          background: "rgba(0,0,0,0.3)",
          borderRadius: 4,
          marginBottom: 16,
          display: "inline-block",
        }}
      >
        {rawCode}
      </code>

      <p style={{ marginBottom: 4 }}>Matched album:</p>
      <pre
        style={{
          textAlign: "left",
          maxWidth: 500,
          fontSize: 12,
          whiteSpace: "pre-wrap",
          background: "rgba(15,23,42,0.9)",
          padding: 12,
          borderRadius: 8,
        }}
      >
        {JSON.stringify(album, null, 2)}
      </pre>
    </main>
  );
}
