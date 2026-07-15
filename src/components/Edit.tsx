"use client";

import React, { useState } from "react";
import { AlertDialog, Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface EditProps {
  editId: string;
  endpoint: string;
  defaultComment: string;
}

const Edit = ({ editId, endpoint, defaultComment }: EditProps) => {
  const [comment, setComment] = useState(defaultComment);
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );

      const data = await res.json();
      console.log("data",data)

      if (data.modifiedCount > 0) {
        toast.success("Comment Updated Successfully");
        router.refresh();
      } else {
        toast.error("Nothing Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <Button>Edit</Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[450px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Heading>Edit Comment</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <Input
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                color="primary"
                onClick={handleUpdate}
                slot="close"
              >
                Update
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default Edit;