import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData, handleResetHome }) => {
  const { likedMusic, pinnedMusic } = useContext(MusicContext);

  const navStyle = {
    backgroundColor: "#101010",
    borderBottom: "1px solid #282828",
    padding: "0.8rem 1rem",
  };

  const brandStyle = {
    color: "#1db954",
    fontWeight: "bold",
    fontSize: "1.5rem",
  };

  const searchButtonStyle = {
    backgroundColor: "#1db954",
    borderColor: "#1db954",
    color: "#ffffff",
    fontWeight: "bold"
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchMusicData();
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg sticky-top" style={navStyle}>
        <div className="container-fluid">
          {/* --- UPDATED: Added onClick to this Link --- */}
          <Link className="navbar-brand" to="/" style={brandStyle} onClick={handleResetHome}>
            <i className="bi bi-music-note-list mx-2"></i>Hey-Ringtone!
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex w-100 mx-lg-auto my-2 my-lg-0" style={{ maxWidth: "600px" }} role="search" onSubmit={handleSearchClick}>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyPress}
                className="form-control"
                type="search"
                placeholder="Search for songs, artists..."
                aria-label="Search"
              />
              <button type="submit" className="btn ms-2" style={searchButtonStyle}>
                Search
              </button>
            </form>

            <div className="navbar-nav ms-auto d-flex flex-row mt-2 mt-lg-0">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#pinnedMusicModal"
                className="btn btn-dark position-relative mx-1"
                title="Pinned Music"
              >
                <i className="bi bi-pin-angle-fill"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {pinnedMusic.length}
                </span>
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#likedMusicModal"
                className="btn btn-dark position-relative mx-1"
                title="Liked Music"
              >
                <i className="bi bi-heart-fill"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {likedMusic.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Pinned Music Modal --- */}
      <div className="modal fade modal-xl" id="pinnedMusicModal" tabIndex={-1} aria-labelledby="pinnedMusicModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="pinnedMusicModalLabel">
                <i className="bi bi-pin-angle-fill me-2"></i>Pinned Music
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      {/* --- Liked Music Modal --- */}
      <div className="modal fade modal-xl" id="likedMusicModal" tabIndex={-1} aria-labelledby="likedMusicModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                <i className="bi bi-heart-fill me-2"></i>Liked Music
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;