import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore/lite';

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useFirebase = defineStore('db', () =>{
  const firebaseConfig = {
  apiKey: "AIzaSyBwowBvAM8udsWt6vVnG6AxPgsB1yIrweI",
  authDomain: "myfarm-65625.firebaseapp.com",
  databaseURL: "https://myfarm-65625.firebaseio.com",
  projectId: "myfarm-65625",
  storageBucket: "myfarm-65625.firebasestorage.app",
  messagingSenderId: "584782808244",
  appId: "1:584782808244:web:915db259183aca5739c3e1"
  };
  const app = initializeApp(firebaseConfig);
  const db: any = getFirestore(app);

  return {db};
})
