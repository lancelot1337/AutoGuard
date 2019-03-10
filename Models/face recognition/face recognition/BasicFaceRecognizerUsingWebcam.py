
# coding: utf-8

# In[37]:


import os 
import face_recognition
import sys
from exitstatus import ExitStatus

images = os.listdir('./images')
# detect_image = images[-1]
image_to_be_matched = face_recognition.load_image_file(sys.argv[1])
image_to_be_matched_encoded = face_recognition.face_encodings(image_to_be_matched)[0]
c = 0

for image in images:
    
    # load the image
    current_image = face_recognition.load_image_file('./images/' + image)
    # encode the loaded image into a feature vector
    current_image_encoded = face_recognition.face_encodings(current_image)[0]
    # match your image with the image and check if it matches
    result = face_recognition.compare_faces(
        [image_to_be_matched_encoded], current_image_encoded)
    # check if it was a match
    if (result[0] == True) :
        print ("Match Found: " + image)
    else:
        c=c+1
        continue
if c>len(images)-1:
    print('No Match Found ')



# In[39]:





# In[34]:




