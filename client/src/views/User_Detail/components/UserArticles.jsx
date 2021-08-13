import React from 'react';
import { makeStyles, Paper, Box } from '@material-ui/core'
import CardPost from '../../../components/Card/Card';

const useStyle = makeStyles({
    container: {
        margin: "25px 0 0 0",
        padding: "10px"
    },
    artsContainer: {
        display: "flex"
    }
});
function UserArticles({user}) {
    const classes = useStyle();
    return (
        <Paper className={classes.container}>

            <Box style={{color: "#861C55", fontSize: "30px"} }>
                    Artículos:
            </Box>
            <Box className={classes.artsContainer}>
            {
                user && user.articles.map(a => (
                    <CardPost
                        key={a.art_id}
                        title={a.art_title}
                        body={a.art_contents}
                        id={a.user_id}
                        articleId={a.art_id}
                        articleAbstract={a.art_abstract}
                    /> 
                ))
            }
            </Box>
        </Paper>
    )
}

export default UserArticles
