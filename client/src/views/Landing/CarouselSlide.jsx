import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Slide, Box } from '@material-ui/core';
import img1 from './../../assets/Image1.png';
import img2 from './../../assets/Image2.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const CarouselSlide = (props) => {
	const { backgroundColor, description, src } = props.content;

	const useStyles = makeStyles((theme) => ({
		card: {
			backgroundColor,
			borderRadius: 5,
			padding: '75px 50px',
			margin: '0px 25px',
			width: '500px',
			boxShadow: '20px 20px 20px black',
			display: 'flex',
			justifyContent: 'center',
		},
		img: {
			margin: theme.spacing(2),
			width: '300px',
			height: '300px',
		},
		h1: {
			fontSize: 30,
			color: '#800080',
			margin: theme.spacing(3),
		},
		btnIr: {
			display: 'none',
			textDecoration: 'none',
			'@media (max-width: 601px)': {
				display: 'block',
			},
		}
	}));

	const classes = useStyles();

	return (
		<Box>
			<div>
				{src === '1' ? (
					<img className={classes.img} src={img1} alt="Carousel1" />
				) : (
					<img className={classes.img} src={img2} alt="Carousel2" />
				)}
				<Typography className={classes.h1}>
					{description}					
				</Typography>
				<a href='#ingresar' className={classes.btnIr}><KeyboardArrowDownIcon /></a>
			</div>
		</Box>
	);
};

export const SLIDE_INFO = [
	{
		src: '1',
		description:
			'Encontra artículos escritos por expertos para ayudarte a hacer tu tesis.',
	},
	{
		src: '2',
		description:
			'Forma parte de nuestra comunidad interactuando con otros estudiantes en el FORO ',
	},
];

export const Arrow = (props) => {
	const { direction, clickFunction } = props;
	const icon = direction === 'left' ? <ChevronLeft /> : <ChevronRight />;
	return <div onClick={clickFunction}>{icon}</div>;
};

export const Carousel = (props) => {
	//Cada cuanto segundo cambia el slide
	const delay = 5;
	const [slideIn, setSlideIn] = useState(true);
	const [slideDirection, setSlideDirection] = useState('down');
	const [index, setIndex] = useState(0);

	const content = SLIDE_INFO[index];
	const numSlides = SLIDE_INFO.length;
	const onArrowClick = (direction) => {
		const increment = direction === 'left' ? -1 : 1;
		const newIndex = (index + increment + numSlides) % numSlides;

		const oppDirection = direction === 'left' ? 'right' : 'left';
		setSlideDirection(direction);
		setSlideIn(false);

		setTimeout(() => {
			setIndex(newIndex);
			setSlideDirection(oppDirection);
			setSlideIn(true);
		}, 500);
	};

	useEffect(() => {
		let timer1 = setTimeout(() => onArrowClick('right'), delay * 1000);
		return () => {
			clearTimeout(timer1);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	});
	return (
		<>
			<Arrow direction="left" clickFunction={() => onArrowClick('left')} />
			<Slide in={slideIn} direction={slideDirection}>
				<div>
					<CarouselSlide content={content} />
				</div>
			</Slide>
			<Arrow direction="right" clickFunction={() => onArrowClick('right')} />
		</>
	);
};

export default Carousel;
