const EmailItem = ({ email }) => {
    return (
      <div className="rounded shadow-md">
        <h3 className="font-bold">Subject: {email.subject}</h3>
        <p className="text-sm text-gray-600">From: {email.from}</p>
        <p className="text-gray-700 mt-2">Body: {email.body?.substring(0, 100) ?? "No content"}...</p>
        <span className={`mt-2 inline-block px-3 py-1 rounded text-xs ${email.category === "Spam" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
          {email.category}
        </span>
      </div>
    );
  };
  
  export default EmailItem;
  