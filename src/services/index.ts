import Firebase from "./firebase";

let instance: Firebase = null;

export default function getFirebase() {
  if (typeof window !== 'undefined') {
    if (instance) return instance;

    instance = new Firebase();
    return instance;
  }

  return null;
}
