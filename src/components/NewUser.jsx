import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const NewUser = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState()

    const handleSave = async () => {
        const response = await fetch('http://localhost:8000/createUser', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "name": name
            }), // body data type must match "Content-Type" header
        });
        return response.json();
    };

    const route = window.location.href.split('/');
    const id = route[route.length - 1]


    useEffect(() => {
        if (id && id.length > 10) {
            fetch(`http://localhost:8000/getOne/` + id).then(data => {
                data = data.json()
                return data
            })
                .then(data => {
                    setName(data.data.name)
                    setData(data.data)
                })
        }
    }, [id])



    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Link to="/" onClick={handleSave}>Save</Link>
            <Link to="/">Cancel</Link>
            {data &&
                <>
                    <Link to={`/${data.id}/p5`}>P5 Balance</Link>
                    <Link to={`/${data.id}/rewards`}>Wallet Balance</Link>
                </>
            }
        </div>
    );
}

export default NewUser
