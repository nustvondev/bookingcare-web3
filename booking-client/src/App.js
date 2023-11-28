import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  AcceptDoctor,
  Booking,
  Dashboard,
  DetailDoctor,
  DetailPatient,
  DoctorRegister,
  EditDoctor,
  EditPatient,
  HomePage,
  ListBooking,
  ListDoctor,
  ListRecord,
  PatientRegister,
  RevokeDoctor,
  UpdateBooking,
} from "./pages";
import { PATH_ROUTE } from "./constants/defineRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path={PATH_ROUTE.patientRegister}
          element={<PatientRegister />}
        />
        <Route path={PATH_ROUTE.home} element={<HomePage />} />
        <Route path={PATH_ROUTE.doctorRegister} element={<DoctorRegister />} />
        <Route path={PATH_ROUTE.revokeDoctor} element={<RevokeDoctor />} />
        <Route path={PATH_ROUTE.detailPatient} element={<DetailPatient />} />
        <Route path={PATH_ROUTE.editPaitient} element={<EditPatient />} />
        <Route path={PATH_ROUTE.acceptDoctor} element={<AcceptDoctor />} />
        <Route path={PATH_ROUTE.detailDoctor} element={<DetailDoctor />} />
        <Route path={PATH_ROUTE.editDoctor} element={<EditDoctor />} />
        <Route path={PATH_ROUTE.booking} element={<Booking />} />
        <Route path={PATH_ROUTE.updateBooking} element={<UpdateBooking />} />
        <Route path={PATH_ROUTE.listRecord} element={<ListRecord />} />
        <Route path={PATH_ROUTE.listDoctor} element={<ListDoctor />} />
        <Route path={PATH_ROUTE.listBooking} element={<ListBooking />} />
        <Route path={PATH_ROUTE.dashboard} element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
