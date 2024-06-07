import { useEffect, useState } from "react";
import supabase from "./supabase";

import "./style.css";

const jocuriInit = [
  {
    id: 1,
    nume: "Plici Placi",
    reguli:
      "Se începe o numărătoare de la 1, iar când se ajunge la orice multiplu de 3, acesta se înlocuiește cu plici; după ce se stabilizează ritmul, se introduce următoarea regulă: multiplii de 5 se înlocuiesc cu placi. Se pot introduce mai multe reguli pe rând, după ce ritmul numărătorii redevine constant. Se pot introduce reguli simple sau complicate, în funcție de nivelul copilului și de viteza cu care se adaptează la schimbări (de exemplu: schimbarea sensului numărătorii când se ajunge la plici sau la placi; înlocuirea cuvintelor cu bătăi din palme, cu excepția cuvintelor plici și placi etc.).",
    categorie: "încălzire",
    obiective: ["concentrare", "detensionarea atmosferei", "matematică"],
    întrebări: [
      "Ce se întâmpla în momentul în care trebuia să te adaptezi la o nouă regulă?",
      "Ce făceai ca să păstrezi ritmul constant?",
      "De ce crezi că devine mai ușor să respecți regula după un timp?",
    ],
    extraLink: "https://www.youtube.com/watch?v=GhRylsmL4og",
    drăguț: 10,
    super: 9,
    plictisitor: 1,
  },
  {
    id: 2,
    nume: "Află pasiunile mele",
    reguli:
      "Unul dintre parteneri își alege o pasiune sau un hobby și îl ține secret. Celălalt partener trebuie să ghicească pasiunea sau hobby-ul ascuns prin intermediul unor întrebări. Persoana care își ascunde pasiunea trebuie să răspundă doar cu „da” sau „nu” la întrebările celuilalt partener.",
    categorie: "introspecție",
    obiective: ["comunicare", "colaborare", "conversație", "conexiune"],
    întrebări: [
      "Care a fost cea mai grea parte a jocului de ghicit? De ce?",
      "Care întrebare te-a adus cel mai aproape de a ghici pasiunea?",
      "Ce ai învățat despre mine în timpul acestui joc? Ce altceva poți deduce pe baza acestor aspecte?",
    ],
    extraLink: "https://pbskids.org/peg/games/music-maker/",
    drăguț: 13,
    super: 8,
    plictisitor: 0,
  },
  {
    id: 3,
    nume: "Poveștile încâlcite",
    reguli:
      "Coordonatorul începe povestea și apoi copilul continuă să o dezvolte. Pe măsură ce povestea avansează, coordonatorul introduce noi reguli sau provocări. De exemplu, copilului i se poate cere să folosească numai cuvinte care nu conțin litera „C”; să înceapă fiecare propoziție cu un verb; să introducă în poveste lucruri amuzante sau șocante; să introducă un animal în poveste și să descrie cum interacționează cu personajele; să reia tot ce s-a întâmplat înainte dar în ordine inversă; să introducă un element surpriză în poveste și să improvizeze o soluție creativă pentru a rezolva situația; să nu folosească cuvinte comune, cum ar fi „și”, „sau”, „dar” etc.; să folosească metafore sau comparații în povestire; să adapteze povestea la un mediu sau la un personaj nou. Jocul poate continua în acest fel, fiecare participant contribuind la dezvoltarea și încâlcirea poveștii.",
    categorie: "povești",
    obiective: ["imaginație", "spontaneitate", "gândire creativă"],
    întrebări: [
      "Care cerință a fost cel mai greu de îndeplinit? De ce?",
      "Care sunt părțile componente ale unei povești?",
      "La ce crezi că ne ajută acest exercițiu?",
    ],
    extraLink: "https://www.youtube.com/watch?v=BELlZKpi1Zs",
    drăguț: 15,
    super: 3,
    plictisitor: 2,
  },
];

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jocuri, setJocuri] = useState([]);

  useEffect(function () {
    async function getJocuri() {
      const { data: jocuri, error } = await supabase.from("jocuri").select("*");
      setJocuri(jocuri);
    }
    getJocuri();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <ScrieUnJoc setJocuri={setJocuri} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <FiltruCategorii />
        <ListăJocuri jocuri={jocuri} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Timp de joacă";
  return (
    <header className="header">
      <div className="logo">
        <img
          src="mdi--child-toy.svg"
          height="70"
          width="70"
          alt="Teddy bear logo"
        />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "închide" : "scrie un joc"}
      </button>
    </header>
  );
}

