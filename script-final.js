// fetch("https://openapi.programming-hero.com/api/levels/all")
//     .then(res => res.json())
//     .then(result => {
//         allBtn(result.data);
//     });


// const allBtn = (result) => {
//     let all_btn = document.getElementById("all-btn");
//     for (const btn of result) {
//         let button = document.createElement("button");
//         button.id = `btn-${btn.level_no}`;
//         button.className = "outline-1 rounded-sm py-3 px-4 text-[#422AD5] hover:bg-[#8876f0] hover:text-white hover:outline-1 cursor-pointer mr-6";
//         button.innerHTML = `<i class="fa-solid fa-book-open pr-2"></i>Lesson - ${btn.level_no}`;

//         button.addEventListener("click", function () {
//             selectBtn(btn.level_no);
//         });

//         all_btn.appendChild(button);
//     }
// };



const selectBtn = (id) => {
    const activeBtns = document.getElementsByClassName("active");
    for (const btn of activeBtns) {
        btn.classList.remove("active");
    }

    const clickedBtn = document.getElementById(`btn-${id}`);
    clickedBtn.classList.add("active");

    document.getElementById("spinner").classList.remove("hidden");

    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(result => {
            allCard(result.data, id);


            document.getElementById("spinner").classList.add("hidden");

        });



document.getElementById("lesson_select").classList.add("hidden");

};



const allCard = (data, id) => {
    const all_card = document.getElementById("all-card");
    all_card.innerHTML = ''; 
    const empty_div = document.getElementById("empty");
    empty_div.innerHTML = ''; 
    const lesson_select = document.getElementById("lesson_select");

    empty_div.classList.remove("hidden");

    if (data.length !== 0) {
        data.forEach(word => {
            const div = document.createElement("div");
            const div2 = document.createElement("div");
            const btnInfo = document.createElement("button");
            const btnVolume = document.createElement("button");

            div.classList.add("card", "bg-base-100", "w-11/12", "mx-5", "shadow-sm", "my-5", "drop-shadow-xl", "hover:bg-[#effafc]");
            div2.classList.add("card-body", "grid", "grid-cols-2", "gap-x-80");
            btnVolume.classList.add("bg-[#e7f5ff]", "p-4", "cursor-pointer");

            div.innerHTML = `
                <figure>
                    <h6 class="font-bold pt-5 text-4xl">${word.word}</h6>
                </figure>
                <p class="font-normal pt-5 text-2xl">Meaning / Pronunciation</p>
                <p class="font-normal pt-5 text-2xl">${word.meaning ? word.meaning : "Not Found"} / ${word.pronunciation}</p>
            `;

            btnInfo.innerHTML = `<i class="fa-solid fa-circle-info text-2xl "></i>`;
            btnInfo.classList.add("bg-[#e7f5ff]", "pl-5", "pr-5", "p-4", "cursor-pointer");
            btnInfo.addEventListener("click", () => openModal(word));

            btnVolume.innerHTML = `<i class="fa-solid fa-volume-high "></i>`;

            div2.appendChild(btnInfo);
            div2.appendChild(btnVolume);
            div.appendChild(div2);
            all_card.appendChild(div);
        });

        empty_div.classList.add("hidden");

    } else if (id == 4 || id == 7) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="bg-[#ededed] py-25 my-10 rounded-lg">
                <img class="mx-auto pb-5" src="./B11-A6-English-Janala/assets/empty.png" alt="">
                <p class="text-[#777472]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl font-bold mt-2 text-[#292524]">নেক্সট Lesson এ যান</p>
            </div>
        `;
        empty_div.appendChild(div);
        empty_div.classList.remove("hidden");
    } else {
        empty_div.classList.add("hidden");
        lesson_select.classList.add('hidden')

    }
};


const handleModalClose =()=>{
    console.log("click")
    document.getElementById("my_modal_5").close();

}

const openModal = (x) => {
//   console.log(x)
  fetch(`https://openapi.programming-hero.com/api/word/${x.id}`)
    .then(res => res.json())
    .then(d => {
      const content = `
        <h3 class="text-3xl font-bold text-left">Meaning</h3>
        <p class="py-2 text-xl mb-3 text-left">${d.data.meaning? d.data.meaning : "Not Found"}</p>
        <h3 class="text-3xl font-bold text-left">Example</h3>
        <p class="py-2 text-xl mb-3 text-left">${d.data.sentence}</p>
        <h3 class="text-3xl font-bold text-left">সমার্থক শব্দ গুলো</h3>
        <div class="grid grid-cols-3 gap-5 cursor-pointer mt-2">
          ${d.data.synonyms.map(syn => `<button class="py-4 bg-[#edf7ff] rounded text-xl">${syn}</button>`).join('')}
        </div>
        <div class="modal-action">
          <button onclick="handleModalClose()" class="outline-1 rounded-sm py-3 px-4 text-[#422AD5] hover:text-white hover:bg-[#422ad8] cursor-pointer">
            Complete Learning
          </button>
        </div>
      `;

      document.getElementById("madalContent").innerHTML = content;
      document.getElementById("my_modal_5").showModal();
    });
};






