import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [data, setData] = useState([])

function getCategories() {
  fetch("http://localhost:5000/")
  .then(res=>res.json())
  .then((data)=>setData(data))
}
useEffect(() => {
  getCategories()
}, [])

  return (
    <>
    ddd
      {
        data && data.map(x=>
          <ul key={x.id}>
            <li>{x.description}</li>
            <li>{x.name}</li>
          </ul>
        )
      }
    </>
  )
}

export default App
