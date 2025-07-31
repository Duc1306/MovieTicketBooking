import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';

const AddShow = () => {
    const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchnowPlayingMovies = async () =>{
    setNowPlayingMovies(dummyShowsData)
  }
  useEffect(()=>{
    fetchnowPlayingMovies()
  },[])
  return nowPlayingMovies.length >0 ?  (
    <>
     <Title text1="Add" text2="Shows" />
    </>
  ) : <Loading/>
}

export default AddShow