import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contractSchema = new Schema({
  address: {
    type: String,
    required: true,
  },

  addressOwner: {
    type: String,
    required: true,
  },

  addressOfCoinUse: {
    type: String,
    required: true,
  },

  addressOfBoxContract: {
    type: String,
    required: true,
  },

  paused: {
    type: Boolean,
    required: true,
  },

  amountPlantFood: {
    type: Number,
    required: true,
  },

  amountBox: {
    type: Number,
    required: true,
  },

  amountBoxVip: {
    type: Number,
    required: true,
  },

  priceOfBox: {
    type: Number,
    required: true,
  },

  priceOfBoxVip: {
    type: Number,
    required: true,
  },

  priceOfPlantFood: {
    type: Number,
    required: true,
  },

  blockNumberPause: {
    type: Number,
    required: true,
  },

  blockNumberAbleBuyBoxVip: {
    type: Number,
    required: true,
  },

  ableBuyBoxVip: {
    type: Boolean,
  }

})

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;