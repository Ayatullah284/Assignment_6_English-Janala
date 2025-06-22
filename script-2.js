fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res=>res.json())
.then(result=>
    {
        // console.log(result)
        allBtn(result.data)
    }
)
const allCard =(data,id)=>{
    console.log(data, id)
    const all_card = document.getElementById("all-card")
    all_card.innerHTML=''
    for (let i = 0; i < data.length; i++) {
                            let div = document.createElement("div")
                            let div2 = document.createElement("div")
                            let btnInfo = document.createElement("button")
                            let btnVolume = document.createElement("button")
                            
                            div.classList.add("card", "bg-base-100", "w-10/12", "shadow-sm", "my-5", "drop-shadow-xl", "hover:bg-[#effafc]")
                            div2.classList.add("card-body", "grid", "grid-cols-2", "gap-x-80")
                            btnVolume.classList.add("bg-[#e7f5ff]", "p-4", "cursor-pointer")
                            div.innerHTML = `
                                                <figure>
                                                    <h6 class="font-bold pt-5 text-4xl">${data[i].word}</h6>
                                                </figure>
                                                <p class="font-normal pt-5 text-2xl">Meaning /Pronounciation</p>
                                                <p class="font-normal pt-5 text-2xl">${data[i].meaning} / ${data[i].pronunciation}</p>
                                                    
                                                        
                                                       
                                                        
                                                   
                                                `
                            btnInfo.innerHTML = `<button id="info-${data[i].id}" class="bg-[#e7f5ff] px-8 p-4 cursor-pointer">
                                                    
                                                </button>
                                
                            `
                            btnVolume.innerHTML = `
                                <i class="fa-solid fa-volume-high "></i>
                            `

                            btnInfo.addEventListener("click", function(){ 
                                    openModal(data[i])
                            })
                            

                            
                            div2.appendChild(btnInfo)
                            div2.appendChild(btnVolume)
                            div.appendChild(div2)
                            all_card.appendChild(div)              
                        }
    

    
}
const selectBtn = (id)=>{
    // console.log(id)
        const activeBtns = document.getElementsByClassName("active")
        for(const btn of activeBtns){
            btn.classList.remove("active")
        }
        const clickedBtn = document.getElementById(`btn-${id}`)  
        clickedBtn.classList.add("active")


        fetch(`https://openapi.programming-hero.com/api/level/${id}`)
            .then(res => res.json())
            .then(result => {           
                           
                allCard(result.data,id)
                // console.log(result.data)
            })
        
            
                        

          
       
}
const allBtn = (result)=>{
    let all_btn = document.getElementById("all-btn");
    for(const btn of result){
        // console.log(btn)
        let button = document.createElement("button")
        button.innerHTML = `<button id="btn-${btn.level_no}" class="outline-1 rounded-sm py-3 px-4 text-[#422AD5]
         hover:bg-[#8876f0] hover:text-white hover:outline-1 cursor-pointer mr-6  ;">
         <i class="fa-solid fa-book-open pr-2 "></i>Lesson - ${btn.level_no}</button>`
        button.addEventListener("click", function(){
            const lesson_select = document.getElementById('lesson_select')
            lesson_select.classList.add('hidden');
            selectBtn(btn.level_no)
        })
        all_btn.appendChild(button)
        
    }
    
    
}
