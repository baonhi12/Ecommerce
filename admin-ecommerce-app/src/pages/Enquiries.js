import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import { MdOutlineBookmarkRemove  } from "react-icons/md";
import { PiEyesFill } from "react-icons/pi";
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []); 

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select 
            name="" id="" 
            defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"} 
            className="form-control form-select"
            onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}
          >
            <option value="Submitted" >Submitted</option>
            <option value="Contacted" >Contacted</option>
            <option value="In Progress" >In Progress</option>
            <option value="Resolved" >Resolved</option>
          </select>
        </>
      ),
      
      action: (
        <>
          <Link className='fs-4 text-dark' to={`/admin/enquiries/${enquiryState[i]._id}`}><PiEyesFill/></Link>
          <button className='ms-3 fs-4 text-dark bg-transparent border-0' onClick={() => showModal(enquiryState[i]._id)} ><MdOutlineBookmarkRemove  /></button> 
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    console.log(e , i);
    const data = { id: i, enquiryData: e };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Enquiries</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteEnquiry(enquiryId);
          }}
          title="Are you sure you want to delete this enquiry???" 
        />
    </div>
  )
}

export default Enquiries