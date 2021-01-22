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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

let grid = []
let visible = []
const complexity = 8
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

populateGrid();
shuffleArray(grid)

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

    function handleSelect(element) {
        if (selection[1] === null && visible.indexOf(element) === -1) {
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
        if (visible.indexOf(element) !== -1 && !finished) {
            return "animate__animated animate__flip animate__fast"
        }
        if (finished){
            const speeds = ['slower', 'slow', 'fast', 'faster']
            return `animate__animated animate__bounceOut animate__${speeds[Math.floor(Math.random() * 3)]}`
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
            }, 3000);
        }
    }, [selection, time, tries])

    React.useEffect(() => {
        intervalId = setInterval(() => {
            setTime(prev => prev + 1)
        }, 1000)
    }, [])

    return (
        <div className={classes.root}>
            <h2>Time: {new Date(time * 1000).toISOString().substr(11, 8)}</h2>
            <h2>Tries: {tries}</h2>
            <AlertDialog
                score = {score}
            />
            <Grid container spacing={2}>
                {grid.map(element => <Grid key={element} item xs={3} md={2} lg={1}>
                    <Paper onClick={() => handleSelect(element)} className={`${classes.paper} ${checkAnimation(element)} ${checkSelected(element)}`}>
                        <img className="image" src={checkIfVisible(element)} alt={element} srcset="" />
                    </Paper>
                </Grid>)}
            </Grid>
        </div>
    );
}
