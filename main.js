let form = document.getElementById("form");
let lists = document.getElementById("lists");
let none = document.getElementById("none");
let done =document.getElementById("done");
let wrapAll =document.getElementById("bos")

let data = [];
// let text = document.getElementById("text");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = form.text.value;
  if (value.trim() === "") {
    none.classList.remove("d-none");
  } else {
    data = [...data, { id: Date.now(), text: value, Done:false}];
    form.text.value = "";
    addUI(data);
    none.classList.add("d-none");
  }
  // console.log(form.name.value);
  // console.log(data);
});

// click dblclick submit

function addUI(data) {
  lists.innerHTML = "";
  done.innerHTML = "";
  data.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add(
      "w-100",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "gap-5",
      "rounded-3",
      "p-2",
      "mb-1",
      "uniquee"
    );
    let date =new Date;
    div.innerHTML = `
      <span>${element.text}</span>
      <span class="soat">${date.getDate()}/${date.getHours()}:${date.getMinutes()}</span>
      <div class ="d-flex gap-4">
        <i id="${element.id}" class="fa-solid fa-pen"></i>
        <i id="${element.id}" class="fa-solid fa-check"></i>
        <i id="${element.id}" class="fa-solid fa-trash-can"></i>
      </div>
    `;
    if (element.Done){
        done.prepend(div);
    } else{
        lists.prepend(div);
    }

    
  });
}



wrapAll.addEventListener("click", (e) => {
    let target =e.target;
    if (target.classList.contains("fa-trash-can")){
        let id =target.id;

        removeData(data, id)
    }
})

wrapAll.addEventListener('click', (e) =>{
    let target2 =e.target;
    if (target2.classList.contains("fa-check")){
        let id2 =target2.id;
        data =data.map((value) =>{
            if(value.id ==+id2){
                return {...value, Done:true};
            }
            return value
        })
        addUI(data);
    }
})


wrapAll.addEventListener("click", (e) => {
    let pTarget =e.target;
    if(pTarget.classList.contains("fa-pen")){
        let pid =pTarget.id;
        form.edit.classList.remove("d-none");
        form.text.classList.add("d-none");
        let tugma =document.getElementById("tugma");
        tugma.textContent ="Edit";
            tugma.onclick =()=> {
            let matn =form.edit.value;
            none.classList.add("d-none");
            if(matn !==""){
                let obj = data.find((ele) => ele.id == +pid); 
                if(obj){
                    obj.text =matn
                }
            }else{
                none.classList.remove("d-none");
            };
            form.edit.value ="";
            form.edit.classList.add("d-none");
            form.text.classList.remove("d-none");
            tugma.textContent ="Jo'natish"
            addUI(data);
                };
            };

})



function removeData (valu, id){
    data =valu.filter((value) => value.id !==+id);
    addUI(data)
}

