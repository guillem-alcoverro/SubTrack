import { useState, useEffect } from 'react'

function App() {
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/subscriptions')
        const data = await response.json()
        setSubscriptions(data)
      } catch (error) {
        console.error("Error connecting to the API:", error)
      }
    }

    getData()
  }, [])

return (
    <div className="App">
      <header>
        <h1>SubTrack</h1>
      </header>
      <main>
        {subscriptions.length === 0 ? ("") : (
          subscriptions.map((sub) => (
            <div key={sub.id} className="card">
              <div className="title">
                <img src={sub.icon} alt={sub.name} />
                <h3>{sub.name}</h3>
              </div>

              <div className="category-label">
                <small>{sub.category}</small>
              </div>

              <div className="price">
                <p>{sub.price}€</p>
                <span>{sub.frequency}</span>
              </div>

              <div className="footer">
                <p>Paying since: {sub.dateStart}</p>

                {sub.dateEnd ? (
                  <p className="end-date">Ends: {sub.dateEnd}</p>
                ) : (
                  <p className="end-date">Ends: Undefined</p>
                )}
              </div>
            </div>
          ))
        )}
        <div className="card">
          <button onClick={() => {}}>
            + Add Subscription
          </button>
        </div>
      </main>
    </div>
  )
}

export default App