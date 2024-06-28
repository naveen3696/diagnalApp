import React, { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import ContentItem from "../ContentItem/ContentItem";
import "./ContentGrid.css";
import { BarLoader } from "react-spinners";

const initialState = {
  items: [],
  page: 1,
  loading: false,
  hasMore: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      };
    default:
      return state;
  }
};

const ContentGrid = ({ searchTerm }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pageRef = useRef(1);
  const isFetching = useRef(false);

  const fetchData = async (pageToFetch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    isFetching.current = true;
    try {
      const result = await axios.get(
        `https://test.create.diagnal.com/data/page${pageToFetch}.json`,
      );
      dispatch({
        type: "SET_ITEMS",
        payload: result.data.page["content-items"].content,
      });

      if (result.data.page["content-items"].content.length === 0) {
        dispatch({ type: "SET_HAS_MORE", payload: false });
      }
    } catch (error) {
      dispatch({ type: "SET_HAS_MORE", payload: false });
      console.error("Error fetching data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      isFetching.current = false;
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 400
    ) {
      if (!isFetching.current && state.hasMore) {
        const nextPage = pageRef.current + 1;
        pageRef.current = nextPage;
        dispatch({ type: "SET_PAGE", payload: nextPage });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!state.hasMore || state.loading) return;
    fetchData(pageRef.current);
  }, [state.page]);

  const filteredItems = state.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="grid">
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <ContentItem key={index} item={item} />
        ))
      ) : (
        <div>
          {state.items.length > 0 && (
            <div className="no-items-message">
              No item matching search criteria. Please modify search.
            </div>
          )}
        </div>
      )}
      {state.loading && (
        <BarLoader color="#36D7B7" loading={true} css="margin: auto;" />
      )}
    </div>
  );
};

export default ContentGrid;
