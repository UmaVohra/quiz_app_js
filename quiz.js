const container=document.querySelector(".container");
const questionbox=document.querySelector(".question");
const choicesbox=document.querySelector(".choices");
const btn=document.querySelector("button");
const  scorecard=document.querySelector(".scorecard");
const  alert=document.querySelector(".alert");
const  startbtn=document.querySelector(".start");
const  timer=document.querySelector(".timer");


const quiz=[
    {
        question:"Q:Which of the following is correct about JavaScript?",
        choices:["JavaScript is an Object-Based language","JavaScript is Assembly-language","JavaScript is an Object-Oriented language","JavaScript is a High-level language"],
        answer:"JavaScript is an Object-Based language"
    },
     {
        question:"Q: Which of the following is not javascript data types?",
        choices:["null type","undefined type","no. type","All of the mentioned"],
        answer:"All of the mentioned"
    },
     {
        question:"Q: Where is Client-side JavaScript code is embedded within HTML documents?",
        choices:["A URL that uses the special javascript:code","A URL that uses the special javascript:protocol","A URL that uses the special javascript:encoding","A URL that uses the special javascript:stack"],
        answer:"All of the mentioned"
    },
     {
        question:"Q: Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        choices:["Position","window","standard","location"],
        answer:"window"
    },
    
];
//global vars
let currentIdx=0;
let score=0;
let quizover=false;
let timeleft=15;
let timerID=null;
const showQuestions=()=>{
  const quesdetails=quiz[currentIdx];
  questionbox.textContent=quesdetails.question;
choicesbox.textContent="";
    //  console.log("aa");
for(let i=0;i<quesdetails.choices.length;i++){
const currentchoice=quesdetails.choices[i];
const choicediv=document.createElement("div");
choicediv.textContent=currentchoice;
choicediv.classList.add("choice");
choicesbox.appendChild(choicediv);

choicediv.addEventListener("click",()=>{
    if(choicediv.classList.contains('selected')
){
    choicediv.classList.remove('selected');
} else{
    choicediv.classList.add('selected');
}
});

}
if(currentIdx<quiz.length){
    starttimer();
}
}
//function to check answers
const checkAnswer=()=>{
    const selectedchoice =document.querySelector(".choice.selected");
    if(selectedchoice.textContent===quiz[currentIdx].answer){
     //   alert("correct asnwer");
        displayalerts("correct answer");
        score++;
    }
    else{
       // alert("wrong!!!");
         displayalerts("wrong answer");
    }
  //   console.log(selectedchoice);
  timeleft=15;
   currentIdx++;
 if(currentIdx<quiz.length){
   
    showQuestions();
   }
   else{
    showscore();
    stoptimer();
   
   }


}
//funcion to show score
const showscore=()=>{
    questionbox.textContent="";
    choicesbox.textContent="";
    scorecard.textContent=`You scored ${score} out of ${quiz.length}`;
    displayalerts("You have completed this quiz");
    btn.textContent="Play Again";
    quizover=true;
     timer.style.display="none";
    // btn.addEventListener("click",()=>{
    //     currentIdx=0;
    //     showQuestions();
    //     btn.textContent="Next";
    //     scorecard.textContent="";

   // });
}
//fncn to show alert
const displayalerts=(msg)=>{
    alert.style.display="block";
    alert.textContent=msg;
}
//functn to start timer
const starttimer=()=>{
    clearInterval(timerID);// check if any timer exist
     timer.textContent=timeleft;
    const countdown=()=>{
         timeleft--;
          timer.textContent=timeleft;
 
   
    if (timeleft===0){
const confirmuser=confirm("times up!! Do you wanna quiz again");
if(confirmuser){
    timeleft=15;
    startquiz();
}
else{
    startbtn.style.display="block";
    container.style.display="none";
    return;
}
    }
    }
  timerID=setInterval(countdown,1000);
  
}

//function to stop timer
const stoptimer=()=>{
    clearInterval(timerID);

}

//function to shuffle question
const shufflequestions=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currentIdx=0;
    showQuestions();
}

//function to start quiz
const startquiz=()=>{
    timeleft=15;
    timer.style.display="flex";
    shufflequestions();
}

//adding evemt listnr to start btn
startbtn.addEventListener("click",()=>{
    startbtn.style.display="none";
    container.style.display="block";
    startquiz();
})
showQuestions();
btn.addEventListener("click",()=>{
    const selectedchoice=document.querySelector(".choice.selected");
    if(!selectedchoice&&btn.textContent==="next"){
     //   alert("Select your choice");
        displayalerts("select your answer");
        return;
    }
    if(quizover){
       
       btn.textContent="Next";
       scorecard.textContent="";
       currentIdx=0;
       startquiz();
       quizover=false;
       score=0;
    }
    
    
    
    
    else{
    checkAnswer();
    }
})