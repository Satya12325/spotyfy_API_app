import React from 'react';
import {useState,useEffect} from "react";

import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
} from '@mui/material';
import Cards from './Card';
import { useDispatch,useSelector } from 'react-redux'
import { dataapi } from '../../Redux/getData/data.api';
import Header from '../Header/Header';
import Filters from "../Filters/Filters"
import axios from 'axios';
import { Search } from '@mui/icons-material';

const GridView = () => {
        let token = window.localStorage.getItem("token");

    const {isLoading,isError,data} = useSelector((state)=>state.data)
   
    const [state, setState] = useState();
    const [mdata,setMadta] = useState([]);
    const [serch,setSearcher] = useState("");
    const [popularity,setPopularity] = useState(0)
    const [market,setMarket] = useState("")
    const dispatch = useDispatch()
    let popular = data.map((item) => item.popularity);
    const getMarketData = async() => {
        try{
            const response = await axios.get(
              `https://api.spotify.com/v1/markets`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  //   Content-Type: 'application/json',
                },
              }
            );
            const data = response.data.markets;
            setMadta(data,"market data")
            console.log(data);
        }
        catch(e){
            console.log(e)
        }
    }
  const handleChange = (e) => {
    setState()
    setSearcher(e.target.value);
    console.log(serch)
  }
  const handleChangePopularity = (e) => {
    if(e.target.innerHTML === NaN){
        setPopularity(0)
        setState(data)
    }
    else
    setPopularity(Number(e.target.innerHTML))
    console.log(e.target.innerHTML,"popularity")
    let temp = data.filter((item)=> item.popularity === Number(e.target.innerHTML));
    console.log(temp)
    setState(temp)
  }

  const handleChangeMarket = (e) => {
    setMarket(e.target.innerHTML);

  }
    useEffect(()=>{
        dispatch(dataapi("track"))
        getMarketData()
        // console.log(data,"data")
        // setState(data)
    },[])
    return (
      <>
        <Filters
          data={mdata}
          popularity={popular}
          popularityValue={popularity}
          handleChangePopularity={handleChangePopularity}
          marketValue={market}
          handleChangeMarket={handleChangeMarket}
        />
        <Header data={serch} handleChange={handleChange} />

        <Container maxWidth="lg">
          {state ? (
            <Grid container spacing={2}>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {state?.map((item, i) => {
                    return (
                      <Cards
                        key={i}
                        name={item.name}
                        img={item.album.images[1].url}
                        artists={item.artists[0].name}
                      />
                    );
                  })}
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {data
                    ?.filter((item) => {
                      if (serch === "") {
                        return item;
                      } else if (
                        item.artists[0].name
                          .toLowerCase()
                          .split(" ")
                          .join("")
                          .includes(serch.toLowerCase())
                      ) {
                        return item;
                      }
                      //   else if(item.popularity.includes(Number(popularity))) {
                      //     return item;
                      //   }
                    })
                    .map((item, i) => {
                      return (
                        <Cards
                          key={i}
                          name={item.name}
                          img={item.album.images[1].url}
                            artists={item.artists[0].name}
                        />
                      );
                    })}
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </>
    );
}

export default GridView;