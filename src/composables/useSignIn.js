import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";

const error = ref(null);
const isPending = ref(false);

async function signIn(email, password) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return response;
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      err.message = "Email not found";
    } else if (err.code == "auth/wrong-password") {
      err.message = "Wrong password";
    } else {
      err.message = "If you don't remember password, change it!!!";
    }
    console.log(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return { error, isPending, signIn };
}
