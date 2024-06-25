import React, { useState } from 'react';
import Header from './components/Header/Header';
import ContentGrid from './components/ContentGrid/ContentGrid';
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />
      <ContentGrid searchTerm={searchTerm} />
    </div>
  );
}

export default App;
