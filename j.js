const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const bars = document.querySelectorAll('.bar');
const barIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('on'); });
},{threshold:.4});
bars.forEach(b=>barIo.observe(b));

// animated count-up for stat numbers
const counters = document.querySelectorAll('[data-count]');
const countIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const start = performance.now();
    const dur = 1100;
    function tick(now){
      const p = Math.min((now-start)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(eased*target) + '%';
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countIo.unobserve(el);
  });
},{threshold:.6});
counters.forEach(c=>countIo.observe(c));