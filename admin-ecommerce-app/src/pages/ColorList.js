import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
import CustomModal from '../components/CustomModal';
import { deleteAColor, resetState } from '../features/color/colorSlice';

const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Color',
      dataIndex: 'colorBox',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []); 

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      colorBox: (
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: colorState[i].title, // màu sẽ được lấy từ tên màu hoặc mã màu
            border: 'none',
          }}
        />
      ),
      title: colorState[i].title,
      
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/color/${colorState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(colorState[i]._id)} ><MdOutlineDelete /></button>
      </>
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Colors List</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteColor(colorId);
          }}
          title="Are you sure you want to delete this color???" 
        />
    </div>
  )
}

export default ColorList