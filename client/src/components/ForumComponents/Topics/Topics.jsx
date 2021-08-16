import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import SubTopics from '../SubTopics/SubTopics'
const Topics = ({name}) =>{

    return(
<Container>
<Typography variant='h2' >{name}</Typography>
<SubTopics name = "subtopic name example" description = "description example :" ></SubTopics>
</Container>
    )
}

export default Topics