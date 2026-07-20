"use client";

import { authClient } from '@/lib/auth-client';


const AsanaOauth = () => {


  const asanaOauth = async () => {
    const response = await authClient.signIn.oauth2({
      providerId: "asana",
      callbackURL: "/sign-in", // the path to redirect to after the user is authenticated
    });

    console.log("Asana OAuth response:", response);
  }
  

  return (
    <div>
      <button onClick={asanaOauth} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">

          Connect with Asana

      </button>
    </div>
  )
}

export default AsanaOauth