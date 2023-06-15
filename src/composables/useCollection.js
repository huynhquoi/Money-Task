import { ref } from "vue";
import { projectFirestore } from "@/configs/firebase";

const useCollection = (name) => {
  const error = ref(null);

  async function addRecord(record) {
    error.value = null;
    try {
      const response = await projectFirestore.collection(name).add(record);
      if (!response) throw new Error("Could not create a new user.");
      return response;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  return { error, addRecord };
};

export default useCollection;
