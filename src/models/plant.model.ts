import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const plantSchema = new Schema({

  name: {
    type: String,
    required: true,
    default: 'plant_default',
  },
  suncost: {
    type: Number,
    required: true,
    default: 0,
  },
  damage: {
    type: Number,
    required: true,
    default: 0,
  },

  toughness: {
    type: Number,
    required: true,
    default: 0,
  },

  recharge: {
    type: Number,
    required: true,
    default: 0,
  },
  speed: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPlantFood: {
    type: Number,
    required: true,
    default: 0,
  },
  isVip: {
    type: Boolean,
    required: true,
    default: 0,
  },
  tokenId: {
    type: String,
    required: true,
    default: 0,
  },
  owner: {
    type: String,
    required: true,
    default: '0x0000000000000000000000000000000000000000'
  },
})

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;