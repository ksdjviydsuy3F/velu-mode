(()=>{
 const hero=document.querySelector('.floating-experience'), scene=hero?.querySelector('.floating-scene'), link=hero?.querySelector('.discover-link'), catalog=document.querySelector('#catalog');
 if(!hero||!scene||!link||!catalog)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const reset=()=>{scene.style.setProperty('--rx','0deg');scene.style.setProperty('--ry','0deg');scene.style.setProperty('--sx','0px');scene.style.setProperty('--sy','0px')};
 scene.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch')return;const r=scene.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;scene.style.setProperty('--rx',`${-y*7}deg`);scene.style.setProperty('--ry',`${x*9}deg`);scene.style.setProperty('--sx',`${-x*10}px`);scene.style.setProperty('--sy',`${-y*4}px`)});
 scene.addEventListener('pointerleave',reset);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>hero.classList.toggle('scene-hidden',!entries[0].isIntersecting),{threshold:0}).observe(hero);
 let timer; link.addEventListener('click',event=>{if(reduced.matches||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();if(timer)return;hero.classList.add('departing');timer=setTimeout(()=>{history.pushState(null,'','#catalog');catalog.scrollIntoView({behavior:'smooth'});setTimeout(()=>{hero.classList.remove('departing');timer=null},800)},650)});
})();
