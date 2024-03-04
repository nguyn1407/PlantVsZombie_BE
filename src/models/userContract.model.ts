import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userContractSchema = new Schema({
  address: {
    type: String,
    require: true,
    default: '0x0000000000000000000000000000000000000000'
  },

  amountPlantFood: {
    type: Number,
    require: true,
    default: 0,
  },

  amountBox: {
    type: Number,
    require: true,
    default: 0,
  },

  amountBoxVip: {
    type: Number,
    require: true,
    default: 0,
  },
  plants: [
    {
      type: String,
      default: [],
    }
  ],
})

const UserContract = mongoose.model('UserContract', userContractSchema);
export default UserContract;