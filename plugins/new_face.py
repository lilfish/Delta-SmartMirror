import face_recognition
import cv2
import sys

camera = cv2.VideoCapture(0)
return_value, image = camera.read()

face_locations = face_recognition.face_locations(image)

if not face_locations:
    print("No_face")
else:
    cv2.imwrite("./plugins/faces/scanned_photo_" + sys.argv[1].rstrip() +'.png', image)

    f=open("./plugins/faces/all_names.txt", "a+")
    f.write(sys.argv[1]+"\r\n")

    del(camera)

    print("done")