"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"


const SignOut = () => {

  const router = useRouter()

  const signUserOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  }

  return (
    <div>
      <button onClick={signUserOut} className="bg-red-500 text-white p-3 rounded-2xl cursor-pointer">
        Sign Out
      </button>
    </div>
  )
}

export default SignOut