const CATEGORII = [
  { name: "încălzire", color: "#f97316" },
  { name: "introspecție", color: "#16a34a" },
  { name: "povești", color: "#ef4444" },
  { name: "emoții", color: "#eab308" },
  { name: "online", color: "#db2777" },
  { name: "relaxare", color: "#3b82f6" },
  { name: "reflecție", color: "#8b5cf6" },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function ScrieUnJoc({ setJocuri, setShowForm }) {
  const [reguli, setReguli] = useState("");
  const [extraLink, setLink] = useState("http://cevadistractiv.com");
  const [categorie, setCategorie] = useState("");
  const reguliLength = reguli.length;

  function handleSubmit(e) {
    //1. Prevent browser reload.
    e.preventDefault();
    console.log(reguli, extraLink, categorie);
    //2. Check if data is valid. If so, create new game.
    if (reguli && isValidHttpUrl(extraLink) && categorie && reguliLength <= 900)
      console.log("there is valid data");

    //3. Create a new joc object.
    const jocNou = {
      id: Math.round(Math.random() * 1000000),
      postatÎn: new Date().getFullYear(),
      extraLink,
      reguli,
      categorie,
      drăguț: 0,
      super: 0,
      plictisitor: 0,
    };
    //4. Add the new game to the UI: add the game to state.
    setJocuri((jocuri) => [jocNou, ...jocuri]);

    //5. Reset input fields.
    setReguli("");
    setLink("");
    setCategorie("");

    //6. Close the form.
    setShowForm(false);
  }

  return (
    <form className="joc-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="cum se joacă... "
        value={reguli}
        onChange={(e) => setReguli(e.target.value)}
      />
      <span>{900 - reguliLength}</span>
      <input
        value={extraLink}
        type="text"
        placeholder="link la ceva distractiv... "
        onChange={(e) => setLink(e.target.value)}
      />
      <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
        <option value="">alege o categorie</option>
        {CATEGORII.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Trimite</button>
    </form>
  );
}

function FiltruCategorii() {
  return (
    <aside>
      <ul>
        <li className="categorie">
          <button className="btn btn-toate-cat">TOATE CATEGORIILE</button>
        </li>

        {CATEGORII.map((cat) => (
          <li key={cat.name} className="categorie">
            <button
              className="btn btn-cat"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ListăJocuri({ jocuri }) {
  return (
    <section>
      <ul className="listă-jocuri">
        {jocuri.map((joc) => (
          <Joc key={joc.id} joc={joc} />
        ))}
      </ul>
      <p>Sunt {jocuri.length} jocuri în baza de date. Adaugă unul nou!</p>
    </section>
  );
}

function Joc({ joc }) {
  return (
    <li className="joc">
      <p>
        {joc.reguli}
        <a className="extraLink" href={joc.extraLink} target="_blank">
          (ceva distractiv)
        </a>
      </p>
      <span
        className="categorie"
        style={{
          backgroundColor: CATEGORII.find((cat) => cat.name === joc.categorie)
            .color,
        }}
      >
        {joc.categorie}
      </span>
      <div className="btn-vot">
        <button>😊 {joc.drăguț}</button>
        <button>🤩 {joc.super}</button>
        <button>🥱 {joc.plictisitor}</button>
      </div>
    </li>
  );
}

export default App;
