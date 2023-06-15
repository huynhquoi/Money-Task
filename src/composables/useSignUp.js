import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { projectFirestore } from "@/configs/firebase";

const error = ref(null);
const isPending = ref(false);

async function signUp(email, password, fullName) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!response) throw new Error("Could not create a new user.");

    await response.user.updateProfile({ displayName: fullName });

    return response;
  } catch (err) {
    if (err.code == "auth/email-already-in-use") {
      err.message = "The email address is already in use by another account.";
    }
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

async function addWallet(record) {
  error.value = null;
  try {
    const response = await projectFirestore.collection("wallet").add(record);
    if (!response) throw new Error("Could not create a new user.");
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

export function useSignUp() {
  return { error, isPending, signUp, addWallet };
}
