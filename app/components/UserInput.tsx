import React from 'react'

interface UserInputProps {
    htmlFor: string
    children: React.ReactNode
    type: string
    placeholder?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: string
    name: string
    id: string
}

export default function UserInput({ htmlFor, children, type, placeholder, onChange, value, name, id }: UserInputProps) {
    return (
        <label htmlFor={htmlFor}>
            <p className='font-medium'>{children}</p>
            <input type={type} placeholder={placeholder} value={value} name={name} id={id} onChange={onChange} className='bg-gray-200 h-10 w-full p-2 outline-none rounded-lg'/>
        </label>
    )
}
