import React, { useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";
import Layout from "@/components/Layout/Layout";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ArticleForm from "@/components/Article/ArticleForm";
const HomePage = () => {
    const { loginStatus } = useContext(TokenContext)
    return (
        <>
            {loginStatus
                ? <ArticleForm></ArticleForm>
                : <Layout></Layout>}
            <ArticlesAll endpoint='/article/all' ></ArticlesAll>

        </>
    )
}

export default HomePage
