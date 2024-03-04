import Contract from "../../models/contract.model.ts";
import UserContract from "../../models/userContract.model.ts";
import Plant from "../../models/plant.model.ts";
import { getPlantAndZombieAddress } from "../utils/getAddress";

const AbleBuyBoxVip = async function (res: any, blockNumber: Number) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  if (blockNumber > contract.blockNumberAbleBuyBoxVip) {
    contract.blockNumberAbleBuyBoxVip = blockNumber;
    contract.ableBuyBoxVip = res;
  }
  await contract.save();
}

const BuyBox = async function (data: any) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  let user = await UserContract.findOne({ address: data.addressOfBuyer });
  if (!user) {
    user = new UserContract({
      address: data.addressOfBuyer,
    });
  }

  if (data.isVip) {
    contract.amountBoxVip -= data.amountBoxBuy;
    user.amountBoxVip += data.amountBoxBuy;
  }
  else {
    contract.amountBox -= data.amountBoxBuy;
    user.amountBox += data.amountBoxBuy;
  }
  await contract.save();
  await user.save();
}

const BuyPlantFood = async function (data: any) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  let user = await UserContract.findOne({ address: data.addressOfBuyer });
  console.log("hhhhhhhhhhhhhhhhhhhhh------------>" + user);
  if (!user) {
    user = new UserContract({
      address: data.addressOfBuyer,
    });
  }
  contract.amountPlantFood -= data.amountPlantFoodBuy;
  user.amountPlantFood += data.amountPlantFoodBuy;
  await contract.save();
  await user.save();
}

const ImcrementBox = async function (amount: any) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.amountBox += amount;
  await contract.save();
}

const ImcrementBoxVip = async function (amount: any) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.amountBoxVip += amount;
  await contract.save();
}

const ImcrementPlantFood = async function (amount: any) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.amountPlantFood += amount;
  await contract.save();
}

const Paused = async function (res: any, blockNumber: Number) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  if (blockNumber > contract.blockNumberPause) {
    contract.blockNumberPause = blockNumber;
    contract.paused = res;
  }
  await contract.save();
}

const UnBox = async function (data: any) {
  let user = await UserContract.findOne({ address: data.owner });
  let plant = await Plant.findOne({ tokenId: data.tokenId });
  if (!user) {
    user = new UserContract({
      address: data.owner,
    });
  }
  if (!plant) {
    plant = new Plant({
      name: data.name,
      suncost: Number(data.suncost),
      damage: Number(data.damage),
      toughness: Number(data.toughness),
      recharge: Number(data.recharge),
      speed: Number(data.speed),
      numberPlantFood: Number(data.numberPlantFood),
      isVip: data.isVip,
      tokenId: data.tokenId,
      owner: data.owner,
    });
    user.plants.push(data.tokenId);
  }
  else {
    plant.name = data.name;
    plant.suncost += Number(data.suncost);
    plant.damage += Number(data.damage);
    plant.toughness += Number(data.toughness);
    plant.recharge += Number(data.recharge);
    plant.speed += Number(data.speed);
    plant.numberPlantFood += Number(data.numberPlantFood);
    plant.tokenId = data.tokenId;
    plant.owner = data.owner;
  }
  if (data.isVip) {
    user.amountBoxVip -= 1;
  }
  else {
    user.amountBox -= 1;
  }
  await user.save();
  await plant.save();
}

const UpdateAddressOfCoinUse = async function (newAddess: string) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.addressOfCoinUse = newAddess;
  await contract.save();
}

const UpdatePriceOfBox = async function (price: Number) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.priceOfBox = price;
  await contract.save();
}

const UpdatePriceOfBoxVip = async function (price: Number) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.priceOfBoxVip = price;
  await contract.save();
}

const UpdatePriceOfPlantFood = async function (price: Number) {
  const contract: any = await Contract.findOne({ address: `${getPlantAndZombieAddress()}` });
  contract.priceOfPlantFood = price;
  await contract.save();
}

const UsePlantFood = async function (data: any) {
  let plant = await Plant.findOne({ tokenId: data.tokenId });
  let user = await UserContract.findOne({ address: `${data.addressOfBuyer}` });
  console.log("++++++++++++++++++++> user ne" + user);

  if (!plant) {
    console.log("UsePlantFood: ------------------> tao them plant ne");
    plant = new Plant({
      tokenId: data.tokenId,
    })
  }
  if (!user) {
    console.log("UsePlantFood: ------------------> tao them user ne");
    user = new UserContract({
      address: data.addressOfBuyer,
    })
  }
  if (data.properties == 1) {
    plant.suncost -= 10;
  }
  else if (data.properties == 2) {
    plant.damage += 20;
  }
  else if (data.properties == 3) {
    plant.toughness += 100;
  }
  else if (data.properties == 4) {
    plant.recharge -= 2;
  }
  else {
    plant.speed += 1;
  }
  console.log("------------> Haha");
  console.log("++++++++++++++++++++> user ne" + user);
  console.log("-----------> truoc khi" + user.amountPlantFood);
  user.amountPlantFood -= 1;
  console.log("-----------> sau khi dung" + user.amountPlantFood)
  plant.numberPlantFood -= 1;
  await plant.save();
  await user.save();
}

export default {
  AbleBuyBoxVip,
  BuyBox,
  BuyPlantFood,
  ImcrementBox,
  ImcrementBoxVip,
  ImcrementPlantFood,
  Paused,
  UnBox,
  UpdateAddressOfCoinUse,
  UpdatePriceOfBox,
  UpdatePriceOfBoxVip,
  UpdatePriceOfPlantFood,
  UsePlantFood
}
