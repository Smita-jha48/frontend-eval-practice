import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBookmark as regularBookmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleXmark, faBookmark} from '@fortawesome/free-regular-svg-icons';
import { UPDATE_EVENT_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import getFormattedDateFromUtcDate from "../../utils/commons";
import './EventCard.css'



function EventCard({id, index, data}) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(data.isRegistered);
  const [bookmark, setBookmark] = useState(data.isBookmarked);
  const handleBookmark = async(id) =>{
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
}


   return (
    <>
    <div className="card" onClick={()=>{navigate(`/eventdetails/${id}`)}}>
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
                  <div className="card-footer">
                     <div><FontAwesomeIcon  icon={faCircleCheck} color="#42f551" size="2x"></FontAwesomeIcon> REGISTERED</div>
                     <div>
                     { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282"/>
                     ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282" />
                    )}</div>
                  </div>
                
               ): !data.areSeatsAvailable? (
                  <div className="card-footer">
                    <div><FontAwesomeIcon  icon={faCircleXmark} color="#ECECAB" size="2x"></FontAwesomeIcon> NO SEATS AVAILABLE</div>
                    <div>
                     { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282"/>
                     ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282" />
                    )}</div>
                    </div>
               ): (
                  <div className="card-footer">
                  <div></div>
                  { bookmark ? (<FontAwesomeIcon icon={faBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282"/>
                  ) : ( <FontAwesomeIcon icon={regularBookmark} onClick={()=>handleBookmark(id)} size="2x" color="#EA8282" />
                 )}</div>
                  )
            }
         </div>
    </div>

    </div>
    </>
   )
}

export default EventCard