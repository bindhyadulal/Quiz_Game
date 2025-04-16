//questions
const question={
    easy:[
        {
            qn:"What is the capital city of Nepal?",
            opt:["Kathmandu","Pokhara","Chitwan","Illam"],
            correct:0

        },
        {
            qn:"How many days are there in a week?",
            opt:["3","4","5","7"],
            correct:3
        },
        {
            qn:"What is 2*5?",
            opt:["12","10","15","25"],
            correct:1
        },
        {
            qn:"What is 10/2?",
            opt: ["2","3","5","4"],
            correct:2
        },
        {
            qn:"How many months are there in a year?",
            opt:["10","11","12","13"],
            correct:2
        },
        {
            qn:"How many seconds are there in a  min?",
            opt:["10","20","30","60"],
            correct:3
        },
    ],
    medium:[
        {
            qn:"How many seconds are tehre in 5 min?",
            opt:["200","300","400","500"],
            correct:1
        },
        {
            qn:"what is the square of 12?",
            opt:["112","121","144","256"],
            correct:2
        },
        {
            qn:"How many countries are there in the world?",
            opt:["192","193","197","195"],
            correct:3
        },
        {
            qn:"How many contient are there?",
            opt:["2","7","3","5"],
            correct:1
        },
        {
            qn:"What is 2+3*5+7?",
            opt:["21","23","24","27"],
            correct:2
        },
        {
            qn:"What is square root of 121?",
            opt:["10","11","12","13"],
            correct:1
        },
    ],
    hard:[
        {
            qn:"which country in world has flag that is not square?",
            opt:["Nepal","Bhutan","USA","UK"],
            correct:0
        },
        {
            qn:"which element has the highest melting point?",
            opt:["Iron","Carbon","Tungsten","Gold"],
            correct:2
        },
        {
            qn:"Which planet has the most moons?",
            opt:["Jupiter","Neptune","Saturn","Earth"],
            correct:2
        },
        {
            qn:"What is x:log2(x)=5?",
            opt:["10","16","25","32"],
            correct:3
        },
        {
            qn:"Where is NCCS located?",
            opt:["Lalitpur","Paknajol","Tokha","Chabahil"],
            correct:1
        },
        {
            qn:"How many days are there in february?",
            opt:["31","32","27","28"],
            correct:3
        },
    ]
};
let currentDifficult;
let currentQnIndex=0;
let score=0;
let userAns=[];
let selectedAnswerIndex=null;
function startQuiz(difficulty){
    currentDifficult=difficulty;
    const buttons=document.querySelectorAll('#select button');
    buttons.forEach(button=>{
        button.disabled=true;    //diasabling other button
    })
    document.getElementById('select').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    load();

}
//for loading question
function load(){
    const qn=question[currentDifficult][currentQnIndex];
    const options_container=document.getElementById('options-container');
    document.getElementById('qn-no').textContent=`Qn ${currentQnIndex+1} of ${question[currentDifficult].length}`;
    document.getElementById('qn-text').textContent=qn.qn;
    options_container.innerHTML='';
    qn.opt.forEach((option,index)=> {
        const container=document.createElement('div');
        container.className='option-container';
        const label=document.createElement('label');
        label.className='option-label';
        const radio=document.createElement('input');
        radio.type='radio';
        radio.name='quiz-option';
        radio.value=index;
        radio.checked=false;
        radio.onclick=()=>selectAnswer(index);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        container.appendChild(label);
        options_container.appendChild(container);
    });
}
//selecting ans function
function selectAnswer(selectedIndex){
    selectedAnswerIndex=selectedIndex;

    const qn=question[currentDifficult][currentQnIndex];
    const optionLabels=document.querySelectorAll('.option-label');
    const optionInputs=document.querySelectorAll('input[name="quiz-option"]');
    const nextBtn=document.getElementById('next-btn');

    //disabling all buttons
    optionInputs.forEach(input=>{
        input.disabled=true;
    });

    //showing feedback
    optionLabels.forEach((label,index)=>{
        if(index===qn.correct){
            label.classList.add('correct');
        
        }
        if(index===selectedIndex && selectedIndex!==qn.correct){
            label.classList.add('incorrect');
        }
    });
    nextBtn.disabled=false;
}
function nextqn(){
    const qn=question[currentDifficult][currentQnIndex];
    const isCorrect=selectedAnswerIndex==qn.correct;
    userAns.push({
        qn:qn.qn,
        userAns:qn.opt[selectedAnswerIndex],
        correctAns:qn.opt[qn.correct],
        isCorrect:isCorrect
    });
    if (isCorrect) score++;
    currentQnIndex++;
    selectedAnswerIndex=null;   //resetting for new one

    if (currentQnIndex<question[currentDifficult].length){
        load();
        document.getElementById('next-btn').disabled=true;
    }else{
        showResult();
    }
}
//Result Function
function showResult(){
    document.getElementById('quiz-container').classList.remove('active');
    document.getElementById('result-container').classList.add('active');
    document.getElementById('score').textContent=`${score}/${question[currentDifficult].length}`;
    const resultList=document.getElementById('result-list');
    resultList.innerHTML='';
    userAns.forEach((answer,index)=>{
        const resultItem=document.createElement('div');
        resultItem.className='result-item';
        resultItem.innerHTML=`
            <h2>Qn ${index+1}:${answer.qn}</h2>
            <p class="user-ans ${answer.isCorrect ? 'correct': 'incorrect'}">
                Your ans: ${answer.userAns}
                </p>
                <p class="correct-ans">
                    Correct ans:${answer.correctAns}
                </p>
                `;
                resultList.appendChild(resultItem);
    });
}
//for restarting quiz
function restart(){
    currentQnIndex=0;
    score=0;
    userAns=[];
    document.getElementById('result-container').classList.remove('active');
    document.getElementById('select').classList.add('active');
    const buttons=document.querySelectorAll('#select button');
    buttons.forEach(button=>{
        button.disabled=false;    //re-enabling when restarted
    })
}

