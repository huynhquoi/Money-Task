import { projectFirestore } from "@/configs/firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateWallet = (sum) => {
  async function update() {
    const walletRef = doc(projectFirestore, "wallet", "XirPjQayeOtisOh6bpXK");
    await updateDoc(walletRef, {
      money: 4000000 - sum,
      expense: sum,
    });
  }
  return { update };
};

export default updateWallet;
