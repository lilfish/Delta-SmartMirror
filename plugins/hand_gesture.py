import cv2
import numpy as np
from matplotlib import pyplot as plt
import face_recognition
import time
import math
import sys
import os  

video_capture = cv2.VideoCapture(0)

bgSubThreshold = 50
learningRate = 0
value_1 = 0
counter = 0
found_face = False

bgModel = cv2.createBackgroundSubtractorMOG2(0, bgSubThreshold)

def removeBG(frame):
    fgmask = bgModel.apply(frame,learningRate=learningRate)
    # kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    # res = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, kernel)

    kernel = np.ones((3, 3), np.uint8)
    fgmask = cv2.erode(fgmask, kernel, iterations=1)
    res = cv2.bitwise_and(frame, frame, mask=fgmask)
    return res

def calculateFingers(res,drawing):  # -> finished bool, cnt: finger count
    #  convexity defect
    hull = cv2.convexHull(res, returnPoints=False)
    if len(hull) > 3:
        defects = cv2.convexityDefects(res, hull)
        if type(defects) != type(None):  # avoid crashing.   (BUG not found)

            cnt = 0
            for i in range(defects.shape[0]):  # calculate the angle
                s, e, f, d = defects[i][0]
                start = tuple(res[s][0])
                end = tuple(res[e][0])
                far = tuple(res[f][0])
                a = math.sqrt((end[0] - start[0]) ** 2 + (end[1] - start[1]) ** 2)
                b = math.sqrt((far[0] - start[0]) ** 2 + (far[1] - start[1]) ** 2)
                c = math.sqrt((end[0] - far[0]) ** 2 + (end[1] - far[1]) ** 2)
                angle = math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c))  # cosine theorem
                if angle <= math.pi / 2:  # angle less than 90 degree, treat as fingers
                    cnt += 1
                    cv2.circle(drawing, far, 8, [211, 84, 0], -1)
            return True, cnt
    return False, 0

while True:
    ret, original = video_capture.read()

    original = cv2.bilateralFilter(original, 5, 50, 100)  # smoothing filter
    original = cv2.flip(original, 1)  # flip the frame horizontally

    
    # Create a big rectangle cus we don't need that
    height, width, channels = original.shape
    upper_left = (int(width / 4), int(height))
    bottom_right = (int(width * 3 / 4), int(0))
    cv2.rectangle(original, upper_left, bottom_right, (255, 0, 255), cv2.FILLED)


    # third_upper_left = (int(0), int(0))
    # third_bottom_right = (int(width), int(height / 3))
    # cv2.rectangle(original, third_upper_left, third_bottom_right, (0, 255, 255), cv2.FILLED)

    img = removeBG(original)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (25, 25), 0)
    cv2.imshow('blur', blur)
    ret, thresh = cv2.threshold(blur, 50, 255, cv2.THRESH_BINARY)

    _,contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    length = len(contours)
    maxArea = -1
    if length > 0:
        for i in range(length):  # find the biggest contour (according to area)
            temp = contours[i]
            area = cv2.contourArea(temp)
            c = max(temp, key = cv2.contourArea)
            x,y,w,h = cv2.boundingRect(c)
            if area > maxArea:
                maxArea = area
                ci = i

        res = contours[ci]
        hull = cv2.convexHull(res)
        drawing = np.zeros(img.shape, np.uint8)
        cv2.drawContours(drawing, [res], 0, (0, 255, 0), 2)
        cv2.drawContours(drawing, [hull], 0, (0, 0, 255), 3)
        isFinishCal,cnt = calculateFingers(res,drawing)
        if isFinishCal is True and cnt <= 2:
            # print (cnt)
            if cnt > 1:
                # print(value_1, x)
                

                if value_1 == 0:
                    value_1 = x
                
                if value_1 > 500 and x < 160:
                    print("LEFT")
                    sys.stdout.flush()
                    counter = 0
                    value_1 = 0
                    time.sleep(1)
                elif value_1 < 160 and x > 500:
                    print("Right")
                    sys.stdout.flush()
                    counter = 0
                    value_1 = 0
                    time.sleep(1)
            counter = counter + 1
            if counter == 15:
                value_1 = 0
                counter = 0


    cv2.imshow('output', drawing)
    
    cv2.imshow('original', original)
    # cv2.imshow('frame2', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


video_capture.release()
cv2.destroyAllWindows()