import React from "react";
import { useTranslation } from "react-i18next";

function CommentList({ comments }) {
  console.log(comments)
  const { t } = useTranslation();
  return (
    <div >
      <h3>{t("Comments")}</h3>
      <div className="comment-list max-h-48 overflow-y-auto" >
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p>
              {comment.userName}: {comment.commentText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;