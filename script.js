
// Multipliers Test Script

const questions = [{"text": "Aš padedu mano mano komandai mokytis iš klaidų ir skatinu augimą.", "competency": "Ugdymas", "invert": false}, {"text": "Aš vengiu spręsti konfliktus ir leidžiu jiems eskaluotis.", "competency": "Sprendimų priėmimas", "invert": true}, {"text": "Aš viešai pripažįstu ir vertinu mano komandos indėlį.", "competency": "Talentų magnetas", "invert": false}, {"text": "Aš dažnai reaguoja neigiamai į nesėkmes ir kaltinu savo komandą.", "competency": "Emocinis intelektas", "invert": true}, {"text": "Aš retai pripažįstu mano komandos pasiekimus.", "competency": "Talentų magnetas", "invert": true}, {"text": "Aš dažnai ignoruoju mano komandos idėjas.", "competency": "Iššūkių teikėjas", "invert": true}, {"text": "Aš skatinu atvirą bendravimą ir yra lengvai pasiekiamas.", "competency": "Prieinamumas", "invert": false}, {"text": "Aš kuriu kultūrą, kurioje mano komanda jaučiasi įgalinta ir savarankiška.", "competency": "Autonomija", "invert": false}, {"text": "Aš pasitikiu mano komanda ir leidžiu jiems savarankiškai priimti sprendimus.", "competency": "Autonomija", "invert": false}, {"text": "Aš skatina savo komandą dalyvauti strateginiuose sprendimuose.", "competency": "Sprendimų priėmimas", "invert": false}, {"text": "Aš aiškiai komunikuoju tikslus ir lūkesčius mano komandai.", "competency": "Komunikacija", "invert": false}, {"text": "Aš išlieka ramus ir palaikantis net sudėtingose situacijose.", "competency": "Emocinis intelektas", "invert": false}, {"text": "Aš dažnai pasilieku sprendimus sau ir nepaaiškina jų savo komandai.", "competency": "Komunikacija", "invert": true}, {"text": "Aš dažnai nutraukiu diskusijas ir priimu sprendimus vienas.", "competency": "Diskusijų skatintojas", "invert": true}, {"text": "Aš kuriu saugią aplinką, kurioje mano komanda gali laisvai reikšti mintis.", "competency": "Išlaisvintojas", "invert": false}, {"text": "Aš skatinu konstruktyvias diskusijas ir įtraukiu komandą į sprendimų priėmimą.", "competency": "Diskusijų skatintojas", "invert": false}, {"text": "Aš retai skatinu savo komandą prisiimti atsakomybę.", "competency": "Investuotojas", "invert": true}, {"text": "Aš aktyviai ieškau ir pritraukiu talentingus žmones į komandą.", "competency": "Talentų magnetas", "invert": false}, {"text": "Aš efektyviai sprendžiu konfliktus ir skatinu bendradarbiavimą.", "competency": "Sprendimų priėmimas", "invert": false}, {"text": "Aš aktyviai skatinu savo komandą siūlyti naujas idėjas.", "competency": "Iššūkių teikėjas", "invert": false}, {"text": "Aš vengiu deleguoti atsakomybę ir dažnai viską darau pats.", "competency": "Delegavimas", "invert": true}, {"text": "Aš investuoja laiką į mano komandos ugdymą ir tobulėjimą.", "competency": "Ugdymas", "invert": false}, {"text": "Aš dažnai reaguoju impulsyviai ir neapgalvotai stresinėse situacijose.", "competency": "Emocinis intelektas", "invert": true}, {"text": "Aš dažnai mikrovadybinu ir kontroliuoju kiekvieną mano komandos žingsnį.", "competency": "Kontrolė", "invert": true}, {"text": "Aš retai skiriu laiko mano komandos tobulėjimui.", "competency": "Ugdymas", "invert": true}, {"text": "Aš aktyviai klausau ir vertina savo mano komandos įžvalgas.", "competency": "Komunikacija", "invert": false}, {"text": "Aš skatinu savo komandą rizikuoti ir mokytis iš patirties.", "competency": "Išlaisvintojas", "invert": false}, {"text": "Aš retai deleguoju strateginius sprendimus mano komandai.", "competency": "Delegavimas", "invert": true}, {"text": "Aš retai būnu pasiekiamas ir vengiu tiesiogiai bendrauti su mano komanda.", "competency": "Prieinamumas", "invert": true}, {"text": "Aš dažnai neleidžiu mano komandai eksperimentuoti ir mokytis iš klaidų.", "competency": "Išlaisvintojas", "invert": true}, {"text": "Aš dažnai kalbu, bet retai klausau ir girdžiu savo komandos nuomonę.", "competency": "Komunikacija", "invert": true}, {"text": "Aš retai būnu prieinamas mano komandai.", "competency": "Prieinamumas", "invert": true}, {"text": "Aš retai įtraukiu komandą į sprendimų priėmimą.", "competency": "Sprendimų priėmimas", "invert": true}, {"text": "Aš suteikiu mano komandai atsakomybę ir pasitikėjimą įgyvendinant projektus.", "competency": "Investuotojas", "invert": false}, {"text": "Aš ignoruoju mano komandos emocinius poreikius ir retai rodau empatiją.", "competency": "Emocinis intelektas", "invert": true}];
const analysis = {"Kontrolė": {"strength": 0, "weakness": 1, "summary": "Jūsų tobulėjimo sritis – kontrolė. Atsakymai rodo, kad šioje srityje yra daugiau silpnybių (1 iš 1 teiginių)."}, "Autonomija": {"strength": 2, "weakness": 0, "summary": "Jūsų stiprybė – autonomija. Atsakymai rodo, kad dažniau demonstruojate šią kompetenciją (2 iš 2 teiginių)."}, "Delegavimas": {"strength": 0, "weakness": 2, "summary": "Jūsų tobulėjimo sritis – delegavimas. Atsakymai rodo, kad šioje srityje yra daugiau silpnybių (2 iš 2 teiginių)."}, "Iššūkių teikėjas": {"strength": 1, "weakness": 1, "summary": "Kompetencija iššūkių teikėjas yra subalansuota – tiek stiprybių, tiek silpnybių po lygiai (1 iš 2)."}, "Emocinis intelektas": {"strength": 1, "weakness": 3, "summary": "Jūsų tobulėjimo sritis – emocinis intelektas. Atsakymai rodo, kad šioje srityje yra daugiau silpnybių (3 iš 4 teiginių)."}, "Išlaisvintojas": {"strength": 2, "weakness": 1, "summary": "Jūsų stiprybė – išlaisvintojas. Atsakymai rodo, kad dažniau demonstruojate šią kompetenciją (2 iš 3 teiginių)."}, "Diskusijų skatintojas": {"strength": 1, "weakness": 1, "summary": "Kompetencija diskusijų skatintojas yra subalansuota – tiek stiprybių, tiek silpnybių po lygiai (1 iš 2)."}, "Ugdymas": {"strength": 2, "weakness": 1, "summary": "Jūsų stiprybė – ugdymas. Atsakymai rodo, kad dažniau demonstruojate šią kompetenciją (2 iš 3 teiginių)."}, "Prieinamumas": {"strength": 1, "weakness": 2, "summary": "Jūsų tobulėjimo sritis – prieinamumas. Atsakymai rodo, kad šioje srityje yra daugiau silpnybių (2 iš 3 teiginių)."}, "Investuotojas": {"strength": 1, "weakness": 1, "summary": "Kompetencija investuotojas yra subalansuota – tiek stiprybių, tiek silpnybių po lygiai (1 iš 2)."}, "Talentų magnetas": {"strength": 2, "weakness": 1, "summary": "Jūsų stiprybė – talentų magnetas. Atsakymai rodo, kad dažniau demonstruojate šią kompetenciją (2 iš 3 teiginių)."}, "Sprendimų priėmimas": {"strength": 2, "weakness": 2, "summary": "Kompetencija sprendimų priėmimas yra subalansuota – tiek stiprybių, tiek silpnybių po lygiai (2 iš 4)."}, "Komunikacija": {"strength": 2, "weakness": 2, "summary": "Kompetencija komunikacija yra subalansuota – tiek stiprybių, tiek silpnybių po lygiai (2 iš 4)."}};

