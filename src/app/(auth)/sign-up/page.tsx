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
      <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-start pl-6 sm:pl-10 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight text-indigo-400">
          Tanjey
        </Link>
      </div>

      {/* Main Centered Container */}
      <div className="w-full min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center">
          
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-3 py-1 rounded-full mb-3">
            Get Started
          </span>

          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 text-center">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-400 mb-6 text-center">
            Join Tanjey to supercharge your Asana workflow.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">

            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input 
                type="text" 
                {...register("name")} 
                placeholder="John Doe"
                className="w-full h-11 bg-slate-950 border border-slate-800 rounded-lg px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input 
                type="email" 
                {...register("email")} 
                placeholder="you@example.com"
                className="w-full h-11 bg-slate-950 border border-slate-800 rounded-lg px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input 
                type="password" 
                {...register("password")} 
                placeholder="••••••••"
                className="w-full h-11 bg-slate-950 border border-slate-800 rounded-lg px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <input 
                type="password" 
                {...register("confirmPassword")} 
                placeholder="••••••••"
                className="w-full h-11 bg-slate-950 border border-slate-800 rounded-lg px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="pt-2 h-11 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors shadow-md shadow-indigo-950/50"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>

            {/* Bottom Link */}
            <p className="text-xs text-center text-slate-400 pt-2">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline">
                Sign In
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage