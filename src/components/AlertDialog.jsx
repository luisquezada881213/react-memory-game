import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({score, reset}) {
	return (
		<div>
			<Dialog
				open={score.tries}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
            Your time was {score.time && new Date(score.time * 1000).toISOString().substr(11, 8)}, and you tried {score.tries} times
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={reset} color="primary" autoFocus>
            Try again!
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
