// This component will display the name, Location and MRT location of the school in a card

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import mrtIcon from "../Images/mrt-icon.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../ComponentsCSS/SchoolsCard.css";

import { useContext } from "react"; // allows us to establish connection btwn this component and the Favourites context
import FavouritesContext from "../Contexts/FavouritesContext";
import MoreInfoButton from "./MoreInfoButton";

function SchoolsCard(props) {
  props.data.school_name = props.data.school_name.toLowerCase();
  props.data.address = props.data.address.toLowerCase();
  props.data.mrt_desc = props.data.mrt_desc.toLowerCase();

  const favouritesCtx = useContext(FavouritesContext);
  const itemIsFavourite = favouritesCtx.itemIsFavourite(props.data._id);

  function toggleFavouriteStatusHandler() {
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(props.data._id);
    } else {
      favouritesCtx.addFavourite(props.data);
    }
  }

  return (
    <div className="school-card">
      <p className="school-name">
        {props.data.school_name}
        <FontAwesomeIcon
          className={
            !itemIsFavourite ? "fa-heart-icon" : "fa-heart-icon-toggled"
          }
          icon={faHeart}
          onClick={toggleFavouriteStatusHandler}
        ></FontAwesomeIcon>
      </p>

      <div className="school-location">
        <FontAwesomeIcon
          className="fa-location-dot-icon"
          icon={faLocationDot}
        />

        <span className="school-address">{props.data.address + " ,"}</span>
        <div className="school-postal">{"S" + props.data.postal_code}</div>
      </div>

      <div className="school-mrt-wrapper">
        <FontAwesomeIcon
          className="fa-train-subway-icon"
          icon={faTrainSubway}
        />
        <img className="mrt-icon" src={mrtIcon} alt="mrt icon" />

        <div className="school-mrt-desc">{props.data.mrt_desc}</div>
      </div>

      <div className="container">
        <label className="compare-btn-form-control">
          click to compare
          <input type="checkbox" className="compare-btn"></input>
        </label>
      </div>

      <MoreInfoButton />

    </div>
  );
}

export default SchoolsCard;