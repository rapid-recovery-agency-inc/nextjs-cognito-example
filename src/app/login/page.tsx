"use client";
import styles from "../page.module.css";
import {getSession, signIn,} from "next-auth/react"
import {useEffect, useState} from "react";


export default function Home() {
    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            console.log("DEBUG:HOME:session ", session);
        }
        fetchSession().catch(console.error);
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <a href={"#"} onClick={() => signIn("cognito")}>
                    Sign in
                </a>
            </div>
            <div className={styles.description}>
                <form action="/api/api-auth/sign-up" method="post">
                    <input type={'email'} onChange={(event) => {
                        setEmail(event.target.value);
                    }} value={email}/>
                    <input type={'password'} onChange={(event) => {
                        setPassword(event.target.value);
                    }} value={password}/>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        fetch("/api/api-auth/sign-up", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({email, password})
                        }).then((res) => {
                            console.log("DEBUG:HOME:fetch:res ", res);
                        }).catch(console.error);
                    }}>Sign up</button>
                </form>
            </div>
            <div className={styles.description}>
                <form action="/api/api-auth/sign-in" method="post">
                    <input type={'email'} onChange={(event) => {
                        setEmail(event.target.value);
                    }} value={email}/>
                    <input type={'password'} onChange={(event) => {
                        setPassword(event.target.value);
                    }} value={password}/>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        fetch("/api/api-auth/sign-in", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({email, password})
                        }).then((res) => {
                            console.log("DEBUG:HOME:fetch:res ", res);
                        }).catch(console.error);
                    }}>Sign in</button>
                </form>
            </div>
        </main>
    );
}
