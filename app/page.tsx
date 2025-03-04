"use client"
import { useEffect } from "react";
import SignIn from "./auth/sign-in/page";
import { useAuthContext } from "./verification/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(()=> { 
    if(user === null) { 
      router.push('/') 
    } else {
      router.push('/homepage')
    } 
  }, [user])

  return (
    <div className="h-screen flex justify-center items-center bg-white text-black cursor-default">
      <SignIn/>
    </div>
  );
}
