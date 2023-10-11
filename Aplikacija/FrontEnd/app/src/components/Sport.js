import React from "react";
import "./Sport.css";
import Slider from "./Slider.js";
import Img1 from "./img/img1.png";
import Img2 from "./img/img2.jpg";
import Img3 from "./img/img3.jpeg";
import Img4 from "./img/img4.jpg";
import Img5 from "./img/img5.jpg";
import Img6 from "./img/img6.jpeg";

const Sport = () => {
  return (
    <div className="hero">
      <div className="slider_text">
            <Slider
              imageSrc={Img1}
              title={"Atletika"}
              subtitle={"Atletika potiče iz grčke reči ATHLOS što znači  takmičenje. Atletika je jedna od temeljnih i najraširenijih sportskih grana, koju karakterizuje osnovni ljudski pokret i ponašanje, a koja obuhvata: trkačke, bacačke i skakačke discipline. Zbog svoje sveobuhvatnosti zovemo je, i istinski jeste, kraljica sportova. Atletskim vježbama stiče se fizička snaga, izdržljivost, brzina i okretnost a učvršćuju se svojstva volje kao što su hrabrost, odlučnost i upornost. Discipline atletike odlikuju se motoričkim kretanjima koja se uspješno mogu primjenjivati u toku obrazovnog procesa ili kroz druge oblike vježbanja, pomoću kojih se značajno utiče na podizanje opšte psihofizičke sposobnosti pojedinca.  "}
            />
            <Slider
              imageSrc={Img2}
              title={"Kosarka"}
              subtitle={"Košarka je vrsta timskog sporta. Igra se loptom pomoću ruku. Dve ekipe sastavljene od pet igrača pokušavaju postići što više poena ubacivanjem lopte kroz obruč protivničkog koša po određenim pravilima. Pobednik je ekipa koja postigne više poena. Tokom vremena košarka je razvila uobičajene tehnike šutiranja, dodavanja i vođenja, kao i pozicije igrača i napadački i odbrambeni mehanizam. Dok se uobičajena takmičarska košarka odvija pod strogim i tačno određenim pravilima, razne varijacije košarke učinile su košarku bližu igračima i s manjim brojem pravila. Košarka je jedan od najgledanijih sportova na svetu."}
              flipped={true}
            />
            <Slider
              imageSrc={Img3}
              title={"Plivanje"}
              subtitle={"Plivanje je jedan od najstarijih sportova i ima dugu istoriju. U antičkoj Grčkoj i Rimu, plivanje je bio deo vojne obuke i takmičenja. Plivanje uključuje različite discipline i stilove plivanja. Najčešći stilovi plivanja su kraul (slobodni stil), leđno plivanje, prsno plivanje i delfin stil. Svaki stil ima svoje karakteristične tehnike pokreta tela i disanja. Plivanje je popularan takmičarski sport. Olimpijske igre imaju plivanje kao jednu od glavnih disciplina, a postoje i brojna druga međunarodna i nacionalna takmičenja. Takmičenja se održavaju na različitim udaljenostima, kao što su trke na 50 metara, 100 metara, 200 metara, 400 metara i više. Plivanje je izuzetno korisno za fizičko zdravlje. To je niskoupravna aktivnost koja ima malo uticaja na zglobove, pa je odličan izbor za ljude svih uzrasta. Plivanje jača mišiće, poboljšava izdržljivost, razvija kardiovaskularni sistem i pomaže u održavanju zdrave telesne mase."}
            />
            <Slider
              imageSrc={Img4}
              title={"Gimnastika"}
              subtitle={"Stari Grci su verovali da je gimnastika najbolji način da se postigne savršen balans tela i uma, odnosno da je balans tela i uma moguće postići jedino kada su fizičke vežbe povezane sa intelektualnom aktivnošću. Platon, Aristotel i Homer su isticali osnažujuće kvalitete gimnastičkih aktivnosti. Gimnastika je kombinacija veština i sposobnosti kao što su: koordinacija, spretnost, gipkost, snaga i brzina. Ženske discipline: preskok, dvovisinski razboj, greda i parter. Muške discipline: parter, konj sa hvataljkama, karike, preskok, razboj i vratilo."}
              flipped={true}
            />
            <Slider
              imageSrc={Img5}
              title={"Fudbal"}
              subtitle={"Fudbal je jedan od najpopularnijih sportova na svetu, sa ogromnom bazom navijača i takmičarskim ligama širom sveta. U fudbalu postoje različite pozicije, uključujući napadače, veziste, bekove i golmane. Svaka pozicija ima svoje zadatke i odgovornosti na terenu, kao što su postizanje golova, asistiranje, kontrola igre ili odbrana. Fudbal je igra koja zahteva dobru saradnju i timski rad. Timovi moraju da razviju strategije, komuniciraju na terenu i sarađuju kako bi postigli uspeh. Osim fizičkih veština, fudbal takođe podstiče razvoj timskog duha, liderstva i sportskog fer-pleja."}
            />
            <Slider
              imageSrc={Img6}
              title={"Odbojka"}
              subtitle={"Odbojka uključuje različite tehnike, uključujući servis, prijem, postavljanje, napad, blok i odbranu. Svaka tehnika zahteva određenu veštinu i koordinaciju. Igrači koriste ruke i druge delove tela da bi kontrolisali i udarali loptu."}
              flipped={true}
            />
      </div>
    </div>
  );
};

export default Sport;
