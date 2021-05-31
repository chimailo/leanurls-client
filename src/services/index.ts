import Firebase from "./firebase";
import { isBrowser } from '../lib/auth'

let instance: Firebase = null;

export default function getFirebase() {
  if (isBrowser) {
    if (instance) return instance;

    instance = new Firebase();
    return instance;
  }

  return null;
}
