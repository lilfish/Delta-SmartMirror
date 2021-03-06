# Facial recognition

## JavaScript
The Facial recognition script can be found in the folder "scripts" under the name ``facial_recognition_module.js``. In here you can find 2 functions
* start_facial()
* save_new_user()

If the this whole script is loaded it will first check if a user is already logged in. If a user is already logged in it will show the navigation options. Otherwhise it will start the ``start_face_recognition`` function.
```javascript
if (remote.getGlobal('user').name == null){
    start_facial()
    // ipcRenderer.send('login', 'v')
} else {
    document.getElementById("welkomtekst").classList.add('hidden');
    document.getElementById("mainNavigator").classList.remove('hidden');
    document.getElementById("mainNavigator").classList.add('fadeIn');
    document.getElementById("bericht").classList.add('fadeIn');
   
}
```

The ``start_facial()`` function starts up the ``facial.py`` script using execFile as seen below:
```javascript
myConsole.log("FACIAL HAS STARTED LOG THIS!");
    //start a python script - located at plugins/facial.py
    var SmartMirror_FaceRecognition = execFile('python3m', ['./plugins/facial.py'], (error, stdout, stderr) => {
        if (error) {
            throw error;
            myConsole.log(error);               
        }
    })
```
The myConsole.log() is a function to console.log output to the main commandline.

If there is data being send from the python script to the JavaScript file using stdout it will parse this data to json for further editing:
```javascript
SmartMirror_FaceRecognition.stdout.on('data',function(data){
        myConsole.log(data);
        //create the variable face_name with the new data & parse it to json for easier editing in javascript
        var face_name = data.toString('utf8');
        face_name = face_name.replace(/'/g, '"');
        face_name = JSON.parse(face_name);
```
If the face_name is "unknown" it will check 5 times if this is still the case. This is done to make sure the python script doesn't have a error when scanning once. 

```javascript
if (face_name[0].includes("Unknown")){
            unknown_counter++;
            if (unknown_counter > 4){
                unknown_counter = 0;
                SmartMirror_FaceRecognition.kill();  
                document.getElementById("name").innerHTML = "unknown person";
                document.getElementById('save_new').disabled = false;
                document.getElementById("bericht").classList.add('fadeInUp');
                document.getElementById("new_user_box").classList.add('fadeInUp');
            }
            
        }
```
This wil also enable the save_new_user() function.


If the user is not unkown it will check if this username is still the same for 3 times for the same reason as stated above. If the user is known it will show a welcom message with animations. After the welcome message has been shown for 2 seconds it will fade out and show the navigation options. After this it will also login the user using IPC for the main.js file for further editing.

```javascript
else {
            //if faces is known, show the user a welcome message and set global.user to face name
            if (face_name[0] == known_name){
                known_counter++
                if (known_counter > 2){
                    known_counter = 0;
                    SmartMirror_FaceRecognition.kill();  
                    document.getElementById("name").innerHTML = face_name[0];
                    document.getElementById("bericht").classList.add('fadeInUp');
                    remote.getGlobal('user').name = face_name[0];
                    setTimeout(function(){
                        document.getElementById("welkomtekst").classList.add('fadeOut');
                        document.getElementById("welkomtekst").classList.add('slow');
                        setTimeout(function(){
                            document.getElementById("mainNavigator").classList.remove('hidden');
                            document.getElementById("mainNavigator").classList.add('fadeIn');
                            document.getElementById("mainNavigator").classList.add('slow');
                        }, 2000)
                    }, 2000)
                }
            } else {
                setTimeout(function(){
                    known_name = face_name[0];
                    ipcRenderer.send('login', face_name[0])
                    known_counter = 0;
                }, 500)
            }
        }
```
The ``save_new_user()`` function starts up the ``new_face.py`` script with a username as argument using execFile as seen below:
```javascript
var newName = document.getElementById("new_username").value;
    if (newName != ("")){
        var newFacePython = execFile('python3m', ['./plugins/new_face.py', newName], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            myConsole.log(stdout);
        })
```
If the data that the python script sends is "done" it will start the ``start_facial_recognition`` function to check wether a user is saved correctly and show a welcome message. If the python script sends a "No_face" command it will show a message and start the ``save_new_user()`` function again.

