import React, { useState } from "react";
import { IUser } from "../models";
import axios from "axios";

const userData: IUser = {
    id: 0,
    name: 'Name',
    username: 'Name',
    email: 'Name',
    address: {
        street: 'Name',
        suite: 'Name',
        city: 'Name',
        zipcode: 123,
        geo: {
            lat: 'Name',
            lng: 'Name'
        },
    },
    phone: 'Name',
    website: 'Name',
    company: {
        name: 'Name',
        catchPhrase: 'Name',
        bs: 'Name'
    }
}

interface CreateProductProps {
    onCreate: (user: IUser) => void;
    curId: number;
}

export function CreateUser({ onCreate, curId }: CreateProductProps) {
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const [mail, setMail] = useState('')
    const [curI, setCurId] = useState(curId)

    const submitHandler = async (event: React.FormEvent) => {
        setError('');
        event.preventDefault();

        if (value.trim().length === 0) {
            setError('Please enter name')
            return
        }

        userData.name = value;
        userData.email = mail;
        userData.phone = '333';

        const response = await axios.post<IUser>('https://jsonplaceholder.typicode.com/users/', userData);

        changeHandlerId()
        onCreate(response.data)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const changeHandlerMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value)
    }

    const changeHandlerId = () => {
        setCurId(prev => prev + 1)
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border py-2 px-4 mb-2"
                placeholder="Enter name"
                value={value}
                onChange={changeHandler}
            />
            <input
                type="text"
                className="border py-2 px-4 mb-2"
                placeholder="Enter email"
                value={mail}
                onChange={changeHandlerMail}
            />
            <p>{error && error }</p>
            <button
                type="submit"
                className="border py-2 px-4 bg-yellow-400"
            >Create</button>
        </form>
    )
}