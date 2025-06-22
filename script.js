fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res=>res.json())
.then(result=>
    {
        // console.log(result)
        allBtn(result.data)
    }
)
const selectBtn = (id)=>{
        const activeBtns = document.getElementsByClassName("active")
        for(const btn of activeBtns){
            btn.classList.remove("active")
        }
        const clickedBtn = document.getElementById(`btn-${id}`)  
        clickedBtn.classList.add("active")


        fetch(`https://openapi.programming-hero.com/api/level/${id}`)
            .then(res => res.json())
            .then(result => {           
                           
                allCard(result.data)
            })
        
            
                        

            const allCard = (data) => {
                // console.log(data)
                if (!data.length == 0) {
                    const all_card = document.getElementById("all-card")
                    const openModal = (x)=>{
                        // console.log(x)
                        const info_Id = document.getElementById(`info-${x.id}`)
                        const div = document.createElement('div')


                        fetch(`https://openapi.programming-hero.com/api/word/${x.id}`)
                            .then(res=>res.json())
                            .then(d => {
                                console.log(x.id)
                                console.log(d.data.id)

                            div.innerHTML = `
                            <!-- Open the modal using ID.showModal() method -->
                                <button class="btn" onclick="my_modal_5.showModal()"></button>
                                <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                                <div class="modal-box rounded-lg">
                                    <h3 class="text-3xl font-bold">Meaning</h3>
                                    <p class="py-2 text-xl mb-3">${d.data.meaning}</p>
                                    <h3 class="text-3xl font-bold">Example</h3>
                                    <p class="py-2 text-xl mb-3">${d.data.sentence}</p>
                                    <h3 class="text-3xl font-bold">সমার্থক শব্দ গুলো</h3>
                                    <div class="grid grid-cols-3 gap-5 cursor-pointer mt-2">
                                        <button class="py-4 bg-[#edf7ff] rounded text-xl cursor-pointer">${d.data.synonyms[0]}</button>
                                        <button class="py-4 bg-[#edf7ff] rounded text-xl cursor-pointer">${d.data.synonyms[1]}</button>
                                        <button class="py-4 bg-[#edf7ff] rounded text-xl cursor-pointer">${d.data.synonyms[2]}</button>
                                    </div>
                                    
                                    <div class="modal-action">
                                    <form method="dialog">
                                        <!-- if there is a button in form, it will close the modal -->
                                        <button class="outline-1 rounded-sm py-3 px-4 text-[#422AD5] hover:text-white hover:bg-[#422ad8] hover:outline-1 cursor-pointer mr-6">Complete Learning</button>
                                    </form>
                                    </div>
                                </div>
                                </dialog>

                                `
                        
                                })
                            
                        info_Id.append(div)
                    }

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
                        const empty = document.getElementById("empty")
                        empty.classList.add("hidden")
                }else if(data.length == 0){

                    const empty = document.getElementById("empty")
                    const div = document.createElement("div")

                    div.innerHTML = `
                            <div class="bg-[#ededed] py-15 my-10 rounded-lg">
                                <img class="mx-auto pb-5" src="./B11-A6-English-Janala/assets/empty.png" alt="">
                                <p class="text-[#777472]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                <p class="text-3xl font-bold mt-2 text-[#292524]">নেক্সট Lesson এ যান</p>
                            </div>
                    `
                    empty.appendChild(div)
                    
                }
                
                    
            
        }
       
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
