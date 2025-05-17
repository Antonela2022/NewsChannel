import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-blue-600">NewsExplorer</span>
      </div>

      <div className="flex items-center gap-6 flex-wrap justify-end flex-grow">
        <Link href="/saved" className="text-gray-700 hover:text-blue-500">
          Saved News
        </Link>
       

        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
