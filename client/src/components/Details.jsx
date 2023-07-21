import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddInterest from "./AddInterest";

function fetchDog(id) {
  return fetch(`http://localhost:3001/api/alldogs/${id}`).then((res) => res.json());
}

export default function Details() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    fetchDog(id)
      .then(dog => setDog(dog))
      .then(() => setLoading(false));
  }, [id]);

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex < dog.photoUrl.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  if (loading) {
    return <h1>LOADING DOG...</h1>;
  }

  return (
    <>
      <div className='background'></div>
      <div style={{ fontSize: '26px', color: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h1>{dog.name}</h1>
        <div>
          <img src={dog.photoUrl[currentIndex]} style={{ maxHeight: '450px', maxWidth: '450px', marginLeft: '10px', marginRight: '10px' }}></img><br></br>
          <button style={{ marginRight: '15px' }} onClick={handlePrev} disabled={currentIndex === 0}>Previous photo</button>
          <button onClick={handleNext} disabled={currentIndex === dog.photoUrl.length - 1}>Next photo</button>
        </div>

        <div>
          Breed: {dog.breeds}<br></br>
          Colors: {dog.colors}<br></br>
          Age: {dog.age}<br></br>
          Gender: {dog.gender}<br></br>
          Size: {dog.size}<br></br>
          Is it housetrained? {dog.housetrained ? 'Yes' : 'No'}<br></br>
          Attributes:
          <ul>
            {dog.attributes.map(attribute => <li key={attribute}>{attribute}</li>)}
          </ul>
          Description: {dog.description}<br></br>
          <button onClick={() => setOpenPopup(true)}>I want this dog</button>
          <Link to={"/"}>
            <button style={{ marginLeft: "10px" }}>Back</button>
          </Link>
          <Popup open={openPopup} onClose={() => setOpenPopup(false)}>
            <AddInterest onBack={() => setOpenPopup(false)} />
          </Popup>
        </div>
      </div>
    </>
  );
}
