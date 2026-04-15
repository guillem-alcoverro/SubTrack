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

  const handleAddSubscription = async (subscriptionData) => {

    if (!subscriptionData.name || !subscriptionData.category || !subscriptionData.price) {
      console.error("Missing required fields: name, category, price")
      return
    }
    subscriptionData.price = parseFloat(subscriptionData.price).toFixed(2)

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        const data = await response.json();
        
        setSubscriptions([...subscriptions, data]);
      } else {
        console.error("The server returned an error");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

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
          <button onClick={() => {handleAddSubscription({
            name: "Youtube Premium",
            category: "entertainment",
            price: 13.99,
            icon: "https://www.freepnglogos.com/uploads/youtube-icon-png-12.png"
          })}}>
            + Add Subscription
          </button>
        </div>
      </main>
    </div>
  )
}

export default App