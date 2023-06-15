import { projectFirestore } from "@/configs/firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateWallet = (sum, walletId) => {
  console.log(walletId);
  async function update() {
    const walletRef = doc(projectFirestore, "wallet", walletId);
    await updateDoc(walletRef, {
      money: 4000000 - sum,
      expense: sum,
    });
  }
  return { update };
};

export default updateWallet;
