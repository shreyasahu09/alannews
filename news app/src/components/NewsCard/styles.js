import {makeStyles} from '@material-ui/core';

export default makeStyles({
      media: {
        height: 250,
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
      card: {
        backgroundColor:'rgb(41, 39, 70)',
        color:'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid rgb(41, 39, 70)',
      },
      activeCard: {
        borderBottom: '10px solid white',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      actions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      secondary:{
        color:'rgb(188, 188, 188)',
      },
});