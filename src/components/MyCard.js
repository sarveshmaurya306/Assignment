import React, { useEffect, useState } from 'react'
import {Card, 
	CardContent, 
	CardMedia, 
	Typography, 
	IconButton, 
	Backdrop, 
	TextField, 
	Button, 
	CircularProgress } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import axios from 'axios';
import "./style.css"

function MyCard() {
	const [liked, setIsLiked]=useState(true);
	const [data, setData] = useState([]);

	useState(()=>{},[liked])

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		
		axios.get(`https://api.nasa.gov/planetary/apod?api_key=cEyP8oUpG8Q1Kg2Cof5lKUk8ShuQ5DNbFH18QuaC&count=28`)
			.then(r => { setData(r.data); setIsReady(true) })
			.catch(e => console.log(e))
	}, [])
	
	const [share, setShare] = useState(false);
	const [url, setUrl] = useState("");
	const [sec, setSec] = useState(0);

	const CopyText = () => {
		console.log(url)
		navigator.clipboard.writeText(url)
	}

	const handleShare = (uri) => {
		setShare(true);
		setUrl(uri)
		setSec(4);
		for (let i = 1;i <= 4;i++) {
			setTimeout(() => {
				setSec(e => e - 1)
			}, 1000 * i)
		}
		setTimeout(() => {
			setShare(false);
		}, 4000)
	}

	if (!isReady) {
		return (
			<div className='contained_center'>
				<CircularProgress />
				Building your ❤️
			</div>
		)
	}

	return (
		<div className='_container'>
			{
				data?.map((d, ind) => {
					return (
						<div key={ind}>
							<Card sx={{ maxWidth: 300 }} style={{ marginBottom: 30 }}>

								<CardContent>
									<Typography className='title' component="div">
										{d.title}
									</Typography>
									<Typography variant='small'>
										<span class="copyright">Copyright: {d?.copyright}</span>
									</Typography>
								</CardContent>
								<CardMedia
									component="img"
									height="140"
									src={d.url}
									alt="NASA image"
									style={{background:'red !important'}}
								/>
								<CardContent>
									<Typography className="more" variant="body2" color="text.secondary">
										{d.explanation}
									</Typography>
									<Typography variant="p">
										{d.date}
									</Typography>
								</CardContent>
								<CardContent>
									<IconButton aria-label="add to favorites" onClick={()=>{
										if(data[ind].isLiked===undefined || data[ind].isLiked===false)
											data[ind].isLiked=true;
										else
											data[ind].isLiked=false;
										
										setIsLiked(e=>!e);
									}}>
										<FavoriteIcon style={d?.isLiked?{color:"red"}:{}} />
									</IconButton>
									<IconButton aria-label="add to favorites" onClick={() => handleShare(d.hdurl)}>
										<ShareIcon  />
									</IconButton>
								</CardContent>
										
							</Card>
							<Backdrop
								sx={{ background: "rgb(0 0 0 / 9%)", zIndex: 1 }}
								open={share}
								style={{ display: "flex", flexDirection: 'column' }}
							>
								<TextField
									value={url}
									InputProps={{
										readOnly: true,
									}}
									variant="outlined"
									style={{ background: 'gray' }}
								/>
								<Button variant='contained' color="success" onClick={CopyText}>copy</Button>
								<p style={{ color: 'white' }}>Vanishing in {sec}sec</p>
							</Backdrop>
						</div>
					)
				})
			}
		</div>
	)
}

export default MyCard
