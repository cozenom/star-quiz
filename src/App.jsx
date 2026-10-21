import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Title from './components/Title';
import QuizSetup from './components/QuizSetup';
import SkyViewSetup from './components/SkyViewSetup';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResults';
import SkyView from './components/SkyView';
import StudyPage from './components/StudyPage';
import { generateQuestions, generateSingleQuestion } from './utils/quizHelpers';
import { attachSmallBodyHistory } from './utils/smallBodies';
import { setPlanetOrbits } from './utils/planets';

// Split out so three.js is only downloaded when 3D mode opens
const Universe3D = lazy(() => import('./components/Universe3D'));
import KeybindsPanel from './components/KeybindsPanel';
import StarField from './components/StarField';

// Hash routing: each screen has a URL like /star-quiz/#/study, so
// Back/Forward, refresh and direct links work (no server rewrites needed)
const SCREEN_HASHES = {
    'title': '#/',
    'setup': '#/quiz-setup',
    'quiz': '#/quiz',
    'results': '#/results',
    'skyview-setup': '#/skyview-setup',
    'skyview': '#/skyview',
    'study': '#/study',
    'universe3d': '#/3d',
};

const screenFromHash = (hash) =>
    Object.keys(SCREEN_HASHES).find(screen => SCREEN_HASHES[screen] === hash) || 'title';

