import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let handelClick = () => {
    console.log('delete');
    axios.delete(`http://localhost:8000/books/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  console.log(id);
  return (
    <>
      <div>
        {loading && <div className="fixed top-1/2 left-1/2 ">< Spinner /></div>}
      </div>
      <BackButton />
      <div className='flex items-center justify-center h-screen'>
        <div onClick={handelClick} className='w-1/2 mx-auto bg-red-600 hover:bg-red-400 rounded-xl text-center text-white mt-1/2 p-10 '>you sure you want to delete this book </div>
      </div>
    </>
  )
}


export default DeleteBook