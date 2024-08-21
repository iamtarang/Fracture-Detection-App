import tkinter as tk
from tkinter import filedialog
import requests

class FractureDetectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Fracture Detection App")
        self.root.geometry("400x300")

        # Colors
        bg_color = "#f0f0f0"
        button_bg = "#4caf50"
        button_fg = "#ffffff"

        # File Upload Section
        self.file_label = tk.Label(root, text="Upload X-ray Image:", bg=bg_color)
        self.file_label.pack(pady=10)

        self.upload_button = tk.Button(root, text="Upload Image", bg=button_bg, fg=button_fg, command=self.upload_image)
        self.upload_button.pack(pady=5)

        # Response Section
        self.response_label = tk.Label(root, text="Fracture Type:", bg=bg_color)
        self.response_label.pack(pady=10)

        self.response_text = tk.Text(root, height=5, width=50)
        self.response_text.pack(pady=5)

    def upload_image(self):                                                                                                                         
        filename = filedialog.askopenfilename(title="Select X-ray Image", filetypes=(("Image files", "*.jpg *.jpeg *.png"), ("All files", "*.*")))
        if filename:
            try:
                files = {'uploadImg': open(filename, 'rb')}
                response = requests.post('http://localhost:5000/upload', files=files)
                if response.status_code == 200:
                    self.response_text.delete(1.0, tk.END)
                    self.response_text.insert(tk.END, response.json()["message"])
                else:
                    self.response_text.delete(1.0, tk.END)
                    self.response_text.insert(tk.END, "Error: Failed to detect fracture.")
            except Exception as e:
                self.response_text.delete(1.0, tk.END)
                self.response_text.insert(tk.END, "Error: " + str(e))

if __name__ == "__main__":
    root = tk.Tk()
    app = FractureDetectionApp(root)
    root.mainloop()
