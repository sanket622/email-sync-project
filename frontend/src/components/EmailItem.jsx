const EmailItem = ({ email }) => {
  if (!email) return <p>No email data available</p>;

  return (
    <div className="rounded shadow-md">
      <h3 className="font-bold">Subject: {email.subject ?? "No Subject"}</h3>
      <p className="text-sm text-gray-600">From: {email.from ?? "Unknown"}</p>
      <p className="text-sm text-gray-600">To: {email.to?? "Unknown"}</p>
      <p className="text-gray-700 mt-2">
        Body: {email.body?.substring(0, 100) ?? "No content"}...
      </p>
    </div>
  );
};

export default EmailItem