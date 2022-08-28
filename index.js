const contestant_info = require('./contestant_info.json')
const fse = require("fs-extra")

const exportLocation = __dirname + '/export';

print(contestant_info)

// Create static export folder
fse.mkdirSync(exportLocation, {recursive: true});
console.log("made static export directory");

// Images directory
fse.cpSync(__dirname + '/images/', exportLocation + '/images/', {recursive: true});
console.log("copied images");

function print(thing){
    console.log(thing)
}

function sendGroup(req,res,group, linkThingy){
    returnVal = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=0.75" />
    
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTZV8P2Z7Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LTZV8P2Z7Q');
</script>

    <title>${group.name}</title>
    <style>
    ul {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
    li{
        display: inline-block;
        width: calc(33% - 4em);
        min-width: 300px;
        text-align: center;
        margin: 2em;
    }
    body{
        font-size: 1.75em;
        text-align: center;
        background-color: #ececec;
        font-family: 'Times New Roman', Times, serif;
    }
    a{
        text-decoration: none;
        color: blue;
    }
    #notice{
        font-size: 0.5em;
        background-color: #AAAAAA;
        font-family: sans-serif;
        padding: 10px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        display: inline-block;
    }
    #code-section{
        font-family: 'Courier New', monospace;
        background-color: white;
        border: solid lightgray 4px; 
        display: none;
        padding: 10px;
        text-align: left;
        font-size: 24px; 
        position: fixed; 
        top: 10px; 
        left: 0; 
        line-height: 1.25;
        width: 580px;
        margin-left: calc(50vw - (608px / 2));
    }
    </style>
    </head>
    <body><ul>`
        for (let i in group.contestants){
            returnVal+=`<li><a href="/contestants${linkThingy}/${group.contestants[i]["id"].toLowerCase()}">`
            returnVal += `<img src="/images/${group.contestants[i].image}" width="316px" height="280px"><br>`
            returnVal += group.contestants[i]["competition_name"].toLowerCase()
            returnVal+=`</a></li>`

        }
        if (group.name == "season_two group_three"){
            returnVal += `<span id="notice">Notice: This page is considered NON-CANON due to it not appearing in an official episode.</span>`
        }
        returnVal += `</ul>`;
        if (group.name == "season_two group_one"){
            returnVal += `<a href="javascript:secret();" style="font-size: 0.5em; color: gray;">secret code</a>`
    returnVal +=`
        <div id="code-section">
