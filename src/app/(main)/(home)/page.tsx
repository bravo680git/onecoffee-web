import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/images/home-wallpaper.png"
        width={1920}
        height={900}
        alt=""
      />
    </div>
  );
}
