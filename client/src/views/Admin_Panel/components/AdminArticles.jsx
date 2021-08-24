import React, { useState, useEffect } from 'react';
import { 
    getHideArticles,
    changeVisibility
} from '../../../redux/API/index'
import { 
    Button,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    Typography
} from '@material-ui/core';


function AdminArticles() {
    const [ hideArts, setHideArts ] = useState()

    const setArts = async () => {
        const newHide = await getHideArticles();
        setHideArts(newHide.data)
    };

    useEffect(async ()=>{
        setArts();
    },[])

    const showArticle = async (art_id) => {
        try {
            const response = await changeVisibility(art_id)
            setArts();
        } catch(err) { alert('No update') }
    }

    return (
        <>
        {   
            hideArts &&
            hideArts.length > 0 ?
            <Table>
                <TableHead>
                    <TableCell>Autor</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell></TableCell>
                </TableHead>
                <TableBody>
                    {
                        hideArts.map(a => (
                            <TableRow>
                            <TableCell>{a.user.user_name}</TableCell>
                            <TableCell>{a.art_title}</TableCell>
                            <TableCell>
                                <Button onClick={() => showArticle(a.art_id)}>
                                    MOSTRAR
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            :
            <Typography> No hay artículos ocultos </Typography>
        }
        </>    
    )
}

export default AdminArticles