// Calculate results based on answers
function calculateResults(answers) {
    const results = {};

    // Initialize results structure
    for (const key in analysis) {
        results[key] = {
            strength: 0,
            weakness: 0,
            summary: ""
        };
    }

    // Count strengths and weaknesses
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const competency = q.competency;
        const invert = q.invert;
        const answer = answers[i];

        if (!(competency in results)) continue;

        if ((answer && !invert) || (!answer && invert)) {
            results[competency]["strength"] += 1;
        } else {
            results[competency]["weakness"] += 1;
        }
    }

    // Add summaries from analysis
    for (const key in analysis) {
        results[key]["summary"] = analysis[key]["summary"];
    }

    return results;
}

// Display results in the HTML page
function displayResults(results) {
    const container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    for (const competency in results) {
        const block = document.createElement("div");
        block.className = "result-block";
        block.innerHTML = `
            <h3>${competency}</h3>
            <p><strong>Stiprybės:</strong> ${results[competency]["strength"]}</p>
            <p><strong>Silpnybės:</strong> ${results[competency]["weakness"]}</p>
            <p><em>${results[competency]["summary"]}</em></p>
        `;
        container.appendChild(block);
    }
}

// On page load, read answers and show results
document.addEventListener("DOMContentLoaded", function () {
    const answers = JSON.parse(localStorage.getItem("multipliersAnswers"));
    if (answers) {
        const results = calculateResults(answers);
        displayResults(results);
    } else {
        const container = document.getElementById("results");
        if (container) {
            container.innerHTML = "<p>Nerasta atsakymų. Prašome grįžti ir užpildyti testą.</p>";
        }
    }
});
