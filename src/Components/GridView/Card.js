import React from 'react'
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
} from '@mui/material';


export default function Cards({ name, img, artists }) {
  return (
    <Card sx={{ bgcolor: "#f5f5f5", height: "300px" }}>
    <CardActionArea>
        <CardMedia
        style={{ height: "150px"}}
            component="img"
            image={img}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {name}
            </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                      Artists : {artists}
                  </Typography>
        </CardContent>
    </CardActionArea>
</Card>
  )
}
