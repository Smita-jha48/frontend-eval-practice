import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { NavBar, Filters, EventCardHolder } from "../../components";
import  makeRequest from '../../utils/makeRequest';
import { GET_EVENT_DATA } from '../../constants/apiEndPoints';

function Events () {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  useEffect(() => {
    makeRequest(GET_EVENT_DATA, {}, navigate)
      .then(async (response) => {
        setEvent(response);
      })
      .catch((e) => {
        if (navigate) {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        }
      });
  }, []);
  return (
    <>
    {event.length === 0 ? (
        <div>loading....</div>
      ) : (
        <>
      <NavBar />
      <Filters />
      <EventCardHolder event={event} />
      </>
      )
}
    </>
  )
 
}

export default Events;
