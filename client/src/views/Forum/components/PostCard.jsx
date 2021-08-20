import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Typography, makeStyles, Box } from '@material-ui/core'
import { getDateTime } from '../../../utils/auth';

const useStyle = makeStyles({
    root: {
        padding: "0 10px 0 15px",
        "&:last-child": {
          paddingBottom: "5px"
        },
        margin: 'auto',
        flexGrow: '1',
        flexBasis: '0'
    },
    
    inLine: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
    },
    titleAndCat: {
        display: "flex",
        alignItems: "baseline"
    },
    link: {
        textDecoration: "none"
    },
    title: {
        fontSize: "1.5rem",    
        margin: "0 0 0 5px"
    },
    commentsAndDate: {
        width: "25%",
        display: "flex",
        justifyContent: "space-between"
    },
    footer: {
        margin: "0",
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
    
    const highlight = () => {
        if (post.post_highlight) return { border: "2px solid gold", backgroundColor: "#E9F089" };
        else return {}
    };

    return (
        <Card style={highlight()} variant="outlined">
            <CardContent className={classes.root}>
                <Box className={classes.inLine} >
                    <Box className={classes.titleAndCat}>
                        {
                            post.subtopic ?
                            <Typography color="textSecondary">
                                EN {post.subtopic.sub_topic_name.toUpperCase()}:
                            </Typography> :
                            <></>
                        }
                        <Link to={`/forum/post/${post.post_id}`} className={classes.link}>
                        <Typography className={classes.title} color="textPrimary">
                            {post.post_title}
                        </Typography>
                        </Link>
                    </Box>
                    <Box className={classes.commentsAndDate}>
                        <Typography color="textSecondary">
                            {post.comments.length} Comentarios
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                            {getDateTime(post.createdAt)}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.footer} color="textSecondary">
                    <Typography className={classes.user} color="textSecondary">
                        <span>Creado por</span>
                        <Avatar className={classes.avatar} alt={post.user.user_name} src={post.user.user_img_profile}/>
                        <span>{post.user.user_name}</span>
                    </Typography>
                    
                </Box>
            </CardContent>
        </Card>
    )
}

export default PostCard
