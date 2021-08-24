import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import {
	createFile,
} from '../../redux/actions/fileActions';
import './loaderImage.css';

// hooks
import useStorage from '../../hooks/useStorage'

const LoaderFile = ({ desc, file, setFile, setLoading }) => {
	const { url, progress } = useStorage(file)
	const dispatch = useDispatch()

	useEffect(() => {
		if (url) {
			setFile(null)
			setLoading(false)
			console.log('dentro de la cosa',desc)
			console.log('dentro de la cosa',url)
			console.log('dentro de la cosa',file.name)
			const fileToCreate = {name: file.name, description:desc, url:url}
			dispatch(createFile(fileToCreate));
		}
	}, [url, setFile, setLoading])

	return (
		<div className='loader'>
			<div className='cargando'>
				<h3 className='loader__title'>Guardando archivo</h3>			
				<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			</div>
			<div className='loader__progress'>
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: progress + '%' }}
					className='loader__progress--bar'
				></motion.div>
			</div>
		</div>
	)
}

export default LoaderFile
