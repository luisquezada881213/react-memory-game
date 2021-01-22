import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Score from '../components/Score';

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
const complexity = 36

function populateGrid() {
    grid = []
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

    function checkIfFlip(element) {
        if (visible.indexOf(element) !== -1) {
            return "animate__animated animate__flip animate__fast"
        }
        else {
            return ""
        }
    }

    function checkIfBordered(element) {
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
            setTimeout(() => {
                if (selection[0].substring(0, selection[0].length - 1) !== selection[1].substring(0, selection[1].length - 1)) {
                    selection.forEach(e => {
                        visible.splice(visible.indexOf(e), 1)
                    })
                }
                setSelection([null, null])
            }, 2000)
        }
    }, [selection])

    return (
        <div className={classes.root}>
            <Score
            />
            <Grid container spacing={2}>
                {grid.map(element => <Grid key={element} item xs={3} md={2} lg={1}>
                    <Paper onClick={() => handleSelect(element)} className={`${classes.paper} ${checkIfFlip(element)} ${checkIfBordered(element)}`}>
                        <img className="image" src={checkIfVisible(element)} alt={element} srcset="" />
                    </Paper>
                </Grid>)}
            </Grid>
        </div>
    );
}
