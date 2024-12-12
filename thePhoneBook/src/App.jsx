import { useEffect, useState } from "react";
import SearchResults from "./SearchResult";
import Persons from "./Persons";
import axios from "axios";
import {
    addPerson,
    deletePerson,
    getAll,
    getId,
    personExists,
    // updateId,
    updatePerson,
} from "./services/persons";
import Popup from "./Popup";
const App = () => {
    const [persons, setPersons] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState(0);
    const [search, setSearch] = useState("");
    const [newPopup, setNewPopup] = useState(null);

    // useEffect(() => {
    //     if (newPopup != null) {
    //         let timeOut = setTimeout(() => {
    //             setNewPopup(null);
    //         }, 3000);
    //         return () => {
    //             clearTimeout(timeOut);
    //         };
    //     }
    // }, [newPopup]);

    useEffect(() => {
        getAll()
            .then((data) => {
                setPersons(data);
            })
            .catch((err) => {
                alert(err.message);
            });
        getId()
            .then((data) => {
                alert(data);
                setCurrentId(data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);
    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };
    const handleChangePhone = (event) => {
        setNewPhone(event.target.value);
    };
    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };
    const handlePersonDelete = (person) => {
        // let p = deletePerson();
        let confirmation = window.confirm(
            `Are you sure you want to delete person ${JSON.stringify(person)}`
        );
        confirmation
            ? deletePerson(person)
                  .then((returnedPerson) => {
                      setPersons((persons) => {
                          return persons.filter((person) => {
                              return person.id !== returnedPerson.id;
                          });
                      });
                  })
                  .catch((err) => {
                      alert(err.message);
                  })
            : null;
    };
    const handleSearch = (event) => {
        // alert("mewo")
        event.preventDefault();
        
        let resut = persons.filter((person) => {
            let splitedName = person.name.split(" ");
            console.log(splitedName);
            if (splitedName.some((name) => name.startsWith(search))) {
                // console.log(person);
                return person;
            }
        });
        setSearchResults(resut);
    };

    const handleAddClick = (event) => {
        event.preventDefault();
        personExists(newName).then((existingPerson) => {
            if (existingPerson) {
                console.log(existingPerson);
                updatePerson({ ...existingPerson, number: newPhone })
                    .then((returnedPerson) => {
                        let tempPersons = [];

                        persons.forEach((person) => {
                            if (person.id === returnedPerson.id) {
                                person = returnedPerson;
                            }
                            tempPersons.push(person);
                        });
                        setPersons(tempPersons);
                        setNewPopup("Updated Number");
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            } else {
                let tempPerson = { name: newName, number: newPhone, id: `${currentId + 1}` };
                addPerson(tempPerson)
                    .then((returnedPerson) => {
                        setPersons(persons.concat(returnedPerson));
                        // updateId(currentId + 1).then((id) => {
                            // setCurrentId(id.id);
                            // setNewPopup("Added person");
                        // });
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        });
    };

    const handleTimeOut = () => {
        setNewPopup(null);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            {newPopup ? <Popup description={newPopup} timeOutFunction={handleTimeOut} /> : null}
            <form>
                <div>
                    Search: <input type="text" onChange={handleChangeSearch} />
                    <button type="submit" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </form>
            <SearchResults result={searchResults} />
            <form>
                <div>
                    name: <input onChange={handleChangeName} />
                </div>
                <div>
                    number: <input type="number" defaultValue={0} onChange={handleChangePhone} />
                </div>
                <div>
                    <button type="submit" onClick={handleAddClick}>
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Persons persons={persons} handleDelete={handlePersonDelete} />
        </div>
    );
};

export default App;
