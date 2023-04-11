import os
import json

# Define the path to the folder to be enumerated
folder_path = "./rpg_art"

# Define a list to store the image file names
image_files = []

# Define a function to recursively enumerate the folder and collect image file names
def enumerate_folder(folder_path):
    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)
        if os.path.isdir(filepath):
            # Recursively enumerate subfolders
            enumerate_folder(filepath)
        elif os.path.isfile(filepath):
            # Check if the file is an image
            if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
                # Add the image file name to the list
                image_files.append(filepath)

# Call the function to enumerate the folder
enumerate_folder(folder_path)

# Create a dictionary to store the list of image file names
data = {"image_files": image_files}

# Write the dictionary to a JSON file
with open("image_files.json", "w") as outfile:
    json.dump(data, outfile, indent=4)
