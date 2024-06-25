import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContentItem from '../ContentItem/ContentItem';
import "./ContentGrid.css"
import { BarLoader } from 'react-spinners'; 


const ContentGrid = ({ searchTerm }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      setItems(prevItems => [...prevItems, ...result.data.page['content-items'].content]);

      // Check if there's more content to fetch
      if (result.data.page['content-items'].content.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (!hasMore || loading) return;
    fetchData();
  }, [page]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid">
      {filteredItems.map((item, index) => (
        <ContentItem key={index} item={item} />
      ))}
      {loading && <BarLoader color="#36D7B7" loading={true} css="margin: auto;" />}
      </div>
  );
}

export default ContentGrid;
