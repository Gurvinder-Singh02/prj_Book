import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


const CreateBook = () => {

  const [form , setForm] = useState({title: '', author: '', PublishYear: ''});
  const[ loading , setLoading ] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handelChange = (evt) => {
    setForm({...form, [evt.target.name]: evt.target.value});
  }
  const handelSubmit = (evt) => {
    console.log(form);
    setLoading(true);
    axios.post('http://localhost:8000/books', form)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate("/");
      }).catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
      });
    evt.preventDefault();
  }

  return (
    <div>
      {loading && <div className="fixed top-1/2 left-1/2 ">< Spinner/></div> }
      <BackButton />
      <form className='flex w-96 rounded-lg border border-sky-400 mx-auto flex-col justify-center p-8  ' onSubmit={handelSubmit}>
        <input className='border border-slate-500 rounded-md p-2 mb-4 w-full' onChange={handelChange} name='title' value={form.title} type="text" placeholder='Enter Title' />
        <input className='border border-slate-500 rounded-md p-2 mb-4  w-full'  onChange={handelChange} name='author'  type="text" placeholder='Enter author' />
        <input className='border border-slate-500 rounded-md p-2 mb-4  w-full'  onChange={handelChange} name='PublishYear'  type="text" placeholder='Enter PublishYear' />
        <button className='bg-sky-500 rounded-md p-3 text-white hover:bg-sky-300' type="submit">Create Book </button>
      </form>
      
    </div>
  )
}

export default CreateBook

