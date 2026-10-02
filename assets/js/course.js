/* =========================================================
   تنظیمات اصلی این درس
   1) PASSWORD را به رمز واقعی درس تغییر دهید.
   2) لینک PDF و آپارات هر جلسه را در همین فایل وارد کنید.
   3) keywords را پس از بررسی PDFها تکمیل/اصلاح کنید.
   ========================================================= */

const PASSWORD = "1234"; // <-- رمز ورود همین درس

const lessons = [
  {id:1, title:"جلسه اول", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_01", video:"APARAT_LINK_SESSION_01"},
  {id:2, title:"جلسه دوم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_02", video:"APARAT_LINK_SESSION_02"},
  {id:3, title:"جلسه سوم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_03", video:"APARAT_LINK_SESSION_03"},
  {id:4, title:"جلسه چهارم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_04", video:"APARAT_LINK_SESSION_04"},
  {id:5, title:"جلسه پنجم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_05", video:"APARAT_LINK_SESSION_05"},
  {id:6, title:"جلسه ششم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_06", video:"APARAT_LINK_SESSION_06"},
  {id:7, title:"جلسه هفتم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_07", video:"APARAT_LINK_SESSION_07"},
  {id:8, title:"جلسه هشتم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_08", video:"APARAT_LINK_SESSION_08"},
  {id:9, title:"جلسه نهم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_09", video:"APARAT_LINK_SESSION_09"},
  {id:10, title:"جلسه دهم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_10", video:"APARAT_LINK_SESSION_10"},
  {id:11, title:"جلسه یازدهم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_11", video:"APARAT_LINK_SESSION_11"},
  {id:12, title:"جلسه دوازدهم", topic:"عنوان واقعی جلسه", keywords:["کلیدواژه ۱","کلیدواژه ۲","کلیدواژه ۳"], pdf:"PDF_LINK_SESSION_12", video:"APARAT_LINK_SESSION_12"}
];

const gate = document.getElementById("gate");
const content = document.getElementById("content");
const form = document.getElementById("loginForm");
const password = document.getElementById("password");
const error = document.getElementById("loginError");
const toggle = document.getElementById("togglePassword");
const search = document.getElementById("search");
const lessonsBox = document.getElementById("lessons");
const empty = document.getElementById("empty");

function showContent(){
  gate.hidden = true;
  content.hidden = false;
  renderLessons();
}
function logout(){
  sessionStorage.removeItem("course_access");
  location.reload();
}
if(sessionStorage.getItem("course_access") === "ok") showContent();

form?.addEventListener("submit", e=>{
  e.preventDefault();
  if(password.value === PASSWORD){
    sessionStorage.setItem("course_access","ok");
    showContent();
  } else {
    error.hidden = false;
    password.focus();
  }
});
toggle?.addEventListener("click", ()=>{
  password.type = password.type === "password" ? "text" : "password";
});
document.getElementById("logout")?.addEventListener("click", logout);

function isPlaceholder(v){
  return !v || v.startsWith("PDF_LINK_") || v.startsWith("APARAT_LINK_");
}
function renderLessons(q=""){
  const query = q.trim().toLowerCase();
  const rows = lessons.filter(x => (`${x.title} ${x.topic} ${x.keywords.join(" ")}`).toLowerCase().includes(query));
  lessonsBox.innerHTML = rows.map(x => {
    const pdf = isPlaceholder(x.pdf) ? "#" : x.pdf;
    const video = isPlaceholder(x.video) ? "#" : x.video;
    return `<article class="lesson">
      <div class="lesson-no">${String(x.id).padStart(2,"۰")}</div>
      <div class="lesson-info">
        <h3>${x.title}</h3>
        <p>${x.topic}</p>
        <div class="keywords">${x.keywords.map(k=>`<span>${k}</span>`).join("")}</div>
      </div>
      <div class="lesson-actions">
        <a class="resource pdf ${pdf==="#"?"disabled":""}" href="${pdf}" ${pdf!="#"?'target="_blank" rel="noopener"':''}>▣ <span>جزوه PDF</span></a>
        <a class="resource video ${video==="#"?"disabled":""}" href="${video}" ${video!="#"?'target="_blank" rel="noopener"':''}>▶ <span>ویدئو</span></a>
      </div>
    </article>`;
  }).join("");
  empty.hidden = rows.length !== 0;
}
search?.addEventListener("input", e=>renderLessons(e.target.value));
