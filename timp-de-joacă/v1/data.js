const CATEGORII = [
  { name: "încălzire", color: "#f97316" },
  { name: "introspecție", color: "#16a34a" },
  { name: "povești", color: "#ef4444" },
  { name: "emoții", color: "#eab308" },
  { name: "online", color: "#db2777" },
  { name: "relaxare", color: "#3b82f6" },
  { name: "reflecție", color: "#8b5cf6" },
];

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
    drăguț: 3,
    super: 5,
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
    drăguț: 3,
    super: 5,
    plictisitor: 1,
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
    drăguț: 3,
    super: 5,
    plictisitor: 1,
  },
];
