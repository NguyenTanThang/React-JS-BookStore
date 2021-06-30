import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BookList from "../../components/Book/BookList";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooksRecSection } from "../../actions/bookActions";
import ErrorBox from "../../components/Partials/ErrorBox";
import { Skeleton } from "antd";

function Home() {
  const dispatch = useDispatch();
  const bookRecSectionReducer = useSelector(
    (state) => state.bookRecSectionReducer
  );

  const { loading, error, recSection } = bookRecSectionReducer;

  useEffect(() => {
    dispatch(getBooksRecSection());
  }, [dispatch]);

  const renderRecSections = (sectionName) => {
    return (
      <>
        {error && <ErrorBox message={error} />}

        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <BookList books={recSection[sectionName]} />
          </>
        )}
      </>
    );
  };

  return (
    <div id="home-page">
      <section id="home-banner">
        <div className="home-banner__content">
          <h1>
            Welcome to the <span className="text-primary">BOOK</span>STORE
          </h1>
          <h3>Where you can get any books you like</h3>
          <h5>For a reasonable price</h5>
          <Link to="/browse" className="button primary">
            BROWSE NOW
          </Link>
        </div>
      </section>

      <section id="home-top-ratings" className="section-padding">
        <div className="home-section-header">
          <div className="container">
            <div className="row aic">
              <div className="left">
                <h2>Top Ratings</h2>
              </div>
              <div className="right">
                <Link to="/browse" className="link-with-icon row aic">
                  <div className="icon">
                    <SearchOutlinedIcon />
                  </div>
                  <div className="text">Browse</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">{renderRecSections("topRatingsBooks")}</div>
      </section>

      <section id="home-new-releases" className="section-padding">
        <div className="home-section-header">
          <div className="container">
            <div className="row aic">
              <div className="left">
                <h2>New Releases</h2>
              </div>
              <div className="right">
                <Link to="/browse" className="link-with-icon row aic">
                  <div className="icon">
                    <SearchOutlinedIcon />
                  </div>
                  <div className="text">Browse</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">{renderRecSections("newReleasesBooks")}</div>
      </section>
    </div>
  );
}

export default Home;
