import { Snackbar, Typography, Alert} from "@mui/material";

const SnackbarAlert = (props) => {
    // props: snackBarOpen, duration, setSnackBarOpen, severity, message


    return (
        <Snackbar open={props.snackBarOpen} autoHideDuration={props.duration} onClose={()=>{props.setSnackBarOpen(false)}}>
                <Alert severity={props.severity} variant="filled">
                    <Typography variant="h5">
                        {props.message}
                    </Typography>
                </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert