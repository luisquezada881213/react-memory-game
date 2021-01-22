import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function CircularDeterminate({ time }) {
    const classes = useStyles();
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
        setInterval(() => {
            setSeconds(prev => prev + 1)
        }, 100)
        return () => {
            clearInterval()
        }
    }, [])


    return (
        <div className={classes.root}>
            <CircularProgress thickness={15} variant="determinate" value={(100 / 60) * seconds} />
            <h3>{new Date(seconds * 1000).toISOString().substr(11, 8)}</h3>
        </div>
    );
}
