$( document ).ready(function() {

    var seconds;   //give user 5 mins
    var trivia;
    var correct;
    var incorrect;
    var undef;
    var num_questions;
    var clock;
    var answer

    $("#question").hide();
    $(".answers").hide();
    //this function will render the question to the page
    function renderQuestion(number)
    {
        $(".answer-splash").hide();
        $(".answer-img").hide();
        //var button = this;
        $(".answers").show();
        $("#question").show();
        $(".game-display").show();
        $(".answer-img").attr("src","");    //i dont like this but hotfix for now

        //display question to screen
        $("#question").text(trivia[number].question);   
        //answer1
        $("#answer1").text(trivia[number].answer1); 
        //answer2
        $("#answer2").text(trivia[number].answer2);    
        //answer3
        $("#answer3").text(trivia[number].answer3);
        //answer4
        $("#answer4").text(trivia[number].answer4);
        

    }
    function renderAnswer(num_questions,answer) {
        $("#question").hide();
        $(".answers").hide();
        $(".game-display").hide();
         
 
        var dispAnswer = trivia[num_questions+1].rightanswer;
        if(dispAnswer === 1)
            dispAnswer = trivia[num_questions+1].answer1;
        else if (dispAnswer === 2)
            dispAnswer = trivia[num_questions+1].answer2;
        else if (dispAnswer === 3)
            dispAnswer = trivia[num_questions+1].answer3;
        else
            dispAnswer = trivia[num_questions+1].answer4;
        //display
        $(".answer-splash").text("The answer is "+ dispAnswer+"." );    //report right answer
        console.log("img :" +trivia[num_questions+1].imgurl+".jpg" )
        $(".answer-img").attr("src","./assets/images/"+trivia[num_questions+1].imgurl+".jpg");

        $(".answer-splash").show();
        $(".answer-img").show();
        
    }

    function gameLoop(q_and_a) {
        if(q_and_a) {//is this a question timer??
            seconds = 30;
            clock = setInterval(function() {
                seconds--; 
                console.log("Question seconds: "+seconds);
                $(".game-display").text("Time left :" + seconds);
                renderQuestion(num_questions);
                if(seconds <1)
                {
                    clearInterval(clock); 
                    computeQuestion(num_questions,undefined);
                }
            },1000);
        }
        else {//answer timer
            seconds = 3;
            clock = setInterval(function() {
                seconds--; 
                console.log("Answer second: "+seconds);
                renderAnswer(num_questions,answer);
                if(seconds <1)
                {
                    clearInterval(clock);
                    if(num_questions <0) 
                        endGame();  //let's gracefully finish the game
                    else
                        gameLoop(1);    //push next question to the stack

                }

            },1000);
        } 
    }

    function endGame() {
        //display statistics to the screen and refresh the game
        $("#question").empty();
        $(".answers").empty();
        $(".answer-splash").hide();
        $(".answer-img").hide();
        console.log(correct);
        console.log(incorrect);
        console.log(undef);
        $(".game-display").empty();
        $(".game-display").show();
        $(".game-display").text("Correct: "+ correct + " Incorrect: "+ incorrect + " No Answer: "+ undef);
        $(".container").remove("#questions");
        $("#questions").empty()
        $(".start-area").append('<form id="start" class="pl-3 pr-3" name="start"><button id="start">Replay?</button></form>');
        $(".header-tron").show();  //show jumbotron for user reset
    }

    function computeQuestion(num_question,answer) {
        
        if(trivia[num_question].rightanswer == answer) //does user entry for this question match answer?
            correct++;
        else if(!parseInt(answer)) //DID USER NOT ANSWER (we expect an integer if val was captured)
            undef++;
        else
            incorrect++;
        num_questions--;

        //okay hide everything to show some stuff real quick then restore state
        
        //if(num_questions == -1)
        //    endGame();  //done. let's wrap up

        gameLoop(0);
    }

    function triviaGame() {

        //initialize
        correct = incorrect = undef = 0;
        seconds = 30;
        $(".header-tron").hide();  //remove jumbotron while game is in session
        //$("#start").remove("button");    //remove start button form
        $("#questions").show(); //show the form element again

        trivia = [ 
        {question:"What is the name of the Garden Squall trains at in Final Fantasy VIII?",answer1:"Balamb Garden",answer2:"Galbadia Garden",answer3:"Secret Garden",answer4:"Esther Garden",rightanswer:1,imgurl:"balamb",},
        {question:"What is the name of the sports game Tidus plays in Final Fantasy X?",answer1:"Triple Triad",answer2:"Gwent",answer3:"Blitzball",answer4:"Crossfire",rightanswer:3,imgurl:"blitzball"},
        {question:"What is the name of the feathered bird players ride in the final fantasy series?",answer1:"Tonberry",answer2:"Chocobo",answer3:"Cactuar",answer4:"Moogle",rightanswer:2,imgurl:"chocobo"},
        {question:"What is the secret name of the princess in Final Fantasy IX?",answer1:"Rinoa",answer2:"Dagger",answer3:"Quistis",answer4:"Sera",rightanswer:2,imgurl:"dagger"},
        {question:"What is Squall's weapon type in Final Fantasy VIII",answer1:"Chain whip",answer2:"Gun Blade",answer3:"Heavy Sword",answer4:"Blitz Ball",rightanswer:2,imgurl:"gunblade"},
        {question:"What is the name of the group that protects Noctis in Final Fantasy XV?",answer1:"The Galbadia Red",answer2:"Order of the Rose",answer3:"Guardians of the Crown",answer4:"Kingsguard",rightanswer:4,imgurl:"kingsguard"},
        {question:"What is Squall's final limit break in Final Fantasy VIII called?",answer1:"Grand Finale",answer2:"Lionheart",answer3:"Armageddon",answer4:"Chain of memories",rightanswer:2,imgurl:"lionheart"},
        {question:"Which of the following is NOT a type of mage?",answer1:"Black mage",answer2:"Purple mage",answer3:"White mage",answer4:"Red mage",rightanswer:2,imgurl:"vivi"},
        {question:"The Mage Masher in Final Fantasy IX is a type of?",answer1:"two bladed staff",answer2:"twin blades",answer3:"crossbow",answer4:"staff",rightanswer:2,imgurl:"magemasher"},
        {question:"Which of the following is a composer of Final Fantasy music?",answer1:"Koichi Sugiyama",answer2:"Nobou Uematsu",answer3:"Yasunori Mitsuda",answer4:"Jack Wall",rightanswer:2,imgurl:"nobou"},
        {question:"Which of the following is NOT a Final Fantasy Summon?",answer1:"Doomtrain",answer2:"Shiva",answer3:"Quistis",answer4:"Ifrit",rightanswer:3,imgurl:"quistis"},
        {question:"What is the flying ship in Final Fantasy VIII?",answer1:"Ragnarok",answer2:"Highwind",answer3:"Gallant",answer4:"Gallily",rightanswer:1,imgurl:"ragnarok"},
        {question:"What is the name of Lightning's sister in Final Fantasy XIII?",answer1:"Serah",answer2:"Shannon",answer3:"Rinoa",answer4:"Garnet",rightanswer:1,imgurl:"serah"},
        {question:"What is the name of the corporation in Final Fantasy VII",answer1:"Shinra",answer2:"Mako",answer3:"Reliant",answer4:"Biggs",rightanswer:1,imgurl:"shinra"},
        {question:"Who is the lead character of Final Fantasy VIII?",answer1:"Squall",answer2:"Rinoa",answer3:"Zidane",answer4:"Kefka",rightanswer:1,imgurl:"squall"},
        ];

        num_questions = trivia.length-1;
        console.log("question: " +0);
        gameLoop(1);
    } 

    $("#start").click(function(event){ //starts game 
        event.preventDefault();
        $("#start").empty(); 
        triviaGame();
    });

    $("#answer1, #answer2, #answer3 ,#answer4").click(function(event) {
        event.preventDefault();
        console.log("i clicked");
        if(seconds > 0) //did time not elapse yet?
        {      
            clearInterval(clock);   //stop timer
            answer = $(this).attr('data-value');    //grab answer from div
            computeQuestion(num_questions,answer);   //calculate whether the answer was right or wrong
        }
    });

});