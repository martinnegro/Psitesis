import React, { useState } from 'react'

// components
import DragFile from './DragFile'
import LoaderFile from './LoaderFile'

const Uploader = () => {
	const [file, setFile] = useState(null)
	const [desc, setDesc] = useState('')
	const [loading, setLoading] = useState(false)

	return (
		<section>
			{loading ? (
				<LoaderFile desc={desc} file={file} setFile={setFile} setLoading={setLoading} />
			) : (
				 <DragFile setDesc={setDesc} setMedia={setFile} setLoading={setLoading} />
			)}
		</section>
	)
}

export default Uploader
