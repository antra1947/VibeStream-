import React, { useContext } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const { likedMusic, setLikedMusic, pinnedMusic, setPinnedMusic } = useContext(MusicContext);

  // A more efficient, reusable function to toggle items in localStorage and context
  const toggleItem = (storageKey, item, setter) => {
    // Get the current list from localStorage, or initialize an empty array if it doesn't exist
    let list = JSON.parse(localStorage.getItem(storageKey)) || [];
    let updatedList;

    // Check if the item is already in the list
    if (list.some((i) => i.id === item.id)) {
      // If it is, filter it out (remove it)
      updatedList = list.filter((i) => i.id !== item.id);
    } else {
      // If it's not, add it to the list
      updatedList = [...list, item];
    }
    // Update the component's state
    setter(updatedList);
    // Save the new list back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
  };

  // Check the current status of the song
  const isLiked = likedMusic.some((item) => item.id === element.id);
  const isPinned = pinnedMusic.some((item) => item.id === element.id);

  return (
    <div key={element.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100">
        <div className="ratio ratio-1x1">
          <img
            src={element.album.images[0]?.url || 'https://i.scdn.co/image/ab67616d0000b273d4344acb4d89b9148d486b99'} // Fallback image
            className="card-img-top"
            alt={element.name}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mt-2" title={element.name}>{element.name}</h5>
          <p className="card-text">Artist: {element.album.artists[0].name}</p>
          
          {/* Use mb-auto to push the content below it to the bottom */}
          <div className="mt-auto">
            <audio src={element.preview_url} controls className="w-100 mb-3"></audio>
            <div className="d-flex justify-content-end align-items-center">
              <button
                onClick={() => toggleItem("pinnedMusic", element, setPinnedMusic)}
                className="btn btn-outline-light mx-1"
                title={isPinned ? "Unpin" : "Pin"}
              >
                <i className={`bi ${isPinned ? "bi-pin-angle-fill text-warning" : "bi-pin-angle"}`}></i>
              </button>
              <button
                onClick={() => toggleItem("likedMusic", element, setLikedMusic)}
                className="btn btn-outline-light"
                title={isLiked ? "Unlike" : "Like"}
              >
                <i className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;