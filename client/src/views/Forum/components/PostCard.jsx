import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Typography, makeStyles, Box } from '@material-ui/core'

const useStyle = makeStyles({
    root: {
      minWidth: 400,
      maxWidth: 500,
      margin: 'auto',
      flexGrow: '1',
      flexBasis: '0'
      
    },
    header: {
      fontSize: "1rem",
      display: "flex",
      justifyContent: "space-between"
    },
    link: {
        textDecoration: "none"
    },
    title: {
        fontSize: "1.5rem",
        textAlign: "start",
    },
    footer: {
        margin: "5px 0 0 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    user: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        margin: "0 5px 0 5px",
        width: "2rem",
        height: "2rem"
    }

});
function PostCard( {post} ) {
    const classes = useStyle();
    
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Box className={classes.header}>
                    <Typography  color="textSecondary" gutterBottom>
                        {post.post_date}
                    </Typography>
                    <Typography color="textSecondary">
                        EN {post.subtopic.sub_topic_name.toUpperCase()}
                    </Typography>
                </Box>
                <Box>
                    <Link to={`/forum/post/${post.post_id}`} className={classes.link}>
                    <Typography className={classes.title} color="textPrimary">
                        
                        {post.post_title}
                    </Typography>
                    </Link>
                </Box>
                <Box className={classes.footer} color="textSecondary">
                    <Typography className={classes.user} color="textSecondary">
                        <span>Creado por</span>
                        <Avatar className={classes.avatar} alt={post.user.user_name} src={post.user.user_img_profile}/>
                        <span>{post.user.user_name}</span>
                    </Typography>
                    <Typography color="textSecondary">
                        Comentarios {post.comments.length}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PostCard
