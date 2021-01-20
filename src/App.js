import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useReducer, useRef } from "react";
import { Switch, Link, Route } from "react-router-dom";
import axios from "axios";
import domtoimage from "dom-to-image";

function App() {
  let [meme, setMeme] = useState();
  let [textTop, setTextTop] = useState("");
  let [textBottom, setTextBottom] = useState("");
  let [allMemes, setAllMemes] = useState([]);

  const getMemes = () => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) => {
        console.log(res.data.data.memes);
        setAllMemes(res.data.data.memes);
        console.log(allMemes);
      })
      .catch((error) => console.log(error));
  };

  const changePicture = () => {
    const random = Math.floor(Math.random() * 99);
    console.log(random);
    setMeme(allMemes[random].url);
  };

  const generate = () => {};

  const reset = () => {};

  useEffect(() => getMemes(), []);

  // useEffect(() => setMeme(allMemes[0].url), [allMemes]);

  window.addEventListener("load", function () {
    document
      .querySelector('input[type="file"]')
      .addEventListener("change", function () {
        if (this.files && this.files[0]) {
          var img = document.querySelector("img"); // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
          //  img.onload = imageIsLoaded;
        }
      });
  });

  let [savedIMG, setSavedIMG] = useState("Hello");
  const imgRef = useRef(null);

  const savePic = () => {
    console.log(imgRef);

    domtoimage
      .toPng(imgRef)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        //   document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });

    /*   domtoimage.toPng(imgRef).then(function (url) {
      console.log(url);
      setSavedIMG(url);
    }); */
    //.catch((error) => console.log(error))
  };

  /*   function imageIsLoaded() { 
    alert(this.src);  // blob url
    // update width and height ...
  } */

  const browse1 = allMemes.slice(0, 20);
  const browse2 = allMemes.slice(20, 40);
  const browse3 = allMemes.slice(40, 60);
  const browse4 = allMemes.slice(60, 80);
  const browse5 = allMemes.slice(80, 100);

  return (
    <div className="App">
      <input
        type="test"
        placeholder="Text on Top"
        value={textTop}
        onChange={(e) => setTextTop(e.target.value)}
      ></input>
      <input
        type="test"
        placeholder="Text on Bottom"
        value={textBottom}
        onChange={(e) => setTextBottom(e.target.value)}
      ></input>
      <div ref={imgRef} className="meme" id="my-node">
        <img src={meme} alt="meme" />

        <h3 className="toptext">{textTop}</h3>
        <h3 className="bottomtext">{textBottom}</h3>
      </div>
      <div>
        <button onClick={() => changePicture()}>Change</button>
        <button onClick={() => console.log(meme)}>Load</button>
        <input type="file" />

        <button onClick={() => savePic()}>Generate</button>
        <button
          onClick={() => {
            setTextBottom("");
            setTextTop("");
            console.log(imgRef);
          }}
        >
          Reset
        </button>
      </div>
      <div>
        <Link className="link" to="/1">
          1{" "}
        </Link>
        <Link className="link" to="/2">
          2{" "}
        </Link>
        <Link className="link" to="/3">
          3{" "}
        </Link>
        <Link className="link" to="/4">
          4{" "}
        </Link>
        <Link className="link" to="/5">
          5{" "}
        </Link>
      </div>
      <div class="galary">
        <Switch>
          <Route path="/4">
            {browse4.map((iteration, index) => {
              return (
                <img
                  onClick={() => setMeme(iteration.url)}
                  src={iteration.url}
                />
              );
            })}
          </Route>
          <Route path="/1">
            {browse1.map((iteration, index) => {
              return (
                <img
                  onClick={() => setMeme(iteration.url)}
                  src={iteration.url}
                />
              );
            })}
          </Route>
          <Route path="/2">
            {browse2.map((iteration, index) => {
              return (
                <img
                  onClick={() => setMeme(iteration.url)}
                  src={iteration.url}
                />
              );
            })}
          </Route>
          <Route path="/3">
            {browse3.map((iteration, index) => {
              return (
                <img
                  onClick={() => setMeme(iteration.url)}
                  src={iteration.url}
                />
              );
            })}
          </Route>
          <Route path="/5">
            {browse5.map((iteration, index) => {
              return (
                <img
                  onClick={() => setMeme(iteration.url)}
                  src={iteration.url}
                />
              );
            })}
          </Route>
          <Route path="/"></Route>
        </Switch>
      </div>
      <Link to="/1">1</Link>
      <Link to="/2">2</Link>
      <Link to="/3">3</Link>
      <Link to="/4">4</Link>
      <Link to="/5">5</Link>
    </div>
  );
}

export default App;