function App() {
    const [screen, setScreen] = useState('title'); // 'title', 'setup', 'quiz', 'results', 'skyview-setup', 'skyview', 'study', 'universe3d'
    const [starsEnabled, setStarsEnabled] = useState(() => {
        const stored = localStorage.getItem('stars-enabled');
        return stored === null ? true : stored === 'true';
    });
    const [config, setConfig] = useState(null);
    const [savedConfig, setSavedConfig] = useState(null); // Persist settings when returning to menu
    const [skyViewConfig, setSkyViewConfig] = useState(null);
    const [savedSkyViewConfig, setSavedSkyViewConfig] = useState(null);
    const [quizState, setQuizState] = useState(null);
    const [constellationData, setConstellationData] = useState(null);
    const [constellationStudy, setConstellationStudy] = useState(null);
    const [starCatalogData, setStarCatalogData] = useState(null);
    const [skyViewStars, setSkyViewStars] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [stars3d, setStars3d] = useState(null);
    const [planetFacts, setPlanetFacts] = useState(null);
    const [moonsData, setMoonsData] = useState(null);
    const [smallBodies, setSmallBodies] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    // Load constellation data from external JSON
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/constellation_data.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load constellation data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setConstellationData(data);
            })
            .catch(error => {
                console.error('Error loading constellation data:', error);
                setLoadingError(error.message);
            });
    }, []);

    // Load constellation study data (rich Wikipedia data) from external JSON
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/constellation_study.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load constellation study data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setConstellationStudy(data);
            })
            .catch(error => {
                console.error('Error loading constellation study data:', error);
                // Don't block app if constellation study fails to load
                setConstellationStudy(null);
            });
    }, []);

    // Lazy load star catalog only when needed (for quiz modes)
    const loadStarCatalog = () => {
        // Return early if already loaded or loading
        if (starCatalogData !== null) {
            return Promise.resolve(starCatalogData);
        }

        const filename = `${import.meta.env.BASE_URL}data/background_stars_visible.json`;

        return fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load star catalog: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setStarCatalogData(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading star catalog:', error);
                // Don't block quiz if star catalog fails to load
                setStarCatalogData(null);
                return null;
            });
    };

    // Lazy load sky view stars (has ra/dec for sky view projection)
    const loadSkyViewStars = () => {
        // Return early if already loaded
        if (skyViewStars !== null) {
            return Promise.resolve(skyViewStars);
        }

        const filename = `${import.meta.env.BASE_URL}data/stars_visible.json`;

        return fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load sky view stars: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setSkyViewStars(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading sky view stars:', error);
                setSkyViewStars(null);
                return null;
            });
    };

    // Lazy load city list (for the visibility filter's city search) only when needed
    const loadCityData = () => {
        // Return early if already loaded or loading
        if (cityData !== null) {
            return Promise.resolve(cityData);
        }

        const filename = `${import.meta.env.BASE_URL}data/cities.json`;

        return fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load city data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setCityData(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading city data:', error);
                setCityData(null);
                return null;
            });
    };

    // Lazy load the 3D star catalogue (distances, colours) only for 3D mode.
    // The Gaia nearby stars (stars_gaia.bin, raw float32 rows) come along as
    // data.gaia; without them the view still works, just with fewer stars.
    const loadStars3d = () => {
        // Return early if already loaded
        if (stars3d !== null) {
            return Promise.resolve(stars3d);
        }

        const filename = `${import.meta.env.BASE_URL}data/stars_3d.json`;
        const gaiaFilename = `${import.meta.env.BASE_URL}data/stars_gaia.bin`;

        const gaia = fetch(gaiaFilename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load Gaia stars: ${response.statusText}`);
                }
                return response.arrayBuffer();
            })
            .then(buffer => new Float32Array(buffer))
            .catch(error => {
                console.error('Error loading Gaia stars:', error);
                return null;
            });

        return fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load 3D stars: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => gaia.then(rows => ({ ...data, gaia: rows })))
            .then(data => {
                setStars3d(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading 3D stars:', error);
                setStars3d(null);
                return null;
            });
    };

    // Planet facts + display colours for the 3D solar system. Without them
    // the 3D view still works, just without planets.
    const loadPlanetFacts = () => {
        if (planetFacts !== null) {
            return Promise.resolve(planetFacts);
        }

        return fetch(`${import.meta.env.BASE_URL}data/planets.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load planets: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setPlanetFacts(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading planets:', error);
                return null;
            });
    };

    // Planet orbits over 1600-2500 (planet_orbits.json: wave fits to JPL
    // Horizons + VSOP87). Optional: without it planets.js uses
    // astronomy-engine, less accurate away from today.
    const planetOrbitsLoaded = useRef(null);
    const loadPlanetOrbits = () => {
        if (planetOrbitsLoaded.current) return planetOrbitsLoaded.current;
        planetOrbitsLoaded.current = fetch(`${import.meta.env.BASE_URL}data/planet_orbits.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load planet orbits: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => setPlanetOrbits(data))
            .catch(error => {
                console.error('Error loading planet orbits:', error);
                planetOrbitsLoaded.current = null;  // try again next time
            });
        return planetOrbitsLoaded.current;
    };

    // Moons of the other planets (orbits from JPL). Optional like planets.json.
    const loadMoons = () => {
        if (moonsData !== null) {
            return Promise.resolve(moonsData);
        }

        return fetch(`${import.meta.env.BASE_URL}data/moons.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load moons: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setMoonsData(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading moons:', error);
                return null;
            });
    };

    // Asteroids and comets (orbits from JPL's Small-Body Database): the named
    // ones plus the default tier of the point cloud (small_bodies.bin, packed
    // uint16 orbit elements). The 3D view fetches the bigger tier itself when
    // asked. Optional like planets.json.
    const loadSmallBodies = () => {
        if (smallBodies !== null) {
            return Promise.resolve(smallBodies);
        }

        const base = `${import.meta.env.BASE_URL}data/`;
        const fetchOk = (name) => fetch(base + name).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${name}: ${response.statusText}`);
            }
            return response;
        });
        // The named bodies' Horizons history; without it they use one element
        // set (drifting over decades)
        const history = fetchOk('small_bodies_history.bin')
            .then(response => response.arrayBuffer())
            .catch(error => {
                console.error('Error loading small body history:', error);
                return null;
            });
        return Promise.all([
            fetchOk('small_bodies.json').then(response => response.json()),
            fetchOk('small_bodies.bin').then(response => response.arrayBuffer()),
            history,
        ])
            .then(([meta, buffer, historyBuffer]) => {
                if (historyBuffer) attachSmallBodyHistory(meta, historyBuffer);
                // Rows of 6 uint16 elements, then one part byte per point
                const count = meta.tiers[0].count;
                const data = { meta, points: new Uint16Array(buffer, 0, count * 6), parts: new Uint8Array(buffer, count * 12, count) };
                setSmallBodies(data);
                return data;
            })
            .catch(error => {
                console.error('Error loading small bodies:', error);
                return null;
            });
    };

    // Show the screen the URL hash names. Screens that need in-memory state
    // (a running quiz, a sky view config) fall back to their setup page when
    // opened directly; 3D and sky view load their data first.
    const showScreenFromHash = async () => {
        const hash = window.location.hash;
        let target = screenFromHash(hash);

        if ((target === 'quiz' || target === 'results') && !quizState) target = 'setup';
        if (target === 'skyview' && !skyViewConfig) target = 'skyview-setup';

        if (SCREEN_HASHES[target] !== hash && hash !== '') {
            // replaceState so Back doesn't return to the dead link
            window.history.replaceState(null, '', SCREEN_HASHES[target]);
        }

        if (target === 'universe3d') {
            await Promise.all([loadStars3d(), loadPlanetFacts(), loadPlanetOrbits(), loadMoons(), loadSmallBodies()]);
        } else if (target === 'skyview') {
            await loadSkyViewStars();
        }
        // The user may have navigated elsewhere while data was loading
        if (window.location.hash !== hash && SCREEN_HASHES[target] !== window.location.hash) return;
        setScreen(target);
    };

    // The listener is registered once, so read the latest closure via a ref
    const showScreenRef = useRef(showScreenFromHash);
    showScreenRef.current = showScreenFromHash;

    // popstate fires on Back/Forward and on hand-edited hashes (not on pushState)
    useEffect(() => {
        const onPopState = () => showScreenRef.current();
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    // Open the page in the URL once the constellation data is ready
    const dataReady = constellationData !== null;
    useEffect(() => {
        if (dataReady) showScreenRef.current();
    }, [dataReady]);

    // In-app screen changes: add a history entry and switch directly. The
    // caller has just set up any state the screen needs, which this render's
    // closures may not see yet, so the guards above are skipped.
    const navigate = (target) => {
        if (window.location.hash !== SCREEN_HASHES[target]) {
            window.history.pushState(null, '', SCREEN_HASHES[target]);
        }
        if (target === 'universe3d') {
            showScreenRef.current(); // loads the 3D data first
        } else {
            setScreen(target);
        }
    };

    const startQuiz = async (quizConfig) => {
        setConfig(quizConfig);
        setSavedConfig(quizConfig); // Save config for when user returns to menu

        // Load star catalog if needed
        const catalog = await loadStarCatalog();

        const questions = generateQuestions(quizConfig, constellationData, catalog);
        setQuizState({
            questions,
            currentIndex: 0,
            score: 0,
            answers: []
        });
        navigate('quiz');
    };

    const handleAnswer = (isCorrect, userAnswer, correctAnswer) => {
        const newAnswers = [...quizState.answers, {
            constellation: correctAnswer,
            userAnswer,
            correct: isCorrect
        }];

        const newScore = isCorrect ? quizState.score + 1 : quizState.score;

        setQuizState({
            ...quizState,
            score: newScore,
            answers: newAnswers
        });
    };

    const nextQuestion = async () => {
        if (quizState.currentIndex + 1 < quizState.questions.length) {
            setQuizState({
                ...quizState,
                currentIndex: quizState.currentIndex + 1
            });
        } else if (config.mode === 'endless') {
            // Endless mode: generate new question, avoiding last 3 asked
            const recentAbbrevs = quizState.answers.slice(-3).map(a => {
                // Find the abbrev from the constellation name
                const q = quizState.questions.find(q =>
                    q.constellation.displayName === a.constellation || q.constellation.name === a.constellation
                );
                return q ? q.constellation.abbrev : null;
            }).filter(Boolean);

            // Ensure star catalog is loaded (should already be loaded from startQuiz)
            const catalog = await loadStarCatalog();

            const newQuestion = generateSingleQuestion(config, constellationData, catalog, recentAbbrevs);
            setQuizState({
                ...quizState,
                questions: [...quizState.questions, newQuestion],
                currentIndex: quizState.currentIndex + 1
            });
        } else {
            // Single mode: go to results
            navigate('results');
        }
    };

    const restartQuiz = () => {
        startQuiz(config);
    };

    const newQuiz = () => {
        navigate('title');
        setConfig(null);
        setQuizState(null);
    };

    const backToSetup = () => {
        navigate('setup');
    };

    const goToSetup = () => {
        navigate('setup');
    };

    const goToSkyViewSetup = () => {
        navigate('skyview-setup');
    };

    const goToStudy = () => {
        navigate('study');
    };

    const goToUniverse3d = () => {
        navigate('universe3d');
    };

    const backToTitle = () => {
        navigate('title');
        setSavedConfig(config);
        setSavedSkyViewConfig(skyViewConfig);
    };

    const backToSkyViewSetup = () => {
        navigate('skyview-setup');
    };

    // Show loading state
    if (!constellationData && !loadingError) {
        return (
            <div style={{textAlign: 'center', padding: '3rem'}}>
                <h1>Constellation Quiz</h1>
                <p style={{marginTop: '2rem', fontSize: '1.25rem', color: '#94a3b8'}}>Loading constellation data...</p>
            </div>
        );
    }

    // Show error state
    if (loadingError) {
        return (
            <div style={{textAlign: 'center', padding: '3rem'}}>
                <h1>Error Loading Data</h1>
                <div className="card" style={{marginTop: '2rem'}}>
                    <p style={{color: '#dc2626', marginBottom: '1rem'}}>Failed to load constellation data:</p>
                    <p style={{fontFamily: 'monospace', background: '#1e293b', padding: '1rem', borderRadius: '0.5rem'}}>
                        {loadingError}
                    </p>
                    <p style={{marginTop: '1.5rem', fontSize: '0.875rem', color: '#94a3b8'}}>
                        Make sure you're running a local HTTP server:
                    </p>
                    <p style={{fontFamily: 'monospace', marginTop: '0.5rem', fontSize: '0.875rem'}}>
                        python -m http.server 8000
                    </p>
                </div>
            </div>
        );
    }

    const startSkyView = async (newConfig) => {
        setSkyViewConfig(newConfig);
        setSavedSkyViewConfig(newConfig);

        // Load sky view stars (ra/dec format)
        await loadSkyViewStars();

        navigate('skyview');
    };

    const toggleStars = () => {
        setStarsEnabled(prev => {
            localStorage.setItem('stars-enabled', String(!prev));
            return !prev;
        });
    };

    return (
        <>
            {starsEnabled && screen !== 'universe3d' && <StarField constellationData={constellationData} />}
            <button
                onClick={toggleStars}
                className="stars-toggle"
                title={starsEnabled ? 'Disable starfield' : 'Enable starfield'}
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    zIndex: 1000,
                    width: '2.25rem',
                    height: '2.25rem',
                    minHeight: 'unset',
                    padding: 0,
                    borderRadius: '50%',
                    background: starsEnabled ? 'rgba(59,130,246,0.25)' : 'rgba(71,85,105,0.25)',
                    border: `1px solid ${starsEnabled ? 'rgba(59,130,246,0.5)' : 'rgba(100,116,139,0.4)'}`,
                    fontSize: '1rem',
                    lineHeight: 1,
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s, border-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: starsEnabled ? 1 : 0.55,
                }}
            >
                ✦
            </button>
            <KeybindsPanel screen={screen} />

            {screen === 'title' && (
                <Title
                    onSelectRegularQuiz={goToSetup}
                    onSelectSkyView={goToSkyViewSetup}
                    onSelectStudy={goToStudy}
                    onSelectUniverse3d={goToUniverse3d}
                />
            )}
            {screen === 'setup' && (
                <QuizSetup
                    onStart={startQuiz}
                    onBack={backToTitle}
                    constellationData={constellationData}
                    initialConfig={savedConfig}
                    cityData={cityData}
                    loadCityData={loadCityData}
                    loadStarCatalog={loadStarCatalog}
                />
            )}
            {screen === 'skyview-setup' && (
                <SkyViewSetup
                    onStart={startSkyView}
                    onBack={backToTitle}
                    constellationData={constellationData}
                    initialConfig={savedSkyViewConfig}
                    cityData={cityData}
                    loadCityData={loadCityData}
                    loadSkyViewStars={loadSkyViewStars}
                />
            )}
            {screen === 'quiz' && (
                <Quiz
                    config={config}
                    quizState={quizState}
                    onAnswer={handleAnswer}
                    onNext={nextQuestion}
                    onBack={backToSetup}
                />
            )}
            {screen === 'results' && (
                <QuizResults
                    quizState={quizState}
                    onRestart={restartQuiz}
                    onNewQuiz={newQuiz}
                    onBackToSetup={backToSetup}
                />
            )}
            {screen === 'skyview' && (
                <SkyView
                    constellationData={constellationData}
                    starCatalogData={skyViewStars}
                    config={skyViewConfig}
                    onBack={backToSkyViewSetup}
                />
            )}
            {screen === 'study' && (
                <StudyPage
                    onBack={backToTitle}
                    constellationData={constellationData}
                    constellationStudy={constellationStudy}
                />
            )}
            {screen === 'universe3d' && (
                <Suspense fallback={<div className="loading">Loading 3D view...</div>}>
                    <Universe3D
                        constellationData={constellationData}
                        stars3d={stars3d}
                        planetFacts={planetFacts}
                        moonsData={moonsData}
                        smallBodies={smallBodies}
                        onBack={backToTitle}
                    />
                </Suspense>
            )}
        </>
    );
}

export default App;
