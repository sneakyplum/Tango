"use client";


import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import * as z from "zod"; 

const SignUpPage = () => {

  const router = useRouter();

  const signUpSchema = z.object({ 
    email: z.string(),
    password: z.string().min(8),
    name: z.string(),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });

  type FormData = z.infer<typeof signUpSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {


  const { error } = await authClient.signUp.email({
    email: data.email, // user email address
    password: data.password, // user password -> min 8 characters by default
    name: data.name, // user display name // User image URL (optional)
    callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
}, {
    onRequest: (ctx) => {
        //show loading
    },
    onSuccess: (ctx) => {
        router.push("/verify-email")
    },
    onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
    },
  });

  if (error) {
      console.error("Sign-up error:", error);
    }


  const emailVerification = await authClient.sendVerificationEmail({
    email: data.email, // user email address
    callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
  })

  console.log("Email verification response:", emailVerification);

  }



  return (
<div>
  {/* Top Navigation / Brand Header */}
  <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-start pl-6 sm:pl-10 z-10">
    <Link href="/" className="text-3xl sm:text-4xl font-bold text-blue-700">
      Tanjey
    </Link>
  </div>

  {/* Main Centered Container */}
  <div className="w-full min-h-screen flex items-center justify-center bg-blue-50 px-4 py-24">
    <div className="w-full max-w-md bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6 sm:p-8 flex flex-col items-center">
      
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">

        <label className="text-sm font-medium text-black mt-4 mb-1">
          Name
        </label>
        <input 
          type="text" 
          {...register("name")} 
          className="border-2 w-full sm:w-full lg:w-full border-gray-300 h-11 rounded-md px-3 text-base sm:text-sm text-black focus:outline-none focus:border-blue-700"
        />

        {/* Email Label & Input */}
        <label className="text-sm font-medium text-black mb-1">
          E-mail
        </label>
        <input 
          type="email" 
          {...register("email")} 
          className="border-2 w-full sm:w-full lg:w-full border-gray-300 h-11 rounded-md px-3 text-base sm:text-sm text-black focus:outline-none focus:border-blue-700"
        />

        {/* Password Label & Input */}
        <label className="text-sm font-medium text-black mt-4 mb-1">
          Password
        </label>
        <input 
          type="password" 
          {...register("password")} 
          className="border-2 w-full sm:w-full lg:w-full border-gray-300 h-11 rounded-md px-3 text-base sm:text-sm text-black focus:outline-none focus:border-blue-700"
        />

        <label className="text-sm font-medium text-black mt-4 mb-1">
          Confirm Password
        </label>
        <input 
          type="password" 
          {...register("confirmPassword")} 
          className="border-2 w-full sm:w-full lg:w-full border-gray-300 h-11 rounded-md px-3 text-base sm:text-sm text-black focus:outline-none focus:border-blue-700"
        />

        {/* Primary Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="text-base font-semibold cursor-pointer h-11 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-md mt-6 transition-colors"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account{" "}
          <a href="/sign-in" className="text-blue-700 font-medium hover:underline">
            Sign In
          </a>
        </p>

        {/* <div className="relative my-6 text-center">
          <span className="text-sm text-gray-400">or</span>
        </div> */}

        {/* Google OAuth Button */}
        {/* <button 
          type="button"
          className="text-base font-medium cursor-pointer h-11 w-full border-2 border-gray-300 hover:bg-gray-50 text-black rounded-md flex items-center justify-center transition-colors"
        >
          Sign In with Google
        </button> */}
      </form>

    </div>
  </div>
</div>
  )
}

export default SignUpPage