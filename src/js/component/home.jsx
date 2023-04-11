import React, {useEffect, useState} from "react";
import Gif from "./gif.jsx"

const API_KEY= 'rZnLT6QGSPRElrHZXpuzi5WB913YgZtr'


//create your first component
const Home = () => {

	const [gifs, setGifs]= useState([])
	const [keyword, setKeyword]=useState("")
	


	const handleSubmit=(e)=>{
		e.preventDefault()
		getGifs=getGifs({keyword})
	}


	const handleChange=(e)=>{
		setKeyword(e.target.value)
	}
	
	const getGifs=({})=> {
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

	useEffect( ()=>{getGifs},[handleSubmit]);
			
			
	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<label htmlFor="search" className="p-3">SearchGif</label>
				<input 
					type="text"
					value={keyword} 
					onChange={handleChange}
					
				/>
				<button className="ms-1">SEARCH</button>

			</form>
				
			<div className="d-flex flex-row overflow-scroll p-1">
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
