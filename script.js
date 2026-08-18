const lockScreen = document.getElementById("lockScreen");
const site = document.getElementById("site");
const nameInput = document.getElementById("nameInput");
const enterBtn = document.getElementById("enterBtn");
const errorMsg = document.getElementById("errorMsg");
const song = document.getElementById("loveSong");

function unlock(){
  const value = nameInput.value.trim().toLowerCase();
  if(value !== "sabry"){
    errorMsg.textContent = "الاسم مش ده 😄 جربي تاني.";
    nameInput.focus();
    return;
  }

  errorMsg.textContent = "";
  document.body.classList.remove("locked");
  lockScreen.classList.add("hidden");
  site.classList.remove("hidden");

  song.volume = 0.65;
  song.play().catch(() => {
    // Some browsers may still block audio. The user can tap the music card.
  });

  burstHearts(18);
  window.scrollTo({top:0, behavior:"smooth"});
}

enterBtn.addEventListener("click", unlock);
nameInput.addEventListener("keydown", e => {
  if(e.key === "Enter") unlock();
});

function burstHearts(count){
  for(let i=0;i<count;i++){
    setTimeout(() => createHeart(true), i*90);
  }
}
function createHeart(fromBurst=false){
  const h=document.createElement("span");
  h.className="float-heart";
  h.textContent=["♥","♡","❤","✦"][Math.floor(Math.random()*4)];
  h.style.right=(Math.random()*100)+"%";
  h.style.fontSize=(12+Math.random()*20)+"px";
  h.style.animationDuration=(5+Math.random()*5)+"s";
  h.style.color=["#ff6f9f","#ff9fc0","#ffd6a5","#ffffff"][Math.floor(Math.random()*4)];
  document.getElementById("hearts").appendChild(h);
  setTimeout(()=>h.remove(),11000);
}
setInterval(()=>{ if(!document.body.classList.contains("locked")) createHeart(); },900);

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

const content = {
  love: {
    title:"بحبك أوي أوي ♥",
    body:`يمكن الكلام بسيط، بس إحساسي ناحيتك مش بسيط خالص.

وجودك في حياتي بقى من الحاجات اللي بفرح بيها من غير ما أفكر. وكل مرة أفتكر فيها إن في حد اسمه شذا دخل حياتي، بحس إن الحكاية دي تستاهل تتحفظ.

ومهما حاولت أوصف، هيفضل جوايا كلام أكتر بكتير من اللي بعرف أقوله.`
  },
  tiktok:{
    title:"تيك توك علي الله حكايته 😂",
    body:`<p>القسم ده مخصوص للحاجات اللي بنشوفها ونقول: خلاص، دي لازم تتحط هنا 😂♥</p>
    <div class="video-placeholder">هنا هنحط فيديوهات أو روابط تيك توك اللي ليها حكاية بينا.<br><br>
    كل ما تلاقي فيديو تقول: "ده إحنا حرفيًا 😂"، ضيفيه هنا.</div>`
  },
  forever:{
    title:"إنتِ غالية عندي جدًا ∞",
    body:`في ناس وجودهم بيعدي، وفي ناس وجودهم بيسيب علامة.

وإنتِ من النوع التاني.

عشان كده الحكاية هنا مش مجرد صفحة على النت؛ دي مساحة صغيرة جمعت فيها شوية من الكلام اللي نفسي يفضل فاكرني بيكي.`
  },
  secret:{
    title:"سر صغير 🔐",
    body:`لو وصلتي للرسالة دي، فدي علامة إنك فضولية شوية 😂♥

السر؟

كل مرة أشوف حاجة تخليني أبتسم وأفتكر اسمك، بقول لنفسي: دي لازم تتحط في الحكاية.

فالحكاية لسه قابلة للزيادة...`
  },
  letter:{
    title:"جواب ليكي 💌",
    body:`يا شذا،

مش عايز أعمل جواب مثالي، عايزه يكون صادق.

أنا مبسوط إن في بينا حكاية تستاهل يتعمل لها موقع كامل، ومبسوط أكتر إن كل زر هنا وراه حاجة من اللي نفسي أقولهولك.

خدي وقتك واقري براحتك... واللي مكتوب هنا جزء صغير بس. ♥`
  },
  reasons:{
    title:"ليه بحبك؟ 🌷",
    body:`لأنك إنتِ.

لضحكتك، لطريقتك، للحاجات الصغيرة اللي يمكن إنتِ مش واخدة بالك منها.

بحب التفاصيل اللي بتخلي وجودك مختلف، وبحب إن مجرد ذكر اسمك ممكن يغير مود يوم كامل.`
  },
  memories:{
    title:"ذكرياتنا 📸",
    body:`هنا هنحط صورنا وذكرياتنا واحدة واحدة.

أول صورة، أول موقف، أول ضحكة، وأي لحظة نقول عليها: فاكرة اليوم ده؟

دي هتبقى صفحتنا اللي تكبر مع الوقت.`
  },
  promise:{
    title:"وعد مني 🤝",
    body:`أوعدك إني أحاول دايمًا أكون واضح، وأسمعك، وأقدّر مشاعرك.

ولو حصل اختلاف، يبقى هدفنا نفهم بعض مش نكسب على بعض.

الوعد الحقيقي مش كلام كبير؛ هو تصرفات صغيرة بتتكرر.`
  },
  night:{
    title:"رسالة آخر الليل 🌙",
    body:`لو بتقري الكلام ده بالليل، فخدي نفس عميق وافتكري إن بكرة يوم جديد.

ومهما كان يومك، أتمنى تنامي وإنتِ عارفة إن في حد بيتمنى لك الخير والراحة والضحكة الحلوة. ♥`
  },
  future:{
    title:"بكرة بتاعنا ✨",
    body:`مش لازم نعرف كل حاجة هتحصل.

يكفينا إننا نسيب للحياة مساحة للمفاجآت، ونحتفظ باللحظات الحلوة اللي حصلت فعلًا.

والحكاية دي؟ لسه ممكن نكتب فيها فصول كتير.`
  },
  video:{
    title:"فيديوهات حب 🎬",
    body:`<div class="video-placeholder">هنا هنضيف الفيديوهات اللي تختارها.<br><br>بعد ما ترفع الفيديوهات على المشروع، نقدر نحطها هنا كـ cards أو مشغل فيديو داخل الصفحة.</div>`
  },
  music:{
    title:"أول الحكايات 🎵",
    body:`<p>الأغنية شغالة من لحظة الدخول ♥</p><button id="playSongAgain" class="main-btn">شغّلي الأغنية تاني 🎵</button>`
  },
  photos:{
    title:"ألبوم الصور 🖼️",
    body:`<div class="video-placeholder">هنا نقدر نضيف ألبوم صور كامل، وكل صورة تظهر في نافذة جميلة عند الضغط عليها.</div>`
  }
};

