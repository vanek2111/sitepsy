(() => {
 document.querySelectorAll('.faq-item').forEach((item,index)=>{
  const button=item.querySelector('.faq-question'),answer=item.querySelector('.faq-answer');
  if(!button||!answer)return;
  answer.id='faq-answer-'+index;button.setAttribute('aria-controls',answer.id);
  const sync=()=>answer.setAttribute('aria-hidden',String(!item.classList.contains('active')));
  sync();new MutationObserver(sync).observe(item,{attributes:true,attributeFilter:['class']});
 });
 let lastPlan='';
 document.querySelectorAll('.package-card').forEach(card=>{
  const link=card.querySelector('a[href="#form"]'),title=card.querySelector('h3')?.textContent;
  if(!link||!title)return;
  link.setAttribute('aria-label','Выбрать пакет: '+title);
  link.addEventListener('click',()=>{
   const field=document.querySelector('#client-request');if(!field)return;
   let value=field.value.trim();if(lastPlan)value=value.replace(lastPlan,'').trim();
   lastPlan='Интересует пакет консультаций: '+title+'.';
   field.value=(value?value+'\n\n':'')+lastPlan;
   field.dispatchEvent(new Event('input',{bubbles:true}));
  });
 });
})();