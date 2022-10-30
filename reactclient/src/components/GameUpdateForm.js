import React, { useState } from "react"
import Constants from "../utilities/Constants"

export default function GameUpdateForm(props) {

  const initialFormData = Object.freeze({
    title: props.game.title,
    summary: props.game.summary,
    price: props.game.price
  })

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const gameToUpdate = {
      id: props.game.id,
      title: formData.title,
      summary: formData.summary,
      price: formData.price
    }

    console.log(gameToUpdate.id)

    const url = Constants.API_URL_UPDATE_ONE_GAME_BY_ID

    fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(gameToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer)
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })

    props.onGameUpdated(gameToUpdate)
  }

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Updating the game titled {props.game.title}</h1>

      <div className="mt-5">
        <label className="h3 form-label">Game title</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Game Summary</label>
        <input
          value={formData.summary}
          name="summary"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Game Price</label>
        <input
          value={formData.price}
          name="price"
          type="number"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onGameUpdated(null)}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  )
}
