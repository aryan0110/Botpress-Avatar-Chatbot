//Avatar Configuration: BotLibre Avatar (You can change it for a different avatar or for your own account)
SDK.applicationId = "7411335769651540307"; //Different ID for different account
var sdk = new SDKConnection();
var web = new WebAvatar();
web.version = 8.5;
web.connection = sdk;
web.avatar = "11557990";
web.voice = "cmu-nk-hsmm";
web.voiceMod = "default";
web.nativeVoice = true;
web.nativeVoiceName = "Google UK English Female"; //Change on Language Switch
//web.nativeVoiceName = "Google हिन्दी";
web.width = "500";
web.height="600";
//Avatar Config Ends (You can learn more about Avatar SDK on Botlibre website), This config is predefined for Botlibre

    var ch=0; //Flag to signify if chatbot is hidden/visible
    var ft=0; //Flag to signify is chatbot is toggled for the first time to show welcome message
    var nui=0; //Flag to specify if welcome message is to be shown or not
    sph=0; //Flag to signify that if chatbot is hidden, dont start automatic speech recognition
    bc=0; //To signify is button generated with bot response is clicked or not
    var gbtns=''; //To signify no buttons are present with latest bot query
    const msgerForm = get(".msger-inputarea"); //Form
    const msgerInput = get("#textInput");  //Textbox
    const msgerChat = get(".msger-chat"); //Chat-Area where messages appear
    const msgerlang = get(".msger-lang-btn"); //Language Button in the Dropdown Menu
    var sf=1; //flag for form submission to avoid unwanted user input
    var spkf=0; //Flag to check for automatic starting of speech recognition 
    lang="en-US"; //Language Variable to Send to Python Server
    uid="user_"+Date.now().toString(); //User ID for Botpress Framework: To send to Python
    
    const BOT_IMG = "https://www.botlibre.com/avatars/a12546666.png"; //Image that is shown when bot msg is sent
    const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg"; //Image that is shown when user msg is sent
    const BOT_NAME = "Julie"; //Name that is shown when bot msg is sent
    const PERSON_NAME = "You"; //Name that is shown when user msg is sent

    document.getElementById("sendBtn").addEventListener("click", function() {formsubmit();}); //For Send icon in the textbox(Arrow Icon)

    //Function at the end of Speech Recognition:
    function speaksend(data){
        const msgText = data; //Assigned text that is recognised from the user audio
        document.getElementById("langBtn").disabled = false; //Disable Language toggle button (To avoid unwanted bugs)
        msgerInput.disabled=false;
        sf=1; //Form Submission is enabled
        if(msgText) //If no text is recognised, the form will not be automatically submitted
        {msgerInput.value = msgText; //To put the recognised text in the textbox for form submission
        formsubmit(); //User Query is sent / Form is submitted
      }
    }

    //Function on clicking Clear button (In Dropdown):
    document.getElementById("clearBtn").addEventListener("click", function() {
      if(sf==1){ //If no other process is running
        clearc(); //Clear chat function
        gbtns=''; //To signify no buttons are present with latest bot query (To solve a bug)
      }
        else{alert("Please Wait for Current Process to Finish!")}}); //If other process is being executed, button cannot be clicked (To prevent bugs)

    //Function on clicking Record button (Button with mic icon):    
    document.getElementById("recordButton").addEventListener("click", function(event) {event.preventDefault();start_recognizing();});
    
    //Function on clicking Language Toggle button (In Dropdown):
    document.getElementById("langBtn").addEventListener("click", function() {if(sf==1){ //If no other process is running
      if(lang=="en-US"){lang="hi"; //Change Language Variable to send to Python
      web.nativeVoiceName = "Google हिन्दी"; //Change Avatar Language
      speechRecognizer.lang = 'hi'; //Change Speech Recognition Language
      const msgText = "हिंदी";msgerlang.innerText ='भाषा: '+msgText; //To show the current language to the user
    }
    else{lang="en-US";web.nativeVoiceName = "Google UK English Female";const msgText = "English";speechRecognizer.lang = 'en-IN';
      msgerlang.innerText ='Language: '+msgText;} //Same process for English

      uid="user_"+Date.now().toString(); //Reset UID to reset conversation with botpress
        clearc(); //Clear Chat
        nui=1; //To show welcome message and ignore showing user message
        gbtns=''; //To remove any buttons if present on screen (To solve a bug)
        msgerInput.value = 'hello';formsubmit(); //To show welcome message
      }
    else{alert("Please Wait for Current Process to Finish!")} //If other process is being executed, button cannot be clicked (To prevent bugs)
    });

    //Function to clear chat:
    function clearc()
    {msgerChat.querySelectorAll('*').forEach(n => n.remove());} //Every Element present in the messages area is removed

    //On Form Submisssion (Mainly for submitting form on pressing Enter):
    msgerForm.addEventListener("submit", event => {
      event.preventDefault();
      formsubmit();
    });

    function formsubmit()
      {const msgText = msgerInput.value; //User Query is taken as the text present in the textbox (For Easy Logic)
      if (!msgText) return; //If no text is present in the textbox, the function is returned
      if (sf==0) {alert("Please Wait for Current Process to Finish!");return;} //If form cannot be submitted (flag), function is returned
      if(msgText.length>360){alert("Please type in less than 360 characters!");return;} //If user query is more than 360 characters, function is returned (For Botpress)
      if(gbtns.length > 0){//If a buttons are present on the latest query
      if(bc==1){
      var be=document.getElementById(msgText); //Take button that is clicked
      //For loop to remove all buttons, other than the button clicked
      for(i=0;i<gbtns.length;i++)
      {tb=gbtns[i];
        if(tb!=msgText){//If button selected is not the one that was clicked
                        tbv=document.getElementById(tb);
                        var particles = new Particles(tbv); 
                        particles.disintegrate();} //Remove button (With disintegrate animation)
      }
      be.disabled=true; //Disable button that is clicked
      be.style="cursor:default !important;" //Change cursor style of disabled button (For UI)
      gbtns=''; //To signify no buttons are present on the latest query
      bc=0;  
    }
      else //To remove bugs that arose on clearing chat when buttons were present on screen (Disintegrate Animation causing bugs)
      {var be=document.getElementById(msgText);
        for(i=0;i<gbtns.length;i++)
        {tb=gbtns[i];
          if(tb!=msgText){tbv=document.getElementById(tb);
                          if(tbv != null){tbv.remove();}} 
        }
      } //Same process except buttons are removed normally without animation
    }
      if(nui==0){appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);} //If not for welcome message, user query is shown
      else{nui=0;spkf=1;} //Else user query is not shown and nui is set to 0
      msgerInput.value = ""; //Textbox is cleared
      appendProcess(BOT_NAME, BOT_IMG, "left"); //Bot Processing is shown to the user while bot message is generated
      document.getElementById("recordButton").disabled = true; //Disable mic button
      document.getElementById("langBtn").disabled = true; //Disable language toggle
      msgerInput.disabled=true; //Disable Textbox
      sf=0; //Form Submission is disabled
      botResponse(msgText); //To fetch and show bot response
    }
    
    //Function to show user message:
    function appendMessage(name, img, side, text) {
      //side: Left/Right side, Name: Bot/User, Img: Bot/User image, text: Bot/User text to be shown
      const msgHTML = ` 
<div class="msg ${side}-msg">
  <div class="msg-img" style="background-image: url(${img})"></div>

  <div class="msg-bubble">
    <div class="msg-info">
      <div class="msg-info-name">${name}</div>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>

    <div class="msg-text">${text}</div>
  </div>
</div>
`;

      msgerChat.insertAdjacentHTML("beforeend", msgHTML); //Add the html element to the chat-area
      msgerChat.scrollTop += 500; //Increase scrolling limit for chat-area
    }

    function appendProcess(name, img, side) {
    //Side: Right side, img: Bot Image, Name: Bot Name
    //<div class="dot-elastic">: predefined div from W3 Schools to show a process animation with dots
      const msgHTML = `
<div class="msg ${side}-msg" id="process-msg">
  <div class="msg-img" style="background-image: url(${img})"></div>

  <div class="msg-bubble">
    <div class="msg-info">
      <div class="msg-info-name">${name}</div>
    </div>

    <div class="msg-text"><div class="dot-elastic"></div></div>
  </div>
</div>
`;

      msgerChat.insertAdjacentHTML("beforeend", msgHTML); //Add the html element to the chat-area
      msgerChat.scrollTop += 500; //Increase scrolling limit for chat-area
    }

    //Function called every time user clicks button generated with latest bot response:
    function cButton(bText)
    {if (sf==0) {alert("Please Wait for Current Process to Finish!");return;} //If other process is being executed, button cannot be clicked (To prevent bugs)
      bc=1; //Signify Button has been clicked
      msgerInput.value = bText; //Button Text will be generated in the textbox before submitting query
      formsubmit(); //Submit User Query
    }

    //Function called to generate and show Bot Message (Used along with formsubmit function)
    function botResponse(rawText) {
      spkf=1; //Flag to call speech recognition Automatically is enabled
      //Send Post Request to msg endpoint of Python Server (m: User msg, lang: Set language of user, uid: User ID for botpress)
      $.post("/msg", { m: rawText, lang:lang, uid:uid }).done(function (data) { //When post request is completed, this function is called (data: Response Object)
        const msgText = data['text'].replace("\n","<br/>"); //Replace \n with <br> tag for html
        web.addMessage(data['text'].replace("\n","      ")); //Add message to avatar queue after removing \n
        web.processMessages(); //Avatar processes and speaks bot response
        var el = document.getElementById('process-msg'); 
        el.remove(); //Remove processing-message element (Generated from processMessage function) before displaying bot response text
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText); //Display Bot Message to the user
        if(msgText.includes('type') || msgText.includes('टाइप') || msgText=="Sorry cannot process your request. Please try again."){spkf=0;} //If conditions satisfy, disable automatically starting speech recognition
            if(data.hasOwnProperty('files') && data.hasOwnProperty('imgf')) { //To Generate and display image/image buttons as part of bot response
            if(data['imgf']==1) //If displaying only image
            {var vbf = data['files']; //Collect url of all images from response object
            hbf='' //HTML element for all images
            for(i=0;i<vbf.length;i++) //Loop to add all images as html elements
            {bnf=vbf[i]; //Get url of each image
              hbf+=`<image src="${bnf}"></image>`; //Add image element to element containing all images
            }
            //Adding Images to the latest bot response
            htmlbf=`<div class="msg left-msg file-temp">
                  ${hbf}
                </div>
                  `
            msgerChat.insertAdjacentHTML("beforeend", htmlbf); //Inserting the element to the chat-area
            msgerChat.scrollTop += 500;
            spkf=0; //Disable Automatic speech recognition
          }
            else if(data['imgf']==2) //If displaying image as buttons
            {var vbf = data['files']; //Collect url of all images from response object
              var vbt = data['titles']; //Collect titles of all images from response object to show as button value
            hbf='' //HTML element for all image buttons
            gbtns=vbt;
            for(i=0;i<vbf.length;i++) //Loop to add all image buttons as html elements
            {bnf=vbf[i]; //Get url of each image
              bnt=vbt[i]; //Get title of each image
              hbf+=`<input id="${bnt}" type="image" src="${bnf}" onclick="cButton(this.id,'${bnt}')">`; //Add image button element to element containing all button images
            }
            //Adding Image Buttons to the latest bot response
            htmlbf=`<div class="msg left-msg file-button-temp">
                  ${hbf}
                </div>
                  `
            msgerChat.insertAdjacentHTML("beforeend", htmlbf); //Inserting the element to the chat-area
            msgerChat.scrollTop += 500;
            spkf=0; //Disable Automatic speech recognition
          }
    }
            if(data.hasOwnProperty('buttons')) { //To Generate and display buttons as part of bot response
            var vb = data['buttons']; //Collect label of all buttons from response object
            gbtns=vb;
            hb=''; //HTML element for all buttons
            for(i=0;i<vb.length;i++) //Loop to add all buttons as html elements
            {bn=vb[i]; //Get label of each button
              hb+=`<button class="${bn}" id="${bn}" onclick="cButton('${bn}')">${bn}</button>`; //Add button element to element containing all buttons
            }
            //Adding Buttons to the latest bot response
            htmlb=`<div class="msg left-msg button-temp">
                  ${hb}
                </div>
                  `
            msgerChat.insertAdjacentHTML("beforeend", htmlb); //Inserting the element to the chat-area
            msgerChat.scrollTop += 500;
            spkf=0; //Disable Automatic speech recognition
    }
  });
}
 
    //Function that is called after Avatar stops speaking bot message:
    web.ended=function()
    {document.getElementById("recordButton").disabled = false; //Enable mic button for speech
          msgerInput.disabled=false; //Enable textbox input
          sf=1; //Enable Form Submission
          if(spkf==1&&sph==1){spkf=0;
          document.getElementById("recordButton").click();} //If Speech Recognition flag is enabled, speech recognition process is started again automatically
    }

    //Function is called to assign variables in the beginning (lines 21-24)
    function get(selector, root = document) {
      return root.querySelector(selector);
    }
    
    //Function used to format date when showing user and bot message (used in appendmessage function)
    function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();

      return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    
    //Function for Chatbot toggling with a press of a button:
    $(document).ready(function () {
      $(".chat-bot-icon").click(function () {//If Icon to toggle chatbot is clicked then this function is called:
          $(this).children('img').toggleClass('hide'); //Change icon in the toggle button
          $(this).children('svg').toggleClass('animate'); //Toggle animation
          $('.msger').toggleClass('show-chat'); // Show/Hide Chatbot
          $('.avatar-avatarbox').toggleClass('show-avatar'); // Show/Hide Avatar
          if(ch==0){ch=1;sph=1;web.speak=true;} //If Chatbot is being toggled to not hidden
          else if(ch==1){ch=0;sph=0;web.speak=false;if($status == "started" || $status == "starting"){end_recognizing();}} //If Chatbot is being toggled to hidden
         if(ft==0){ft=1;nui=1;msgerInput.value = 'hello';formsubmit();} //If Chatbot is being toggled for the first time by the user, welcome message is shown
      });
    });
    