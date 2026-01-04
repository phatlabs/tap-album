// app/data/albums.ts

// ---- Types ----
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
  audioUrl: string;
};

export type Ticket = {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  time: string;
  provider: string;
  url: string;
};

export type MerchItem = {
  id: string;
  name: string;
  price: string;
  emoji: string;
  provider?: string;
  url?: string;
};

export type Album = {
  id: string;          // used by /album/[albumId]
  nfcCode?: string;    // used by /[cardCode]
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

// ---- Data ----

export const albums: Album[] = [
  {
    id: "cash-mcgraw-ashes",
    nfcCode: "cash-001",

    title: "Midnight Dreams",
    artist: "Cash McGraw",
    year: "2026",
    trackCount: 4,
    type: "Tap Album",
    coverEmoji: "🎵🔥",

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
        audioUrl: "/audio/cash-mcgraw-ashes.mp3",
      },
      {
        id: 2,
        title: "Electric Dreams",
        artist: "The Synthwave Collective",
        duration: "4:12",
        audioUrl: "/audio/electric-dreams.mp3",
      },
      {
        id: 3,
        title: "Retro Waves",
        artist: "The Synthwave Collective",
        duration: "3:28",
        audioUrl: "/audio/retro-waves.mp3",
      },
      {
        id: 4,
        title: "Cyber Highway",
        artist: "The Synthwave Collective",
        duration: "5:01",
        audioUrl: "/audio/cyber-highway.mp3",
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
        url: "https://ticketmaster.com/",
      },
    ],

    merch: [
      {
        id: "tee-1",
        name: "Midnight Dreams Tee",
        price: "$35",
        emoji: "👕",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/midnight-dreams-tee",
      },
      {
        id: "vinyl-1",
        name: "Vinyl Edition",
        price: "$45",
        emoji: "💿",
        provider: "BigCartel",
        url: "https://yourshop.bigcartel.com/product/vinyl",
      },
    ],
  },
];

// ---- Helper functions ----

// Look up by albumId – /album/[albumId]
export function getAlbumById(albumId: string): Album | undefined {
  return albums.find(
    (album) => album.id.toLowerCase() === albumId.toLowerCase(),
  );
}

// Look up by NFC / card code – /[cardCode]
export function getAlbumByNfcCode(cardCode: string): Album | undefined {
  return albums.find(
    (album) => album.nfcCode?.toLowerCase() === cardCode.toLowerCase(),
  );
}
