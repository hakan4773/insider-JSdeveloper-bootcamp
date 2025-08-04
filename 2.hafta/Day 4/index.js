const addbutton = document.getElementById("add");
const baslikInput = document.getElementById("baslik");
const aciklamaInput = document.getElementById("aciklama");
const taskDiv = document.querySelector(".todo-list");
const showCompleted = document.getElementById("show-completed");
const sortTask=document.getElementById("sort-priority");

//checbox değeri değişince
taskDiv.addEventListener("change",function(e){
       if (e.target.type === "checkbox") {
         e.stopPropagation();
        const text=e.target.nextElementSibling;
        text.textContent = e.target.checked ? 'Tamamlandı' : 'Bekliyor';
        const task = e.target.closest(".task");
        task.classList.toggle("completed", e.target.checked);

    }
})
//sadece tamamlanan görevleri listeleme
showCompleted.addEventListener("click",function(e){
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task=>{
     const checkbox = task.querySelector('input[type="checkbox"]');
    checkbox.checked ?  task.classList.remove("hidden-task") : task.classList.add("hidden-task");;
  })
});

//Sıralama
sortTask.addEventListener("change",function(){
  const sortValue = this.value;
  const container = document.querySelector('.todo-list');
  const tasks=Array.from(container.children)

  tasks.sort((a,b)=>{
  const priority={'dusuk':1,'orta':2,'yuksek':3};
   
  const aPriority=a.querySelector(".priority").classList[1];
  const bPriority=b.querySelector(".priority").classList[1];

  if(sortValue==="asc"){
return priority[aPriority]-priority[bPriority];
  }
else {
return priority[bPriority]-priority[aPriority];
}
  })

 taskDiv.innerHTML = "";
  tasks.forEach(task => taskDiv.appendChild(task));

});

//yeni görev ekleme işlemi
addbutton.addEventListener("click", function () {
  try {
    const baslik = baslikInput.value.trim();
    const aciklama = aciklamaInput.value.trim();
    const oncelikRadio =document.querySelector('input[name="zorluk"]:checked');

    if (!baslik) {
      alert("Başlıksız görev eklenemez.");
      return;
    }
    if (!oncelikRadio) {
    alert("Öncelik seçilmeli.");
    return;
    }    
    const oncelik = oncelikRadio.value;
   
    const gorevDiv = document.createElement("div");
    gorevDiv.className = "task";
     

    gorevDiv.innerHTML = `
    <p class="baslik">${baslik}</p>
        ${aciklama ? `<p class="task-desc">${aciklama}</p>` : '<p class="task-desc"></p>'}
        <span class="priority ${oncelik}">${oncelik.toUpperCase()}</span>
        <div class="status">
          <input type="checkbox">
          <span>Bekliyor</span>
        </div>
        <button class="delete-btn">Sil</button>
    `;
    taskDiv.appendChild(gorevDiv);

    //inputları temizleme
    document.getElementById("baslik").value = "";
    document.getElementById("aciklama").value = "";
  } catch (error) {
    alert("Bir hata oluştu");
  }
});

//silme işlemi
taskDiv.addEventListener('click', function(e) {
  if(e.target.classList.contains('delete-btn')) {
    if(confirm('Bu görevi silmek istediğinize emin misiniz?')) {
      e.target.closest('.task').remove();
    }
  }
});