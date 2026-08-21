"use client";

import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import * as z from "zod"; 

const SignInPage = () => {

  const router = useRouter();

  const signInSchema = z.object({ 
    email: z.string(),
    password: z.string().min(8),
  });

  type FormData = z.infer<typeof signInSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: FormData) => {

  const { error } = await authClient.signIn.email({
    email: data.email, // user email address
    password: data.password, // user password -> min 8 characters by default
 // user display name // User image URL (optional)
    callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
}, {
    onRequest: (ctx) => {
        //show loading
    },
    onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
    },
    onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
    },
  });

  if (error) {
      console.error("Sign-in error:", error);
    }

  router.push("/")

  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">
      {/* Top Navigation / Brand Header */}
      <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-start pl-6 sm:pl-10 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight text-indigo-400">
          Tanjey
        </Link>
      </div>

      {/* Main Centered Container */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 sm:p-8 flex flex-col items-center">
          
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Sign in
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
            {/* Email Label & Input */}
            <label className="text-sm font-medium text-slate-300 mb-1">
              E-mail
            </label>
            <input 
              type="email" 
              {...register("email")} 
              className="w-full h-11 bg-slate-950 border border-slate-800 rounded-md px-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />

            {/* Password Label & Input */}
            <label className="text-sm font-medium text-slate-300 mt-4 mb-1">
              Password
            </label>
            <input 
              type="password" 
              {...register("password")} 
              className="w-full h-11 bg-slate-950 border border-slate-800 rounded-md px-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />

            {/* Primary Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="text-base font-semibold cursor-pointer h-11 w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-md mt-6 transition-colors disabled:opacity-50"
            >
              Sign In
            </button>

            <p className="text-sm text-center mt-4 text-slate-400">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-indigo-400 font-medium hover:underline">
                Sign Up
              </Link>
            </p>

            {/* <div className="relative my-6 text-center">
              <span className="text-sm text-slate-500">or</span>
            </div> */}

            {/* Google OAuth Button */}
            {/* <button 
              type="button"
              className="text-base font-medium cursor-pointer h-11 w-full border border-slate-800 bg-slate-950 hover:bg-slate-800 text-white rounded-md flex items-center justify-center transition-colors"
            >
              Sign In with Google
            </button> */}
          </form>

        </div>
      </div>
    </div>
  )
}

export default SignInPage