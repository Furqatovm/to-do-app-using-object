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
      "bg-primary",
      "text-white",
      "w-100",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "gap-5",
      "rounded-3",
      "p-2",
      "mb-1"
    );
    let date =new Date;
    div.innerHTML = `
      <span>${element.text}</span>
      <span>${date.getDate()}/${date.getHours()}:${date.getMinutes()}</span>
      <div class ="d-flex gap-4">
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


function removeData (valu, id){
    data =valu.filter((value) => value.id !==+id);
    addUI(data)
}


