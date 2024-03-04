import Web3 from 'web3';
import { getPlantAndZombieAbi } from '../utils/getAbis';
import { getPlantAndZombieAddress } from '../utils/getAddress';
import { getRPC } from '../utils/common';

const web3 = new Web3(getRPC());
const plantVsZombieContract = new web3.eth.Contract(getPlantAndZombieAbi(), getPlantAndZombieAddress());

export default plantVsZombieContract;
