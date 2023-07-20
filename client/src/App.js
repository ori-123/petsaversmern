import React, { useEffect, useState } from 'react';
import './App.css';
import AddDog from './components/AddDog';
import EditDogForm from './components/EditDogForm';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState('alldogs');
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [totalDogs, setTotalDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/alldogs')
      .then((response) => response.json())
      .then((data) => {
        setDogs(data);
        setTotalDogs(data);
      })
      .catch((error) => console.error(error));
  }, [adding, editing]);

  const handleDropdownChange = (event) => {
    setSelectedDog(event.target.value);
  };

  function handleBack() {
    setAdding(false);
    setEditing(null);
  }

  function handleClick() {
    setAdding(true);
  }

  function handleDogDelete(id) {
    if (confirm('Are you sure?')) {
      fetch(`http://localhost:3001/api/alldogs/${id}`, {
        method: 'DELETE'
      });

      const allDogs = [...dogs];
      const filteredDogs = allDogs.filter(dog => dog._id !== id);
      setDogs(filteredDogs);
    }
  }

  const handleEditDog = (dogId) => {
    setEditing(dogId);
  };

  const handlePopupClose = () => {
    setEditing(null);
    setAdding(false);
  };

  const handlePopupSave = () => {
    alert('Changes saved');
  };

  function handleInput(event) {
    setSearch(event.target.value);
    let searchTerm = event.target.value;
    const allDogs = [...totalDogs];
    const filterDog = allDogs.filter(dog => dog.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setDogs(filterDog);
  }

  return (
    <div>
      <div className='background'></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor='search'> <input type='text' name='search' value={search} onInput={handleInput} className='search' placeholder='search'></input>
        </label>
        <button onClick={handleClick} className='addNewDog'>Add new dog</button>
        <Link to={"/interests"}>
          <button className='addNewDog'>List enquiries</button>
        </Link>
        <select value={selectedDog} onChange={handleDropdownChange} className='select'>
          <option value="alldogs">All Dogs</option>
          <option value="adoptable">Adoptable Dogs</option>
          <option value="adopted">Adopted Dogs</option>
        </select>
      </div>

      <div>
        <Popup open={adding} onClose={handlePopupClose} closeOnDocumentClick modal nested>
          <AddDog onBack={handleBack} />
        </Popup>
      </div>
      <div>
        <Popup open={editing !== null} onClose={handlePopupClose} closeOnDocumentClick modal nested>
          <EditDogForm onBack={handleBack} id={editing} onSave={handlePopupSave} />
        </Popup>
      </div>

      {
        selectedDog === 'alldogs' && (
          <div className='dogCards'>
            {dogs.map((dog) => (
              <div key={dog._id} className='editableDog'>
                <h2>{dog.name}</h2>
                {dog.photoUrl[0] ? (
                  <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                ) : (
                  <img
                    src='https://media.istockphoto.com/id/1386585135/vector/no-dogs-allowed-icon-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=b5mw13OQVjvf38dt_C_qw-0l3cvwBygb1FfgGQy9VeU='
                    style={{ maxWidth: '150px' }}
                    alt='No photo available'
                  />
                )}
                <button onClick={() => handleEditDog(dog._id)}>Edit dog</button>
                <button onClick={() => handleDogDelete(dog._id)} className='delete'> Delete dog</button>
              </div>
            ))}
          </div>
        )
      }
      {
        selectedDog === 'adoptable' && (
          <div className='dogCards'>
            {dogs
              .filter((dog) => dog.adoptable)
              .map((dog) => (
                <div key={dog._id} className='editableDog'>
                  <h2>{dog.name}</h2>
                  {dog.photoUrl[0] ? (
                    <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                  ) : (
                    <img
                      src='https://media.istockphoto.com/id/1386585135/vector/no-dogs-allowed-icon-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=b5mw13OQVjvf38dt_C_qw-0l3cvwBygb1FfgGQy9VeU='
                      style={{ maxWidth: '150px' }}
                      alt='No photo available'
                    />
                  )}
                  <button onClick={() => handleEditDog(dog._id)}>Edit dog</button>
                  <button onClick={() => handleDogDelete(dog._id)} className='delete'> Delete dog</button>
                </div>
              ))}
          </div>
        )
      }
      {
        selectedDog === 'adopted' && (
          <div className='dogCards'>
            {dogs
              .filter((dog) => !dog.adoptable)
              .map((dog) => (
                <div key={dog._id} className='editableDog'>
                  <h2>{dog.name}</h2>
                  {
                    dog.photoUrl[0] ? (
                      <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                    ) : (
                      <img
                        src='https://media.istockphoto.com/id/1386585135/vector/no-dogs-allowed-icon-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=b5mw13OQVjvf38dt_C_qw-0l3cvwBygb1FfgGQy9VeU='
                        style={{ maxWidth: '150px' }}
                        alt='No photo available'
                      />
                    )
                  }
                  <button onClick={() => handleEditDog(dog._id)}>Edit dog</button>
                  <button onClick={() => handleDogDelete(dog._id)} className='delete'> Delete dog</button>
                </div>
              ))
            }
          </div >
        )
      }
    </div >
  );
}

export default App;
