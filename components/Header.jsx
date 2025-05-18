import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import SavedNewsButton from "./SavedNewsButon";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />

        <span className="text-2xl font-bold text-blue-600 cursor-pointer">
          NewsExplorer
        </span>
      </Link>

      <div className="flex items-center gap-6 flex-wrap justify-end flex-grow">
        <SavedNewsButton />
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
