import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBookmark as regularBookmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleXmark, faBookmark} from '@fortawesome/free-regular-svg-icons';
import { UPDATE_EVENT_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import NavBar from '../NavBar';
import getFormattedDateFromUtcDate from "../../utils/commons";
import './EventDetailCard.css';

function EventDetailCard ({data}) {
  
  const navigate = useNavigate();
  const [register, setRegister] = useState(data.isRegistered);
  const [bookmark, setBookmark] = useState(data.isBookmarked);
  const handleRegister = async (id) => {
    try {
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isRegistered: !register,
          },
        },
        navigate
      );
      setRegister(!register);
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };

  const handleBookmark = async (id) => {
    try {
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isBookmarked: !bookmark,
          },
        },
        navigate
      );
      setBookmark(!bookmark);
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };
  return (
    <>
    <NavBar />
    <div className="container-card">
    <img className="card-img" src={data.imgUrl} alt="event"/>
    <div className="card-content">
      <div>
        <h1 className="card-header">{data.name}</h1>
         <p className="card-text">{data.description}</p>
         <div className="card-venue-date">
         <p className="card-text">VENUE: {data.venue} </p>
         <p className="card-text">DATE: {getFormattedDateFromUtcDate(data.datetime,data.timezone)} </p>
        </div>
      </div>
          <div>
            {
               register? (
                <div>
                  <div className="card-footer">
                     <div><FontAwesomeIcon  icon={faCircleCheck} color="#42f551" size="2x"></FontAwesomeIcon> REGISTERED</div>
                     <div>
                     { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282"/>
                     ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282" />
                    )}</div>
                  </div>
                 <button className="card-button-single" onClick={() => handleRegister(data.id)}> Unregister </button>
                 </div>
               ): !data.areSeatsAvailable? (
                  <div className="card-footer">
                    <div><FontAwesomeIcon  icon={faCircleXmark} color="#ECECAB" size="2x"></FontAwesomeIcon> NO SEATS AVAILABLE</div>
                    <div>
                     { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282"/>
                     ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282" />
                    )}</div>
                    </div>
               ): (
                <div>
                  <div className="card-footer">
                  <div></div>
                  { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282"/>
                  ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(data.id)} size="2x" color="#EA8282" />
                 )}</div>
                 <button className="card-button-single" onClick={() => handleRegister(data.id)}> Register </button>
                 </div>
                  )
            }
         </div>
    </div>
    </div>
    </>

  )

}

export default EventDetailCard;