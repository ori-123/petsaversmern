import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function fetchInquiries() {
    return fetch('http://localhost:3001/api/inquiries/').then(res => res.json());
}

export default function Inquiries() {
    const [inquiries, setInquiries] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries()
            .then(inquiries => setInquiries(inquiries))
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return <h1>LOADING INQUIRIES...</h1>;
    }

    return (
        <>
            <div className="interestPageBody">
                <Link to={"/admin"}>
                    <button>Back</button>
                </Link>
                <div className="background"></div>
                {inquiries.map(inquiry => (
                    <div key={inquiry._id}>
                        <ul>
                            <div className="interestsBox">
                                <h2>Name: {inquiry.name}</h2>
                                <p>Address: {inquiry.address}</p>
                                <p>Phone: {inquiry.phone}</p>
                                <p>Email: {inquiry.email}</p>
                                <p>About the person: {inquiry.aboutme}</p>
                                <p>Message: {inquiry.message}</p>
                                <p>Inquired dog: {inquiry.dog}</p>
                            </div>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}