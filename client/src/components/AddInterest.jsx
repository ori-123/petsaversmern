import { useParams } from "react-router-dom";

const addInterestToDB = (interest) => {
    return fetch(`http://localhost:3001/api/interests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interest),
    });
};

const AddInterest = ({ onBack }) => {
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];

        const interest = entries.reduce((acc, entry) => {
            const [k, v] = entry;
            acc[k] = v;
            return acc;
        }, {});

        interest.dog = id;
        addInterestToDB(interest, id);
    };

    return (
        <div className="box">
            <form className="form-box" onSubmit={handleSubmit}>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label><br></br>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label><br></br>
                        <input type="text" id="address" name="address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label><br></br>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label><br></br>
                        <input type="number" id="phone" name="phone" />
                    </div>
                </div>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="aboutme">About me:</label><br></br>
                        <textarea id="aboutme" name="aboutme"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label><br></br>
                        <textarea id="message" name="message"></textarea>
                    </div>
                </div>
                <button className="saveButton" type="submit" onClick={onBack}>Submit</button>
                <button className="closeButton" type='button' onClick={onBack}>Close</button>
            </form>
        </div>
    );
};

export default AddInterest;