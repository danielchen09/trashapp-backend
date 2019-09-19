from imageai.Detection import ObjectDetection
import os
import json
import sys 
import tensorflow as tf
import cv2
from tensorflow.python.keras.utils import CustomObjectScope
import numpy as np

global model

def relu6(x):
    return tf.keras.activations.relu(x, max_value=6)

with CustomObjectScope({'relu6': relu6}):
    model  = tf.keras.models.load_model('./trashModel/model1.h5')



def detect(image_name, e_path= os.getcwd(), delete = True):
    detector = ObjectDetection()
    detector.setModelTypeAsRetinaNet()
    detector.setModelPath( os.path.join(e_path, "trashModel/" + "resnet50_coco_best_v2.0.1.h5"))
    detector.loadModel()
    detections, objects_paths = detector.detectObjectsFromImage(input_image=image_name, output_image_path=os.path.join(e_path , "temp/output.jpg"), extract_detected_objects=True)

    data = {}
    data['objects'] = []

    np_array = []
    for eachObject, eachObjectPath in zip(detections, objects_path):
        obj = {'points': eachObject['box_points']}
        img = cv2.read(eachObjectPath)
        array = np.asarray(img)
        np_array.append(array)
    
    predictions = model.predict(np.asarray(np_array))

    data = predicitions

    '''

    data = {}
    data['objects'] = []
    for eachObject in detections:
        data['objects'].append(eachObject)
    '''

    if delete:
        os.remove(image_name)
    

    print(json.dumps(data))

if __name__ == '__main__':
    detect(os.path.join(os.getcwd(), "dailyfood.jpg"), delete = False)
else:
    if len(sys.argv) <= 1:
        print({'objects':[]})
    file_name = sys.argv[1]
    detect(os.path.join(os.getcwd(), file_name), delete = True)
