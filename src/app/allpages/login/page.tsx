"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Label,
  Separator,
  TextField,
  FieldError,
} from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

interface LoginFormValues {
  email: string;
  password: string; 
}

const LoginPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);
  const newData = Object.fromEntries(formData.entries()) as unknown as LoginFormValues;

    const { data, error } = await authClient.signIn.email({
              ...newData,
           
    })


   if(data){
    toast.success("Login Sucessfully")
    router.push("/")
   }else{
    toast.error(error.message|| "Login failed")
   }
};

  const handleGoogle = async (): Promise<void> => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md items-center px-4 py-20">
      <Form
        className="text-forground mt-20 flex w-full flex-col gap-5 rounded-3xl border border-[#F1E3E5] bg-white p-8 shadow-[0_24px_60px_-20px_rgba(232,50,74,0.25)]"
        onSubmit={handleLogin}
      >
        <div className="mb-2 flex flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8324A]/10">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M4 13h4l2-5 4 10 2-5h4"
                stroke="#E8324A"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h1 className="text-center text-2xl font-bold text-[#14213D] md:text-3xl">
            Welcome back to <span className="text-[#E8324A]">MediCard</span>
          </h1>
          <p className="text-center text-sm text-[#6B6659]">
            Log in to manage your health posts and appointments.
          </p>
        </div>

        <TextField isRequired name="email" type="email">
          <Label className="text-sm font-semibold text-[#14213D]">Email</Label>
          <Input
            placeholder="Enter your email"
            className="mt-1 w-full rounded-xl border border-[#E7E3DC] bg-[#FAF8F5] px-4 py-2.5 text-[#14213D] outline-none transition-all duration-200 placeholder:text-[#A8A296] focus:border-[#E8324A] focus:ring-2 focus:ring-[#E8324A]/20"
          />
          <FieldError className="text-xs text-[#E8324A]" />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label className="text-sm font-semibold text-[#14213D]">Password</Label>
          <Input
            placeholder="Enter your password"
            className="mt-1 w-full rounded-xl border border-[#E7E3DC] bg-[#FAF8F5] px-4 py-2.5 text-[#14213D] outline-none transition-all duration-200 placeholder:text-[#A8A296] focus:border-[#E8324A] focus:ring-2 focus:ring-[#E8324A]/20"
          />
          <Link
            href="/forgot-password"
            className="m-2 self-end text-right text-sm font-semibold text-[#E8324A] hover:underline"
          >
            Forgot password
          </Link>
          <FieldError className="text-xs text-[#E8324A]" />
        </TextField>

        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#E8324A] to-[#C41E36] py-3 font-semibold text-white shadow-[0_14px_30px_-10px_rgba(232,50,74,0.55)] transition-all duration-300 hover:shadow-[0_18px_38px_-8px_rgba(232,50,74,0.6)] hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <div className="flex items-center justify-center gap-3">
          <Separator className="w-full bg-[#EDE7E0]" />
          <p className="whitespace-nowrap text-center text-xs font-medium text-[#A8A296]">
            OR
          </p>
          <Separator className="w-full bg-[#EDE7E0]" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7E3DC] bg-white py-3 font-medium text-[#14213D] transition-all duration-200 hover:border-[#E8324A]/40 hover:bg-[#FFF5F6]"
        >
          <FcGoogle className="text-lg" /> Sign In with Google
        </Button>

        <p className="text-center text-sm text-[#6B6659]">
          Don&apos;t have an account?{" "}
          <Link
            href="/allpages/register"
            className="font-semibold text-[#E8324A] hover:underline"
          >
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;