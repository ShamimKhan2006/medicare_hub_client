"use client";

import React from "react";
import { type FormEvent } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
interface LoginformsValues {
  name: string;
  email: string;
  comments: string;
}

interface doctorId {
  doctorId: string;
}
const PostComments = ({ doctorId }: doctorId) => {
  const router = useRouter();
  const handlePostComents = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(
      formData.entries(),
    ) as unknown as LoginformsValues;

    const allnewdata = {
      ...newData,
      doctorId,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postscoments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(allnewdata),
    });

    const postData = await res.json();
    console.log("postData", postData);
    if (postData.insertedId) {
      e.currentTarget.reset(); // form clear করবে
      router.refresh();
    }
    // ShowComments নতুন data আনবে
  };
  return (
    <div className="py-20">
      <form
        onSubmit={handlePostComents}
        id="commentForm"
        className=" border-gray-100 shadow-sm rounded-2xl bg-gray-100 p-8"
      >
        <input
          type="text"
          id="commentName"
          placeholder="Your Name:"
          required
          name="name"
          className="border p-2 rounded-2xl max-w-5xl mr-14 mb-4 w-[45%]"
        />
        <input
          type="email"
          id="commentEmail"
          placeholder="Email:"
          required
          name="email"
          className="border p-2 rounded-2xl max-w-5xl mr-5 w-[45%]"
        />
        <br />
        <br />
        <textarea
          id="commentMessage"
          placeholder="Please writte your commets"
          name="comments"
          className="border p-10 rounded-2xl mr-10 max-w-5xl w-full"
          required
        ></textarea>
        <br />
        <br />
        <Button type="submit" className="max-w-3xl my-4 ">
          Post Comment
        </Button>
      </form>
      <div id="commentError" style={{ color: "red" }}></div>
      <div id="commentList"></div>
    </div>
  );
};

export default PostComments;
