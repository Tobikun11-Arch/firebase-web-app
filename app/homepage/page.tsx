'use client'
import React, { useEffect, useState } from 'react'
import signOutUser from '../firebase/signOut'
import { useRouter } from 'next/navigation';
import addData from '../firebase/addData';
import UserInput from '../components/UserInput';
import getData from '../firebase/getData'

interface User {
    FirstName: string;
    LastName: string;
    StartingDate: string; // You can use Date type if you want strict date handling
    id: string;
}
  

export default function Page() {
    const router = useRouter()
    const [ user, setUser ] = useState<User[]>([])
    const [ isAdd, setAdd ] = useState<boolean>(false)
    const [ form, setForm ] = useState({
        FirstName: '',
        LastName: '',
        StartDate: ''
    })

    async function handleLogout() {
        const { success, error } = await signOutUser()

        if (success) {
            router.push('/')
        } else {
            console.error("Sign out error:", error);
        }
    }

    function handleData(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    //Add new user data
    async function handleAddUser(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        setAdd(true)
        if(!form.FirstName || !form.LastName || !form.StartDate) {
            setAdd(false)
            return
        }

        const userData = {
            FirstName: form.FirstName,
            LastName: form.LastName,
            StartingDate: form.StartDate
        }
        const { error } = await addData('users', userData)

        if (error) {
            return console.log(error)
        }

        setAdd(false)
        setForm({
            ...form,
            FirstName: '',
            LastName: '',
            StartDate: ''
        })
    }

    useEffect(()=> {
        const fetchUsers = async() => {
            const { result } = await getData('users')

            //Formated data to make typescript accept the data from json
            const formattedUsers: User[] = result.map((user: any) => ({
                id: user.id || "", 
                FirstName: user.FirstName || "Unknown",
                LastName: user.LastName || "Unknown",
                StartingDate: user.StartingDate || "0000-00-00",
            }));
    
            setUser(formattedUsers);
        }
        fetchUsers()
    }, [user])

    return (
        <div className='h-screen bg-gray-200 flex flex-col justify-center items-center text-black relative'>
            <button className='flex justify-center items-center bg-white text-blue-600 py-2 w-24 rounded-md shadow-md font-semibold absolute left-4 top-4' onClick={handleLogout}>Logout</button>
            <h1 className='text-3xl font-semibold font-mono'>User Management</h1>
            <div className='w-3/5 h-96 flex gap-4 mt-5'>
                <div className='w-full bg-white shadow-md p-4 rounded-lg'>
                    <h1 className='text-center text-2xl font-semibold'>Add new user</h1>
                    <form onSubmit={handleAddUser} action="/AddingUser" className='w-full p-6 flex flex-col gap-2'>
                        <UserInput children={"First Name"} htmlFor='FirstName' value={form.FirstName} type='text' placeholder='e.g John doe' name='FirstName' id='FirstName' onChange={handleData}/>

                        <UserInput children={"Last Name"} htmlFor='LastName' value={form.LastName} type='text' placeholder='e.g Zhauman' name='LastName' id='LastName' onChange={handleData}/>

                        <UserInput children={"Starting date"} htmlFor='StartDate' value={form.StartDate} type='date' name='StartDate' id='date' onChange={handleData}/>
                        <button type='submit' className='w-full flex items-center justify-center py-2 bg-blue-600 mt-5 rounded-lg text-white font-semibold'>{isAdd ? 'Adding...' : 'Add'}</button>
                    </form>
                </div>

                <div className='w-full bg-white shadow-md rounded-lg p-4'>
                    <h1 className='text-center text-2xl font-semibold'>Users</h1>
                    <div className='p-6 flex flex-col gap-2 h-80 overflow-y-auto'>
                        {user.length >= 1 ? 
                            (
                                user.map((data, index)=> (
                                    <div key={`${index}-${data.id}`} className='flex gap-2 bg-gray-200 rounded-lg p-2'>
                                        <p>{data.FirstName}</p>
                                        <p>{data.LastName}</p>
                                    </div>
                                ))
                            ) : (
                                <h1 className='text-2xl text-gray-300'>No user data</h1>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>  
    )
}