def command(history,memory):<br>
&nbsp;&nbsp;&nbsp;&nbsp;kill = 0<br>
&nbsp;&nbsp;&nbsp;&nbsp;if history.shape[1] >= 2:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if memory or history[1,-1] == 1<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kill = True<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if history[1,-1] == 0 and<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kill = False<br>
&nbsp;&nbsp;&nbsp;&nbsp;choice = "kill"<br>
&nbsp;&nbsp;&nbsp;&nbsp;if backpack:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;history.shape[1] >= 1 and<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command = "end"<br>
&nbsp;&nbsp;&nbsp;&nbsp;else:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if history.shape[1] >= 1 and<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choice = "N/A"<br>
&nbsp;&nbsp;&nbsp;&nbsp;return command, kill
</div>
    `
        returnVal +=`
        <script>
            function secret(){
                document.querySelector("#code-section").style.display = "inline-block";
            }
            document.body.onmousedown = function(){
                document.querySelector("#code-section").style.display = "none";
            }
        </script>
    `
        }




    returnVal += `</body></html>`

    //res.status(400)
    return(returnVal)
}

function sendContestant(req,res,group, linkThingy, contestant){
    //checks if contestant exists
    contestantExists = false;
    contestantNum = null;
    for (let i in group.contestants){
        if (group.contestants[i]["id"].toLowerCase() == contestant){
            contestantExists = true;
            contestantNum = parseInt(i);
        }
    }
    prevNum = contestantNum-1
    if (prevNum < 0){
        prevNum = 0
    }
    nextNum = contestantNum+1
    if (nextNum > 5){
        nextNum = 5
    }

    if (contestantExists){
        returnVal = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.75" />

        <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTZV8P2Z7Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LTZV8P2Z7Q');
</script>

        <title>${group.contestants[contestantNum]["id"].toLowerCase()}</title>
        <style>
        body{
            font-size: 1.5em;
            background-color: #ececec;
            font-family: 'Times New Roman', Times, serif;
        }
        a{
            text-decoration: none;
            color: blue;
            font-size: 1.25em;
        }
        #navigation{
            text-align:center;
            padding: 0.25em;
        }
        #container{
            max-width: 1400px;
            margin: auto;
        }
        #container p{
            padding-bottom: 1.2rem;
        }
        #notice{
            font-size: 0.5em;
            background-color: #AAAAAA;
            font-family: sans-serif;
            padding: 10px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            display: inline-block;
        }
        #contestant-data{
            display: inline-block;
            vertical-align: baseline;
            width: 300px;
            height: 560px;
            margin: 10px;
        }
        #contestant-data p{
            display: block;
        }
        #image-container{
            display: inline-block;
            float: left;
        }
        .contestant-image{
            display: inline-block;
            margin: 10px;
            margin-top: 20px;
            width: 632px;
        }
        .contestant-image-not-found{
            display: inline-block;

            margin: 10px;
            margin-top: 20px;

            width: 316px;

            padding-top: 140px;
            padding-bottom: 140px;
            padding-left: 158px;
            padding-right: 158px;

            background-color: #d4d4d4;
        }
        @media only screen and (max-width: 700px){
            .contestant-image{
                width: calc(100% - 20px);
            }
        }
        
        @media only screen and (max-width: 987px){
            #contestant-data{
                height: auto;
            }
        }
        </style>
        </head>
        <body>
        <div id="navigation">`


        returnVal += `<a href="/contestants${linkThingy}/${group.contestants[prevNum]["id"].toLowerCase()}" style="margin-right: 20px">previous</a>`

        returnVal += `<a href="/contestants${linkThingy}/${group.contestants[nextNum]["id"].toLowerCase()}" style="margin-left: 20px">next</a>`
        
        returnVal += `</div>`

        returnVal += `<div id="container">`

        let daContestant = group.contestants[contestantNum]
        

        returnVal += `<div id="image-container">`
        if (daContestant.image == "image_not_found.png"){
            returnVal += `<img src="/images/image_not_found_big.png" class="contestant-image">`
        } else {
            returnVal += `<img src="/images/${daContestant.image}" class="contestant-image">`
        }
        returnVal += `</div>`
        returnVal += `<div id="contestant-data">`

        if(daContestant.competition_name != null) returnVal += `<p class="competition-name">Competition Name: ${daContestant.competition_name}</p>` 
        if (daContestant.competition_name == "Nail") {
            returnVal += `<script>
if (Math.floor(Math.random()*500) == 0){
    document.querySelector(".competition-name").innerText = "Competition Name: Owern";
    document.title = "owern";
}
</script>`
        }
        if(daContestant.legal_name != null) returnVal += `<p>Legal Name: ${daContestant.legal_name}</p>`
        if(daContestant.sex != null) returnVal += `<p>Sex: ${daContestant.sex}</p>` 
        if(daContestant.age != null) returnVal += `<p>Age: ${daContestant.age}</p>` 
        if(daContestant.height != null) returnVal += `<p>Height: ${daContestant.height}</p>` 
        if(daContestant.residence != null) returnVal += `<p>Residence: ${daContestant.residence}</p>` 
        if(daContestant.occupation != null) returnVal += `<p class="occupation">Occupation: ${daContestant.occupation}</p>`
        if (daContestant.competition_name == "Scenty") {
    returnVal += `<script>
if (Math.floor(Math.random()*500) == 0){
    document.querySelector(".occupation").innerText = "Occupation: Retail Cashier";
}
</script>`
        }
        if(daContestant.competition_placement != null) returnVal += `<p>Competition Placement: ${daContestant.competition_placement}</p>`

        returnVal += `</div>`
        

        if(daContestant.additional_notes != null){
            returnVal += `<div style="margin: 10px;">`
            returnVal += `<p>Additional Notes:</p>`
            returnVal += `<p>${daContestant.additional_notes}</p>` 
            returnVal += `</div>`
        } 

        if (!daContestant.official){
            returnVal += `<span id="notice">Notice: This page is considered NON-CANON due to it not appearing in an official episode.</span>`
        }
        
        
        
        returnVal += `</div>`

            returnVal += `
        </body></html>
        `
        return(returnVal)

    } else{
        console.log("Contestant doesn't exist.");
        console.log("Contestant id: " + contestant);
        console.log("Link thingy: " + linkThingy);
        console.log("Group: ");
        console.log(group);
    }

}