```javascript
newFacePython.stdout.on('data',function(data){
            if (data.includes("done")){
                document.getElementById('save_new').disabled = true;
                start_facial();
            } else if(data.includes("No_face")){
                console.log('Opnieuw proberen');
                //alert("Ga voor de spiegel staan, over 5 seconden proberen we het opnieuw");
                setTimeout(function () {
                        save_new_user();
                }, 2500);
            }
        })
```

## Python scripts
**facial.py**
The ``facial.py`` script, located in the folder ``plugins``, will load up a text file named ``all_names.txt`` and with the content of this text document use a for loop to loop trough all the names in this file.
Than it wil try to open a .jpg or .png file with the names saved in the text file.

```python
f=open("./plugins/faces/all_names.txt", "r")
fl = f.readlines()
d={}

known_face_encodings = []
known_face_names = []

# foreach name in the all_names.txt document, get a photo in either png or jpg format.
for x in fl:
    if (os.path.isfile("./plugins/faces/scanned_photo_"+(x.rstrip())+".png")):
        d["face_{0}".format(x.rstrip())]=face_recognition.load_image_file("./plugins/faces/scanned_photo_"+(x.rstrip())+".png")
        d["face_encode_{0}".format(x.rstrip())]=face_recognition.face_encodings(d["face_{0}".format(x.rstrip())])[0]
        known_face_encodings.append(d["face_encode_{0}".format(x.rstrip())])
        known_face_names.append(x.rstrip())
    elif (os.path.isfile("./plugins/faces/scanned_photo_"+(x.rstrip())+".jpg")):
        d["face_{0}".format(x.rstrip())]=face_recognition.load_image_file("./plugins/faces/scanned_photo_"+(x.rstrip())+".jpg")
        d["face_encode_{0}".format(x.rstrip())]=face_recognition.face_encodings(d["face_{0}".format(x.rstrip())])[0]
        known_face_encodings.append(d["face_encode_{0}".format(x.rstrip())])
        known_face_names.append(x.rstrip())

```

After this it will try, with the webcam view opened using opencv, to detect a face and recognize it. If the face is recognized it will send out the name of the user trough ``print()`` and ``sys.stdout.flush()`` to send it to electron.

If the face was not recognized it will send a "unkown" command using ``print()`` and ``sys.stdout.flush()``.

```python
if process_this_frame:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            # If a match was found in known_face_encodings, just use the first one.
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]
                

            face_names.append(name)

            # print and flush the data (to electron)
            print(face_names)
            sys.stdout.flush()
```

When the script is killed, the webcam and opencv will be stopped.

**new_face.py**
The ``new_face.py`` script located in the folder ``plugins`` has to be opened with a username as argument. When the script is opened it will start he webcam and opencv and search for a face in the frame. 
```python
camera = cv2.VideoCapture(0)
while True:
    return_value, image = camera.read()

    rgb_frame = image[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_frame)

```

If there is no face found it will send the command "No_Face" using ``print("No_face")`` and ``sys.stdout.flush()`` to electron.

```python
if not face_locations:
        print("No_face")
        sys.stdout.flush()
```

If there is a face found, it will make a picture and save this picture using the argument as name. After this it will save the username, given with the argument, to the text file ``All_faces.txt``. After this it will send the command "done" using ``print("done")`` and ``sys.stdout.flush()`` to electron.

```python
else:
        cv2.imwrite("./plugins/faces/scanned_photo_" + sys.argv[1].rstrip() +'.jpg', image)

        f=open("./plugins/faces/all_names.txt", "a+")
        f.write(sys.argv[1]+"\r\n")
        # delete camera when done
        del(camera)

        # print "done" and flush it to electron
        print("done")
        sys.stdout.flush()
```

When the process is killed it will also stop opencv and stop the webcam.

### Concept
At the moment the names are saved in the ``all_names.txt`` document. It would be nice to save it in electron using Json. When doing this we can also save the user settings to this json file. It would also be a bit more secure because you cannot find the .json file as easy as the .txt file.

