import { useEffect, useState } from 'react';
import Firebase from './services/firebase';
import getFirebase from './services';

export default function useFirebase() {
  const [instance, setInstance] = useState<Firebase>(null);

  useEffect(() => {
    setInstance(getFirebase());
  }, []);

  return instance;
}