for (let i in contestant_info.seasons){
    fse.mkdirSync(exportLocation + '/contestants/' + i, {recursive: true});
    console.log("Created " + '/contestants/' + i);
    if (Object.keys(contestant_info.seasons[i]).includes('groups')){
        // Only seasons with multiple groups (s2, s3)

        fse.cpSync(__dirname + "/static/" + i + "_list.html", exportLocation + '/contestants/' + i + "/index.html", {recursive: true});
        console.log("Added static " + i + " list (THIS IS TEMPORARY)");

        
        for (let daCurrentGroup in contestant_info.seasons[i]["groups"]){
            // add the group(s) in s2, s3
            fse.mkdirSync(exportLocation + '/contestants/' + i + "/" + daCurrentGroup, {recursive: true});
            console.log("Created " + '/contestants/' + i + "/" + daCurrentGroup);
            
            fse.writeFileSync(exportLocation + '/contestants/' + i + "/" + daCurrentGroup + "/index.html", sendGroup(null,null,contestant_info.seasons[i]["groups"][daCurrentGroup], "/" + i + "/" + daCurrentGroup));
            console.log("Created " + '/contestants/' + i + "/" + daCurrentGroup + "/index.html")

            // make each contestant in the group's page
            for (let daCurrentContestant in contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"]){
                fse.mkdirSync(exportLocation + '/contestants/' + i + "/" + daCurrentGroup + "/" + contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"][daCurrentContestant]["id"], {recursive: true});
                console.log("Created " + '/contestants/' + i + "/" + daCurrentGroup + "/" + contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"][daCurrentContestant]["id"])

                fse.writeFileSync(
                    exportLocation + '/contestants/' + i + "/" + daCurrentGroup + "/" + contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"][daCurrentContestant]["id"] + "/index.html", 
                    sendContestant(null,null, contestant_info.seasons[i]["groups"][daCurrentGroup], "/" + i + "/" + daCurrentGroup, contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"][daCurrentContestant]["id"])
                );
                console.log("Created " + '/contestants/' + i + "/" + contestant_info.seasons[i]["groups"][daCurrentGroup]["contestants"][daCurrentContestant]["id"] + "/index.html")
            }
        }
    } else {
        // Only seasons with NO GROUPS (s1)
        
        // make group page
        fse.writeFileSync(exportLocation + '/contestants/' + i + "/index.html", sendGroup(null,null,contestant_info.seasons[i], "/" + i));
        console.log("Created " + '/contestants/' + i + "/index.html")

        // make each contestant's page
        for (let daCurrentContestant in contestant_info.seasons[i]["contestants"]){
            fse.mkdirSync(exportLocation + '/contestants/' + i + "/" + contestant_info.seasons[i]["contestants"][daCurrentContestant]["id"], {recursive: true});
            console.log("Created " + '/contestants/' + i + "/" + contestant_info.seasons[i]["contestants"][daCurrentContestant]["id"])

            fse.writeFileSync(
                exportLocation + '/contestants/' + i + "/" + contestant_info.seasons[i]["contestants"][daCurrentContestant]["id"] + "/index.html", 
                sendContestant(null,null, contestant_info.seasons[i], "/" + i, contestant_info.seasons[i]["contestants"][daCurrentContestant]["id"])
            );
            console.log("Created " + '/contestants/' + i + "/" + contestant_info.seasons[i]["contestants"][daCurrentContestant]["id"] + "/index.html")
        }

    }
}

fse.cpSync(__dirname + '/static/contestants_list.html', exportLocation + '/contestants/index.html', {recursive: true});
console.log("Created " + '/index.html');

fse.cpSync(__dirname + '/static/homepage.html', exportLocation + '/index.html', {recursive: true});
console.log("Created " + '/index.html');

fse.cpSync(__dirname + '/static/about.html', exportLocation + '/about/index.html', {recursive: true});
console.log("Created " + '/about/index.html');

fse.cpSync(__dirname + '/static/thesearchengine.html', exportLocation + '/thesearchengine/index.html', {recursive: true});
console.log("Created " + '/thesearchengine/index.html');

fse.cpSync(__dirname + '/contestant_info.json', exportLocation + '/contestant_info.json', {recursive: true});
console.log("Created " + '/contestant_info.json');

fse.cpSync(__dirname + '/static/diy_contestant.html', exportLocation + '/make/index.html', {recursive: true});
console.log("Created " + '/make/index.html');

console.log(
    `\n\n     Everything has been built! \n     Exports located in ${exportLocation}\n\n`
)