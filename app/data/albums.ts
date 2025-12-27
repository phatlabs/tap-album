// app/data/albums.ts

export type SocialLinks = {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  bigcartel?: string;
};

export type Track = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string; // optional
};

export type Ticket = {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  time: string;
  provider?: string; // e.g. "Ticketmaster"
  url?: string;
};

export type MerchItem = {
  id: string;
  name: string;
  price: string;
  emoji: string;
  provider?: string; // e.g. "BigCartel"
  url?: string;
};

export type Album = {
  id: string; // used in /album/[albumId]
  nfcCode?: string; // used in /[cardCode]
  title: string;
  artist: string;
  year: string;
  trackCount: number;
  type: string;
  coverEmoji: string;
  social: SocialLinks;
  tracks: Track[];
  tickets: Ticket[];
  merch: MerchItem[];
};

export const albums: Album[] = [
  {
    // 🔗 http://localhost:3000/album/cash-mcgraw-ashes
    id: "cash-mcgraw-ashes",

    // 🔗 http://localhost:3000/cash-001  (NFC / QR link)
    nfcCode: "cash-001",

    title: "Midnight Dreams",
    artist: "Cash McGraw",
    year: "2026",
    trackCount: 4,
    type: "Tap Album",
    coverEmoji: "🎵",
    social: {
      instagram: "https://instagram.com/djrocafella",
      twitter: "https://twitter.com/yourartist",
      youtube: "https://youtube.com/@cashmcgraw",
      website: "https://yourartistwebsite.com",
      bigcartel: "https://yourshop.bigcartel.com",
    },
    tracks: [
      {
        id: 1,
        title: "Ashes (Country Trap Ballad)",
        artist: "Cash McGraw",
        duration: "2:55",
        audioUrl: "/audio/cash-mcgraw-ashes.mp3", // your real mp3
      },
      {
        id: 2,
        title: "Electric Dreams",
        artist: "The Synthwave Collective",
        duration: "4:12",
        audioUrl: "/audio/electric-dreams.mp3", // placeholder
      },
      {
        id: 3,
        title: "Retro Waves",
        artist: "The Synthwave Collective",
        duration: "3:28",
        audioUrl: "/audio/retro-waves.mp3", // placeholder
      },
      {
        id: 4,
        title: "Cyber Highway",
        artist: "The Synthwave Collective",
        duration: "5:01",
        audioUrl: "/audio/cyber-highway.mp3", // placeholder
      },
    ],
    tickets: [
      {
        id: "la-show",
        name: "Midnight Dreams Tour",
        date: "March 15, 2026",
        venue: "The Paradox",
        city: "Los Angeles, CA",
        time: "8:00 PM",
        provider: "Ticketmaster",
        url: "https://ticketmaster.com",
      },
      {
        id: "tx-fest",
        name: "Electric Festival",
        date: "April 22, 2026",
        venue: "Synth Arena",
        city: "Austin, TX",
        time: "7:30 PM",
        provider: "Ticketmaster",
        url: "https://ticketmaster.com",
      },
    ],
    merch: [
      {
        id: "tee",
        name: "Neon Tour Tee",
        price: "$35",
        emoji: "👕",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/tee",
      },
      {
        id: "cap",
        name: "Retro Wave Cap",
        price: "$28",
        emoji: "🧢",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/cap",
      },
      {
        id: "poster",
        name: "Album Poster",
        price: "$20",
        emoji: "🎧",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/poster",
      },
      {
        id: "vinyl",
        name: "Vinyl Edition",
        price: "$45",
        emoji: "💿",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/vinyl",
      },
    ],
  },
];

// 🔍 Look up by albumId: /album/[albumId]
export function getAlbumById(albumId: string): Album | undefined {
  return albums.find(
    (album) => album.id.toLowerCase() === albumId.toLowerCase()
  );
}

// 🔍 Look up by NFC / card code: /[cardCode]
export function getAlbumByNfcCode(cardCode: string): Album | undefined {
  return albums.find(
    (album) => album.nfcCode?.toLowerCase() === cardCode.toLowerCase()
  );
}
