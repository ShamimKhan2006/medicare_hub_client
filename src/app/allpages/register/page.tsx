"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,

  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

interface RegisterFormValues {
  name: string;
  email: string;
  image: string;
  password: string;
}

const validatePassword = (value: string): string | null => {
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[0-9]/.test(value)) {
    return "Password must contain at least one number";
  }
  return null;
};

const RegisterPage = () => {
  const router = useRouter();


  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
   

    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries()) as unknown as RegisterFormValues;
       console.log("newdata",newData)
    try {
      const { data, error } = await authClient.signUp.email({
        ...newData,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Register failed");
        return;
      }

      if (data) {
     
        // Sync the new user to our own backend.
        await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });

        toast.success("Registered successfully");
        router.push("/allpages/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } 
  };

  // const handleGoogle = async (): Promise<void> => {
  //   try {
  //     await authClient.signIn.social({ provider: "google" });
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Google sign-up failed. Please try again.");
  //   }
  // };

  return (
    <div className="mx-auto w-full max-w-md items-center px-4">
      <form
        className="text-forground mt-20 flex flex-col gap-4 rounded-2xl p-6 shadow-md"
        onSubmit={handleRegister}
      >
        <h1 className="my-5 text-center text-2xl font-bold md:text-3xl">
          Register <span className="text-green-500">Form</span>
        </h1>

        <TextField isRequired name="name" type="text">
          <Label className="text-forground">Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email">
          <Label className="text-forground">Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField name="image" type="text">
          <Label className="text-forground">Image Url</Label>
          <Input placeholder="Enter your image url" />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          validate={validatePassword}
        >
          <Label className="text-forground">Password</Label>
          <Input placeholder="Enter your password" />
          <span className="m-2 text-right text-sm font-semibold">
            Forgot password
          </span>
          <Description className="text-gray-600">
            Must be at least 8 characters with 1 uppercase letter and 1 number
          </Description>
          <FieldError />
        </TextField>

        <Button
          type="submit"
            
          className="my-5 w-full rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white transition-all duration-300 hover:scale-105"
        >
          Register
    
        </Button>

        <div className="flex items-center justify-center gap-3">
          <Separator className="text-forground w-30" />
          <p className="whitespace-nowrap text-center">Or with register</p>
          <Separator className="text-forground w-30" />
        </div>

        {/* <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          className="text-forground mb-4 w-full"
        >
          <FcGoogle /> Sign Up with Google
        </Button> */}
      </form>
    </div>
  );
};

export default RegisterPage;