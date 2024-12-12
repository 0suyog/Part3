export default function SearchResults({ result }) {
    return (
        <>
            {result
                ? result.map((person) => {
                      return (
                          <div key={person.id}>
                              name: {`name: ${person.name} numbre: ${person.number}`}
                          </div>
                      );
                  })
                : null}
        </>
    );
}
