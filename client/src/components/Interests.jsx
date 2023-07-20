import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function fetchInterests() {
    return fetch('http://localhost:3001/api/interests/').then(res => res.json());
}

export default function Interests() {
    const [interests, setInterest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInterests()
            .then(interests => setInterest(interests))
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return <h1>LOADING ENQUIRIES...</h1>;
    }

    return (
        <>
            {interests.map(interest => (
                <div key={interest._id}>
                    <div className="background"></div>
                    <ul>
                        <div><h2>Name: {interest.name}</h2></div>
                        <p>Address: {interest.address}</p>
                        <p>Phone: {interest.phone}</p>
                        <p>Email: {interest.email}</p>
                        <p>About the person: {interest.aboutme}</p>
                        <p>Message: {interest.message}</p>
                        <p>Inquired dog: {interest.dog}</p>
                    </ul>
                    <Link to={"/admin"}>
                        <button>Back</button>
                    </Link>
                </div>
            ))}
        </>
    );
}