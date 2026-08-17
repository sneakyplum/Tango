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
        //redirect to the dashboard or sign in page
    },
    onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
    },
  });

  if (error) {
      console.error("Sign-up error:", error);
    }

  router.push("/")

  const emailVerification = await authClient.sendVerificationEmail({
    email: data.email, // user email address
    callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
  })

  console.log("Email verification response:", emailVerification);

  }



  return (
    <div className=" bg-blue-50">
      <div >
        <div className="w-full h-20 flex items-center justify-start pl-10 position: fixed">
          <button>
            <Link href="/" className="text-4xl font-inter font-bold text-blue-700">Notely</Link>
          </button>
        </div>
        <div className="w-full h-lvh flex bg-blue-50 items-center justify-center flex-col">
          <p className="text-4xl font-bold text-black mb-5">Sign up</p>
          <div className="w-180 h-250 flex  justify-center items-center bg-white rounded-2xl border-6 border-gray-100 shadow-lg flex-col">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full h-full items-center p-10">
              <label className="font-inter text-4sm items-start w-full text-black">Name</label>
              <input type="text" {...register("name")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
              {errors.name && <p>{errors.name.message}</p>}

              <label className="font-inter text-4sm items-start w-full mt-4 text-black">E-mail</label>
              <input type="text"  {...register("email")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
              {errors.email && <p>{errors.email.message}</p>}

              <label className="font-inter text-4sm items-start w-full mt-4 text-black">Password</label>
              <input type="password" {...register("password")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"  />
              {errors.password && <p>{errors.password.message}</p>}

              <label className="font-inter text-4sm items-start w-full mt-4 text-black">Confirm Password</label>
              <input type="password" {...register("confirmPassword")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

              <button type="submit" disabled={isSubmitting} className="font-inter text-2xl cursor-pointer p-3 w-full bg-blue-700 text-white rounded-sm mt-10">Sign Up</button>

              <p className="font-inter text-3sm mt-4">Already have an account? <a href="/sign-in" className="text-blue-700 hover:underline">Sign In</a></p>

            <p className="mt-8">or</p>

            <button className="font-inter text-2xl cursor-pointer p-3 w-full border-2 border-gray-300 text-black rounded-sm mt-4" >
              Sign up with Google
            </button>
            </form>

        </div>

        </div>

      </div>

    </div>
  )
}

export default SignUpPage