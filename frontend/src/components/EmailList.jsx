import { useEffect, useState } from "react";
import { fetchEmails } from "../api/emailApi";
import EmailItem from "./EmailItem";
import { data } from "react-router-dom";

const EmailList = ({ searchResults }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const loadEmails = async () => {
      const data = await fetchEmails();
      setEmails(data);
    };
    loadEmails();
  }, []);
  
  const displayEmails = searchResults.length ? searchResults : emails;
  
  return (
    <div className="p-4">
      {displayEmails.map((email) => (
        <EmailItem key={email._id} email={email._source} />
      ))}
    </div>
  );
};

export default EmailList;
