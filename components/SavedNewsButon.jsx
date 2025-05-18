"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SavedNewsButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
alert("You need to be logged in to view your saved news.");    } else {
      router.push("/saved");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-700 hover:text-blue-500"
    >
      Saved News
    </button>
  );
};

export default SavedNewsButton;
