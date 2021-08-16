import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const SubTopics = ({name,description}) =>{

    return(
<Container>
<Typography variant='h2' >{name}</Typography>
<Typography variant='h3' >{description}</Typography>

</Container>
    )

}

export default SubTopics