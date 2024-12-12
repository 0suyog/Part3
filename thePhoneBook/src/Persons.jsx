import { useEffect, useState } from "react";
import Person from "./Person";

export default function Persons({ persons, handleDelete }) {
    const [allPersons, setAllPersons] = useState(persons);
    useEffect(() => {
        setAllPersons(persons);

        console.log(persons);
    }, [persons]);
    return (
        <>
            {persons
                ? persons.map((person) => (
                      <div key={person.id}>
                          <Person name={person.name} number={person.number} />
                        <button onClick={() => {
                            handleDelete(person)
                          }}>delete</button>
                      </div>
                  ))
                : null}
        </>
    );
}
