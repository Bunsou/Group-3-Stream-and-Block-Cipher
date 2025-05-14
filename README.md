# Block and Stream Cipher Tool

[![Vercel](https://vercel.com/button)](https://crypto-bs-cipher-frontend1.vercel.app/)

A web application that allows you to encrypt and decrypt text using both Block Cipher and Stream Cipher algorithms. You can easily secure your messages or decode existing ciphertext directly in your browser.

**✨ Check it out live here: [https://crypto-bs-cipher-frontend1.vercel.app/](https://crypto-bs-cipher-frontend1.vercel.app/) ✨**

## Key Features

* **Block Cipher Encryption:** Encrypt your plain text using a robust block cipher algorithm.
* **Block Cipher Decryption:** Decrypt ciphertext that was encrypted using the block cipher.
* **Stream Cipher Encryption:** Encrypt your plain text using an efficient stream cipher algorithm.
* **Stream Cipher Decryption:** Decrypt ciphertext that was encrypted using the stream cipher.
* **Plain Text Input/Output:** Easily type or paste your text directly.
* **Hexadecimal Input/Output:** Option to work with data in hexadecimal format.
* **Key Input:** Securely enter your secret key for encryption and decryption.
* **Clear User Interface:** Intuitive and easy-to-understand design for a seamless experience.

## How to Use

1.  **Select Cipher:** Choose between "Block Cipher" and "Stream Cipher" using the options at the top.
2.  **Enter Plain Text/Ciphertext:** Type or paste the text you want to encrypt or decrypt into the left text area.
3.  **Select Input Format:** Choose whether your input is in "Plain Text" or "Hex" format.
4.  **Enter Key:** Provide the secret key that will be used for the encryption or decryption process.
5.  **Select Output Type:** Choose whether you want the result to be displayed in "Plain Text" or "Hex" format.
6.  **Encrypt/Decrypt:** Click the "Encrypt" button if you've entered plain text, or the "Decrypt" button if you've entered ciphertext.
7.  **View Output:** The result of the operation will appear in the text area on the right.

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask (for the API)
* Flask-CORS (for handling Cross-Origin Resource Sharing)
* PyCryptodome (`Crypto`) (for cryptographic algorithms)

## Deployment

This web application utilizes Vercel for both the frontend and the backend deployment, providing a fast and reliable experience.

* **Frontend:** Hosted on Vercel ([https://crypto-bs-cipher-frontend1.vercel.app/](https://crypto-bs-cipher-frontend1.vercel.app/))
* **Backend:** Also deployed as a serverless function on Vercel.

## Future Enhancements

* Support for more cipher algorithms and modes.
* Key generation and management tools.
* More advanced input/output format options (e.g., Base64).
* Improved error handling and user feedback.


## Team members

* Nho Tomaneath
* Noy Chalinh
* Taing Bunsou
* Taing Hokseng
