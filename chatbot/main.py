from flask import Flask, render_template,request #Using Flask as server framework to render webpage and use endpoints for functions 
import requests #Used to send HTTP Requests to Botpress
import json #Used to work with json response object from Botpress
from googletrans import Translator #Using Google Translate to translate to English for Botpress and to other languages for display
# Note: To install googletrans in your python environment, use command: pip install googletrans==3.1.0a0 
import re #Using to check user messages for numbers/email addresses

#import logging #Used during deployment to only show error messages on console

#log = logging.getLogger('werkzeug')
#log.setLevel(logging.ERROR) #Showing only error logs on terminal (For Deployment)

translator = Translator() #Setting Google Translator object
app = Flask(__name__) #Setting up Flask

#Function to generate Chatbot Response from Botpress
def chatbot_response(msg,uid,lang):
    data = json.dumps({"type": "text","text": msg}) #Data to send in request to botpress server (msg:user message)
    headers = {'Content-Type': 'application/json'} #Request headers for botpress
    try:
        ress = requests.post('http://13.235.104.244:3000/api/v1/bots/julie/converse/'+uid, data= data, headers = headers) #Post Request sent to boptpress *(julie: Bot ID- change for your own bot, uid: User ID unique for each conversation)
        ress = ress.json() #Set response object as json variable
        val = ress["responses"] #Take responses key of the response object (Use Postman to check an example of a botpress response object for better understanding)
        r={'text':''} #Response variable that function will be returning
        ij=0 #Index for rbi variable for assigning values (image list)
        ijb=0 #Index for rbbt variable for assigning values (button list)
        rbi=[] #List to store image url
        rbbi=[] #List to store image button url
        rbbt=[] #List to store button titles/labels
        rbf=[] #Button List for Response Variable
        for i in val:
            if 'text' in i: #If botpress response contains text
                r['text']+=i['text']+"\n" #Botpress response 'text' added to our response variable
            if 'options' in i: #If botpress response contains buttons
                rbb=[j['label'] for j in i['options']] #Take labels of all buttons
                if lang=="en-US":
                    rbf=rbb #If language is English then take labels in Englsh
                else:
                    rbt=[] #Takes translated labels for all buttons
                    ir=0 #Index for rbt variable for assigning values
                    for r1 in rbb:
                        transalation=translator.translate(r1, dest=lang) #Translate each label to the langauage to display to user 
                        rbt.insert(ir,transalation.text)
                        ir+=1
                    rbf=rbt #Take translated Labels as the button list
                r['buttons']=rbf #Assign buttons list to our response object
            if 'url' in i: #If Botpress contains images
                if 'title' in i and '(button)' in i['title']: #If Image is a button
                    rbbi.insert(ijb,i['url']) #Take url of the image
                    rbbt.insert(ijb,i['title'].replace('(button)','')) #Use title as the button value and replace (button) in the title
                    ijb+=1
                    if lang=="en-US": #If Language is English, no translation is required
                        r['imgf']=2 #Flag to signify it is an image button
                        r['titles']=rbbt #Assign image button titles list to our response object
                        r['files']=rbbi #Assign image button url list to our response object
                    else:
                        ribtt=[] #List to store translated titles
                        ir=0 #Index for ribbt variable for assigning values
                        for rt in rbbt:
                            transalation=translator.translate(rt, dest=lang) #Translate titles of image buttons to the language set by user
                            ribtt.insert(ir,transalation.text)
                            ir+=1
                        r['imgf']=2 #Flag to signify it is an image button
                        r['titles']=ribtt #Assign translated image button titles list to our response object
                        r['files']=rbbi #Assign image button url list to our response object
                else: #Else image is taken as only an image element
                    rbi.insert(ij,i['url']) #Store all image urls in a list
                    ij+=1
                    r['imgf']=1 #Flag to signify it is only an image
                    r['files']=rbi #Assign image url list to our response object
        return r
    except Exception:
        return {"text":"Sorry cannot process your request. Please try again."}

#Function to Work on Botpress Response before returning it back to javascript
def send(msg,lang,uid):
    if msg != '': #To check if message contains some text
        if msg.rfind(':')>0:
            msg=msg[:msg.rfind(':')] #This is done as speech recognition sometimes recognises numbers as time (Can be removed)
        if lang=="en-US" :
            res1 = chatbot_response(msg,uid,lang) #If language is English, no translation is required
            return res1
        else:
            res1 = chatbot_response(msg,uid,lang)
            transalation=translator.translate(res1['text'], dest=lang) #Translating Botpress response in English to other languages 
            res1['text']=transalation.text #Changing text key of our response object to the translated message
            return res1
    else: #If no message is sent, return back the function with null response
        return {'text':''}

#msg endpoint on which post request containing user id, language set by user and user message is sent from client javascript
@app.route("/msg",methods=['POST'])
def setmsg():
    if request.method == "POST":
        m=request.form['m'] #Set user message
        lang=request.form['lang'] #Set user langauge
        uid=request.form['uid'] #Set user ID
        if lang=="en-US" : #If language is English, no translation is required
            msg=m
            r=send(msg,lang,uid) #Sent to process request and response object is recieved
            return r #Return response object back to javascript
        elif '@'in m and '.' in m and ' ' not in m: #If language is not english but user query contains email id, no translation is required
            msg=m
            r=send(msg,lang,uid)
            return r
        elif re.sub(r'[^0-9]', '', m).isnumeric()==True: #If language is not english but user query contains a number, no translation is required
            msg=m
            r=send(msg,lang,uid)
            return r
        else: #Else, translate user query to English to send to botpress server
            translation=translator.translate(m) #Translating user message to English
            msg=translation.text
            r=send(msg,lang,uid)  #Sent translated message to process request and response object is recieved
            return r

@app.route("/") #Show Chatbot Webpage on default endpoint
def index():
    return render_template("index.html") #Render HTML Webpage

if __name__ == "__main__":
    app.run(debug=True) #During Local testing
    #app.run(host='0.0.0.0',port=5000,ssl_context='adhoc') #During Deployment