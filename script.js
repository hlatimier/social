const publishBtn = document.getElementById("publish");
const posts = document.getElementById("posts");

const titleInput = document.getElementById("postTitle");
const textInput = document.getElementById("postText");

const search = document.getElementById("search");

const darkBtn = document.getElementById("darkBtn");



/* CHARGEMENT DES POSTS */

let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];


savedPosts.forEach(post => {

    createPost(
        post.title,
        post.text,
        post.score
    );

});



/* CREATION D'UN POST */


publishBtn.addEventListener("click",()=>{


    let title = titleInput.value.trim();

    let text = textInput.value.trim();



    if(title === ""){

        alert("Ajoute un titre");

        return;

    }



    createPost(
        title,
        text,
        1
    );



    savePosts();



    titleInput.value="";
    textInput.value="";


});





function createPost(title,text,score){


let article=document.createElement("article");

article.className="post";



article.innerHTML=`

<div class="votes">

<button class="up">
▲
</button>


<span class="score">
${score}
</span>


<button class="down">
▼
</button>


</div>



<div class="postBody">


<div class="community">

r/new • maintenant

</div>



<h2>
${title}
</h2>



<p>
${text}
</p>



<div class="actions">


<button>
💬 0 commentaire
</button>


<button>
↗ Partager
</button>


<button class="delete">
🗑 Supprimer
</button>



</div>


</div>

`;



posts.prepend(article);



addEvents(article);



}





/* BOUTONS DES POSTS */


function addEvents(post){



let score = post.querySelector(".score");


post.querySelector(".up")
.addEventListener("click",()=>{


score.innerHTML =
parseInt(score.innerHTML)+1;


savePosts();


});





post.querySelector(".down")
.addEventListener("click",()=>{


score.innerHTML =
parseInt(score.innerHTML)-1;


savePosts();


});





post.querySelector(".delete")
.addEventListener("click",()=>{


if(confirm("Supprimer cette publication ?")){


post.remove();

savePosts();


}


});



}






/* SAUVEGARDE */

function savePosts(){


let data=[];


document.querySelectorAll(".post")
.forEach(post=>{


data.push({

title:
post.querySelector("h2").innerText,


text:
post.querySelector("p").innerText,


score:
parseInt(
post.querySelector(".score").innerText
)


});


});



localStorage.setItem(
"posts",
JSON.stringify(data)
);


}







/* RECHERCHE */


search.addEventListener("input",()=>{


let value =
search.value.toLowerCase();



document.querySelectorAll(".post")
.forEach(post=>{


let text =
post.innerText.toLowerCase();



if(text.includes(value)){


post.style.display="flex";


}
else{


post.style.display="none";


}



});


});







/* MODE SOMBRE */


darkBtn.addEventListener("click",()=>{


document.body.classList.toggle("dark");


localStorage.setItem(
"dark",
document.body.classList.contains("dark")
);


});





/* RESTAURATION MODE SOMBRE */


if(localStorage.getItem("dark") === "true"){

document.body.classList.add("dark");

}
