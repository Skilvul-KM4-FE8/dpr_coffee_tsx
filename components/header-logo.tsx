import Link from "next/link";
import nextvulWhite from "../public/nextvulWhite.svg";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <>
      <Link href="/">
        <div className="items-center hidden lg:flex">
          <Image src={nextvulWhite} alt="Logo" className="w-12 h-12" />
        </div>
      </Link>
    </>
  );
};
