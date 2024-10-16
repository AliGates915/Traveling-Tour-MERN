import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  // Check if item and key fields are defined before rendering
  return (
    <div className="searchItem">
      {/* Check if photos array exists and has at least one photo */}
      <img src={item?.photos?.[0] || "default_image_url.jpg"} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item?.name || "No name available"}</h1>
        <span className="siSubtitle">{item?.city}</span>
        
        <span className="siDistance">{item?.distance ? `${item.distance}m from center` : "Distance not available"}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item?.desc || "Description not available"}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item?.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item?.cheapestPrice || "Price not available"}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item?._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
