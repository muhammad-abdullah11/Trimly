"use client"
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const page = () => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session || session.user.type !== "admin") {
            router.push("/");
        }
    }, [session]);

    return (
        <main className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
            <p className='text-lg'>Welcome to the admin dashboard</p>
        </main>
    )
}

export default page