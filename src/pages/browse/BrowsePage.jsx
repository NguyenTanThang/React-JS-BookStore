import React, { useEffect } from "react";
import { Collapse, Select, Slider, Button, Space, Skeleton } from "antd";
import BookList from "../../components/Book/BookList";
import data from "../../data";
import "./browse.css";
import Ratings from "../../components/Partials/Ratings";
import { useState } from "react";
import { paginate } from "../../utils/pagination";
import Paginator from "../../components/Partials/Paginator";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/Partials/ErrorBox";
import { getAllBooks } from "../../actions/bookActions";
import { sortBooks } from "../../utils/sorter";

const { Option } = Select;
const { Panel } = Collapse;

function BrowsePage() {
  const dispatch = useDispatch();
  const bookListReducer = useSelector((state) => state.bookListReducer);
  const { loading, error, books } = bookListReducer;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [searchedReviews, setSearchedReviews] = useState(0);
  const [searchedPrice, setSearchedPrice] = useState([0, 1000]);
  const [sortCriteria, setSortCriteria] = useState("atoz");
  const [pageObjectGlobal, setPageObjectGlobal] = useState({});

  const resetSearch = () => {
    setSearchedName("");
    setSearchedCategories([]);
    setSearchedPrice([0, 1000]);
    setSearchedReviews(0);
    setSortCriteria("atoz");
  };

  const changePageNumber = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const renderSearchByNamePanel = () => {
    return (
      <Panel header="Search by Name" key="1">
        <input
          placeholder="Title, Author"
          value={searchedName}
          onChange={(e) => setSearchedName(e.target.value)}
        />
      </Panel>
    );
  };

  const selectCategoryItem = (categoryName) => {
    if (!searchedCategories.includes(categoryName)) {
      setSearchedCategories((prevState) => [...prevState, categoryName]);
    } else {
      setSearchedCategories((prevState) =>
        prevState.filter((categoryItem) => {
          return categoryItem !== categoryName;
        })
      );
    }
  };

  const renderSearchByCategoriesPanel = () => {
    return (
      <Panel header="Search by Categories" key="2">
        <div className="categories-group row">
          {data.categories.map((category) => {
            return (
              <div
                key={category.id}
                className={`category-item ${
                  searchedCategories.includes(category.name) ? "active" : ""
                }`}
                onClick={() => selectCategoryItem(category.name)}
              >
                {category.name}
              </div>
            );
          })}
        </div>
      </Panel>
    );
  };

  const renderSearchByReviewsPanel = () => {
    return (
      <Panel header="Search by Reviews" key="3">
        <Ratings
          handleChange={setSearchedReviews}
          currentStar={searchedReviews}
        />
      </Panel>
    );
  };

  const renderSearchByPrice = () => {
    return (
      <Panel header="Search by Price" key="4">
        <p>Price range ($): {`${searchedPrice[0]} -> ${searchedPrice[1]}`}</p>
        <Slider
          range
          defaultValue={searchedPrice}
          value={searchedPrice}
          min={0}
          max={1000}
          onChange={(val) => setSearchedPrice(val)}
        />
      </Panel>
    );
  };

  const renderSearchEngine = () => {
    return (
      <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
        {renderSearchByNamePanel()}
        {renderSearchByCategoriesPanel()}
        {renderSearchByReviewsPanel()}
        {renderSearchByPrice()}
      </Collapse>
    );
  };

  function handleSortChange(value) {
    setSortCriteria(value);
  }

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !error) {
      let currentBooksData = sortBooks(books, {
        searchedName,
        searchedPrice,
        searchedReviews,
        searchedCategories,
        sortCriteria,
      });

      const pageObject = paginate(currentBooksData.length, currentPage, 8, 6);
      currentBooksData = currentBooksData.slice(
        pageObject.startIndex,
        pageObject.endIndex + 1
      );

      setPageObjectGlobal(pageObject);
      setCurrentBooks(currentBooksData);
    }
  }, [
    currentPage,
    books,
    loading,
    error,
    searchedName,
    searchedPrice,
    searchedReviews,
    searchedCategories,
    sortCriteria,
  ]);

  return (
    <div id="browse-page">
      <div className="container section-padding">
        <div className="row jcsb">
          <div className="browse-page__search">{renderSearchEngine()}</div>

          <div className="browse-page__result">
            <div className="browse-page-result__header">
              <div className="row">
                {pageObjectGlobal.totalItems === 0 ? (
                  <p>No result</p>
                ) : (
                  <p>{`Showing ${pageObjectGlobal.startIndex + 1} -
        ${pageObjectGlobal.endIndex + 1} of ${
                    pageObjectGlobal.totalItems
                  } results`}</p>
                )}
                <div className="sort-by">
                  <Space>
                    <Button
                      type="default"
                      className="ant-button primary"
                      onClick={resetSearch}
                    >
                      Reset All
                    </Button>
                    <Select
                      defaultValue={sortCriteria}
                      style={{ width: 120 }}
                      onChange={handleSortChange}
                    >
                      <Option value="atoz">A to Z</Option>
                      <Option value="ztoa">Z to A</Option>
                      <Option value="priceasc">Price (Low to High)</Option>
                      <Option value="pricedesc">Price (High to Low)</Option>
                      <Option value="ratingasc">Ratings (Low to High)</Option>
                      <Option value="ratingdesc">Ratings (High to Low)</Option>
                      <Option value="dateasc">
                        Added Date (Newest to Oldest)
                      </Option>
                      <Option value="datedesc">
                        Added Date (Oldest to Newest)
                      </Option>
                    </Select>
                  </Space>
                </div>
              </div>
            </div>

            {error && <ErrorBox message={error} />}

            {loading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <>
                <BookList books={currentBooks} />

                <Paginator
                  pageObject={pageObjectGlobal}
                  onChangePageNumber={changePageNumber}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
