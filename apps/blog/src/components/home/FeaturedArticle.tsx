"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Entity, useEntityList } from "@replyke/react-js";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import { formatDate2 } from "../../lib/time-formatters";
import UserAvatar from "../Layout/Header/UserAvatar";
import { getArticlePath } from "../../helpers/getArticlePath";

function FeaturedArticle() {
  const { entities, loading } = useEntityList({ listId: "latest-articles" });
  const article: Entity | undefined = entities?.[0];
  const hasNoArticles =
    entities !== undefined && entities.length === 0 && !loading;

  // Track when the actual <Image> has finished loading
  const [imgLoaded, setImgLoaded] = useState(false);

  const path = article
    ? getArticlePath({
        title: article.title,
        shortId: article.shortId,
      })
    : "";

  const image = article?.attachments[0]?.publicPath ?? "/placeholder.svg";

  return (
    <section className="w-full mt-6 bg-background px-4 md:px-6 min-h-screen flex items-center">
      <div className="max-w-3xl lg:max-w-6xl w-full mx-auto">
        {hasNoArticles ? (
          <div className="flex flex-col items-center justify-center text-center py-28 space-y-4">
            <div className="text-6xl">📝</div>
            <h2 className="text-3xl font-bold tracking-tight">
              No Articles Yet
            </h2>
            <p className="text-muted-foreground max-w-md text-lg">
              This blog doesn't have any articles yet. Create the first article
              to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] py-28 lg:py-0 items-center">
            {/* Text & metadata */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex flex-col gap-4 items-start">
                {loading ? (
                  <div className="h-5 w-24 rounded bg-muted animate-pulse" />
                ) : (
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    {article.metadata.category}
                  </div>
                )}

                {loading ? (
                  <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
                ) : (
                  <Link href={path}>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl hover:underline">
                      {article.title}
                    </h1>
                  </Link>
                )}

                {loading ? (
                  <div className="h-5 w-full rounded bg-muted animate-pulse" />
                ) : (
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {article.metadata.excerpt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                {loading ? (
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                ) : (
                  <UserAvatar user={article.user!} />
                )}
                <div className="flex items-center gap-5">
                  {loading ? (
                    <>
                      <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium leading-none">
                        {article.user!.name || "Author"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate2(new Date(article.createdAt))} ·{" "}
                        {calculateReadingTimeFromMarkdown(
                          article.content || ""
                        )}{" "}
                        min read
                      </p>
                    </>
                  )}
                  {!loading && (
                    <>
                      <div className="flex items-center gap-1">
                        <HeartIcon
                          className="size-4 text-gray-400"
                          fill="#9ca3af"
                        />
                        <span className="text-sm text-gray-400">
                          {article.upvotes.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircleIcon
                          className="size-4 text-gray-400"
                          fill="#9ca3af"
                        />
                        <span className="text-sm text-gray-400">
                          {article.repliesCount}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Image + skeleton */}
            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last lg:mt-0">
              {/* Skeleton shown until image is loaded */}
              {(loading || !imgLoaded) && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
              )}

              {/* Next.js Image */}
              {!loading && image && (
                <Image
                  src={image}
                  alt={article.title || "Cover image"}
                  width={1200}
                  height={600}
                  className="aspect-video object-cover rounded-xl w-full"
                  placeholder="empty"
                  onLoadingComplete={() => setImgLoaded(true)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedArticle;
