import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Typography, makeStyles, Box } from '@material-ui/core'
import { getDateTime } from '../../../utils/auth';
import { Divider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const useStyle = makeStyles({
    container: {
        '@media (max-width: 601px)': {
			borderRadius: 0,
            border: 'none',
            // borderBottom: 'solid 1px  #031927',
            // borderBottomWidth: 'medium',
            // borderBottomWidth: 'thin',
		},
    },
    bigLink: {
        pointerEvents: 'none',
        textDecoration: "none",
        '@media (max-width: 601px)': {
            textDecoration: "none",
			pointerEvents: 'all'
		},
    },
    root: {
        padding: "0 10px 0 15px",
        "&:last-child": {
          paddingBottom: "5px"
        },
        margin: 'auto',
        flexGrow: '1',
        flexBasis: '0',

        '@media (max-width: 601px)': {
			width: "100%",            
            padding: "0 10px 0 15px",
            margin: '10px auto',
            display: "block",
            overflowX: "auto",
        },
    },
    
    
    inLine: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        '@media (max-width: 601px)': {
            flexDirection: "column-reverse"
		},
        
    },
    titleAndCat: {
        display: "flex",
        alignItems: "baseline",
        '@media (max-width: 601px)': {
            flexDirection: "column"
        }
    },
    subtopic: {
        '@media (max-width: 601px)': {
            fontSize: 17
        }
    },
    link: {
        textDecoration: "none",
        pointerEvents: 'all'
    },
    
    title: {
        fontSize: "1.5rem",    
        margin: "0 0 0 5px",
        '@media (max-width: 601px)': {
            margin: 0,
			fontSize: 22,            
		},

    },
    commentsAndDate: {
        width: "25%",
        display: "flex",
        justifyContent: "space-between",
        '@media (max-width: 601px)': {
            width: '100%',
            
            flexDirection: "row-reverse"
		},
    },
    comments:{
        '@media (max-width: 601px)': {
            textAlign: "end",
            fontSize: 17
		},
    },
    date: {
        '@media (max-width: 601px)': {
            fontSize: 17,
            margin: 0,
		},
    },
    footer: {
        margin: "0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
    user: {
        display: "flex",
        alignItems: "center",
        '@media (max-width: 601px)': {
            fontSize: 17
        }
    },
    avatar: {
        margin: "0 5px 0 5px",
        width: "2rem",
        height: "2rem",
        '@media (max-width: 601px)': {
            width: "15px",
            height: "15px",
        }
    },
    dividerColor: {
    display: 'none',
    '@media (max-width: 601px)': {
        display: 'block',
        marginTop: 15,
        background: 'purple',
        width: '90vw'
    }
}
});
function PostCard( {post} ) {
    const classes = useStyle();
    
    const highlight = () => {
        if (post.post_highlight) return { border: "2px solid gold", backgroundColor: "#E9F089" };
        else return {}
    };

    return (

        <Card style={highlight()} variant="outlined" className={classes.container}>
            <Link to={`/forum/post/${post.post_id}`} className={classes.link} className={classes.bigLink}>
            <CardContent className={classes.root}>
                <Box className={classes.inLine} >
                    <Box className={classes.titleAndCat}>
                        {
                            post.subtopic ?
                            <Typography color="textSecondary" className={classes.subtopic}>
                                EN {post.subtopic.sub_topic_name.toUpperCase()}:
                            </Typography> :
                            <></>
                        }
                        <Link to={`/forum/post/${post.post_id}`} className={classes.link}>
                        <Typography className={classes.title} color="textPrimary" noWrap={true}>
                            {post.post_title}
                        </Typography>
                        </Link>
                    </Box>
                    <Box className={classes.commentsAndDate}>
                        <Typography color="textSecondary" className={classes.comments}>
                            {post.comments.length} Comentarios
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom className={classes.date}>
                            {getDateTime(post.createdAt)} 
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.footer} color="textSecondary">
                    <Typography className={classes.user} color="textSecondary" noWrap={true}>
                        <span>Creado por</span>
                        <span style= {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar className={classes.avatar} alt={post.user.user_name} src={post.user.user_img_profile}/>
                        <span>{post.user.user_name}</span>
                        </span>
                        
                    </Typography>
                    
                </Box>
                <Divider className={classes.dividerColor}/>
                <div style={{height: '10px'}}></div>
            </CardContent>
            </Link>
        </Card>
    )
}

export default PostCard
