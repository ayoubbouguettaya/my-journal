import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'
import { formatDate } from '../../utils/formatDate'

import styles from './layout.module.css'

type Props = {
    children: ReactNode,
    dark?: boolean
}

const Layout = (props: Props) => {
    const [mode, setMode] = useState('DARK')

    const switchMode = () => {
        setMode((prevMode) => prevMode === "DARK" ? "LIGHT" : "DARK")
        localStorage.setItem('mode',mode)
    }

    useEffect(()=> {
        setMode(localStorage.getItem('mode') || 'DARK')
    },[])


    const TODAY = formatDate(new Date())
    return (
        <div className={`${mode === "DARK" && "dark"} ${styles.container}`}>
            <Head>
                <title>My Journal</title>
                <meta name="description" content="My Journal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={styles.navbar}>
                <Link href="/">
                    <h1 style={{ cursor: 'pointer' }} >My Journal</h1>
                </Link>
                <div style={{display: 'flex'}}>
                    <button
                        style={{ background: 'transparent', border: "none", marginLeft: "10px" }}
                        onClick={switchMode}>
                        {mode === "DARK" ? <img src="/icon/sun.svg" /> : <img src="/icon/moon.svg" />}
                    </button>
                    <p>
                        {TODAY}
                    </p>
                </div>
            </nav>
            <main className={styles.main}>
                {props.children}
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    )
}

export default Layout