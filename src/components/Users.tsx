import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IUser } from "../models";
import { Modal } from "./Modal";

export function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);

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

            {modal && <Modal title="Добавление в список пользователей" onClose={() => setModal(false)}>
                <div>Text</div>
            </Modal>}

            <button
                className='inline-block mt-3 bg-red-700 text-white text-2xl px-4 py-2'
                onClick={() => setModal(true)}
            >
                +
            </button>

        </div>
    )
}