// console.log(`There are ${characters.length} characters in the array.`);

//get pointer to the UL inside the character scrolling box
const characterList = document.querySelector('[data-list');

//get document selectors for each of the detail character elements
const detailName = document.querySelector('[data-detail-name]');
const detailTitles = document.querySelector('[data-detail-titles]');
const detailAliases = document.querySelector('[data-detail-aliases]');
const detailAffliations = document.querySelector('[data-detail-house-affilations]');
const detailBorn = document.querySelector('[data-detail-born]');
const detailDied = document.querySelector('[data-detail-died]');
const detailTV = document.querySelector('[data-detail-tv]');
const detailActor = document.querySelector('[data-detail-actor]');

//get a selector to the navigation block
const navLetters = document.querySelector('[data-nav]');
//add click event listener to any element in the nav
navLetters.addEventListener('click',goToId);

//takes you the id element inside the scrolling character list
function goToId(event){
    // console.log(event);
    // console.log(event.path[0].textContent);
    if (event.path[0].textContent === 'All') {
        window.location.hash = '#A';
    }
    else{

        window.location.hash = '#'+event.path[0].textContent;
    }

}
// let myarray = [5,"yt",7,6];
// console.log(myarray);
// console.log(convertArrayToString(myarray));


function fillCharacterBox(chardict){
    const allCharsNames = chardict.map(function(person) {
        // console.log(person.name);
        return person.name;
    });
    allCharsNames.sort();
    // console.log(allCharsNames);

    // when the first letter changes in this list, attach an id to that element equal to the first letter.  
    //using a holder variable that is initialized to "ZZ" because nothing will match this.
    let firstLetter = "ZZ";
    //create a list element for each name
    //append all list elements to character div
    allCharsNames.forEach(function(name) {
        
        //create a list element for each charcter
        const charListElement = document.createElement('li');
        //create event listeners for each of those li's
        //does it mater that we don't have a unique name for them??
        charListElement.addEventListener('click',getCharDetails);
        charListElement.textContent = name;
        //add if first new begining letter
        if (name[0] !== firstLetter) {
            charListElement.id = name[0];
            firstLetter = name[0];
        }
        characterList.append(charListElement);

    });
    //add one more li element with a data tag, so I can set focus to this for test
}
fillCharacterBox(characters);

// testli.focus();

function getCharDetails(event){
    // console.log(event);
    //grabs the name
    const Name = (event.path[0].textContent);
    //cycle through the character list and get all the details
    characters.forEach(function(person) {  
            if (person.name === Name) {

            const title = convertArrayToString(person.titles);   //array
            const alias = convertArrayToString(person.aliases); //array
            //converts the url of the house to the name.
            const affiations = person.allegiances;  //array of urls
            houseAffiliations = affiations.map(function(each){
                return houses[each];
            });
        
            const houseaff = convertArrayToString(houseAffiliations);
            const born = person.born;
            const died = person.died;
            const tv = convertArrayToString(person.tvSeries); //array - only want full or not.  not is one element ""
            const actor = convertArrayToString(person.playedBy); //also an array
        
            console.log(Name,title,alias,born,died,tv,actor);

            //change the values for these in your dom

            detailName.textContent = Name;
            detailTitles.textContent = title;
            detailAliases.textContent = alias;
            detailAffliations.textContent = houseaff;
            detailBorn.textContent = born;
            detailDied.textContent = died;
            detailTV.textContent = tv;
            detailActor.textContent = actor;
            

        }
    });
}

function convertArrayToString(array){
    // console.log(array);
    //use \n\r to split lines and set css to use this
    const len = array.length;
    let str = "";
    array.forEach(function(thing,i) {
        if (i === 0) {   //first
            str += thing;
        }
        else {  //not first
            str += "\n\r"+thing;
        }

    });
    return str;
}
// console.log(Object.keys(characters));
//split characters into arrays
function beginsWithLetter(char,letter){
    let count = 0;
    char.forEach(function(person){
        if (person.name[0] === letter){
            count += 1;
            // console.log(person.name)
        }
    });
    return count;
}
// console.log(`There are ${beginsWithLetter(characters,"A")} characters with names beginning with A`);
// console.log(`There are ${beginsWithLetter(characters,"Z")} characters with names beginning with Z`);

