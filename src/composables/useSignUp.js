import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";

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

export function useSignUp() {
  return { error, isPending, signUp };
}
