//firebase/firestore.js
import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  updateDoc
} from "firebase/firestore";

// ====== TASKS ======
export async function addTask(task) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await addDoc(collection(db, "users", user.uid, "tasks"), task);
}

export async function getTasks() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(collection(db, "users", user.uid, "tasks"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteTask(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await deleteDoc(doc(db, "users", user.uid, "tasks", id));
}

// ====== GOALS ======
export async function addGoal(goal) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await addDoc(collection(db, "users", user.uid, "goals"), goal);
}

export async function getGoals() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(collection(db, "users", user.uid, "goals"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteGoal(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await deleteDoc(doc(db, "users", user.uid, "goals", id));
}

// ====== HABITS ======
export async function addHabit(habit) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await addDoc(collection(db, "users", user.uid, "habits"), {
    name: habit,
    completed: false,
    date: new Date().toDateString()
  });
}

export async function getHabits() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(collection(db, "users", user.uid, "habits"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function toggleHabitDone(id, currentStatus) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitRef = doc(db, "users", user.uid, "habits", id);
  await updateDoc(habitRef, {
    completed: !currentStatus,
    date: new Date().toDateString()
  });
}

export async function deleteHabit(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await deleteDoc(doc(db, "users", user.uid, "habits", id));
}
