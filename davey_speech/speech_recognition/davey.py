import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    r.adjust_for_ambient_noise(source)

    while True:
        print("listening")
        audio = r.listen(source)

        try:
            print("Davey thinks you said" + " " + r.recognize_google(audio))
        except:
            print("I couldnt quite catch that!!")

                # comments if needed:
                # if r.recognize_google(audio) == "alpha"
                # print ("a")


                # lastWord = r.recognize_google(audio)
                # print("Davey thinks you said" + " " + lastWord)
                # if lastWord = "alpha"
                    # print ("a")
