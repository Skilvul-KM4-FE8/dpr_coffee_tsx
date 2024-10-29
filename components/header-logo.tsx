import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <>
      <Link href="/">
        <div className="items-center hidden lg:flex">
          <p className="font-semibold text-white text-2xl ml-2.5">Nextvul</p>
        </div>
      </Link>
    </>
  );
};
