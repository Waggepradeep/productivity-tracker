//firebase/firestore.js
import { db, auth } from "./config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  updateDoc,
  onSnapshot,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

function getUserCollection(collectionName) {
  if (!auth || !db) throw new Error("App is not configured. Check Firebase environment variables.");
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return collection(db, "users", user.uid, collectionName);
}

// ====== TASKS ======
export async function addTask(task) {
  return addDoc(getUserCollection("tasks"), { ...task, createdAt: serverTimestamp() });
}

export async function deleteTask(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return deleteDoc(doc(db, "users", user.uid, "tasks", id));
}

export function subscribeToTasks(onData, onError) {
  const q = query(getUserCollection("tasks"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    onError
  );
}

// ====== GOALS ======
export async function addGoal(goal) {
  return addDoc(getUserCollection("goals"), { ...goal, createdAt: serverTimestamp() });
}

export async function deleteGoal(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return deleteDoc(doc(db, "users", user.uid, "goals", id));
}

export function subscribeToGoals(onData, onError) {
  const q = query(getUserCollection("goals"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    onError
  );
}

// ====== HABITS ======
export async function addHabit(habit) {
  return addDoc(getUserCollection("habits"), {
    name: habit,
    completed: false,
    date: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp()
  });
}

export async function toggleHabitDone(id, currentStatus) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitRef = doc(db, "users", user.uid, "habits", id);
  await updateDoc(habitRef, {
    completed: !currentStatus,
    date: new Date().toISOString().slice(0, 10)
  });
}

export async function deleteHabit(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return deleteDoc(doc(db, "users", user.uid, "habits", id));
}

export function subscribeToHabits(onData, onError) {
  const q = query(getUserCollection("habits"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    onError
  );
}