document.querySelectorAll("[data-modal]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const key=btn.dataset.modal;
    const item=content[key];
    modalContent.innerHTML=`<h2>${item.title}</h2><div class="letter">${item.body}</div>`;
    modal.classList.remove("hidden");

    const replay=document.getElementById("playSongAgain");
    if(replay) replay.onclick=()=>song.play().catch(()=>{});
  });
});

function closeMainModal(){modal.classList.add("hidden")}
closeModal.addEventListener("click",closeMainModal);
modal.querySelector(".modal-backdrop").addEventListener("click",closeMainModal);

document.getElementById("topBtn").addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

/* Mini game */
const gameModal=document.getElementById("gameModal");
const gameContent=document.getElementById("gameContent");
const closeGame=document.getElementById("closeGame");

const questions=[
  {q:"إيه أكتر حاجة مهمة في أي علاقة؟", a:["الاهتمام","الفهم","الضحك","كل دول ♥"], correct:3},
  {q:"لو يومنا كان أغنية، نختار إيه؟", a:["أغنية هادية","أغنية فرحانة","أغنية من ذكرياتنا","المهم نسمعها سوا"], correct:3},
  {q:"إيه أحلى نوع مفاجآت؟", a:["رسالة","صورة","خروجة","حاجة بسيطة من القلب"], correct:3},
  {q:"لو عندنا يوم فاضي، نعمل إيه؟", a:["نتكلم كتير","نضحك","نصور","أي حاجة طالما اليوم حلو"], correct:3},
  {q:"آخر سؤال... مين كسب اللعبة؟", a:["Sabry","Shaza","الاتنين","الحب ♥"], correct:3}
];
let qIndex=0, score=0;

function renderQuestion(){
  if(qIndex>=questions.length){
    gameContent.innerHTML=`
      <div class="score">
        <div style="font-size:55px">🏆♥</div>
        <h2>خلصت اللعبة!</h2>
        <p>النتيجة: ${score} / ${questions.length}</p>
        <p>والحقيقة إن أحلى نتيجة هي إننا ضحكنا شوية مع بعض 😄</p>
        <button id="restartGame" class="main-btn">نلعب تاني</button>
      </div>`;
    document.getElementById("restartGame").onclick=()=>{
      qIndex=0;score=0;renderQuestion();
    };
    return;
  }

  const item=questions[qIndex];
  gameContent.innerHTML=`
    <span class="game-badge">السؤال ${qIndex+1} من ${questions.length}</span>
    <div class="game-question">${item.q}</div>
    <div class="answer-list">
      ${item.a.map((x,i)=>`<button class="answer" data-answer="${i}">${x}</button>`).join("")}
    </div>`;
  gameContent.querySelectorAll(".answer").forEach(btn=>{
    btn.onclick=()=>{
      if(Number(btn.dataset.answer)===item.correct) score++;
      qIndex++;
      renderQuestion();
    };
  });
}

document.getElementById("startGame").onclick=()=>{
  qIndex=0;score=0;renderQuestion();gameModal.classList.remove("hidden");
};
closeGame.onclick=()=>gameModal.classList.add("hidden");
gameModal.querySelector(".modal-backdrop").addEventListener("click",()=>gameModal.classList.add("hidden"));
