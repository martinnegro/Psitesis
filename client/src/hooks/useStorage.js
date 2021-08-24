import { useState, useEffect } from 'react'
import { fbStorage } from '../services/firebase'

const useStorage = (file) => {
	const [progress, setProgress] = useState(0)
	const [error, setError] = useState(null)
	const [url, setUrl] = useState(null)

	// useEffect se ejecutara cada vez que file cambie de valor
	useEffect(() => {
		// references
		const storageRef = fbStorage.ref(file.name)

		// subimos la imagen, suceden ciertas cosas
		storageRef.put(file).on(
			'state_changed',
			(snap) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
				setProgress(percentage)
			},
			(err) => {
				setError(err)
			},
			async () => {
				const url = await storageRef.getDownloadURL()
				setUrl(url)
			}
		)
	}, [file])

	return { progress, url, error }
}

export default useStorage
