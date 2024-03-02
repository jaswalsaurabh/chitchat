import Image from "next/image";
import ChatCover from "../../assets/cover.png";
export default function Page() {
  return (
    <div className="lg:flex w-full h-full bg-orange-200 hidden">
      <Image priority src={ChatCover} alt="chatcover" />
    </div>
  );
}
