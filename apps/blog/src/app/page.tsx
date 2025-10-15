"use client";

import FeaturedArticle from "../components/home/FeaturedArticle";
import Layout from "../components/Layout";
import LatestArticles from "../components/home/LatestArticles";

export default function Home() {
  return (
    <Layout>
      <FeaturedArticle />
      <LatestArticles />
    </Layout>
  );
}
