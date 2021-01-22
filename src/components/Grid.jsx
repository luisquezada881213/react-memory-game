import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
const complexity = 4

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

    function handleSelect(number) {
        if (selection[1] === null) {
            visible.push(number)
            const current = [...selection]
            if (current[0] === null) {
                current[0] = number
            } else {
                current[1] = number
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

    React.useEffect(() => {
        if (selection[1] !== null) {
            if (selection[0].substring(0, selection[0].length - 1) !== selection[1].substring(0, selection[1].length - 1)) {
                setTimeout(()=>{
                    selection.forEach(e => {
                        visible.splice(visible.indexOf(e), 1)
                    })
                    setSelection([null, null])
                },2000)
            }
            else{
                setSelection([null,null])
            }
        }
    }, [selection])

    return (
        <div className={classes.root}>
            <small>{JSON.stringify(selection)}</small>
            <small>{JSON.stringify(visible)}</small>
            <Grid container spacing={2}>
                {grid.map(element => <Grid key={element} item xs={1}>
                    <Paper onClick={() => handleSelect(element)} className={classes.paper}>
                        <img className="image" src={checkIfVisible(element)} alt={element} srcset="" />
                    </Paper>
                </Grid>)}
            </Grid>
        </div>
    );
}
