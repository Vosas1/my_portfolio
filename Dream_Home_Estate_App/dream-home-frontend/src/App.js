import React, { useState } from 'react';
import PropertiesList from './components/PropertiesList';
import AddPropertyForm from './components/AddPropertyForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  // Function to refresh property list after adding
  const handlePropertyAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h1>Dream Home Estate</h1>
      <AddPropertyForm onPropertyAdded={handlePropertyAdded} />
      <PropertiesList key={refresh} />
    </div>
  );
}

export default App;

