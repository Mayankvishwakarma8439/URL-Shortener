import { useState } from "react";

import "./App.css";

function App() {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error,setError]= useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shorten = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalURL }),
    });
    
    const json = await shorten.json();
    if(!shorten.ok){
      setError(json.msg)
    }
    setShortURL(json.shortURL);
    setOriginalURL("");
  };
  return (
    <div className="container">
      <h1 className="heading">URL SHORTNER</h1>
      <div className="form">
        <form>
          <label>Enter Original URL :</label>
          <input
            type="url"
            value={originalURL}
            onChange={(e) => {
              setError("")
              setOriginalURL(e.target.value);
            }}
          />
          <button type="submit" onClick={ handleSubmit }>
          Shorten
        </button> <br />
        
          {
            error && <p>{error}</p>
          }
          {shortURL && (
             <><label >SHORTED URL : </label>
               <a href={shortURL} target="_blank">
                {shortURL}
              </a></>
            
            
          )}
        </form>{" "}
      </div>
    </div>
  );
}

export default App;
