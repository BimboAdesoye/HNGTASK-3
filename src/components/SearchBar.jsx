import { useState } from "react";
import { Images } from "../components/Images";
import SearchIcon from "../assets/Search.svg";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchValue = e.target.value;
    const newFilter = Images.filter((image) => {
      return image.tag.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (searchValue === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div>
      <form className="nav-form">
        <input
          type="text"
          placeholder="Search images by tags..."
          onChange={handleFilter}
        />
        <img className="search-icon" src={SearchIcon} alt="search-icon" />
      </form>
      {filteredData.length != 0 && (
        <div className="search-results d-flex flex-column gap-3">
          {filteredData.map((data) => {
            return (
              <div key={data.id} className="d-flex align-items-center gap-3">
                <p>{data.tag}</p>
                <img src={data.img} alt="" className="search-img" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
