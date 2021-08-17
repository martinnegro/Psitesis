import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';


const TopicCard = ({id,name}) =>{

    return(
<Container>
<Typography variant='h2' >{name}</Typography>

</Container>
    )
}

export default TopicCard