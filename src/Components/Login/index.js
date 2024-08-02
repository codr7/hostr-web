
import { Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';

export default function Login({onAuthenticate}) {
    return (
        <Dialog open={true}>
            <DialogTitle>{"Login"}</DialogTitle>

            <DialogActions>
                <Button onClick={onAuthenticate} autoFocus>
                    Authenticate
                </Button>
            </DialogActions>
        </Dialog>
    );
}