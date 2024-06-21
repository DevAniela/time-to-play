import { useEffect, useState } from "react";
import supabase from "./supabase";
import TruncatedText from "./truncated-text";

import "./style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jocuri, setJocuri] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCat, setcurrentCat] = useState("toate");
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin

  useEffect(() => {
    async function getJocuri() {
      setIsLoading(true);

      let query = supabase.from("jocuri").select("*").eq("approved", true);

      if (currentCat !== "toate") query = query.eq("categorie", currentCat);

      try {
        const { data: jocuri, error } = await query
          .order("votDrăguț", { ascending: false })
          .limit(100);

        if (!error) {
          setJocuri(jocuri);
        } else {
          alert("A fost o problemă cu datele.");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        alert("A fost o problemă cu datele.");
      } finally {
        setIsLoading(false);
      }
    }
    getJocuri();

    // Check if the current user is an admin
    async function checkAdmin() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (user && user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    checkAdmin();
  }, [currentCat]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm && (
        <ScrieUnJoc setJocuri={setJocuri} setShowForm={setShowForm} />
      )}

      <main className="main">
        <FiltruCategorii setcurrentCat={setcurrentCat} />
        {isLoading ? (
          <Loader />
        ) : (
          <ListăJocuri jocuri={jocuri} setJocuri={setJocuri} />
        )}
        {isAdmin && <AdminPanel jocuri={jocuri} setJocuri={setJocuri} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
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
  const [extraLink, setExtraLink] = useState("");
  const [categorie, setCategorie] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const reguliLength = reguli.length;

  async function handleSubmit(e) {
    //1. Prevent browser reload.
    e.preventDefault();

    //2. Check if data is valid. If so, create new game.
    if (
      reguli &&
      isValidHttpUrl(extraLink) &&
      categorie &&
      reguliLength <= 1200
    ) {
      //3. Upload 'joc' to supabase and receive the new 'joc' object.
      setIsUploading(true);

      // Explicitly set 'approved' to false when inserting new 'joc'
      const { error } = await supabase
        .from("jocuri")
        .insert([{ reguli, extraLink, categorie, approved: false }])
        .select();

      setIsUploading(false);

      //4. Add the new game to the UI: add the game to state.
      if (!error) {
        //Fetch the updated list of games immediately after insertion
        const { data: updatedJocuri, error: fetchError } = await supabase
          .from("jocuri")
          .select("*")
          .eq("approved", true)
          .order("votDrăguț", { ascending: false })
          .limit(100);

        if (!fetchError) {
          setJocuri(updatedJocuri);

          //5. Reset input fields.
          setReguli("");
          setExtraLink("");
          setCategorie("");

          //6. Close the form.
          setShowForm(false);
        } else {
          console.error("Error fetching updated game list:", fetchError);
        }
      } else {
        console.error("Error inserting new game:", error);
      }
    } else {
      console.error("Invalid game data.");
    }
  }

  return (
    <form className="joc-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="cum se joacă... "
        value={reguli}
        onChange={(e) => setReguli(e.target.value)}
        disabled={isUploading}
      />
      <span>{1200 - reguliLength}</span>
      <input
        value={extraLink}
        type="text"
        placeholder="link distractiv... "
        onChange={(e) => setExtraLink(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        disabled={isUploading}
      >
        <option value="">alege o categorie</option>
        {CATEGORII.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Trimite
      </button>
    </form>
  );
}

function FiltruCategorii({ setcurrentCat }) {
  return (
    <aside>
      <ul>
        <li className="categorie">
          <button
            className="btn btn-toate-cat"
            onClick={() => setcurrentCat("toate")}
          >
            TOATE CATEGORIILE
          </button>
        </li>

        {CATEGORII.map((cat) => (
          <li key={cat.name} className="categorie">
            <button
              className="btn btn-cat"
              style={{ backgroundColor: cat.color }}
              onClick={() => setcurrentCat(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ListăJocuri({ jocuri, setJocuri }) {
  if (jocuri.length === 0)
    return (
      <p className="message">
        😮 Încă nu există jocuri în această categorie. Adaugă-l tu pe primul! 😊
      </p>
    );

  return (
    <section>
      <ul className="listă-jocuri">
        {jocuri.map((joc) => (
          <Joc key={joc.id} joc={joc} setJocuri={setJocuri} />
        ))}
      </ul>
      <p>
        {jocuri.length > 1
          ? `Sunt ${jocuri.length} jocuri în baza de date. Adaugă unul nou! 😊`
          : "Este doar 1 joc în această categorie. Adaugă și tu unul! 😊"}
      </p>
    </section>
  );
}

function Joc({ joc, setJocuri }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isPlicti = joc.votDrăguț + joc.votSuper < joc.votPlictisitor;

  async function handleVot(columnName) {
    setIsUpdating(true);
    const { data: updatedJoc, error } = await supabase
      .from("jocuri")
      .update({ [columnName]: joc[columnName] + 1 })
      .eq("id", joc.id)
      .select();
    setIsUpdating(false);

    console.log(updatedJoc);
    if (!error)
      setJocuri((jocuri) =>
        jocuri.map((j) => (j.id === joc.id ? updatedJoc[0] : j))
      );
  }

  return (
    <li className="joc">
      <p>
        {isPlicti ? <span className="plicti">[🥱plictisitor]</span> : null}
        <TruncatedText text={joc.reguli} />
        <a
          className="extraLink"
          href={joc.extraLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          (link)
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
        <button onClick={() => handleVot("votDrăguț")} disabled={isUpdating}>
          😊 {joc.votDrăguț}
        </button>
        <button onClick={() => handleVot("votSuper")} disabled={isUpdating}>
          🤩 {joc.votSuper}
        </button>
        <button
          onClick={() => handleVot("votPlictisitor")}
          disabled={isUpdating}
        >
          🥱 {joc.votPlictisitor}
        </button>
      </div>
    </li>
  );
}

function AdminPanel({ jocuri, setJocuri }) {
  async function approveGame(id) {
    const { data: updatedJoc, error } = await supabase
      .from("jocuri")
      .update({ approved: true })
      .eq("id", id)
      .select();

    if (!error) {
      setJocuri((jocuri) =>
        jocuri.map((joc) => (joc.id === id ? updatedJoc[0] : joc))
      );
    }
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {jocuri
          .filter((joc) => !joc.approved)
          .map((joc) => (
            <li key={joc.id}>
              <p>{joc.reguli}</p>
              <button onClick={() => approveGame(joc.id)}>Approve</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
