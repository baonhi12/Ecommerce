import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { TiArrowBack } from "react-icons/ti";

const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnquiryId = location.pathname.split("/")[3];

  const enquiryState = useSelector((state) => state.enquiry);
  const { enquiryName , enquiryMobile , enquiryEmail , enquiryComment , enquiryStatus } = enquiryState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnquiryId));
  }, [getEnquiryId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    console.log(e , i);
    const data = { id: i, enquiryData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
        dispatch(getAEnquiry(getEnquiryId));
    }, 100);
  };

  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className="mb-4 title">Detail Enquiry</h3>
            <button className='bg-transparent border-0 mb-0 d-flex align-items-center gap-2 text-secondary' style={{width : "10rem"}} onClick={goBack}><TiArrowBack className='fs-5'/> Back to List</button>
        </div>

        <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3 ">
            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Name:</h6>
                <p className="mb-0">{enquiryName}</p>
            </div>

            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Mobile:</h6>
                <p className="mb-0"><a href={`tel:+84${enquiryMobile}`} className='text-decoration-none text-dark'>+84 {enquiryMobile}</a></p>
            </div>

            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Email:</h6>
                <p className="mb-0"><a href={`mailto:${enquiryEmail}`} className='text-decoration-none text-dark'>{enquiryEmail}</a></p>
            </div>

            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Comment:</h6>
                <p className="mb-0">{enquiryComment}</p>
            </div>

            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Status:</h6>
                <p className="mb-0">{enquiryStatus}</p>
            </div>

            <div className="d-flex align-items-center gap-3 ">
                <h6 className="mb-0">Change Status:</h6>
                <div>
                    <select 
                        name="" id="" 
                        defaultValue={enquiryStatus ? enquiryStatus : "Submitted"} 
                        className="form-control form-select"
                        onChange={(e) => setEnquiryStatus(e.target.value, getEnquiryId)}
                    >
                        <option value="Submitted" >Submitted</option>
                        <option value="Contacted" >Contacted</option>
                        <option value="In Progress" >In Progress</option>
                        <option value="Resolved" >Resolved</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEnquiry