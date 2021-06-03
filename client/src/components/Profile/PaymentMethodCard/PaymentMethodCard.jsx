import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';

const PaymentMethodCard = () => {
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = styles();

  const toggleCard = () => setOpen(!open);

  return (
    <>
      <div className={classes.toggleCard}>
        <Typography variant="h4">Payment Method</Typography>
        {open ? <ExpandLess onClick={toggleCard} /> : <ExpandMore onClick={toggleCard} />}
      </div>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card className={classes.card}>
          <CardContent className={classes.payment}>
            <div className={classes.frontCard}>
              <div className={classes.headerCard}>
                <div>Credit</div>
                LOGO
              </div>
              <div className={classes.bottomCard}>
                <div className={classes.numberCard}>
                  <TextField
                    name="title"
                    variant="standard"
                    label="Number"
                    placeholder="0000-0000-0000-0000"
                    fullWidth
                  />
                </div>
                <div className={classes.infoCard}>
                  <TextField
                    name="title"
                    variant="standard"
                    label="Full name"
                    fullWidth
                  />
                  <TextField
                    name="title"
                    variant="standard"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.backCard}>
              <div className={classes.headerCard}>
                <div>Credit</div>
                LOGO
              </div>
              <div className={classes.bottomCard}>
                <TextField
                  name="title"
                  variant="standard"
                  label="Number"
                />
                <TextField
                  name="title"
                  variant="standard"
                  label="Full name"
                />
              </div>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button color="primary" variant="contained">
              Save
            </Button>
            <Button color="secondary" variant="contained">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Collapse>
    </>
  );
};

export default PaymentMethodCard;
