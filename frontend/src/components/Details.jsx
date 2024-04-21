import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddInquiry from "./AddInquiry";

function fetchDog(id) {
  return fetch(`http://localhost:3001/api/alldogs/${id}`).then((res) => res.json());
}

export default function Details() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    fetchDog(id)
      .then(dog => setDog(dog))
      .then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h1>LOADING DOG...</h1>;
  }

  return (
    <>
      <div className='background'></div>
      <div style={{ fontSize: '26px', color: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h1>{dog.name}</h1>
        <div>
          <img src={dog.photoUrl} style={{ maxHeight: '450px', maxWidth: '450px', marginLeft: '10px', marginRight: '10px' }}></img>
        </div>

        <div>
          Breed: {dog.breeds}<br></br>
          Colors: {dog.colors}<br></br>
          Age: {dog.age}<br></br>
          Gender: {dog.gender}<br></br>
          Size: {dog.size}<br></br>
          Is it housetrained? {dog.housetrained ? 'Yes' : 'No'}<br></br>
          Description: {dog.description}<br></br>
          <button onClick={() => setOpenPopup(true)}>I want this dog</button>
          <Link to={"/"}>
            <button style={{ marginLeft: "10px" }}>Back</button>
          </Link>
          <Popup open={openPopup} onClose={() => setOpenPopup(false)}>
            <AddInquiry onBack={() => setOpenPopup(false)} />
          </Popup>
        </div>
      </div>
    </>
  );
}