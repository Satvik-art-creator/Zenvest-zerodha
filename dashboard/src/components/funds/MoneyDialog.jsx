import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const MoneyDialog = ({open, setOpen, closeFunc, handleSubmit}) => {
  const handleInput = (e) => setOpen((prevData) => ( {...prevData, amount: e.target.value} ));
  
  return (
    <div>
      {/* Dialog */}
      <Dialog open={open.state} onClose={closeFunc}>
        <DialogTitle>{open.type === "Deposit" ? "Add Money" : "Withdraw Money"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={open.amount}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFunc}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MoneyDialog;