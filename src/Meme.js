import React from 'react'

export default function Meme() {
    const [meme, setMemes] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
   })

   const [allMemes, setAllMemes] = React.useState([])
    

   React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => setAllMemes(data.data.memes))
   }, [])


   function getMemeImage() {
        const randomNumbers = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumbers].url
        setMemes(prevMemes => {
            return {
                ...prevMemes,
                randomImage: url
            }
        })
   }

   function handleChange(event) {
        const {name, value} = event.target
        setMemes(prevMemes => {
            return {
                ...prevMemes,
                [name]: value
            }
        })
   }
    
  return (
    <main>
        <div className="form">
            <input 
                type="text"
                onChange={handleChange}
                name='topText'
                value={meme.topText}
                placeholder="Add Top text"
                className="form--input"
            />
            <input 
                type="text"
                onChange={handleChange}
                name='bottomText'
                value={meme.bottomText}
                placeholder="Add Bottom text"
                className="form--input"
            />
            <button 
                className="form--button"
                onClick={getMemeImage}
            >
                Get New Meme Image 
            </button>
        </div>
        <div className="meme">
            <img src={meme.randomImage} alt="memes" className="meme--image"/>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
    </main>
  )
}
