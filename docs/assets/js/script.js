var words_array = [];
var word_split_array = [];
var blank_array = [];
var life = 6;
var user_word;

var last = 0;

// setTimeout(show_page_animation(), 5);

// function show_page_animation() {
// 	var a = document.getElementById("show_body");
// 	a.style.display = "block";
// }

document.addEventListener('DOMContentLoaded', function(event) {
    addButtons();
});

function addButtons() {

    if (document.getElementById('letters') != null) {
        var divButtons = "";

        // loop through ascii table for alphabet
        for (let i = 65; i <= 90; i++) {
            let letter = String.fromCharCode(i);
            divButtons += "<button onclick=\"hangman('" + letter + "')\" id=\"" + letter + "\" value=\"" + letter + "\">" + letter + "</button>";
        }

        document.getElementById('letters').innerHTML = divButtons;
    }
}

function disableButtons() {
    for (i = 65; i <= 90; i++)
    {
        let letter = String.fromCharCode(i);

        document.getElementById(letter).style.backgroundColor = "black";

        //hover effect removed
        document.getElementById(letter).style.pointerEvents = "none";
    }
}


function word_choosing()
{
    user_word  = document.getElementById("users_word").value;
	user_word = user_word.toUpperCase();

	//expression that allows a-z
	var regx = /^[a-zA-Z]*$/;
	var i;

	//if valid word
	if (regx.test(user_word) && user_word != '')
	{
		var show_login = document.getElementById("user_word_choose");
		var show_content = document.getElementById("content");

		show_content.style.display = 'block';
		show_login.style.display = 'none';

		//puts word in an array
		var str = user_word.toUpperCase();
        word_split_array = str.split("");

		// for testing
        console.log(str);

		// creates array of underscores with length of the random word
        blank_array = Array(str.length).fill("_");

		document.getElementById("answerText").innerHTML = blank_array.join(" ");
	}

    else
    {
        alert("Please enter a word!");
        document.getElementById('users_word').value = '';
    }
}


function generate_random_word()
{
    fetch('words.txt')
        .then(response => response.text())
        .then(text => {
            words_array = text.replace(/\r\n/g,'\n').split('\n');

            //generates random word for single player mode
            random_gen = Math.floor((Math.random() * (words_array.length - 1)) + 0);

            //puts word in an array
            var str = words_array[random_gen];
            str = str.toUpperCase();
            word_split_array = str.split("");

            // for testing
            console.log(str);

            // creates array of underscores with length of the random word
            blank_array = Array(str.length).fill("_");

            document.getElementById("answerText").innerHTML = blank_array.join(" ");
        });
}

var hangmanAsset = "hangman";

function hangman(guess)
{
    //changes background of button
    document.getElementById(guess).style.backgroundColor = "black";

    //hover effect removed
    document.getElementById(guess).style.pointerEvents = "none";

    // if the guess is correct and still alive
    if (word_split_array.includes(guess) && life > 0)
    {
        for (i = 0; i < word_split_array.length; i++)
        {
            if (guess == word_split_array[i])
            {
                blank_array[i] = guess;
            }
        }

        document.getElementById("answerText").innerHTML = blank_array.join(" ");

        // if won
        if (word_split_array.join("") == blank_array.join(""))
        {
            document.getElementById("answerText").innerHTML = word_split_array.join("");

			document.getElementById("resultText").innerHTML = "You Win! <a id=\"replay\" href = \"javascript:location.reload();\"> Replay<a>?";

            disableButtons();

            hangmanAsset = "hangman0";
        }
    }

	// if not won
	else if (word_split_array.join("") != blank_array.join(""))
	{
		// if still alive, reduce life
		if (life > 1)
		{
			hangmanAsset = "hangman" + life;
			life--;
		}

		// lost
		else
		{
            hangmanAsset = "hangman1";
			document.getElementById("answerText").innerHTML = word_split_array.join("");

			document.getElementById("resultText").innerHTML = "You lose <a id=\"replay\" href = \"javascript:location.reload();\"> Replay<a>?";

            disableButtons();
		}
	}

    document.getElementById("hangman").src = "assets/hangmen/" + hangmanAsset + ".png";
    document.getElementById("hangman").alt = hangmanAsset;
}