import { collection, getDocs, query, limit, where, doc, setDoc, addDoc } from 'firebase/firestore'
import { firebaseDb } from './firebase'

const hasDb = Boolean(firebaseDb)

export async function fetchDashboardData() {
  if (!hasDb) return null

  try {
    const customersSnap = await getDocs(query(collection(firebaseDb, 'customers'), limit(50)))
    const inventorySnap = await getDocs(query(collection(firebaseDb, 'inventory'), limit(50)))
    const queueSnap = await getDocs(query(collection(firebaseDb, 'service_queue'), limit(50)))
    const transactionsSnap = await getDocs(query(collection(firebaseDb, 'transactions'), limit(50)))

    const customers = customersSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const inventory = inventorySnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const queue = queueSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const transactions = transactionsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

    return { customers, inventory, queue, transactions }
  } catch (err) {
    console.warn('Firestore fetch failed:', err)
    return null
  }
}

export async function createCustomer(payload) {
  if (!hasDb) return null
  const ref = await addDoc(collection(firebaseDb, 'customers'), payload)
  const snap = await getDocs(query(collection(firebaseDb, 'customers'), where('__name__', '==', ref.id), limit(1)))
  return snap.docs[0] ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null
}

export async function upsertInventory(payload) {
  if (!hasDb) return null
  const id = payload.id || undefined
  if (id) {
    await setDoc(doc(firebaseDb, 'inventory', id), payload, { merge: true })
    return { id, ...payload }
  }
  const ref = await addDoc(collection(firebaseDb, 'inventory'), payload)
  return { id: ref.id, ...payload }
}

export async function upsertServiceQueue(payload) {
  if (!hasDb) return null
  const id = payload.id || undefined
  if (id) {
    await setDoc(doc(firebaseDb, 'service_queue', id), payload, { merge: true })
    return { id, ...payload }
  }
  const ref = await addDoc(collection(firebaseDb, 'service_queue'), payload)
  return { id: ref.id, ...payload }
}

export const isFirestoreReady = hasDb
