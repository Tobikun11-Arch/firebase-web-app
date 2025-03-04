'use client'
import React from "react";
import signIn from "@/app/firebase/signIn";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [ isSignIn, setSignIn ] = React.useState<boolean>(false)
    const router = useRouter()

    const handleForm = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        setSignIn(true)

        const { error } = await signIn(email, password);

        if (error) {
            setSignIn(false)
            return console.log(error)
        }

        setSignIn(false)
        return router.push("/homepage")
    }

    return (
        <div className="h-screen flex justify-center items-center bg-white text-black cursor-default">
            <div className="bg-white shadow-lg text-sm p-4 w-96">
                <div className="flex flex-col">
                    <h1 className="text-center text-2xl font-semibold font-mono">Sign In</h1>
                    <form onSubmit={handleForm} className="flex flex-col mt-10 gap-5">
                        <label htmlFor="email">
                            <p>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="w-full bg-gray-100 p-2 rounded-lg h-10"/>
                        </label>
                        <label htmlFor="password">
                            <p>Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="w-full bg-gray-100 p-2 rounded-lg h-10"/>
                        </label>
                        <button type="submit" className="bg-blue-600 w-full flex justify-center items-center text-md py-2 text-white font-semibold rounded-xl">{isSignIn ? 'Signing In...' : 'Sign In'}</button>
                    </form>
                    <p className="text-xs mt-5">Don't have an account? <span className="text-blue-600" onClick={()=> router.push('/auth/sign-up')}>Create an account</span></p>
                </div>
            </div>
        </div>
    );
}

export default Page;