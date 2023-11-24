"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import app from "../Shared/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"

function Header() {
const { t } = useTranslation();
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams= useSearchParams()
  const db = getFirestore(app);
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearchTerm = (value) => {
    // router.push({pathname:router.pathname,query:{search:value}})
    router.push(`/?search=${value}`)
  }
  // console.log(searchTerm);
  useEffect(() => {
    saveUserInfo();
  }, [session]);
const search = searchParams.get("search")
  
  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };

  const onCreateClick = () => {
    if (session) {
      router.push("/pin-builder");
    } else {
      signIn();
    }
  };
  

  return (
    <div
      className="flex justify-between
     gap-3 md:gap-2 items-center p-6 "
    >
    
        <button
          className="bg-black
         text-white p-3 px-6 rounded-full
         text-[18px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px] mb-2 md:mb-0
          "
          onClick={() => router.push("/")}
        >
          {t("Home")}
        </button>
     
    
        <button
          className="font-semibold p-3 px-6
         rounded-full text-[18px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px] mb-2 md:mb-0"
          onClick={() => onCreateClick()}
        >
          {t("Create")}
        </button>
   
      <div
        className="bg-[#e9e9e9] p-3 px-6
         gap-3 items-center rounded-full w-full hidden md:flex"
      >
        <HiSearch
          className="text-[34px]
        text-gray-500"
        />
        <input
          type="text"
          placeholder={t("Search")}
          value={search ?? ""}
          className="bg-transparent outline-none w-full text-[25px]"
          onChange={(e) => handleSearchTerm(e.target.value)}
        />
      </div>
      <HiSearch
        className="text-[25px]
        text-gray-500 md:hidden"
      />
      <LanguageSwitcher />
      <div>
        <MdOutlineDarkMode className="btn" />
      </div>

      {session?.user ? (
        <Image
          src={session.user.image}
          onClick={() => router.push("/" + session.user.email)}
          alt="user-image"
          width={60}
          height={60}
          className="hover:bg-gray-300 p-2
        rounded-full cursor-pointer"
        />
      ) : (
        <button
          className="font-semibold p-2 px-4 rounded-full"
          onClick={() => signIn()}
        >
          {t("Login")}
        </button>
      )}
    </div>
  );
}

export default Header;

