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

    try {
      const { data, error } = await authClient.signIn.email({
        ...newData,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Login failed");
        return;
      }

      if (data) {
        toast.success("Logged in successfully");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
    <div className="mx-auto w-full max-w-md items-center px-4">
      <Form
        className="text-forground mt-20 flex flex-col gap-4 rounded-2xl p-6 shadow-md"
        onSubmit={handleLogin}
      >
        <h1 className="my-5 text-center text-2xl font-bold md:text-3xl">
          Login <span className="text-green-500">Form</span>
        </h1>

        <TextField isRequired name="email" type="email">
          <Label className="text-forground">Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label className="text-forground">Password</Label>
          <Input placeholder="Enter your password" />
          <Link
            href="/forgot-password"
            className="m-2 self-end text-right text-sm font-semibold text-green-600 hover:underline"
          >
            Forgot password
          </Link>
          <FieldError />
        </TextField>

        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="my-5 w-full rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white transition-all duration-300 hover:scale-105"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <div className="flex items-center justify-center gap-3">
          <Separator className="text-forground w-30" />
          <p className="whitespace-nowrap text-center">Or with login</p>
          <Separator className="text-forground w-30" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          className="text-forground mb-4 w-full"
        >
          <FcGoogle /> Sign In with Google
        </Button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/allpages/register"
            className="font-semibold text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;