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
            <div className="interestPageBody">
                <Link to={"/admin"}>
                    <button>Back</button>
                </Link>
                <div className="background"></div>
                {interests.map(interest => (
                    <div key={interest._id}>
                        <ul>
                            <div className="interestsBox">
                                <h2>Name: {interest.name}</h2>
                                <p>Address: {interest.address}</p>
                                <p>Phone: {interest.phone}</p>
                                <p>Email: {interest.email}</p>
                                <p>About the person: {interest.aboutme}</p>
                                <p>Message: {interest.message}</p>
                                <p>Inquired dog: {interest.dog}</p>
                            </div>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}