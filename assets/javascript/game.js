$( document ).ready(function() {

    var seconds;   //give user 5 mins
    var timed;
    var trivia;
    var correct;
    var incorrect;
    var undef;

    $("#questions").hide();
    //this function will render the question to the page
    function renderQuestion(number)
    {
        $("#questions").append('<div class="row col-12 pb-2 question-formatting border mb-2 mt-2"> ' +trivia[number].question + '</div>');   //add row with question content
        $("#questions").append('<div class="row question'+(number+1)+'"> </div>'); //create row for answers to be placed into

        //answer1
        $("#questions").find('.question'+(number+1)).append('<div class="col-3 div-question'+(number+1)+'-answer1">');    //generate div of size col-3
        $("#questions").find('.div-question'+(number+1)+'-answer1').append('<label for="q'+number+'">'+trivia[number].answer1+'</label>');    //create label for radial input
        $("#questions").find('.div-question'+(number+1)+'-answer1').append('<input type="submit" name="q'+i+'" value="1" />'); //create radial inoput attached to col-3 div

        //answer2
        $("#questions").find('.question'+(number+1)).append('<div class="col-3 div-question'+(number+1)+'-answer2">');    
        $("#questions").find('.div-question'+(number+1)+'-answer2').append('<label for="q'+number+'">'+trivia[number].answer2+'</label>');
        $("#questions").find('.div-question'+(number+1)+'-answer2').append('<input type="submit" name="q'+number+'" value="2" />');

        //answer3
        $("#questions").find('.question'+(number+1)).append('<div class="col-3 div-question'+(number+1)+'-answer3">');
        $("#questions").find('.div-question'+(number+1)+'-answer3').append('<label for="q'+number+'">'+trivia[number].answer3+'</label>');
        $("#questions").find('.div-question'+(number+1)+'-answer3').append('<input type="submit" name="q'+number+'" value="3" />');

        //answer4
        $("#questions").find('.question'+(number+1)).append('<div class="col-3 div-question'+(number+1)+'-answer4">');
        $("#questions").find('.div-question'+(number+1)+'-answer4').append('<label for="q'+number+'">'+trivia[number].answer4+'</label>');
        $("#questions").find('.div-question'+(number+1)+'-answer4').append('<input type="submit" name="q'+number+'" value="4" />');

    }

    function computeQuestion() {
        //clearInterval(timer);
        for(var i=0;i<trivia.length;i++)
        {
            var temp1 = $('input[name=q'+(i)+']:checked').val();
            console.log(temp1);
            if(trivia[i].rightanswer == temp1) //does user entry for this question match answer?
                correct++;
            else if(!parseInt(temp1)) //DID USER NOT ANSWER (we expect an integer if val was captured)
                undef++;
            else
                incorrect++;
        }
        console.log(correct);
        console.log(incorrect);
        console.log(undef);
        $(".game-display").empty();
        $(".game-display").text("Correct: "+ correct + " Incorrect: "+ incorrect + " No Answer: "+ undef);
        $(".container").remove("#questions");
        $("#questions").empty()
        $(".start-area").append('<form id="start" class="pl-3 pr-3" name="start"><button id="start">Replay?</button></form>');
    }

    function timer() {
        seconds--;
        $(".game-display").text("Time remaining: "+seconds + " seconds");
        if(seconds == 0)    //out of time?
        {
            clearInterval(timed);   //disable timer
            computeQuestion(); //parse answer for question
        } 
    }  

    function triviaGame() {

        //initialize
        correct = incorrect = undef = 0;
        seconds = 300;
        $("#start").remove("button");    //remove start button form
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

        for(var i=0; i< trivia.length; i++) {   //loop through "i" questions
            renderquestion(i); //spit question out to page for iterator we are on
            timed = setInterval(timer,1000); //second by second timer
        }
    } 

    $("#start").submit(function(event){ //when button is pressed
        event.preventDefault(); //do not refresh page
        $("#start").empty(); 
        triviaGame();   //generate trivia game
    });

    $("#questions").submit(function(event){ //when button is pressed
        event.preventDefault(); //do not refresh page
        console.log("complete");
        if(seconds != 0)  //if timer isn't done, then finish
        {
            clearInterval(timed);
            console.log("finishgame");
            finishGame();
        }
    });

});