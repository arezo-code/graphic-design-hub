const conversations = {
  sara: {name:"Sara Ahmadi", initials:"SA", color:"pink", status:"Online now", messages:[
    {from:"in",text:"Hey! How is your UI/UX assignment going?",time:"10:35 AM"},
    {from:"out",text:"Hi Sara! It’s going well. I’m working on the colors and layout now.",time:"10:38 AM"},
    {from:"in",text:"I shared the color palette with you. Maybe it can help! 🎨",time:"10:42 AM"},
    {from:"file",text:"Color-Palette.png",time:"PNG image · 1.8 MB"},
    {from:"out",text:"This is perfect, thank you so much! 💜",time:"10:44 AM"}
  ]},
  group: {name:"Design Study Group", initials:"", color:"blue", status:"4 members · Group chat", messages:[
    {from:"in",text:"Welcome to our design study group! Share your ideas and questions here.",time:"Yesterday"},
    {from:"out",text:"I’m excited to learn and practice with everyone.",time:"Yesterday"},
    {from:"in",text:"Mina: Great work everyone! Let’s keep sharing feedback. ✨",time:"Yesterday"}
  ]},
  mina: {name:"Mina Rahimi", initials:"MR", color:"purple", status:"Last seen yesterday", messages:[
    {from:"in",text:"I looked at your latest design. The spacing looks much better!",time:"Yesterday"},
    {from:"out",text:"Thank you for your feedback 😊 I’m still improving the typography.",time:"Yesterday"}
  ]},
  ahmad: {name:"Ahmad Noori", initials:"AN", color:"green", status:"Last seen Monday", messages:[
    {from:"in",text:"Can you send me the assignment?",time:"Monday"},
    {from:"out",text:"Sure, I’ll share the instructions with you shortly.",time:"Monday"}
  ]}
};
let activeChat = "sara";
let unreadOnly = false;
const $ = id => document.getElementById(id);
const messagesEl = $("messages");
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);}
function renderMessages(chatKey){
  const chat=conversations[chatKey]; messagesEl.innerHTML='<div class="day-divider"><span>Conversation</span></div>';
  chat.messages.forEach(m=>{
    if(m.from==="file"){
      const row=document.createElement("div");row.className="file-message";
      row.innerHTML='<span class="file-icon"><i class="fa-solid fa-file-image"></i></span><span><strong></strong><small></small></span><button class="icon-btn light" aria-label="Download file"><i class="fa-solid fa-download"></i></button>';
      row.querySelector("strong").textContent=m.text;row.querySelector("small").textContent=m.time;
      row.querySelector("button").addEventListener("click",()=>showToast("File preview is a demo in this sample."));
      messagesEl.appendChild(row);return;
    }
    const row=document.createElement("div");row.className="message-row "+(m.from==="out"?"outgoing":"incoming");
    if(m.from==="in"){const av=document.createElement("span");av.className="mini-avatar "+chat.color;av.textContent=chat.initials||"DS";row.appendChild(av);}
    const wrap=document.createElement("div");const bubble=document.createElement("div");bubble.className="bubble";bubble.textContent=m.text;wrap.appendChild(bubble);
    const time=document.createElement("time");time.textContent=m.time;if(m.from==="out")time.innerHTML+=' <i class="fa-solid fa-check-double read"></i>';wrap.appendChild(time);row.appendChild(wrap);messagesEl.appendChild(row);
  });messagesEl.scrollTop=messagesEl.scrollHeight;
}
function setActive(key){
  activeChat=key;const c=conversations[key];
  $("activeName").textContent=c.name;$("detailsName").textContent=c.name;$("activeStatus").textContent=c.status;
  $("activeAvatar").className="avatar large "+c.color;$("activeAvatar").textContent=c.initials||"DS";
  $("detailsAvatar").className="avatar xl "+c.color;$("detailsAvatar").textContent=c.initials||"DS";
  $("activeAvatar").innerHTML=(c.initials||'<i class="fa-solid fa-users"></i>')+'<span class="online"></span>';
  $("detailsAvatar").textContent=c.initials||"DS";
  document.querySelectorAll(".conversation").forEach(b=>b.classList.toggle("selected",b.dataset.chat===key));
  const selected=document.querySelector('.conversation[data-chat="'+key+'"]');if(selected){selected.dataset.unread="false";selected.querySelector(".unread-dot")?.remove();}
  renderMessages(key);
}
document.querySelectorAll(".conversation").forEach(button=>button.addEventListener("click",()=>setActive(button.dataset.chat)));
function filterConversations(){
  const q=$("chatSearch").value.toLowerCase().trim();
  document.querySelectorAll(".conversation").forEach(b=>{
    const matches=b.dataset.name.includes(q);const unread=!unreadOnly||b.dataset.unread==="true";
    b.style.display=matches&&unread?"flex":"none";
  });
}
$("chatSearch").addEventListener("input",filterConversations);
document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===tab));
  unreadOnly=tab.dataset.tab==="unread";filterConversations();
}));
$("filterBtn").addEventListener("click",()=>{unreadOnly=!unreadOnly;filterConversations();showToast(unreadOnly?"Showing unread conversations":"Showing all conversations");});
$("messageForm").addEventListener("submit",e=>{
  e.preventDefault();const input=$("messageInput");const value=input.value.trim();if(!value)return;
  const now=new Date();const time=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  conversations[activeChat].messages.push({from:"out",text:value,time});renderMessages(activeChat);input.value="";
});
$("attachBtn").addEventListener("click",()=>$("fileInput").click());
$("fileInput").addEventListener("change",e=>{const file=e.target.files[0];if(file){showToast("Selected: "+file.name+" (demo only)");e.target.value="";}});
$("emojiBtn").addEventListener("click",()=>{$("messageInput").value+=" 😊";$("messageInput").focus();});
$("newChatBtn").addEventListener("click",()=>showToast("To start a new chat, select a student from the conversation list."));
$("viewProfile").addEventListener("click",()=>showToast("Profile preview for "+conversations[activeChat].name));
$("muteChat").addEventListener("click",e=>{const btn=e.currentTarget;const muted=btn.dataset.muted!=="true";btn.dataset.muted=String(muted);btn.innerHTML='<i class="fa-regular fa-bell-slash"></i> '+(muted?"Unmute notifications":"Mute notifications")+' <i class="fa-solid fa-chevron-right"></i>';showToast(muted?"Notifications muted for this demo":"Notifications unmuted");});
$("globalSearch").addEventListener("input",e=>{if(e.target.value.trim()){$("chatSearch").value=e.target.value;filterConversations();}});
$("menuToggle").addEventListener("click",()=>{if(window.innerWidth<=620){document.querySelector(".chat-shell").classList.toggle("show-list");}else{document.querySelector(".sidebar").classList.toggle("collapsed");showToast("Menu toggle is available in this layout.");}});
document.querySelector(".help-btn").addEventListener("click",()=>showToast("Need help? Contact your course administrator."));
renderMessages(activeChat);
