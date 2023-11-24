"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import PinImage from "./../../components/PinDetail/PinImage";
import PinInfo from "./../../components/PinDetail/PinInfo";
import { HiArrowSmallLeft } from "react-icons/hi2";
import app from "@/app/Shared/firebaseConfig";
import CommentList from "../../components/PinDetail/commentService";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { GiPlayButton } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { deleteDoc } from "firebase/firestore";
import ShareButton from "../../components/PinDetail/PinShare"
export default function PinDetail({ params }) {
   const { t } = useTranslation();
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const getPinDetail = async () => {
    try {
      const pinRef = doc(db, "collections-post", params.pinId);

      // Fetch pin details and likes
      const [pinSnap, likesSnap] = await Promise.all([
        getDoc(pinRef),
        getLikes(),
      ]);

      if (pinSnap.exists()) {
        setPinDetail({
          ...pinSnap.data(),
          likes: likesSnap.docs.map((doc) => doc.data()),
        });
      } else {
        console.log("Pin document does not exist!");
      }
    } catch (error) {
      console.error("Error getting pin detail:", error);
    }
  };
  const getLikes = async () => {
    try {
      const likesQuery = query(
        collection(db, "collections-post", params.pinId, "likes")
      );
      const likesSnapshot = await getDocs(likesQuery);
      return likesSnapshot;
    } catch (error) {
      console.error("Error getting likes:", error);
    }
  };

  const handleAddLike = async () => {
    try {
      // Check if the user is authenticated before adding a like
      if (!session?.user?.name) {
        console.error("User not authenticated or user name is missing.");
        return;
      }

      // Check if the user has already liked the post
      const hasLiked = likes.some(
        (like) => like.userName === session.user.name
      );

      // If the user has liked, remove the like; otherwise, add the like
      const likesCollectionRef = collection(
        db,
        "collections-post",
        params.pinId,
        "likes"
      );

      if (hasLiked) {
        // Find the like document with the user's name
        const likedDoc = likes.find(
          (like) => like.userName === session.user.name
        );

        if (likedDoc) {
          // Remove the like using the document ID
          const likedDocRef = doc(likesCollectionRef, likedDoc.id);
          await deleteDoc(likedDocRef);
        } else {
          console.error("Liked document not found for the user.");
        }
      } else {
        // Add the like
        await addDoc(likesCollectionRef, {
          userName: session.user.name,
          timestamp: serverTimestamp(),
        });
      }

      // Refresh likes by fetching them again
      const likesSnapshot = await getLikes();
      setLikes(likesSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const getComments = async () => {
    try {
      // Fetch comments from the "comments" sub-collection
      const commentsQuery = query(
        collection(db, "collections-post", params.pinId, "comments"),
         orderBy("timestamp", "asc") 
      );
      const commentsSnapshot = await getDocs(commentsQuery);

      // Update the comments state with the new data
      setComments(commentsSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error getting comments:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const commentData = {
        pinId: params.pinId,
        userName: session.user.name,
        commentText: commentText,
        timestamp: serverTimestamp(),
      };

      // Add the comment to the "comments" sub-collection under the specific pin document
      const commentsCollectionRef = collection(
        db,
        "collections-post",
        params.pinId,
        "comments"
      );
      await addDoc(commentsCollectionRef, commentData);
  console.log(commentData);
      // Clear the commentText state after successfully adding the comment
      setCommentText("");

      // Refresh the comments by fetching them again
      getComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    console.log("Pin ID:", params.pinId);
    getPinDetail();
    getComments(); // Fetch comments when the component mounts
  }, [params.pinId]);
 const handleDeletePin = async () => {
     try {
       const pinRef = doc(db, "collections-post", params.pinId);

       // Delete the pin document
       await deleteDoc(pinRef);

       // Navigate back to the previous page
       router.back();
     } catch (error) {
       console.error("Error deleting pin:", error);
     }
  };
  const handleEditPin = () => {
    // Navigate to the edit page for the current pin
    router.push(`/pin-builder/${params.pinId}`);
  };
  return (
    <>
      {pinDetail ? (
        <div className="bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36 ">
          <HiArrowSmallLeft
            className="text-[60px] font-bold ml-[-50px] cursor-pointer hover:bg-gray-200 rounded-full p-2"
            onClick={() => router.back()}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16">
            <ShareButton
              title={pinDetail.title}
              description={pinDetail.description}
              url={window.location.href}
              alt="Share Pin"
              className="w-8 h-8"
            />
            {session && (
              <MdDelete
                className="cursor-pointer"
                onClick={handleDeletePin}
                alt="Delete Pin"
              />
            )}
           
            <PinImage pinDetail={pinDetail} />
            <div className="">
              <PinInfo pinDetail={pinDetail} />
              <CommentList comments={comments} />

              <div>
                {session && (
                  <>
                    <div>
                      {/* Like button */}
                      <button
                        onClick={handleAddLike}
                        className="flex items-center space-x-1 ml-auto"
                      >
                        <span className="ml-1">{likes.length}</span>
                        {likes.some(
                          (like) => like.userName === session?.user?.name
                        ) ? (
                          <FcLike className="w-6 h-6" />
                        ) : (
                          <FaRegHeart className="w-6 h-6" />
                        )}{" "}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={t("Add")}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="border border-gray-300 p-2 rounded-full bg-gray-200 flex-grow transition focus:border-none focus:outline-none "
                      />
                      <GiPlayButton
                        onClick={handleAddComment}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 w-12 h-12"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
