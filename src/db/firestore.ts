/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  DocumentData,
  FieldValue,
  runTransaction,
  serverTimestamp,
  setDoc,
  Transaction,
} from 'firebase/firestore';
import { db } from './firebase';

export type Timestamp = FieldValue;
export const timestamp = serverTimestamp;

// General fn
export const transformDocWithId = <D extends DocumentData = DocumentData>(
  doc: any,
): D & { id: string } => ({
  ...(doc.data() as D),
  id: doc.id,
});
export const transformDoc = <D extends DocumentData = DocumentData>(
  doc: any,
): D => ({
  ...(doc.data() as D),
});

const catchArray = (error: Error) => {
  console.log('Caught Error:', error);
  return { docs: [] };
};

export const getCollectionReference = (collectionName: string) =>
  collection(db, collectionName);
export const getDocReference = (collectionName: string, docId: string) =>
  doc(getCollectionReference(collectionName), docId);
export const getTransaction = (
  cb: (transaction: Transaction) => Promise<unknown>,
) => runTransaction(db, cb);

// Create
export const storeDocById = async (
  collectionName: string,
  docId: string,
  doc: any,
) =>
  setDoc(getDocReference(collectionName, docId), doc)
    .catch(catchArray)
    .then(() => ({ ...doc, id: docId }));
