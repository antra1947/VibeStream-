import "./App.css";
import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";
import { initializePlaylist } from "./initialize";

function App() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);

  const {
    isLoading,
    setIsLoading,
    setLikedMusic,
    setPinnedMusic,
    resultOffset,
    setResultOffset,
  } = useContext(MusicContext);

  const fetchMusicData = async (offset = resultOffset) => {
    if (!keyword.trim()) {
      setMessage("Please enter a search term.");
      setTracks([]);
      return;
    }
    if (offset === 0) {
      setTracks([]);
    }
    window.scrollTo(0, 0);
    setIsLoading(true);
    setMessage("");

    try {
      const apiUrl = process.env.REACT_APP_NOCODE_API_URL;
      const response = await fetch(
       `${apiUrl}/search?type=track&q=${keyword}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data. Please try again later.");
      }

      const jsonData = await response.json();
      if (jsonData.tracks.items.length === 0 && offset === 0) {
        setMessage("No results found. Try a different search!");
      }
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setResultOffset(0);
      fetchMusicData(0);
    }
  };

  // Function to reset the view to the home screen ---
  const handleResetHome = () => {
    setKeyword("");
    setTracks([]);
    setMessage("");
    setResultOffset(0);
  };

  useEffect(() => {
    initializePlaylist();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")) || []);
    setPinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentPage = resultOffset / 20 + 1;

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={() => {
          setResultOffset(0);
          fetchMusicData(0);
        }}
        handleResetHome={handleResetHome} // Pass the reset function to Navbar
      />

      <main className="container main-container">
        {isLoading && (
          <div className="spinner-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!isLoading && tracks.length === 0 && (
          <div className="welcome-screen">
            {message ? (
              <h2 className="text-danger">{message}</h2>
            ) : (
              <>
                <i className="bi bi-music-note-list"></i>
                <h1>Welcome to Hey-Ringtone!</h1>
                <h3 className="py-3 text-muted">Search for a song to get started</h3>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light mt-4"
                  href="https://github.com/antra1947/VibeStream-"
                >
                  <i className="bi bi-github mx-2"></i>View on Github
                </a>
              </>
            )}
          </div>
        )}

        {!isLoading && tracks.length > 0 && (
            <div className="row">
                {tracks.map((element) => (
                    <Card key={element.id} element={element} />
                ))}
            </div>
        )}
        
        {!isLoading && tracks.length > 0 && (
          <div className="row mt-5 pagination-controls">
            <div className="col text-center">
              <button
                onClick={() => {
                  const newOffset = resultOffset - 20;
                  setResultOffset(newOffset);
                  fetchMusicData(newOffset);
                }}
                className="btn btn-lg mx-2"
                disabled={resultOffset === 0}
              >
                &larr; Previous
              </button>
              <span className="align-middle mx-3 fs-5">Page {currentPage}</span>
              <button
                onClick={() => {
                  const newOffset = resultOffset + 20;
                  setResultOffset(newOffset);
                  fetchMusicData(newOffset);
                }}
                className="btn btn-lg mx-2"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;