var words_array = [];
var word_split_array = [];
var blank_array = [];
var life = 6;
var user_word;

var last = 0;

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

// setTimeout(show_page_animation(), 5);

// function show_page_animation() {
// 	var a = document.getElementById("show_body");
// 	a.style.display = "block";
// }

function word_choosing()
{
    user_word  = document.getElementById("users_word").value;
	user_word = user_word.toLowerCase();

	//expression that allows a-z
	var regx = /^[a-zA-Z]*$/;
	var i;
	var n;

	//checks if theres atleast 1 letter
	for (i = 0; i < alphabet.length; i++)
	{
		n = user_word.includes(alphabet[i]);

		if (n)
		{
			break;
		}
	}

	//if valid word
	if (regx.test(user_word) && user_word != '' && n)
	{
		var show_login = document.getElementById("user_word_choose");
		var show_content = document.getElementById("content");

		show_content.style.display = 'block';
		show_login.style.display = 'none';

		//puts word in an array
		var str = user_word;
		word_split_array = str.split("");
		
		// for testing
		console.log(word_split_array)
		
		// creates array of underscores with length of the random word 
		for (i = 0; i < word_split_array.length; i++)
		{
			blank_array.push("_");
		}

		document.getElementById("word").innerHTML = blank_array.join(" ");
	}

    else
    {
        alert("Please enter a word!")
        document.getElementById('users_word').value = '';
    }
}


function random_word()
{
	fetch('words.txt')
		.then(response => response.text())
		.then(text => {
			words_array = text.split('\n');

			//generates random word for single player mode
			random_gen = Math.floor((Math.random() * (words_array.length-1)) + 0)
			
            random_word = words_array[random_gen];
			// console.log(random_word);

			//puts word in an array
			var str = random_word;
			word_split_array = str.split("");
			
            // for testing
            console.log(word_split_array)
			
			// creates array of underscores with length of the random word 
            blank_array = Array(random_word.length).fill("_")

		document.getElementById("word").innerHTML = blank_array.join(" ");
    })
}

var name = "hangman"

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
                blank_array[i] = guess
            }
        }

        // if won
        if (word_split_array.join("") == blank_array.join(""))
        {
			last = 1;
            document.getElementById("word").innerHTML = "You Win!";

			document.getElementById("word2").innerHTML = "The word was " + word_split_array.join("") + " click HANGMAN to go back to the menu";

			for (i = 0; i < alphabet.length; i++)
			{
				document.getElementById(alphabet[i]).style.backgroundColor = "black";

				//hover effect removed
				document.getElementById(alphabet[i]).style.pointerEvents = "none";
			}
        }
        
        else
        {
            document.getElementById("word").innerHTML = blank_array.join(" ");
        }
    }



	// if not won
	else if (!(word_split_array.join("") == blank_array.join("")))
	{
		// if still alive
		if (life > 1)
		{
			name = "hangman"+life;
			life--;
		}

		// lost
		else
		{
			name = "hangman1"
			document.getElementById("word").innerHTML = "You lose";

			document.getElementById("word2").innerHTML = "The word was " + word_split_array.join("") + " click HANGMAN to go back to the menu";

			for (i = 0; i < alphabet.length; i++)
			{
				//changes the button colour to blank
				document.getElementById(alphabet[i]).style.backgroundColor = "black";

				//hover effect removed
				document.getElementById(alphabet[i]).style.pointerEvents = "none";
			}

		}
	}

	if (last == 0)
	{
		document.getElementById("hangman").src = "hangmen/"+name+".png";
   	 	document.getElementById("hangman").alt = name;
	}

	else
	{
		name = "hangman0"
		document.getElementById("hangman").src = "hangmen/"+name+".png";
   	 	document.getElementById("hangman").alt = name;
	}

}