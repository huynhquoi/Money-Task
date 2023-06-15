import { projectFirestore } from "@/configs/firebase";

const useGetData = (name, userId) => {
  async function getData() {
    const response = await projectFirestore
      .collection(name)
      .where("userId", "==", userId)
      .get();
    const data = response.docs;
    return data;
  }

  return { getData };
};

export default useGetData;
