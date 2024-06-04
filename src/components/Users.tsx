import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IUser } from "../models";

export function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchUsers() {
        try {
            setError('')
            setLoading(true);
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users/')
            setUsers(response.data)
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false);
            setError(error.message)
        }

    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="container mx-auto max-w-2xl pt-5">

            {loading && <p>Loading...</p>}
            {error && <p className='text-red-600'>Error: {error}</p>}

            {users.map(elem =>
                <div key={elem.id}>
                    <p> {elem.id} </p>
                    <p> {elem.email} </p>
                </div>
            )}

        </div>
    )
}