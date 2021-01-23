import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AlertDialog from './AlertDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 40
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

let grid = []
let visible = []
const complexity = 36
let intervalId = null

function populateGrid() {
    for (let index = 0; index < complexity; index++) {
        grid.push(String(index) + 'A')
        grid.push(String(index) + 'B')
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function FullWidthGrid() {
    const classes = useStyles();
    const [selection, setSelection] = React.useState([null, null])
    const [tries, setTries] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [finished, setFinished] = React.useState(false)
    const [score, setScore] = React.useState({
        tries: undefined,
        time: undefined
    })
    const [started, setStarted] = React.useState(false)

    function reset() {
        setStarted(false)
        visible = []
        grid = []
        populateGrid()
        shuffleArray(grid)
        setTime(0)
        setTries(0)
        setFinished(false)
        setScore({
            time: null,
            tries: null
        })
        setTimeout(() => {
            intervalId = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
            setStarted(true)
        }, 2000)
    }

    function handleSelect(element) {
        if (selection[1] === null && visible.indexOf(element) === -1 && started) {
            visible.push(element)
            const current = [...selection]
            if (current[0] === null) {
                current[0] = element
            } else {
                current[1] = element
            }
            setSelection(current)
        }

    }

    function checkIfVisible(element) {
        if (visible.indexOf(element) !== -1) {
            return `images/${element.substring(0, element.length - 1)}.png`
        }
        else {
            return "images/question.png"
        }
    }

    function checkAnimation(element) {
        if (visible.indexOf(element) !== -1 && !finished && started) {
            return "animate__animated animate__flip animate__fast"
        }
        if (finished && started) {
            const speeds = ['slower', 'slow', 'fast', 'faster']
            return `animate__animated animate__bounceOut animate__${speeds[Math.floor(Math.random() * 3)]}`
        }
        if (!finished && !started) {
            const speeds = ['slower', 'slow', 'fast', 'faster']
            return `animate__animated animate__bounceIn animate__${speeds[Math.floor(Math.random() * 3)]}`
        }
        else {
            return ""
        }
    }

    function checkSelected(element) {
        if (selection.indexOf(element) !== -1) {
            return "selected"
        }
        else {
            return ""
        }
    }

    React.useEffect(() => {
        if (selection[1] !== null) {
            setTries(prev => prev + 1)
            if (selection[0].substring(0, selection[0].length - 1) !== selection[1].substring(0, selection[1].length - 1)) {
                setTimeout(() => {
                    selection.forEach(e => {
                        visible.splice(visible.indexOf(e), 1)
                    })
                    setSelection([null, null])
                }, 2000)
            }
            else {
                setTimeout(() => { setSelection([null, null]) }, 800)
            }
        }
    }, [selection])

    React.useEffect(() => {
        if (visible.length === complexity * 2 && selection[1] === null) {
            clearInterval(intervalId)
            setFinished(true)
            setTimeout(() => {
                setScore({
                    tries: tries,
                    time: time
                })
            }, 2000);
        }
    }, [selection, time, tries])

    React.useEffect(() => {
        reset()
    }, [])

    return (
        <div className={classes.root}>
            <h2>Time: {new Date(time * 1000).toISOString().substr(11, 8)}</h2>
            <h2>Tries: {tries}</h2>
            <AlertDialog
                score={score}
                reset={reset}
            />
            {!score.time && <Grid container spacing={2}>
                {grid.map(element => <Grid spacing={1} key={element} item sx={2} sm={2} md={1} lg={1}>
                    <Paper onClick={() => handleSelect(element)} className={`${classes.paper} ${checkAnimation(element)} ${checkSelected(element)}`}>
                        <img className="image" src={checkIfVisible(element)} alt={element} srcset="" />
                    </Paper>
                </Grid>)}
            </Grid>}
        </div>
    );
}
