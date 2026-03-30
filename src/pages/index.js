import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
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

        <main data-bs-theme="dark" className="d-flex flex-column align-items-center">
            <Head>
                <title>Raices Home</title>
            </Head>
            
            <div className="alert alert-warning mt-4 text-center mx-3" role="alert">
                <strong>Aviso de Infraestructura:</strong> El backend real está actualmente pausado. 
                Los datos que ves son simulados (Mocks) para fines demostrativos. 
                El código del backend funcional está disponible en: 
                <a href="https://github.com/BillalbertCode/RaicesWorkSpace_Backend" target="_blank" rel="noopener noreferrer" className="ms-2 alert-link text-decoration-underline">GitHub: RaicesWorkSpace_Backend</a>.
            </div>

            {loginStatus
                ? <ArticleForm ></ArticleForm>
                : <LayoutHome></LayoutHome>}
            <ArticlesAll endpoint='/article/all' ></ArticlesAll>

        </main>
    )
}

export default HomePage
