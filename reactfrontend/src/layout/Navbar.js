import React from 'react'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NHL Stas App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-brand mb-0 h1"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/playerinfo">PlayerInfo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/playerstats">PlayerStats</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/teamstats">TeamStats</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/gamestats">GameStats</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
