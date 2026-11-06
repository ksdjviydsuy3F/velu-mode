(()=>{
 const canvas=document.querySelector('#jewel-canvas'); if(!canvas)return;
 const ctx=canvas.getContext('2d'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let w=0,h=0,dpr=1,mouse={x:0,y:0},start=performance.now();
 const particles=Array.from({length:1600},(_,i)=>{let t=i/1600*Math.PI*2, chain=i<1050, a=chain?Math.PI*.09+(i/1050)*Math.PI*.82:t, jitter=(Math.random()-.5);return {x:chain?Math.cos(a)*.31:jitter*.65,y:chain?Math.sin(a)*.25-.19:(Math.random()-.5)*.65,z:Math.random(),sx:Math.random(),sy:Math.random(),size:.4+Math.random()*1.7,chain};});
 function resize(){dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
 addEventListener('resize',resize);resize();
 canvas.parentElement.addEventListener('pointermove',e=>{let r=canvas.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width-.5;mouse.y=(e.clientY-r.top)/r.height-.5});
 function frame(now){const time=(now-start)/1000,assemble=reduced?1:Math.min(1,time/5),scroll=Math.min(1,scrollY/Math.max(h,1)),scale=Math.min(w,h)*1.15;ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.52;
  for(const p of particles){let shimmer=.45+.55*Math.sin(time*.7+p.z*20)**2,tx=cx+(p.x+mouse.x*.025)*scale,ty=cy+(p.y+mouse.y*.025)*scale;let drift=(1-assemble)+scroll*.8;let x=tx+(p.sx-.5)*w*drift+Math.sin(time*.4+p.z*9)*5,y=ty+(p.sy-.5)*h*drift+Math.cos(time*.35+p.z*13)*5;ctx.fillStyle=`rgba(216,197,165,${(p.chain?.7:.3)*shimmer})`;ctx.beginPath();ctx.arc(x,y,p.size*(p.chain?1.15:.7),0,7);ctx.fill()}
  if(assemble>.65){ctx.save();ctx.globalAlpha=(assemble-.65)/.35*(1-scroll);ctx.translate(cx+mouse.x*15,cy+mouse.y*15);ctx.scale(1+mouse.x*.04,1);let gradient=ctx.createLinearGradient(-scale*.3,0,scale*.3,0);gradient.addColorStop(0,'#A68B62');gradient.addColorStop(.5,'#F5F0E8');gradient.addColorStop(1,'#A68B62');ctx.strokeStyle=gradient;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-scale*.19,scale*.31,scale*.25,0,Math.PI*.09,Math.PI*.91);ctx.stroke();for(let i=-3;i<=3;i++){let x=i*scale*.045,y=scale*.057-Math.abs(i)*scale*.006;let g=ctx.createRadialGradient(x-3,y-4,1,x,y,scale*.016);g.addColorStop(0,'#FFFFFF');g.addColorStop(.48,'#F5F0E8');g.addColorStop(1,'#A68B62');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,scale*.014,0,7);ctx.fill()}ctx.restore()}
  if(!reduced)requestAnimationFrame(frame)
 }requestAnimationFrame(frame)
})();
