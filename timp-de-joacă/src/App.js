import "./style.css";

function App() {
  const appTitle = "Timp de joacă";

  return (
    <>
      {/* HEADER */}
      <header class="header">
        <div class="logo">
          <img
            src="mdi--child-toy.svg"
            height="70"
            width="70"
            alt="Teddy bear logo"
          ></img>
          <h1>{appTitle}</h1>
        </div>

        <button class="btn btn-large btn-open">scrie un joc</button>
      </header>

      <ScrieUnJoc />

      <main className="main">
        <FiltruCategorii />
        <ListăJocuri />
      </main>
    </>
  );
}

function ScrieUnJoc() {
  return <form className="joc-form">scrie un joc</form>;
}

function FiltruCategorii() {
  return <aside>filtru categorii</aside>;
}

function ListăJocuri() {
  return <section>listă jocuri</section>;
}

export default App;
