import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Events, EventDetails, Error, PageNotFound } from './pages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/error/:errorCode" element={<Error />} />
        <Route path="/eventdetails/:id" element={ <EventDetails /> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
