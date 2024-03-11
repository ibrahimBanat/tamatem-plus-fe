import {Snackbar} from "@mui/material";
import {Alert} from "@mui/material";


const SnackNotification = ({open, message, variant, onClose}) => {
    return (
        <>
            <Snackbar open={open} autoHideDuration={4000}
                      onClose={onClose}
                      anchorOrigin={{
                          vertical: 'bottom', horizontal: 'right'
                      }}
            >
                <Alert
                    severity={variant}
                    variant={'filled'}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SnackNotification;
