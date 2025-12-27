// app/page.tsx
import React from "react";
import Link from "next/link";
import { albums } from "./data/albums";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 16px",
        background:
          "radial-gradient(circle at top left, #4f46e5 0, #020617 55%)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1080,
          color: "white",
        }}
      >
        {/* Top header */}
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
            <h1
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Sell music directly from your phone
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#cbd5f5",
                maxWidth: 520,
              }}
            >
              Tap an NFC card, pull up the album, and get paid. This page shows
              all albums you’ve set up inside your Tap Album app.
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            <div>Local dev: <code>localhost:3000</code></div>
            <div>Test NFC: <code>/test-nfc</code></div>
          </div>
        </header>

        {/* Album grid */}
        <section>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Your Albums
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/album/${album.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <article
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.86))",
                    borderRadius: 24,
                    padding: 18,
                    border: "1px solid rgba(148,163,184,0.35)",
                    boxShadow: "0 18px 50px rgba(15,23,42,0.9)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    cursor: "pointer",
                  }}
                >
                  {/* Top row: cover + info */}
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 18,
                        background:
                          "linear-gradient(135deg, #f97316, #fb7185, #6366f1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      {album.coverEmoji}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        overflow: "hidden",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: 200,
                        }}
                      >
                        {album.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#a5b4fc",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: 200,
                        }}
                      >
                        {album.artist}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#9ca3af",
                        }}
                      >
                        {album.year} • {album.trackCount} tracks •{" "}
                        {album.type}
                      </p>
                    </div>
                  </div>

                  {/* Small track preview */}
                  <div
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                    }}
                  >
                    {album.tracks.length > 0 ? (
                      <>
                        <span
                          style={{
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                            fontWeight: 600,
                            color: "#6b7280",
                          }}
                        >
                          includes
                        </span>{" "}
                        {album.tracks
                          .slice(0, 2)
                          .map((t) => t.title)
                          .join(" • ")}
                        {album.tracks.length > 2 ? " +" : ""}
                      </>
                    ) : (
                      "No tracks added yet"
                    )}
                  </div>

                  {/* Bottom row: NFC + button */}
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px dashed rgba(251,191,36,0.8)",
                        backgroundColor: "rgba(24,24,27,0.7)",
                        color: "#facc15",
                      }}
                    >
                      NFC code:{" "}
                      <span
                        style={{
                          fontFamily: "monospace",
                        }}
                      >
                        {album.nfcCode ?? "not-set"}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background:
                          "linear-gradient(135deg, #6366f1, #22d3ee)",
                        color: "#020617",
                        fontWeight: 600,
                      }}
                    >
                      Open Album →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
