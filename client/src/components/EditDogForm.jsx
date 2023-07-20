import { useState, useEffect } from "react";

function EditDogForm({ id, onSave, onBack }) {
    const [dog, setDog] = useState(null);
    const [editedDog, setEditedDog] = useState(null);

    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        fetchdog(id);
    }, []);

    useEffect(() => {
        if (dog) {
            setSelectedSize(dog.size || "Small");
        }
    }, [dog]);

    useEffect(() => {
        if (editedDog) {
            console.log(editedDog);
            fetchEditdog(dog._id);
        }
    }, [editedDog]);

    function fetchdog(id) {
        fetch(`http://localhost:3001/api/alldogs/${id}`)
            .then(res => res.json())
            .then(dog => {
                console.log(dog);
                setDog(dog);
            })
            .catch(err => console.error(err));
    }

    function fetchEditdog(id) {
        fetch(`http://localhost:3001/api/alldogs/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedDog),
        })
            .catch(err => console.error(err));
    }

    function handleClick(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData);
        // Convert string values to boolean
        formObject.trained = JSON.parse(formObject.houseTrained);
        formObject.neutered = JSON.parse(formObject.neutered);
        formObject.adoptable = JSON.parse(formObject.adoptable);

        const photoList = formObject.photoUrl.split(',');
        formObject.photoUrl = photoList;
        const attributeList = formObject.attributes.split(',');
        formObject.attributes = attributeList;
        setEditedDog(formObject);
        onSave();
    }

    return (
        <div className="box">
            <form className="form-box" onSubmit={handleClick}>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label><br></br>
                        <input type="text" id="name" name="name" defaultValue={dog ? dog.name : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breeds">Breeds:</label><br></br>
                        <input type="text" id="breeds" name="breeds" defaultValue={dog ? dog.breeds : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="colors">Colors:</label><br></br>
                        <input type="text" id="colors" name="colors" defaultValue={dog ? dog.colors : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label><br></br>
                        <input type="text" id="age" name="age" defaultValue={dog ? dog.age : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <div className="radio-group">
                            <input type="radio" id="male" name="gender" value="Male" defaultChecked={dog && dog.gender === "Male"} />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="Female" defaultChecked={dog && dog.gender === "Female"} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size:</label><br></br>
                        <select id="size" name="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="houseTrained">Is housetrained:</label>
                        <div className="radio-group">
                            <input type="radio" id="houseTrainedTrue" name="houseTrained" value="true" defaultChecked={dog && dog.houseTrained} />
                            <label htmlFor="houseTrainedTrue">True</label>
                            <input type="radio" id="houseTrainedFalse" name="houseTrained" value="false" defaultChecked={dog && !dog.houseTrained} />
                            <label htmlFor="houseTrainedFalse">False</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="attributes">Attributes:</label><br></br>
                        <input type="text" id="attributes" name="attributes" defaultValue={dog ? dog.attributes : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="neutered">Is neutered:</label>
                        <div className="radio-group">
                            <input type="radio" id="neuteredTrue" name="neutered" value="true" defaultChecked={dog && dog.neutered} />
                            <label htmlFor="neuteredTrue">True</label>
                            <input type="radio" id="neuteredFalse" name="neutered" value="false" defaultChecked={dog && !dog.neutered} />
                            <label htmlFor="neuteredFalse">False</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adoptable">Is adoptable:</label>
                        <div className="radio-group">
                            <input type="radio" id="adoptableTrue" name="adoptable" value="true" defaultChecked={dog && dog.adoptable} />
                            <label htmlFor="adoptableTrue">True</label>
                            <input type="radio" id="adoptableFalse" name="adoptable" value="false" defaultChecked={dog && !dog.adoptable} />
                            <label htmlFor="adoptableFalse">False</label>
                        </div>
                    </div>
                </div>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="description">Description:</label><br></br>
                        <textarea id="description" name="description" defaultValue={dog ? dog.description : ""}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photoUrl">Photo URL:</label><br></br>
                        <textarea id="photoUrl" name="photoUrl" defaultValue={dog ? dog.photoUrl : ""}></textarea>
                    </div>
                </div>
                <button className="saveButton" type="submit">Save Dog</button>
                <button className="closeButton" type="button" onClick={ onBack }>Close</button>
            </form>
        </div>
    );
}

export default EditDogForm;