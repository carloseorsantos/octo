"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
  
    if (session) {
      router.push("/chat");
    } else {
      router.push("/login");
    }
    
  return <></>
}
