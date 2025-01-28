import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/assets/logo.svg";

export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image src={AppLogo} alt="Logo" />
      </Link>
    </div>
  );
};
