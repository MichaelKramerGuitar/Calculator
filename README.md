### Author: Michael Kramer
#### Email: mgkramer@bu.edu

# Simple JavaScript Calculator

## Requirements 
* Using HTML 5, CSS, and JavaScript (no other languages):
Write a JavaScript program that performs the following actions (in sequence,
step-by-step):
1. Welcomes the visitor with an alert
2. Prompts the visitor for his/her name
3. Displays the users name with an alert
   a. Such as “Welcome [name]!”
4. Asks the visitor to enter two numbers with a prompt
   a. They can enter one number with one prompt and the second
   number with a second prompt, or you can ask them to enter them in
   one prompt, separated by a space or comma.
5. Uses a function (that you create) to add these two visitor entered numbers
   and adds them together and returns the result to the visitor with an alert.
   Concatenate the result of adding their two numbers together at the end of
   this phrase: “The sum of your two numbers is: [result]“
6. Add conditional logic (if/else):
   a. If the result of adding the two numbers together is greater than 10:
   i. Alert: “That is a big number.”
   b. If the result of adding the two numbers together is less than or
   equal to 10:
   i. Alert: “That is a small number.”
7. Add a loop:
   a. Prompt the user and ask if they want to add two numbers again, if
   they do (check for yes/no):
   i. Let the user provide two numbers again and produce the
   result with an alert (steps 4-7 repeat)
   b. If they don’t want to continue adding numbers:
   i. Thank the visitor for using the program and stop.

# How To Run
* Open ```index.html``` in your favorite web browser and use like you would any other calculator

# Notes on How Requirements are met
* I chose to implement a more traditional (and in my opinion robust) calculator assignment
* All above requirements still met
  * For 7) "Add A loop":
    * I accomplished this point with a function called from within an event listener (line 243 ```promptContinue()```)
    * Loops are arbitrarily demonstrated in main.js between lines 181 and 191 but are not important to the program

# Project Structure
```
└───src
    │   index.html
    │
    ├───modules
    │       calculator.js
    │       main.js
    │       package.json
    │
    └───styles
            style.css
```
* Javascript code was initially modularized 
  * The calculator was defined in its own file ```calculator.js``` and imported into ```main.js```
  * However, the browsers were throwing an error since my ```<script>``` tag necessarily had the attribute ```type=module```
    * Consequently, although my code worked when hosted locally (through IDE localhost) it did not load this way when opened directly in browsers
    * I decided to refactor putting all code in ```main.js``` thus un-modularizing the project structure
    * I kept the evidence of modularization to see if I can figure out a work around in the future as this would be preferred
    * For this submission all Javascript code runs from ```main.js``` as a consequent of the above described modularization issue in the browser

# How I went above and beyond
* This is a fully functioning calculator including
  * addition
  * subtraction
  * division
  * multiplication
  * exponents
  * logs
  * undo's of most recent operation
  * all clear/reset to 0
* I employed a design pattern learned in my previous design patterns class "The Command Pattern" which supports undo operations
* The Calculator is fully styled, sources are given in comments where appropriate

# Known Issues
* The exponent and log ```undo``` functions have faulty logic
  * This needs to be addressed in the future 
    * However, the overall calculator function logic is correct 