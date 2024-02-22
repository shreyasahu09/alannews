import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef=(ref)=> window.scroll(0,ref.current.offsetTop-50);
  useEffect(() => {
    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs])

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea>
        <CardMedia className={classes.media} image={urlToImage || 'https://w0.peakpx.com/wallpaper/882/271/HD-wallpaper-good-morning-newspaper-glasses-beautiful-fluid-abstract-coffe-coffee-cup-white-other-blue.jpg'} />
        <div className={classes.details}>
          <Typography className={classes.secondary} variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography className={classes.secondary} variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
        <CardContent>
          <Typography className={classes.secondary} variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button className={classes.secondary} href={url} target="_blank" size="small" color="primary">Learn More</Button>
        <Typography className={classes.secondary} variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard;