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
    <div>
      <div>
        <div className="w-full h-20 flex items-center justify-start pl-10 position: fixed">
          <button>
            <Link href="/" className="text-4xl font-inter font-bold text-blue-700">Notely</Link>
          </button>
        </div>
      </div>
      <div className="w-full h-lvh flex bg-blue-50 items-center justify-center flex-col">
        <p className="text-4xl font-bold text-black mb-5">Sign in</p>
        <div className="w-180 h-250 flex  justify-center items-center bg-white rounded-2xl border-6 border-gray-100 shadow-lg flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full h-full items-center p-10">
          <label className="font-inter text-4sm items-start w-full text-black">E-mail</label>
          <input type="email" {...register("email")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
          <label className="font-inter text-4sm items-start w-full mt-4 text-black">Password</label>
          <input type="password" {...register("password")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
          <button type="submit" disabled={isSubmitting} className="font-inter text-2xl cursor-pointer p-3 w-full bg-blue-700 text-white rounded-sm mt-10">Sign In</button>

          <p className="font-inter text-3sm mt-4">Don't have an account? <a href="/sign-up" className="text-blue-700 hover:underline">Sign Up</a></p>

          <p className="mt-8">or</p>

          <button className="font-inter text-2xl cursor-pointer p-3 w-full border-2 border-gray-300 text-black rounded-sm mt-4" >
            Sign In with Google
          </button>
        </form>

        </div>
      </div>
    </div>
  )
}

export default SignInPage