import React, {useEffect, useState} from "react";
import Gif from "./gif.jsx"

const API_KEY= 'rZnLT6QGSPRElrHZXpuzi5WB913YgZtr'


//create your first component
const Home = () => {

	const [gifs, setGifs]= useState([])
	

	const getGifs=({keyword='rick'}={})=> {
		const REQUEST_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`
	
		fetch(REQUEST_URL)
			.then(res =>res.json())
			.then(response => {
				const {data} = response
				const gifs = data.map(image=>{
					const {images, title, id}= image
					const {url}=images.downsized
					return {title, id, url, images}
				}
				
				)
				
				setGifs(gifs)
				console.log(gifs)
		})
	};

	useEffect( ()=>{getGifs({keyword:'john-wick'})},[]);
			
			
	return (<div className="container">
				<div className="d-flex flex-row overflow-scroll p-3">
					{
						gifs.map(({id, title, url})=><Gif 
							key={id}
							title={title} 
							url={url}/>)
					}
				</div>
			</div>
		
	);
};

export default Home;
