import React, { useState, useEffect } from 'react';
import './Title.css';
import Footer from './Footer';

const FACTS = [
    "The 88 constellations cover the entire celestial sphere with official boundaries adopted by the International Astronomical Union in 1928, ensuring every point in the sky belongs to exactly one constellation.",
    "Ptolemy catalogued 48 constellations in 150 AD, based on earlier Greek and Mesopotamian astronomy. The remaining 40 were added centuries later by European explorers mapping the southern skies.",
    "The 12 zodiac constellations lie along the ecliptic, the Sun's apparent path across the sky: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces.",
    "All 88 constellations have Latin names due to their Roman and European origins. In 1922, the IAU adopted three-letter abbreviations for each (like Ori for Orion, UMa for Ursa Major).",
    "Argo Navis was one of Ptolemy's original 48 constellations. In the 1750s, French astronomer Nicolas Louis de Lacaille divided it into three separate constellations: Carina (the keel), Puppis (the stern), and Vela (the sails).",
    "European astronomers proposed constellations for the southern sky and filled gaps between traditional ones. Eugène Joseph Delporte drew precise boundaries in 1928 so astronomers could specify exact celestial positions."
];

function Title({ onSelectRegularQuiz, onSelectSkyView, onSelectStudy, onSelectUniverse3d }) {
    const [currentFact, setCurrentFact] = useState('');
    const [showAbout, setShowAbout] = useState(false);

    useEffect(() => {
        // Pick a random fact on mount
        const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];
        setCurrentFact(randomFact);
    }, []);

    return (
        <div className="card title-screen">
            {/* Empty header for consistent spacing with other screens */}
            <div className="quiz-header" style={{visibility: 'hidden'}}>
                <button className="back-button">← Back</button>
            </div>

            <div className="title-hero">
                <h1>Constellations</h1>
                <p className="subtitle">Learn to identify all 88 International Astronomical Union constellations</p>
            </div>

            {currentFact && (
                <div className="fact-box">
                    <div className="fact-label">Did You Know?</div>
                    <div className="fact-content">{currentFact}</div>
                </div>
            )}

            <div className="title-buttons">
                <button className="mode-button" onClick={onSelectRegularQuiz}>
                    <div className="mode-title">Multiple Choice Quiz</div>
                    <div className="mode-description">Test your knowledge with multiple choice questions</div>
                </button>
                <button className="mode-button" onClick={onSelectSkyView}>
                    <div className="mode-title">Sky View Mode</div>
                    <div className="mode-description">Identify constellations in a realistic night sky</div>
                </button>
                <button className="mode-button" onClick={onSelectUniverse3d}>
                    <div className="mode-title">3D Universe</div>
                    <div className="mode-description">Fly through the constellations and see how far away their stars really are</div>
                </button>
                <button className="mode-button mode-button-secondary" onClick={onSelectStudy}>
                    <div className="mode-title">Study Guide</div>
                    <div className="mode-description">Complete reference with mythology, history, and data</div>
                </button>
            </div>

            <div className="citations-footer">
                <button className="citations-link" onClick={() => setShowAbout(true)}>
                    About & Citations
                </button>
                <Footer />
            </div>

            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>About Constellation Quiz</h2>
                        <p className="modal-creator">Created by David Pan</p>
                        <p>An interactive tool for learning all 88 constellations.</p>

                        <h3>Data Sources</h3>
                        <ul>
                            <li>Constellation lines: <a href="https://github.com/Stellarium/stellarium" target="_blank" rel="noopener noreferrer">Stellarium</a></li>
                            <li>Star positions: Hipparcos catalog via <a href="https://rhodesmill.org/skyfield/" target="_blank" rel="noopener noreferrer">Skyfield</a></li>
                            <li>Star distances: Hipparcos (ESA) and <a href="https://www.cosmos.esa.int/gaia" target="_blank" rel="noopener noreferrer">Gaia DR3</a> (ESA/Gaia/DPAC)</li>
                            <li>Planet textures: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">Solar System Scope</a> (CC BY 4.0)</li>
                            <li>Moons, asteroids and comets: <a href="https://ssd.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA/JPL Solar System Dynamics</a> (Horizons, Small-Body Database)</li>
                            <li>Moon, Pluto, Ceres and Vesta maps: <a href="https://astrogeology.usgs.gov/" target="_blank" rel="noopener noreferrer">USGS Astrogeology</a> and <a href="https://github.com/nasa/NASA-3D-Resources" target="_blank" rel="noopener noreferrer">NASA 3D Resources</a> (Galileo, Cassini, Voyager, New Horizons, Dawn)</li>
                            <li>Stereographic projections & rendering: David Pan</li>
                            <li>Mythology & history: <a href="https://en.wikipedia.org/" target="_blank" rel="noopener noreferrer">Wikipedia</a></li>
                        </ul>

                        <p className="github-link">
                            <a href="https://github.com/cozenom/star-quiz" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        </p>

                        <button className="close-button" onClick={() => setShowAbout(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Title;
