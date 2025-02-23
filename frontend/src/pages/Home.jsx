import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EmailList from "../components/EmailList";
import { searchEmails } from "../api/emailApi";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchEmails(query);
    setSearchResults(results);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">📧 Email Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
        <EmailList searchResults={searchResults} />
      </div>
    </div>
  );
};

export default Home;
