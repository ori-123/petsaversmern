import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Public() {
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/adoptables')
      .then((response) => response.json())
      .then((data) => {
        setDogs(data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <h1>LOADING DOGS</h1>;
  }

  return (
    <>
      <div className='background'></div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Adopt me</h1>
      <div className='dogCards'>
        {dogs.map((dog) => (
          <div key={dog._id} className='editableDog'>
            <h2>{dog.name}</h2>
            {dog.photoUrl ? (
              <img src={dog.photoUrl} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
            ) : (
              <img
                src='https://media.istockphoto.com/id/1386585135/vector/no-dogs-allowed-icon-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=b5mw13OQVjvf38dt_C_qw-0l3cvwBygb1FfgGQy9VeU='
                style={{ maxWidth: '150px' }}
                alt='No photo available'
              />
            )}
            <Link to={`/dogdetails/${dog._id}`}>
              <button>Details</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}