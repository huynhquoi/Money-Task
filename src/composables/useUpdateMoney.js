import { projectFirestore } from "@/configs/firebase";

const useGetMoney = (name, userId, wallet) => {
  async function getMoney() {
    const response = await projectFirestore
      .collection(name)
      .where("userId", "==", userId)
      .where("wallet", "==", wallet)
      .get();
    const data = response.docs;
    return data;
  }

  return { getMoney };
};

export default useGetMoney;
