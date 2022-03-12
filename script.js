    //pour redemarrer le jeu
    function restart(){
        location.reload();
    }
    $(document).ready(function(){
        $("#restart").on("click",restart);
    });
    
    function melanger(){
      for(var i=0;i<16;i++)
      {
        n1=Math.ceil(Math.random()*16);
          var img1= document.getElementById("img"+n1); 
          n2=Math.ceil(Math.random()*16);
          var img2= document.getElementById("img"+n2); 
          var inter=img1.src;
          img1.src=img2.src;
          img2.src=inter;
      }       
    }
    function timer(a){
      var timer = setInterval(function(){
        document.getElementById("countdown").innerHTML ='You have : '+a+ 's';
        if(a<=0){
          clearInterval(timer);
          setTimeout(function(){
            alert('Game over ! \n \n Play again ');
            location.reload();
          }
          
          ,1000);
        }
        a--;
    }, 1000);
      
    }
    function Difficultee(){
      var d=document.getElementById("difficulty").value;
      var displaySetting = document.getElementById("hint");
      if(d=="hard"){
        displaySetting.style.display='none';
        return 30;
      }else if(d=="medium") {
        displaySetting.style.display='none';
        return 60;
      }else if (d=="easy"){
        displaySetting.style.display='inline';
        return 60;
      } 
    }
    var sources=[]; //Les sources des images

      function giveHint(){   
        var hintclicked=0;
        hintclicked++;
        console.log(hintclicked);
        if(document.getElementById("start").disabled==true){
          setTimeout(function(){
            for(var i=0;i<16;i++) // stocker les sources des photos
          {
            if(!sources.includes(document.getElementsByClassName("case")[i].firstChild.src)){
                sources.push(document.getElementsByClassName("case")[i].firstChild.src);
            }
          }
          var randsrc = sources[Math.floor(Math.random()*8)];
          console.log(randsrc);
          for(var c=0;c<16;c++)
          {
            if(document.getElementsByClassName("case")[c].firstChild.src==randsrc)
            {
                document.getElementsByClassName("case")[c].firstChild.style.visibility='visible';
                checkWinCondition();       
              }  
          }
          },1000)
          if(hintclicked==1)
          {
            document.getElementById("hint").disabled=true;
          }
          
        }     
      }
      var nbr_click=0; // nombre de click inclus entre 0 et 1
      var visibleimg=[]; // nombre d'image choisies ( max ==2 )
      // flipImage works perfectly
      function flipImage(i){
        var pic=document.getElementsByClassName("case")[i].firstChild; 
          if(pic.style.visibility=='hidden'){
          pic.style.visibility='visible';
          nbr_click++;
        }
            if(visibleimg.length==2)   // reset le tableau visibleimg pour la comparaison
        {
            visibleimg=[];
        }
        if(nbr_click==1){
            visibleimg[0]=pic;
        }else if(nbr_click=2){
            visibleimg[1]=pic;
             nbr_click=0;
 
             if (visibleimg.length==2 && visibleimg[0].src != visibleimg[1].src){
                 setTimeout(function(){  // wait 700 ms before hiding the pictures
                    document.getElementById(visibleimg[0].id).style.visibility='hidden';
                    document.getElementById(visibleimg[1].id).style.visibility='hidden';
                 },700) 
             }
        }
        checkWinCondition();  
        }
        function checkWinCondition(){
          var counter=0; //compteur de nombre d'images trouvees
            for (var i=0;i<16;i++)
            {
                if(document.getElementsByClassName("case")[i].firstChild.style.visibility=='visible')
                counter++;
                console.log(counter);
            }
            if(counter==16){
              setTimeout(function(){
                confirm('You Won');
                location.reload();
              },1000);
              
            }
        } 
        function play(){

                // Afficher tout les photos et les cacher apres 4secondes
                for(var c=0;c<16;c++){         
                        document.getElementsByClassName("case")[c].firstChild.style.visibility='visible';
                }
                // initialiser les images en mode caché
                setTimeout(function(){
                    for(var c=0;c<16;c++){         
                        document.getElementsByClassName("case")[c].firstChild.style.visibility='hidden';
                }
                },5000);
                timer(Difficultee());
        }       

