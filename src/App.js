import "./App.css";
import { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import domtoimage from "dom-to-image";
import ReactPaginate from "react-paginate";

function App() {
  let [meme, setMeme] = useState(null);
  let [textTop, setTextTop] = useState("");
  let [textBottom, setTextBottom] = useState("");
  let [allMemes, setAllMemes] = useState([]);
  let [savedURL, setSavedURL] = useState();
  let [savedMemes, setSavedMemes] = useState([]);
  // for pagination
  const [pageNumber, setPageNumber] = useState(0);
  let [pageCount, setPageCount] = useState(null);
  const memesPerPage = 20;
  const passedMemes = pageNumber * memesPerPage;

  const imgRef = useRef(null);

  const getMemes = async () => {
    await axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) => {
        console.log(res.data.data.memes);
        setAllMemes(res.data.data.memes);
        setPageCount(Math.ceil(res.data.data.memes.length / 20));
      })
      .catch((error) => console.log(error));
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const changePicture = () => {
    if (allMemes.length !== 0) {
      const random = Math.floor(Math.random() * 99);

      console.log("This is ceil", Math.ceil(5.1));

      setMeme(allMemes[random].url);
    }
  };

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

  const savePic = () => {
    console.log(imgRef.current);

    domtoimage
      .toPng(imgRef.current)
      .then(function (dataUrl) {
        setSavedURL(dataUrl);
        setSavedMemes([...savedMemes, dataUrl]);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const deletePic = () => {
    //  setSavedURL(null);
    setSavedMemes([]);
    setTextBottom("");
    setTextTop("");
  };

  useEffect(() => getMemes(), []);
  useEffect(() => changePicture(), [allMemes]);

  return (
    <div className="App">
      <br />
      <div className="header">MEME FACTORY</div>
      <br />

      <input
        className="input"
        type="test"
        placeholder="Text on Top"
        value={textTop}
        onChange={(e) => setTextTop(e.target.value)}
      ></input>
      <input
        className="input"
        type="test"
        placeholder="Text on Bottom"
        value={textBottom}
        onChange={(e) => setTextBottom(e.target.value)}
      ></input>
      <div className="meme" id="my-node" ref={imgRef}>
        {meme === null ? null : <img src={meme} alt="meme" />}

        <h3 className="toptext">{textTop}</h3>
        <h3 className="bottomtext">{textBottom}</h3>
      </div>
      <div>
        <button onClick={() => changePicture()}>Change</button>

        <label for="file" className="upload">
          Upload
          <input type="file" id="file" accept="image/*" />
        </label>

        <button onClick={() => savePic()}>Generate</button>
        <button onClick={() => deletePic()}>Reset</button>
      </div>
      <div id="create">
        {savedMemes.length ? (
          <div className="memeborder">Your Created Memes</div>
        ) : null}
        {/*  {savedURL ? <img src={savedURL} alt="saved Pic" /> : null} */}
        {savedMemes.length
          ? savedMemes
              .slice(0)
              .reverse()
              .map((meme, index) => <img src={meme} />)
          : null}
      </div>
      <div className="memeborder">Select a meme!</div>

      <div class="galary">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"buttons"}
          activeClassName={"active"}
        />
        {allMemes
          .slice(passedMemes, passedMemes + memesPerPage)
          .map((iteration, index) => {
            return (
              <img onClick={() => setMeme(iteration.url)} src={iteration.url} />
            );
          })}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"buttons"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default App;
