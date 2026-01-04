
import { redirect } from "next/navigation";
import albums from "../data/albums";

type CardPageProps = {
  params: {
    cardCode: string;
  };
};

export default async function Page({ params }: CardPageProps) {
  const { cardCode } = params;

  const album = albums.find(
    (album) => album.cardCode.toLowerCase() === cardCode.toLowerCase()
  );

  if (!album) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Album Not Found</h1>
        <p>The TAP code you scanned doesn’t match any album.</p>
      </main>
    );
  }

  redirect(`/album/${album.id}`);
}