function deadCount(char){
    let count = 0;
    char.forEach(function(person){
        if (person.died !== "") {
            count += 1;
        }
    });
    return count;
}

// console.log(`There are ${deadCount(characters)} dead characters.`)

//who has the most titles 

function mostTitles(char){
    let highTitleCount = 0;
    let mostTitles = ""
    char.forEach(function(person){
        if (person.titles.length > highTitleCount) {
            mostTitles = person.name;
            highTitleCount = person.titles.length;
        }
    });
    return [mostTitles , highTitleCount];
}
// console.log(`The character with the most titles is ${mostTitles(characters)[0]}.  He has ${mostTitles(characters)[1]}.`);


//valyrian

function valyrianCount(char){
    let valyrianCount = 0;
    char.forEach(function(person){
        if (person.culture === "Valyrian") {
            valyrianCount += 1;  
        }
    });
    //number of people with 'Valyrian' listed in their culture 
    return valyrianCount;  
}
// console.log(`There are ${valyrianCount(characters)} characters who are part of the Valyrian Culture.`);

function hotPie(char){
    //playedBy is an array...
    allActors = "";
    char.forEach(function(person){
        if (person.name === "Hot Pie") {
            // console.log(person.playedBy);
            person.playedBy.forEach(function(actors){
                // console.log(actors);
                allActors += actors;
                // console.log(allActors);
            });
            
        }
    });
    return allActors;

}
// console.log(`The character Hot Pie is played by ${hotPie(characters)}.`);

function hotPieFilter(char){
   return char.filter(function(person){
        if (person.name === "Hot Pie"){
            
            return person;
        }
    });
}

// console.log(hotPieFilter(characters));

//how many characters are not in the tv series
//tv series is an array.  ['season1','season2']
//if they aren't in the tv series, the data is [""]
function notTv(char){
    let noTvCount = 0;
    char.forEach(function(person){
        if ((person.tvSeries.length == 1) && (person.tvSeries[0].length == 0)) {
            noTvCount += 1;
        }
    })
    return noTvCount;
}
// console.log(`There are ${notTv(characters)} characters that are NOT in the TV Series.`)

function Targaryen(char){
    newArray = []
    char.forEach(function(person){
        //if the search expression not matched, returns neg 1
        if (person.name.search("Targaryen") !== -1) {
            newArray.push(person.name);
        }
    });
    return newArray;
}
// console.log(`These ${Targaryen(characters).length} people are Targaryens ${Targaryen(characters)}.`);

// console.log(houses);

const houseHist = {};  //empty dictionary
function houseCount(char){
     char.forEach(function(person){
         if (person.allegiances != "") {
            //if the house does not exist in my houseHist dictionary, add it and set it equal to 1.  otherwise, increment it by one.
            houseHist[(houses[person.allegiances])] ? houseHist[(houses[person.allegiances])] += 1: houseHist[(houses[person.allegiances])] = 1; 

         }
    });
}
houseCount(characters);
//a list of all the alligiances summed by house.  alligiance url converted to house  name based on previous python  dictionary created

// console.log(houseHist);

//rewrite house histogram with the es6 Map prototype functionality.

//this is more accurate becaue I was only looking at the first house in allegiances, i think
function houseHistMap(char){
    const houseHist2 = new Map();       //call the Map constructor
    char.forEach(function(person){
        person.allegiances.forEach(function(house){
            //if the hosue already in map, we increment,
            //else add it to Map setting value to 1
            // console.log(person)
            // console.log(house)
            if (houseHist2.has(houses[house])) {
                // increment.  reset value for the key
                //get the new value
                const currentValue = houseHist2.get(houses[house]);
                houseHist2.set(houses[house],currentValue+1);
            }
            else {
                //set to one
                houseHist2.set(houses[house],1);
            }
            // houseHist2[(houses[person.allegiances])]
        });

        });
        return houseHist2;
}
// console.log(houseHistMap(characters));