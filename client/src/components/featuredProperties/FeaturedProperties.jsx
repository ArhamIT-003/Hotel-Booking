import "./featuredProperties.css";
import { useFetch } from "../../Hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=true"
  );
  return (
    <div className="fp">
      {loading ? (
        "loading..."
      ) : (
        <>
          {data.map((data) => (
            <div className="fpItem" key={data._id}>
              <img src={data.photo[0]} alt="" className="fpImg" />
              <span className="fpName">{data.name}</span>
              <span className="fpCity">{data.city}</span>
              <span className="fpPrice">
                Starting from ${data.cheapestPrice}
              </span>
              {data.rating && (
                <div className="fpRating">
                  <button>{data.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
