import React from 'react'
import { Header } from './Header'

function Home() {
    return (
        <div className='center'>
          <Header></Header>
          <div class="info">
                <div>
                    <h2>1.9 s</h2>
                    <p>60 mph</p>
                </div>
                <div>
                    <h2>200 mph</h2>
                    <p>Top Speed</p>
                </div>
                <div>
                    <h2>396 mi</h2>
                    <p>Max Range</p>
                </div>
                <div class="line">
                </div>
                <div>
                    <h2 id="model">Model S</h2>
                </div>
            </div>
        </div>
    )
}

export default Home
