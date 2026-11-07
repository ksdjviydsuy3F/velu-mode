(()=>{
 const scene=document.querySelector('.necklace-stage'), hero=document.querySelector('.cinematic'), link=hero?.querySelector('a[href="#catalog"]');
 if(!scene||!hero||!link)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(matchMedia('(hover: hover) and (pointer: fine)').matches){
  scene.addEventListener('pointermove',e=>{if(motion.matches)return;const r=scene.getBoundingClientRect();scene.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*10}deg`);scene.style.setProperty('--rx',`${(.5-(e.clientY-r.top)/r.height)*8}deg`)});
  scene.addEventListener('pointerleave',()=>{scene.style.setProperty('--rx','0deg');scene.style.setProperty('--ry','0deg')});
 }
 let timer;link.addEventListener('click',e=>{if(motion.matches)return;e.preventDefault();clearTimeout(timer);hero.classList.add('is-departing');timer=setTimeout(()=>{document.querySelector('#catalog').scrollIntoView({behavior:'smooth'});history.replaceState(null,'','#catalog');setTimeout(()=>hero.classList.remove('is-departing'),900)},650)});
 const observer=new IntersectionObserver(entries=>hero.classList.toggle('scene-offscreen',!entries[0].isIntersecting),{threshold:0});observer.observe(hero);
})();
