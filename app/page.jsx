"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./Shared/firebaseConfig";
import { useEffect, useState } from "react";
import PinList from "./components/Pins/PinList";
import { useSearchParams } from "next/navigation";

import { comment } from "postcss";
import DarkModeToggle from "./components/darkmode";
export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
   const [listOfComments, setListOfComments] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search")??"";
 useEffect(() => {
    getAllPins();
  }, [search]);

  const getAllPins = async () => {
    setListOfPins([]);
    const q = search
      ? query(
          collection(db, "collections-post"),
          where("title", ">=", search.toLowerCase()),
          where("title", "<=", search.toLowerCase() + "\uf8ff")
        )
      : query(collection(db, "collections-post"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };

  return (
    <>
      <div className="p-3">
        <div>
          <PinList listOfPins={listOfPins} searchTerm={search} />
        </div>
      </div>
    </>
  );
}
