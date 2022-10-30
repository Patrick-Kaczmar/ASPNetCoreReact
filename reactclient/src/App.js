import React, {useState} from 'react';
import Constants from './utilities/Constants';
import GameCreateForm from './components/GameCreateForm';
import GameUpdateForm from './components/GameUpdateForm';
import './App.css';

function App() {
  const [videoGames, setVideoGames] = useState([])
  const [showingCreateNewGameForm, setShowingCreateNewGameForm] = useState(false)
  const [gameCurrentlybeingUpdated, setGameCurrentlybeingUpdated] = useState(null)

  function getVideoGames() {
    const url = Constants.API_URL_GET_ALL_GAMES

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(videogamesFromServer => {
      console.log(videogamesFromServer)
      setVideoGames(videogamesFromServer)
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
  }

  function deleteGame(gameId){
    const url = `${Constants.API_URL_DELETE_ONE_GAME_BY_ID}/${gameId}`

    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer)
      onGameDeleted(gameId)
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
  }

  return (
      <div className='container'>
        <div className='row min-vh-100'>
          <div className='col d-flex flex-column justify-content-center align-items-center'>
            {(showingCreateNewGameForm === false && gameCurrentlybeingUpdated === null) && (
              <div>
                <h1>JUST DO IT</h1>
                <div className='mt-5'>
                  <button onClick={getVideoGames} className="btn btn-dark btn-lg w-100">Get Games from server</button>
                  <button onClick={() => setShowingCreateNewGameForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create New Game</button>
                </div>
              </div>
            )}
            

            {(videoGames.length > 0 && showingCreateNewGameForm === false && gameCurrentlybeingUpdated === null)&& renderVideoGamesTable()}

            {showingCreateNewGameForm && <GameCreateForm onGameCreate={onGameCreate} />}

            {gameCurrentlybeingUpdated !== null && <GameUpdateForm game={gameCurrentlybeingUpdated} onGameUpdated={onGameUpdated}/>}
          </div>
        </div>
      </div>
  );

  function renderVideoGamesTable() {
    return (
      <div className='table-responsive mt-5'>
        <table className='table table-bordered border-dark'>
          <thead>
            <tr>
              <th scope='col'>Id (PK)</th>
              <th scope='col'>Title</th>
              <th scope='col'>Summary</th>
              <th scope='col'>Price</th>
              <th scope='col'>CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {videoGames.map((game) => (
              <tr key={game.id}>
              <th scope='row'>{game.id}</th>
              <td>{game.title}</td>
              <td>{game.summary}</td>
              <td>{game.price}</td>
              <td>
                <button onClick={() => setGameCurrentlybeingUpdated(game)} className='btn btn-dark btn-lg mx-3 my-3'>Update</button>
                <button onClick={() => { if (window.confirm(`Are you sure you want to delete the game titled "${game.title}" ?`)) deleteGame(game.id)}} className='btn btn-secondary btn-lg'>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setVideoGames([])} className="btn btn-dark btn-lg w-100">Empty Games array</button>
      </div>
    )
  }

  function onGameCreate(createdGame) {
    setShowingCreateNewGameForm(false)

    if (createdGame === null) {
      return
    }

    alert(`Game successfully created. After clicking OK, your new Game title "${createdGame.title}" will show up in the table below`)

    getVideoGames()
  }

  function onGameUpdated(updatedGame) {
    setGameCurrentlybeingUpdated(null)

    if (updatedGame === null) return

    let gamesCopy = [...videoGames]

    const index = gamesCopy.findIndex((gamesCopyGame, currentIndex) => {
      if (gamesCopyGame.id === updatedGame.id) {
        return true;
      }
    })

    if (index !== -1) {
      gamesCopy[index] = updatedGame
    }

    setVideoGames(gamesCopy)

    alert(`Game successfully updated. After clicking OK, look for the post with the title "${updatedGame.title}" in the table below to see the updates.`)
  }

  function onGameDeleted(deletedGameId) {

    let gamesCopy = [...videoGames]

    const index = gamesCopy.findIndex((gamesCopyGame, currentIndex) => {
      if (gamesCopyGame.id === deletedGameId) {
        return true;
      }
    })

    if (index !== -1) {
      gamesCopy.splice(index, 1)
    }

    setVideoGames(gamesCopy)

    alert('Game successfully deleted. After clicking ok, look at the table below disapear.')
  }
}

export default App;