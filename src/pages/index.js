import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/contexts/TokenContext";
import LayoutHome from "@/components/Layout/LayoutHome";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ArticleForm from "@/components/Article/ArticleForm";

const HomePage = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const { loginStatus, token, closedSession } = useContext(TokenContext)
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (loginStatus) {
            (async () => {
                try {
                    const response = await fetch(`${apiUrl}/user/profile/`, {
                        method: 'GET',
                        headers: {
                            Authorization: `${token}`
                        },
                    })

                    if (!response.ok) {
                        if (response.status === 401) {
                            const error = new Error('Aun no has iniciado sesion')
                            error.status = response.status
                            closedSession()
                            throw error
                        }
                    }
                    console.log(token)
                    const profileData = await response.json();
                    // Guardamos la informacion del usuario para usarla luego
                    setUserData(profileData)
                    const jsonStringify = JSON.stringify(profileData)
                    localStorage.setItem('dataProfile', jsonStringify)
                } catch (error) {
                    console.error(error)
                }
            })();
        }
    }, [token]);

    return (

        <main className="d-flex flex-column align-items-center">
            {loginStatus
                ? <ArticleForm ></ArticleForm>
                : <LayoutHome></LayoutHome>}
            <ArticlesAll endpoint='/article/all' ></ArticlesAll>

        </main>
    )
}

export default HomePage
