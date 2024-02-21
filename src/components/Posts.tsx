import { useSearchParams } from "react-router-dom";
import { useAddCommentsMutation, useGetPostsQuery } from "../api/dummy";
import PostCard from "./PostCard";
import PageNation from "./ui/PageNation";
import { useEffect, useState } from "react";
import BlogIcon from "./ui/icons/BlogIcon";
import CardIcon from "./ui/icons/CardIcon";
import PostList from "./post/PostList";
import { useGetRecordsQuery } from "../api/records";
import SkeletonPostCard from "./ui/skeleton/SkeletonPostcard";
import { useRecord } from "../hooks/useRecord";

export type CardType = "blog" | "instagram";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);

  const showPageCount = 5;
  const { cardType, records, setCardType } = useRecord(page, showPageCount);

  if (!records)
    return (
      <>
        {Array(showPageCount)
          .fill(0)
          .map((_, i) => (
            <SkeletonPostCard type="blog" key={i} />
          ))}
      </>
    );
  return (
    <main className="flex flex-col items-center justify-center w-full bg-white px-10 py-5 gap-5">
      <div className="ml-auto border flex items-center p-1">
        <button className="border-r p-2" onClick={() => setCardType("blog")}>
          <BlogIcon />
        </button>
        <button className="p-2" onClick={() => setCardType("instagram")}>
          <CardIcon />
        </button>
      </div>
      <PostList
        cardType={cardType}
        showCount={showPageCount}
        recordList={records.recordList}
      />
      <PageNation
        maxPage={Math.ceil(records?.totalPages / showPageCount)}
        showPage={showPageCount}
      />
    </main>
  );
}
