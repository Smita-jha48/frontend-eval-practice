import React from "react";
import makeRequest from '../../utils/makeRequest';
import { GET_EACH_EVENT } from '../../constants/apiEndPoints';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EventDetailCard } from "../../components";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
      makeRequest(GET_EACH_EVENT(id), {}, navigate)
        .then((response) => {
          setData(response);
        })
        .catch((e) => {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        });
    }, []);
  

    return (
        <>
        {!data ? <div>loading....</div> : <EventDetailCard data={data} />}
        </>
    )
}

export default EventDetails;