import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>rubikCube</title>
        <meta name="description" content="A playable Rubik's Cube game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to rubikCube
        </h1>

        <p className="description">
          Get ready to solve the cube!
        </p>

        <Link href="/play">
          <button className="playButton">
            Play Now
          </button>
        </Link>
      </main>

    </div>
  )
}