import { getRPC } from "../utils/common";
import plantVsZombieContract from "../web3/plantVsZombieContract";
import events from "../events/plantVsZombieEvent"
import Web3 from 'web3';

// events
const Paused: any = 'Paused';
const Unpaused: any = 'Unpaused';
const ImcrementBox: any = 'ImcrementBox';
const ImcrementBoxVip: any = 'ImcrementBoxVip';
const ImcrementPlantFood: any = 'ImcrementPlantFood';
const UpdatePriceOfBox: any = 'UpdatePriceOfBox';
const UpdatePriceOfBoxVip: any = 'UpdatePriceOfBoxVip';
const UpdatePriceOfPlantFood: any = 'UpdatePriceOfPlantFood';
const UpdateAddressOfCoinUse: any = 'UpdateAddressOfCoinUse';
const AbleBuyBoxVip: any = 'AbleBuyBoxVip';
const UnableBuyBoxVip: any = 'UnableBuyBoxVip';
const UpdateAddressBoxUse: any = 'UpdateAddressBoxUse';
const BuyBox: any = 'BuyBox';
const BuyPlantFood: any = 'BuyPlantFood';
const UsePlantFood: any = 'UsePlantFood';
const UnBox: any = 'UnBox';

let lastBlock: any = 5399994;

const web3 = new Web3(getRPC());

async function getEvent() {

  console.log(process.env.LAST_BLOCK);
  const temp = await web3.eth.getBlockNumber();
  let toBlock = Number(temp);
  console.log("last block first  " + lastBlock + "    " + "to block fist  " + toBlock);
  if (toBlock - lastBlock > BigInt(4000)) {
    toBlock = lastBlock + BigInt(4000);
  }

  console.log("last block  " + lastBlock + "    " + "to block  " + toBlock);

  if (lastBlock > toBlock) {
    console.log('waiting for new block ........');
  }

  plantVsZombieContract.getPastEvents(Paused, { fromBlock: lastBlock, toBlock: toBlock }).
    then((result: any) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        events.Paused(true, Number(result[i].blockNumber));
      }
    })


  plantVsZombieContract.getPastEvents(Unpaused, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        events.Paused(false, Number(result[i].blockNumber));
      }
    })

  plantVsZombieContract.getPastEvents(AbleBuyBoxVip, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        events.AbleBuyBoxVip(true, Number(result[i].blockNumber));
      }
    })

  plantVsZombieContract.getPastEvents(UnableBuyBoxVip, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        events.AbleBuyBoxVip(false, Number(result[i].blockNumber));
      }
    })
  plantVsZombieContract.getPastEvents(UpdateAddressOfCoinUse, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {

      for (let i = 0; i < result.length; i++) {
        const newAddress = result[i].returnValues.addressOfCoinUse;
        events.UpdateAddressOfCoinUse(newAddress);
      }
    })

  plantVsZombieContract.getPastEvents(ImcrementBox, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      console.log('----> ImcrementBox')
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        const amount = Number(result[i].returnValues.amountBoxImcrement);
        events.ImcrementBox(amount);
      }
      console.log('done imcrement box');
    })

  plantVsZombieContract.getPastEvents(ImcrementBoxVip, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        const amount = Number(result[i].returnValues.amountBoxVipImcrement);
        events.ImcrementBoxVip(amount);
      }
      console.log('done imcrement box vip');
    })

  plantVsZombieContract.getPastEvents(ImcrementPlantFood, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        const amount = Number(result[i].returnValues.amountPlantFoodImcrement);
        ImcrementPlantFood(amount);
      }
    })

  plantVsZombieContract.getPastEvents(UpdatePriceOfBox, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        let priceOfBoxNew = Number(result[i].returnValues.priceOfBoxNew);
        events.UpdatePriceOfBox(priceOfBoxNew);
      }
    })

  plantVsZombieContract.getPastEvents(UpdatePriceOfBoxVip, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {

      for (let i = 0; i < result.length; i++) {
        let priceOfBoxVipNew = Number(result[i].returnValues.priceOfBoxVipNew);
        events.UpdatePriceOfBoxVip(priceOfBoxVipNew);
      }
    })

  plantVsZombieContract.getPastEvents(UpdatePriceOfPlantFood, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        let priceOfPlantFoodNew = Number(result[i].returnValues.priceOfPlantFoodNew);
        events.UpdatePriceOfPlantFood(priceOfPlantFoodNew);
      }
    })

  plantVsZombieContract.getPastEvents(BuyBox, { fromBlock: lastBlock, toBlock: toBlock }).then((result: any) => {
    console.log('--->BuyBox')
    console.log(result);

    for (let i = 0; i < result.length; i++) {
      let data = {
        addressOfBuyer: result[i].returnValues.addressOfBuyer,
        isVip: result[i].returnValues.isVip,
        amountBoxBuy: Number(result[i].returnValues.amountBoxBuy),
      }
      events.BuyBox(data);
      console.log('done')
    }
  })

  plantVsZombieContract.getPastEvents(BuyPlantFood, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        let data = {
          addressOfBuyer: result[i].returnValues.addressOfBuyer,
          amountPlantFoodBuy: Number(result[i].returnValues.amountPlantFoodBuy),
        }
        events.BuyPlantFood(data);
      }
    })

  plantVsZombieContract.getPastEvents(UnBox, { fromBlock: lastBlock, toBlock: toBlock })
    .then((result: any) => {

      for (let i = 0; i < result.length; i++) {
        const data = {
          name: result[i].returnValues.plant.name,
          suncost: Number(result[i].returnValues.plant.suncost),
          damage: Number(result[i].returnValues.plant.damage),
          toughness: Number(result[i].returnValues.plant.toughness),
          recharge: Number(result[i].returnValues.plant.recharge),
          speed: Number(result[i].returnValues.plant.speed),
          numberPlantFood: Number(result[i].returnValues.plant.numberPlantFood),
          isVip: result[i].returnValues.plant.isVip,
          tokenId: result[i].returnValues.tokenId,
          owner: result[i].returnValues.OwnerOfPlant,
        }
        console.log(data);
        console.log();
        events.UnBox(data);
      }
    })

  plantVsZombieContract.getPastEvents(UsePlantFood, { fromBlock: lastBlock, toBlock: toBlock })
    .then(function (result: any) {
      for (let i = 0; i < result.length; i++) {
        const data = {
          addressOfBuyer: result[i].returnValues.account,
          tokenId: result[i].returnValues.tokenId,
          properties: result[i].returnValues.properties,
        }
        events.UsePlantFood(data);
      }
    });

  lastBlock = toBlock + 1;
}

export default getEvent;


