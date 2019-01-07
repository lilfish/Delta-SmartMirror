import face_recognition
import cv2
import sys

camera = cv2.VideoCapture(0)
while True:
    return_value, image = camera.read()

    rgb_frame = image[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_frame)

    if not face_locations:
        print("No_face")
        sys.stdout.flush()
    else:
        cv2.imwrite("./plugins/faces/scanned_photo_" + sys.argv[1].rstrip() +'.jpg', image)

        f=open("./plugins/faces/all_names.txt", "a+")
        f.write(sys.argv[1]+"\r\n")

        del(camera)

        print("done")
        sys.stdout.flush()

video_capture.release()
cv2.destroyAllWindows()

