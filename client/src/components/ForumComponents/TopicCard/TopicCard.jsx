import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import SubTopicCard from '../SubTopicCard/SubTopicCard'

const TopicCard = ({name}) =>{

    return(
<Container>
<Typography variant='h2' >{name}</Typography>
<SubTopicCard name = "subtopic name example" description = "description example :" ></SubTopicCard>
</Container>
    )
}

export default TopicCard