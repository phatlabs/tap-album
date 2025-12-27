// app/album/[albumId]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAlbumById } from "../../data/albums";

type AlbumPageProps = {
  params: {
    albumId: string;
  };
};

export default function AlbumPage({ params }: AlbumPageProps) {
  const album = getAlbumById(params.albumId);

  const [currentTrackId, setCurrentTrackId] = useState<number | null>(
    album?.tracks[0]?.id ?? null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => {
          // ignore autoplay errors
        });
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackId, isPlaying]);

  if (!album) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #1d4ed8, #020617 55%, #000 100%)",
        }}
      >
        <h1 style={{ color: "#e5e7eb", fontSize: 24, fontWeight: 600 }}>
          Album not found.
        </h1>
      </main>
    );
  }

  const currentTrack =
    album.tracks.find((t) => t.id === currentTrackId) ?? album.tracks[0];

  const handleTrackClick = (trackId: number) => {
    // same track -> toggle play / pause
    if (currentTrackId === trackId) {
      setIsPlaying((prev) => !prev);
    } else {
      // switch to new track and play
      setCurrentTrackId(trackId);
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    const index = album.tracks.findIndex((t) => t.id === currentTrackId);
    const next = album.tracks[index + 1];

    if (next) {
      setCurrentTrackId(next.id);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const socialButtonStyle = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(148,163,184,0.4)",
    backgroundColor: "rgba(15,23,42,0.8)",
    color: "#e5e7eb",
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "none",
  } as const;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, #1d4ed8, #020617 55%, #000 100%)",
      }}
    >
      {/* hidden audio element that actually plays the music */}
      {currentTrack?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onEnded={handleEnded}
          style={{ display: "none" }}
        />
      )}

      <div
        style={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 32,
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.98))",
          boxShadow: "0 24px 80px rgba(15,23,42,0.9)",
          padding: 24,
          color: "#e5e7eb",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Top header */}
        <header style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 4,
            }}
          >
            Tap Album
          </div>
          <div style={{ fontSize: 11, opacity: 0.5 }}>
            NFC Powered Music Experience
          </div>
        </header>

        {/* Album header */}
        <section
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background:
                "radial-gradient(circle at 20% 0%, #f97316 0%, #ec4899 40%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: "0 16px 40px rgba(59,130,246,0.4)",
            }}
          >
            <span role="img" aria-label="album">
              {album.coverEmoji || "🎵"}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {album.title}
            </h1>
            <div
              style={{
                fontSize: 14,
                opacity: 0.8,
                marginBottom: 8,
              }}
            >
              {album.artist}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                fontSize: 11,
                opacity: 0.6,
              }}
            >
              <span>{album.type}</span>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span>{album.trackCount} Tracks</span>
            </div>
          </div>
        </section>

        {/* Social links */}
        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Connect
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {album.social.instagram && (
              <a
                href={album.social.instagram}
                target="_blank"
                rel="noreferrer"
                style={socialButtonStyle}
              >
                Instagram
              </a>
            )}
            {album.social.twitter && (
              <a
                href={album.social.twitter}
                target="_blank"
                rel="noreferrer"
                style={socialButtonStyle}
              >
                Twitter / X
              </a>
            )}
            {album.social.youtube && (
              <a
                href={album.social.youtube}
                target="_blank"
                rel="noreferrer"
                style={socialButtonStyle}
              >
                YouTube
              </a>
            )}
            {album.social.website && (
              <a
                href={album.social.website}
                target="_blank"
                rel="noreferrer"
                style={socialButtonStyle}
              >
                Website
              </a>
            )}
            {album.social.bigcartel && (
              <a
                href={album.social.bigcartel}
                target="_blank"
                rel="noreferrer"
                style={socialButtonStyle}
              >
                Merch Store
              </a>
            )}
          </div>
        </section>

        {/* Tracks */}
        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Tracks
          </h2>

          <div
            style={{
              borderRadius: 20,
              background:
                "radial-gradient(circle at top left, rgba(15,23,42,0.9), rgba(15,23,42,0.98))",
              border: "1px solid rgba(148,163,184,0.25)",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {album.tracks.map((track, index) => {
              const isActive = currentTrack?.id === track.id && isPlaying;
              return (
                <button
                  key={track.id}
                  onClick={() => handleTrackClick(track.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 14,
                    width: "100%",
                    border: "none",
                    backgroundColor: isActive
                      ? "rgba(59,130,246,0.25)"
                      : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      fontSize: 12,
                      opacity: isActive ? 0.9 : 0.6,
                    }}
                  >
                    {index + 1}
                  </span>

                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background:
                        "radial-gradient(circle at 10% 0%, #f97316 0%, #ec4899 40%, #6366f1 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    🎵
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {track.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        opacity: 0.6,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {track.artist}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: 12,
                      opacity: 0.6,
                      marginRight: 8,
                    }}
                  >
                    {track.duration}
                  </span>

                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "999px",
                      border: "1px solid rgba(148,163,184,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      backgroundColor: isActive
                        ? "rgba(15,23,42,0.9)"
                        : "transparent",
                    }}
                  >
                    {isActive ? "⏸" : "▶️"}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Upcoming shows */}
        {album.tickets.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Upcoming Shows
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {album.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    borderRadius: 16,
                    padding: 14,
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(129,140,248,0.18))",
                    border: "1px solid rgba(148,163,184,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {ticket.name}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>
                        {ticket.venue} • {ticket.city}
                      </div>
                    </div>
                    {ticket.provider && (
                      <span
                        style={{
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(148,163,184,0.7)",
                          opacity: 0.8,
                        }}
                      >
                        {ticket.provider}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      fontSize: 11,
                      opacity: 0.7,
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <span style={{ opacity: 0.6 }}>Date · </span>
                      {ticket.date}
                    </div>
                    <div>
                      <span style={{ opacity: 0.6 }}>Time · </span>
                      {ticket.time}
                    </div>
                  </div>

                  {ticket.url && (
                    <div style={{ marginTop: 4 }}>
                      <a
                        href={ticket.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 11,
                          padding: "6px 10px",
                          borderRadius: 999,
                          backgroundColor: "rgba(15,23,42,0.9)",
                          border: "1px solid rgba(148,163,184,0.7)",
                          textDecoration: "none",
                          color: "#e5e7eb",
                        }}
                      >
                        View tickets
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Merch */}
        {album.merch.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Official Merch
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {album.merch.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    background:
                      "radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(15,23,42,0.98))",
                    border: "1px solid rgba(148,163,184,0.35)",
                    textDecoration: "none",
                    color: "#e5e7eb",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 5",
                      borderRadius: 12,
                      background:
                        "radial-gradient(circle at 20% 0%, #f97316, #ec4899 40%, #6366f1 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        opacity: 0.7,
                      }}
                    >
                      <span>{item.price}</span>
                      {item.provider && <span>{item.provider}</span>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Mini player (inside card bottom) */}
        {currentTrack && (
          <section
            style={{
              marginTop: 8,
              paddingTop: 12,
              borderTop: "1px solid rgba(15,23,42,0.8)",
            }}
          >
            <div
              style={{
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(15,23,42,0.9), rgba(30,64,175,0.9))",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background:
                      "radial-gradient(circle at 20% 0%, #f97316, #ec4899 40%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  🎵
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {currentTrack.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.6,
                    }}
                  >
                    {currentTrack.artist}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleTrackClick(currentTrack.id)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#f97316",
                  color: "#0f172a",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? "⏸" : "▶️"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
