"use client";

import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>

        </div>
        <button type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignInPage