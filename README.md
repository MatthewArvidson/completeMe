completeMe

This is a Module 2 Front End project that uses the native dictionary included with all Macintosh computers to populate suggested words based on several parameters.

  -- 1. When the user types, they are given suggestions that start with the letters they input. (Example: 'piz' will suggest 'pizza', 'pizzeria', 'pizzle'... etc.)

  -- 2. When the user types in anything other than the 26 letters in the aplphabet, there will be no suggestions given because all words start with letters.

  -- 3. When the user sees a suggested word that they want, and they select it, it will gain 'popularity'. As a result, any subsequent searches using the same letters, the suggestions will show the most popular ahead of the default alphabetical order. (Example: A user input of 'piz' will suggest 'pizza', 'pizzeria', 'pizzle'; as before. If the user selects then selects 'pizzle' from the suggestions, the following search suggestions will update to reflect the popularity. Meaning the same 'piz' will return 'pizzle', 'pizza', 'pizzeria'; because the popularity will supercede the default alphabetical order. This process will stack, meaning that each time a suggestion is selected it gains even more 'popularity'. As a result, a word that is selected twice will come before a word that has been selected only once)

  -- 4. When the user is offered a suggestion that displeases them they can decide to delete that suggestion and it will no longer show up in subsequent searches. (Example: A search of 'piz' will suggest 'pizza', 'pizzeria', 'pizzle'. If the user knows what a 'pizzle' is and they never want to see the suggestion ever again, they can delete it. Now, any subsequent searches will not include 'pizzle'. Meaning the same 'piz' search will return 'pizza', 'pizzeria'; because 'pizzle' has been removed from the given suggestions)

  -- 5. Finally, if someone does not have this program on their computer, and they want it to be, they can simply import completeMe straight from GitHub if they follow these simple instructions that are as follows:

    -- 5a. Select an appropriate place to store this program and then type:
     *npm install https://github.com/MatthewArvidson/completeMe.git -S* (excluding the * on either side)
     into the Terminal. Then press 'Enter' to clone down this repo AND run 'npm install' at the SAME TIME!

    -- 5b. You did it! You can now run the testing suite by typing:
    *npm test* (excluding the * on either side)
    To be sure that everything is in working order, and once all the tests pass, you are ready to take this to parties and impress all your friends and family!!