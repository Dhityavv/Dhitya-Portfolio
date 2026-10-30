(function(){
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var hero = document.getElementById('top');
  var artifacts = document.querySelectorAll('.scene .artifact');
  var intro = document.getElementById('intro');
  var enterButton = document.getElementById('enter');
  var portalStage = document.getElementById('portal-stage');
  var introWasCompleted = false;
  try{
    introWasCompleted = window.sessionStorage.getItem('portfolioIntroCompleted') === 'true';
  }catch(error){
    console.error('Could not read the intro state from session storage.', error);
  }
  var finished = introWasCompleted;
  var cometTimer = null;

  if(introWasCompleted){
    document.body.classList.remove('lock');
    document.body.classList.add('ready');
    intro.remove();
  }

  // Navbar mengikuti posisi scroll.
  window.addEventListener('scroll', function(){
    nav.classList.toggle('solid', window.scrollY > 40);
  }, { passive:true });

  // Elemen muncul secara halus ketika masuk viewport.
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:.15 });

  document.querySelectorAll('.rv').forEach(function(element, index){
    element.style.transitionDelay = (index % 2) * .08 + 's';
    revealObserver.observe(element);
  });

  // Alamat email dirakit saat halaman dimuat.
  var mail = document.getElementById('mail');
  if(mail) mail.href = 'mailto:' + ['dhityanurhadi3011','gmail.com'].join('@');

  if(artifacts.length && hero && !reducedMotion && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove', function(event){
      var bounds = hero.getBoundingClientRect();
      var x = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width/2)) / (bounds.width/2)));
      var y = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height/2)) / (bounds.height/2)));
      artifacts.forEach(function(item){
        item.style.setProperty('--tilt-x', (x*14).toFixed(1) + 'deg');
        item.style.setProperty('--tilt-y', (-y*11).toFixed(1) + 'deg');
      });
    }, { passive:true });
    hero.addEventListener('pointerleave', function(){
      artifacts.forEach(function(item){
        item.style.setProperty('--tilt-x', '0deg');
        item.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // Debu cahaya yang bergerak perlahan di belakang emblem.
  if(!finished && !reducedMotion){
    for(var i=0;i<66;i++){
      var mote = document.createElement('i');
      mote.className = 'ambient' + (Math.random() > .79 ? ' star' : '');
      mote.style.setProperty('--x', (3 + Math.random()*94) + '%');
      mote.style.setProperty('--y', (3 + Math.random()*94) + '%');
      mote.style.setProperty('--size', (1 + Math.random()*3.5) + 'px');
      mote.style.setProperty('--opacity', (.14 + Math.random()*.48).toFixed(2));
      mote.style.setProperty('--duration', (3 + Math.random()*5) + 's');
      mote.style.setProperty('--delay', (-Math.random()*7) + 's');
      mote.style.setProperty('--drift', (-20 + Math.random()*40) + 'px');
      if(mote.className.indexOf('star') === -1 && Math.random() < .34){
        mote.style.background = '#b18cff';
        mote.style.boxShadow = '0 0 9px rgba(177,140,255,.55)';
      }
      intro.insertBefore(mote, intro.firstChild);
    }
  }

  // Komet sesekali melintas di latar.
  function launchComet(){
    if(!intro.isConnected || finished || reducedMotion) return;
    var comet = document.createElement('i');
    comet.className = 'comet';
    var width = window.innerWidth;
    var height = window.innerHeight;
    var fromLeft = Math.random() > .5;
    var x = fromLeft ? -50 : width * .2 + Math.random() * width * .8;
    var y = Math.random() * height * .68;
    var dx = fromLeft ? width * (.55 + Math.random()*.45) : -width * (.45 + Math.random()*.4);
    var dy = 25 + Math.random() * Math.min(160, height*.2);
    comet.style.left = x + 'px';
    comet.style.top = y + 'px';
    comet.style.setProperty('--tail', (55 + Math.random()*110) + 'px');
    intro.appendChild(comet);
    comet.animate([
      { transform:'translate(0,0)', opacity:0 },
      { transform:'translate('+(dx*.12)+'px,'+(dy*.12)+'px)', opacity:.9, offset:.12 },
      { transform:'translate('+dx+'px,'+dy+'px)', opacity:0 }
    ], { duration:950 + Math.random()*850, easing:'linear', fill:'forwards' })
      .onfinish = function(){ comet.remove(); };
    cometTimer = setTimeout(launchComet, 3800 + Math.random()*6200);
  }
  if(!finished && !reducedMotion) cometTimer = setTimeout(launchComet, 1500 + Math.random()*1800);

  // Ledakan partikel saat tombol inti ditekan.
  function burstParticles(){
    if(reducedMotion) return;
    var count = 96;
    for(var i=0;i<count;i++){
      var angle = Math.random() * Math.PI * 2;
      var distance = 110 + Math.random() * Math.min(390, window.innerWidth*.42);
      var dot = document.createElement('i');
      var isSpark = Math.random() > .78;
      dot.className = isSpark ? 'spark' : 'particle';
      var size = isSpark ? 6 + Math.random()*9 : 1.5 + Math.random()*3.5;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      intro.appendChild(dot);
      dot.animate([
        { transform:'translate(-50%,-50%) scale(.25) rotate(0deg)', opacity:0 },
        { transform:'translate(-50%,-50%) scale(1) rotate(45deg)', opacity:1, offset:.16 },
        { transform:'translate(calc(-50% + '+Math.cos(angle)*distance+'px),calc(-50% + '+Math.sin(angle)*distance+'px)) scale(0) rotate(190deg)', opacity:0 }
      ], {
        duration:720 + Math.random()*650,
        delay:Math.random()*100,
        easing:'cubic-bezier(.12,.8,.18,1)',
        fill:'forwards'
      }).onfinish = function(){ dot.remove(); };
    }
  }

  function finishIntro(){
    try{
      window.sessionStorage.setItem('portfolioIntroCompleted', 'true');
    }catch(error){
      console.error('Could not save the intro state to session storage.', error);
    }
    document.body.classList.remove('lock');
    document.body.classList.add('ready');
    window.scrollTo(0,0);
    if(intro && intro.isConnected){
      intro.animate([{opacity:1},{opacity:0}], {
        duration:reducedMotion ? 1 : 420,
        easing:'ease',
        fill:'forwards'
      }).onfinish = function(){ intro.remove(); };
    }
  }

  function enterPortfolio(){
    if(finished) return;
    finished = true;
    enterButton.disabled = true;
    if(cometTimer) clearTimeout(cometTimer);
    intro.classList.add('go');
    burstParticles();
    if(reducedMotion){
      finishIntro();
    } else {
      window.setTimeout(finishIntro, 880);
    }
  }

  // Hover di tengah emblem: pop-up kecil + glow.
  var portalSvg = document.querySelector('.portal-svg');
  if(portalSvg && !reducedMotion){
    var coreOn = function(){ if(!finished) portalSvg.classList.add('core-hover'); };
    var coreOff = function(){ portalSvg.classList.remove('core-hover'); };
    enterButton.addEventListener('pointerenter', coreOn);
    enterButton.addEventListener('pointerleave', coreOff);
    enterButton.addEventListener('focus', coreOn);
    enterButton.addEventListener('blur', coreOff);
  }

  enterButton.addEventListener('click', enterPortfolio);
  enterButton.addEventListener('keydown', function(event){
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      enterPortfolio();
    }
  });

  // Sedikit respons terhadap pointer tanpa mengganggu posisi tombol.
  if(!reducedMotion && window.matchMedia('(pointer:fine)').matches){
    intro.addEventListener('pointermove', function(event){
      if(finished) return;
      var rect = intro.getBoundingClientRect();
      var dx = (event.clientX - rect.width/2) / rect.width;
      var dy = (event.clientY - rect.height/2) / rect.height;
      portalStage.style.setProperty('--pointer-x', (dx*5) + 'px');
      portalStage.style.setProperty('--pointer-y', (dy*5) + 'px');
    }, { passive:true });
  }
})();
