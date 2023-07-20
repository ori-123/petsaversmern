import React, { useState, useEffect } from 'react';

export default function AddDog({ onBack }) {

  const [newDog, setNewDog] = useState({});

  useEffect(() => {
    const saveDog = async () => {
      console.log(newDog);
      try {
        await fetch('http://localhost:3001/api/alldogs', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDog)
        });
      } catch (error) {
        console.error('Error saving dog:', error);
      }
    };

    if (Object.keys(newDog).length > 0) {
      saveDog();
    }
  }, [newDog]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    const photoList = formObject.photoUrl.split(',');
    formObject.photoUrl = photoList;
    const attributeList = formObject.attributes.split(',');
    formObject.attributes = attributeList;
    setNewDog(formObject);
    alert(`${formObject.name} added`);
  }

  return (
    <div className="box">
            <form className="form-box" onSubmit={handleSubmit}>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label><br></br>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breeds">Breeds:</label><br></br>
                        <input type="text" id="breeds" name="breeds" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="colors">Colors:</label><br></br>
                        <input type="text" id="colors" name="colors" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label><br></br>
                        <input type="text" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <div className="radio-group">
                            <input type="radio" id="male" name="gender" value="Male" />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="Female" />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size:</label><br></br>
                        <select id="size" name="size">
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="houseTrained">Is housetrained:</label>
                        <div className="radio-group">
                            <input type="radio" id="houseTrainedTrue" name="houseTrained" value="true" />
                            <label htmlFor="houseTrainedTrue">True</label>
                            <input type="radio" id="houseTrainedFalse" name="houseTrained" value="false"/>
                            <label htmlFor="houseTrainedFalse">False</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="attributes">Attributes:</label><br></br>
                        <input type="text" id="attributes" name="attributes"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="neutered">Is neutered:</label>
                        <div className="radio-group">
                            <input type="radio" id="neuteredTrue" name="neutered" value="true" />
                            <label htmlFor="neuteredTrue">True</label>
                            <input type="radio" id="neuteredFalse" name="neutered" value="false" />
                            <label htmlFor="neuteredFalse">False</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adoptable">Is adoptable:</label>
                        <div className="radio-group">
                            <input type="radio" id="adoptableTrue" name="adoptable" value="true" />
                            <label htmlFor="adoptableTrue">True</label>
                            <input type="radio" id="adoptableFalse" name="adoptable" value="false" />
                            <label htmlFor="adoptableFalse">False</label>
                        </div>
                    </div>
                </div>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="description">Description:</label><br></br>
                        <textarea id="description" name="description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photoUrl">Photo URL:</label><br></br>
                        <textarea id="photoUrl" name="photoUrl"></textarea>
                    </div>
                </div>
              <button className="saveButton" type="submit">Save Dog</button>
              <button className="closeButton" type='button' onClick={onBack}>Close</button>
          </form>
      </div>
  );
}