const getPass = ()=> {
    const myPass = document.getElementById('myPass').value 

    if(myPass == ''){
        window.alert("Please give us your name and password.")
        
    }else if(myPass!=123456){
        window.alert("Please give us your correct password.")
    }else{

        fetch("https://openapi.programming-hero.com/api/levels/all")
                .then(res => res.json())
                .then(result => {
                    allBtn(result.data);
                });


            const allBtn = (result) => {
                let all_btn = document.getElementById("all-btn");

                for (const btn of result) {
                    let button = document.createElement("button");
                    button.id = `btn-${btn.level_no}`;
                    button.className = "outline-1 rounded-sm py-3 px-4 text-[#422AD5] hover:bg-[#8876f0] hover:text-white hover:outline-1 cursor-pointer mr-6";
                    button.innerHTML = `<i class="fa-solid fa-book-open pr-2"></i>Lesson - ${btn.level_no}`;

                    button.addEventListener("click", function () {
                        
                        selectBtn(btn.level_no);
                    });

                    all_btn.appendChild(button);
                }

            };


            document.getElementById('banar_section').classList.add('hidden')


            const myPass = document.getElementById('myPass').value 
            if(myPass == 123456){
                const nav_section = document.getElementById('nav-section')
                const frequently_section = document.getElementById('frequently-section')
                const btn_section = document.getElementById('btn-section')



                



                nav_section.innerHTML= `
                <nav class="mb-24">
                    <div class="bg-[#ededed]">
                        <div class="flex justify-between mx-16  py-6">
                            <div class="flex items-center text-xl">
                                <h1>English</h1>
                                <img src="./B11-A6-English-Janala/assets/logo.png" alt="">
                                <h1>জানালা</h1>
                            </div>
                            <div class="flex items-center text-xl gap-8">
                                <button class="outline-1 rounded-sm py-2 px-3 text-[#422AD5] hover:bg-[#422ad8] hover:text-white cursor-pointer"><i class="fa-solid fa-circle-question pr-2"></i>FAQ</button>
                                <button class="outline-1 rounded-sm py-2 px-3 text-[#422AD5] hover:bg-[#422ad8] hover:text-white cursor-pointer "><i class="fa-solid fa-book-open pr-2"></i>Learn</button>
                                <button class="outline-1 rounded-sm py-2 px-3 text-[#422AD5] hover:bg-[#422ad8] hover:text-white cursor-pointer"><i class="fa-solid fa-arrow-right-from-bracket pr-2"></i>Logout</button>
                            </div>
                        </div>
                    </div>

                </nav>
                `






                frequently_section.innerHTML = `

                <section id="faq-section" class="my-52" >
                    <h1 class="text-center text-3xl font-bold mb-10"><span class="text-[#00BCFF]">Frequently</span>  Asked Questions</h1>
                    <div class="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" checked="checked" />
                        <div class="collapse-title font-semibold">1. How can I start learning English on this website?</div>
                        <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div class="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div class="collapse-title font-semibold">2. Is this website free to use?</div>
                        <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div class="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div class="collapse-title font-semibold">3.  Do I need to create an account?</div>
                        <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                    <div class="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div class="collapse-title font-semibold">4. How can I build my English vocabulary?</div>
                        <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                    <div class="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div class="collapse-title font-semibold">5. Do you offer certificates for completed courses?</div>
                        <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </section>
                `

                btn_section.innerHTML = `
                <section class="text-center " id="">
                    <h1 class="text-center text-3xl font-bold mb-10"><span class="text-[#00BCFF]">Let's</span> Learn Vocabularies</h1>
                    <div class="" id="all-btn"></div>
                    <div class="grid grid-cols-3 mt-20 " id="all-card"></div>
                    <div class="" id="empty"></div>
                    
                    
                    <!-- <script src="/script.js"></script> -->

                    
                    
                    
                    
                
                    <!-- <script src="/script-2.js"></script> -->

                    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box rounded-lg" id="madalContent">
                        <!-- Content -->
                    </div>
                    </dialog>


                    
                </section>



                        <!-- Spinner -->
                <div id="spinner" class="hidden flex justify-center my-10">
                <div class="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>

                
                `
                document.getElementById("lesson_select").classList.remove("hidden");







                
            }   


    }


   
    
    
}


