$( document ).ready(function() {

    var seconds;   //give user 5 mins
    //var timed;
    var trivia;
    var correct;
    var incorrect;
    var undef;
    var num_questions;
    var clock;

    $("#question").hide();
    $(".answers").hide();
    //this function will render the question to the page
    function renderQuestion(number)
    {
        //var button = this;
        $(".answers").show();
        $("#question").show();

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

    function timer() {
        clock = setInterval(function() {
            $(".game-display").text("Time remaining: "+seconds + " seconds");
            seconds--; 
            console.log(seconds);
            if(seconds <0)
            {
                clearInterval(clock); 
            }
        },1000);
        return timer;
    }
    function endGame() {
        //display statistics to the screen and refresh the game
        console.log(correct);
        console.log(incorrect);
        console.log(undef);
        $(".game-display").empty();
        $(".game-display").text("Correct: "+ correct + " Incorrect: "+ incorrect + " No Answer: "+ undef);
        $(".container").remove("#questions");
        $("#questions").empty()
        $(".start-area").append('<form id="start" class="pl-3 pr-3" name="start"><button id="start">Replay?</button></form>');
    }

    function computeQuestion(i,answer) {
        console.log(trivia[i].rightanswer);
        if(trivia[i].rightanswer == answer) //does user entry for this question match answer?
            correct++;
        else if(!parseInt(answer)) //DID USER NOT ANSWER (we expect an integer if val was captured)
            undef++;
        else
            incorrect++;
        num_questions--;
        seconds = 30;
    }

    function triviaGame() {

        //initialize
        correct = incorrect = undef = 0;
        seconds = 30;
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
        {question:"Which of the following is a composer of Final Fantasy music?",answer1:"Koichi Sugiyama",answer2:"Nobout Uematsu",answer3:"Yasunori Mitsuda",answer4:"Jack Wall",rightanswer:2,imgurl:"nobou"},
        {question:"Which of the following is NOT a Final Fantasy Summon?",answer1:"Doomtrain",answer2:"Shiva",answer3:"Quistis",answer4:"Ifrit",rightanswer:3,imgurl:"quistis"},
        {question:"What is the flying ship in Final Fantasy VIII?",answer1:"Ragnarok",answer2:"Highwind",answer3:"Gallant",answer4:"Gallily",rightanswer:1,imgurl:"ragnarok"},
        {question:"What is the name of Lightning's sister in Final Fantasy XIII?",answer1:"Serah",answer2:"Shannon",answer3:"Rinoa",answer4:"Garnet",rightanswer:1,imgurl:"serah"},
        {question:"What is the name of the corporation in Final Fantasy VII",answer1:"Shinra",answer2:"Mako",answer3:"Reliant",answer4:"Biggs",rightanswer:1,imgurl:"shinra"},
        {question:"Who is the lead character of Final Fantasy VIII?",answer1:"Squall",answer2:"Rinoa",answer3:"Zidane",answer4:"Kefka",rightanswer:1,imgurl:"squall"},
        ];

        console.log("question: " +0);
        for(num_question =0;num_question<trivia.length;num_question++) {
            renderQuestion(num_question);
       // timer();
       // computeQuestion(num_questions);
        }
        endGame();  //out of questions, finish up
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
            var answer = $(this).attr('data-value');    //grab answer from div
            computeQuestion(num_question,answer);   //calculate whether the answer was right or wrong
        }
    });

});