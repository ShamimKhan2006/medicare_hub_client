import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyHealthPostPages = async () => {
     const session= await auth.api.getSession({
      headers:await headers()
     }) 
     const user=session?.user 

      const res=await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/myhealth-posts?email=${user?.email}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',}

      });

      const data=await res.json();
      console.log(res.status);

if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`);
}


      console.log(data)

    return (
        <div>
           my health post pages 
        </div>
    );
};

export default MyHealthPostPages;