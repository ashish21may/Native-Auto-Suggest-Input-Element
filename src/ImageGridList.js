import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: '80%',
  },
}));

export default function ImageGridList({data}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {data.map((tile) => (
          <GridListTile key={tile.id} cols={1}>
            <img src={tile.thumbnailUrl} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
