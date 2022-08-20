const express = require('express')
const path = require('path')
const app = express()
const port = 3001
const contestant_info = require('./contestant_info.json')

app.use('/images', express.static(__dirname + '/images'))

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
        for (i in group.contestants){
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

    res.status(400)
    res.send(returnVal)
}

function sendContestant(req,res,group, linkThingy, contestant){
    //checks if contestant exists
    contestantExists = false;
    contestantNum = null;
    for (i in group.contestants){
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

            width: 632px;"
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

        daContestant = group.contestants[contestantNum]
        

        returnVal += `<div id="image-container">`
        if (daContestant.image == "image_not_found.png"){
            returnVal += `<img src="/images/image_not_found_big.png" class="contestant-image">`
        } else {
            returnVal += `<img src="/images/${daContestant.image}" class="contestant-image">`
        }
        returnVal += `</div>`
        returnVal += `<div id="contestant-data">`

        if(daContestant.competition_name != null) returnVal += `<p>Competition Name: ${daContestant.competition_name}</p>` 
        if(daContestant.legal_name != null) returnVal += `<p>Legal Name: ${daContestant.legal_name}</p>` 
        if(daContestant.sex != null) returnVal += `<p>Sex: ${daContestant.sex}</p>` 
        if(daContestant.age != null) returnVal += `<p>Age: ${daContestant.age}</p>` 
        if(daContestant.height != null) returnVal += `<p>Height: ${daContestant.height}</p>` 
        if(daContestant.residence != null) returnVal += `<p>Residence: ${daContestant.residence}</p>` 
        if(daContestant.occupation != null) returnVal += `<p>Occupation: ${daContestant.occupation}</p>` 
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
    
        res.status(400)
        res.send(returnVal)

    } else{
        res.status(404)
        res.send("contestant doesn't exist")
    }

}

app.get('/contestants/season_one', (req, res) => {
    sendGroup(req, res, contestant_info.seasons.season_one, "/season_one")
})

app.get('/contestants/season_one/:contestant', (req, res) => {
    sendContestant(req, res, contestant_info.seasons.season_one, "/season_one", req.params.contestant)
})

app.get('/contestants/season_two/:group', (req, res) => {
    switch (req.params.group){
        case "group_one": 
            sendGroup(req, res, contestant_info.seasons.season_two.groups.group_one, "/season_two/group_one")
            break;
        case "group_two": 
            sendGroup(req, res, contestant_info.seasons.season_two.groups.group_two, "/season_two/group_two")
            break;
        case "group_three": 
            sendGroup(req, res, contestant_info.seasons.season_two.groups.group_three, "/season_two/group_three")
            break;
        default:
            res.send("group doesn't exist")
    }
})

app.get('/contestants/season_two/:group/:contestant', (req, res) => {
    switch (req.params.group){
        case "group_one": 
            sendContestant(req, res, contestant_info.seasons.season_two.groups.group_one, "/season_two/group_one", req.params.contestant)
            break;
        case "group_two": 
            sendContestant(req, res, contestant_info.seasons.season_two.groups.group_two, "/season_two/group_two", req.params.contestant)
            break;
        case "group_three": 
            sendContestant(req, res, contestant_info.seasons.season_two.groups.group_three, "/season_two/group_three", req.params.contestant)
            break;
        default:
            res.status(404)
            res.send("group doesn't exist")
    }
})

app.get('/contestants/season_two', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/season_two_list.html'));
})

app.get('/contestants/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/contestants_list.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/homepage.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/about.html'));
})

app.get('/thesearchengine', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/thesearchengine.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})