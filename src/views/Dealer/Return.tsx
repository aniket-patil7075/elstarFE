import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getStripePayment } from "./Services/WorkflowService";

const Return = () => {
    const [status, setStatus] = useState(null);
  
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      if (sessionId) {
          fetch(`http://localhost:1024/elstar-local/session-status?session_id=${sessionId}`)
              .then((res) => res.json())
              .then((data) => {
                  setStatus(data.status);
              })
              .catch((error) => {
                  console.error("Error fetching session status:", error);
              });
      }
  }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
  
    if (status === 'paid') {
      return (
       <Navigate to="/dealer/workflow" state={{ status }} />
      )
    }

    console.log("Status of return : ",status)
  
    return null;
  }

  export default Return