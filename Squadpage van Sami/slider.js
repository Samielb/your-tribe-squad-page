document.querySelectorAll('.schuifrij').forEach(rij => {
  const kaarten = [...rij.children];

  // Voeg nieuwe kaarten in de HTML toe. Het script maakt zelf de herhalingen.
  function maakSlider() {
    rij.querySelectorAll('.kopie').forEach(kopie => kopie.remove());
    if (!kaarten.length) return;

    const tussenruimte = parseFloat(getComputedStyle(rij).gap);
    const afstand = kaarten.reduce((totaal, kaart) => {
      return totaal + kaart.getBoundingClientRect().width + tussenruimte;
    }, 0);

    // Ook op brede schermen moeten er genoeg foto's klaarstaan aan de rechterkant.
    const herhalingen = Math.ceil(rij.parentElement.clientWidth / afstand);
    for (let i = 0; i < herhalingen; i++) {
      kaarten.forEach(kaart => {
        const kopie = kaart.cloneNode(true);
        kopie.classList.add('kopie');
        kopie.removeAttribute('id');
        kopie.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
        rij.append(kopie);
      });
    }

    rij.style.setProperty('--afstand', `-${afstand}px`);
    rij.style.setProperty('--duur', `${afstand / 45}s`);
    rij.classList.add('doorlopend');
  }

  maakSlider();
  window.addEventListener('resize', maakSlider);
});

