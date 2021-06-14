import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import { getCreditCard, createCreditCard, deleteCreditCard } from '../../../actions/creditCard';
import cvv from '../../../images/cvv.svg';
import master from '../../../images/mastercard.svg';
import styles from './styles';

const PaymentMethodCard = () => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [open, setOpen] = useState(true);
  const classes = styles();
  const sessionUser = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const { user } = useParams();
  const creditCard = useSelector(
    (state) => state.creditCard.creditCard.find((c) => c.user === user)
  );

  useEffect(() => {
    if (creditCard) setCardData(creditCard);
  }, [creditCard]);

  useEffect(() => {
    dispatch(getCreditCard(user));
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    dispatch(createCreditCard({ ...cardData, user: sessionUser?.result?.name.replace(/\s+/g, '') }));
  };

  const handleDelete = () => {
    dispatch(deleteCreditCard(creditCard._id));
    setCardData({ number: '', name: '', expiry: '', cvv: '' });
  };

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
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <CardContent className={classes.payment}>
              <div className={`${classes.frontCard} ${creditCard ? classes.filledBackgroundCard : classes.emptyBackgroundCard}`}>
                <div className={classes.headerCard}>
                  <img src={master} alt="img" height="40" />
                </div>
                <div className={classes.bottomCard}>
                  <div className={classes.numberCard}>
                    <TextField
                      name="number"
                      variant="standard"
                      label="Number"
                      placeholder="0000-0000-0000-0000"
                      required
                      fullWidth
                      disabled={creditCard}
                      value={cardData?.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    />
                  </div>
                  <div className={classes.infoCard}>
                    <TextField
                      name="name"
                      variant="standard"
                      label="Full name"
                      required
                      fullWidth
                      placeholder={sessionUser.result.name}
                      disabled={creditCard}
                      value={cardData?.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    />
                    <TextField
                      name="expiry"
                      variant="standard"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      style={{ marginLeft: '10px' }}
                      required
                      disabled={creditCard}
                      value={cardData?.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className={`${classes.backCard} ${creditCard ? classes.filledBackgroundCard : classes.emptyBackgroundCard}`}>
                <div className={classes.headerCard}>
                  <img src={master} alt="img" height="40" />
                </div>
                <div className={classes.bottomCard}>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      name="cvv"
                      variant="standard"
                      label="cvv"
                      required
                      style={{ width: '300px' }}
                      disabled={creditCard}
                      value={cardData?.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    />
                    <img src={cvv} alt="img" height="30" style={{ margin: '20px' }} />
                  </div>
                </div>
              </div>
              <div className={classes.deleteCard}>
                {creditCard && (
                  <>
                    <IconButton color="primary" onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </CardContent>
            {!creditCard && (
              <CardActions className={classes.actions}>
                <Button color="primary" variant="contained" type="submit">Save</Button>
              </CardActions>
            )}
          </form>
        </Card>
      </Collapse>
    </>
  );
};

export default PaymentMethodCard;
