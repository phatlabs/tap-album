import { getAlbumByNfcCode } from "../data/albums";

type CardPageProps = {
  params: {
    cardCode: string;
  };
};

export default function Page({ params }: CardPageProps) {
  const album = getAlbumByNfcCode(params.cardCode);

  if (!album) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Album Not Found</h1>
        <p>No album exists for this NFC / card code.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>{album.title}</h1>
      <h2>{album.artist}</h2>
      <p>Year: {album.year}</p>
      <p>Tracks: {album.trackCount}</p>
    </main>
  );
}
