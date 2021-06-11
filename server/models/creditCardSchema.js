import mongoose from 'mongoose';

const creditCardSchema = mongoose.Schema({
  number: { type: String, required: true },
  name: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  user: { type: String }
});

export default mongoose.model("CreditCardModel", creditCardSchema);
