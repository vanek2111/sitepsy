(() => {
 const phrases={
  unclear:'Здравствуйте, Елизавета. Хотелось бы записаться на консультацию, но пока трудно сформулировать запрос.',
  situation:'Здравствуйте, Елизавета. Хотелось бы записаться на консультацию и обсудить конкретную ситуацию.',
  question:'Здравствуйте, Елизавета. Прежде чем записаться, хотелось бы уточнить, как проходит консультация.'
 };
 let selected='unclear';
 document.querySelectorAll('[data-phrase]').forEach(button=>button.addEventListener('click',()=>{
  selected=button.dataset.phrase;
  document.querySelectorAll('[data-phrase]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
  document.querySelector('#phrase-text').textContent=phrases[selected];
 }));
 document.querySelector('#use-phrase').addEventListener('click',()=>{
  const request=document.querySelector('#client-request');
  const current=request.value.trim(),phrase=phrases[selected];
  if(!current)request.value=phrase;
  else if(!current.includes(phrase))request.value=current+'\n\n'+phrase;
  request.dispatchEvent(new Event('input',{bubbles:true}));
  let note=document.querySelector('#request-note');
  if(!note){note=document.createElement('p');note.id='request-note';note.className='request-note';note.setAttribute('role','status');document.querySelector('#zayavka').prepend(note)}
  note.textContent='Первая фраза добавлена в поле «Что вас беспокоит?». Её можно изменить или удалить перед отправкой.';
  document.querySelector('#form').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
  request.focus({preventScroll:true});
 });
})();

// Local background media: opt-out, mobile source, reduced motion and tab visibility.
(() => {
 const video=document.getElementById('quiet-hero-video');
 const button=document.getElementById('quiet-video-toggle');
 const layer=document.querySelector('.hero-film');
 const hero=document.querySelector('.hero-with-film');
 if(!video||!button)return;
 const mobile=matchMedia('(max-width:700px)');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 let optedOut=reduced.matches||Boolean(connection?.saveData),inView=true,loadFailed=false;
 video.muted=true;video.defaultMuted=true;
 function setLabel(playing){button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',playing?'Остановить фоновое видео':'Включить фоновое видео');button.querySelector('.film-control-text').textContent=playing?'Остановить видео':'Включить видео';button.querySelector('.film-control-icon').textContent=playing?'Ⅱ':'▶';layer.classList.toggle('is-playing',playing)}
 function loadSource(){const source=mobile.matches?'media/curtain-mobile.mp4':'media/curtain-desktop.mp4';if(video.getAttribute('src')!==source){video.src=source;video.load()}}
 async function play(){if(loadFailed)return;loadSource();try{await video.play()}catch{setLabel(false)}}
 video.addEventListener('playing',()=>{layer.classList.add('is-ready');setLabel(true)});
 video.addEventListener('pause',()=>{setLabel(false);layer.classList.remove('is-playing')});
 video.addEventListener('error',()=>{loadFailed=true;layer.classList.remove('is-ready','is-playing');setLabel(false);button.hidden=true});
 button.addEventListener('click',()=>{if(!video.paused){optedOut=true;video.pause()}else{optedOut=false;play()}});
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView)video.pause();else if(!optedOut&&!document.hidden)play()},{threshold:.05}).observe(hero);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(!optedOut&&inView)play()});
 reduced.addEventListener('change',event=>{if(event.matches){optedOut=true;video.pause()}});
 mobile.addEventListener('change',()=>{if(!optedOut&&inView&&!document.hidden)play()});
})();
