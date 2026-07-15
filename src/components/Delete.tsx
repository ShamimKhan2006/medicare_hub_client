"use client"

import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";

import React from 'react';

  interface DeleteProps{
    deleteId:string
    endpoint:string
  }
const Delete = ({deleteId,endpoint}:DeleteProps) => {  
     const router=useRouter()
        const handleDelete=async()=>{
           
            const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${deleteId}`,{
                method:"DELETE"
            })
            
            const deleteData=await res.json()
            console.log(deleteData)
            
             if (deleteData.deletedCount > 0) {
              router.refresh(); // page data আবার fetch হবে
  }
        }
    return (
        <div>
             <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Comment permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Comment</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
        </div>
    );
};

export default Delete; 
    