# Block and Stream Cipher Tool

[![Vercel](https://vercel.com/button)](https://crypto-bs-cipher-frontend1.vercel.app/)

A web application that allows you to encrypt and decrypt text using both Block Cipher and Stream Cipher algorithms. You can easily secure your messages or decode existing ciphertext directly in your browser.

**✨ Check it out live here: [https://crypto-bs-cipher-frontend1.vercel.app/](https://crypto-bs-cipher-frontend1.vercel.app/) ✨**

## Key Features

* **Cipher Selection:** Allows users to choose between a Block Cipher and a Stream Cipher.
* **Operation Selection:** Enables users to select between Encryption and Decryption.
* **Plain Text Input:** A text area for users to enter the text they want to encrypt.
* **Key Input:** A single input field for the encryption/decryption key (as a string).
* **Cipher Text Output:** A text area to display the resulting Cipher Text in Hexadecimal or Base64 format after encryption.
* **Cipher Text Input Type (for Decryption):** When decrypting, this area allows users to paste the Hexadecimal or Base64 encoded Cipher Text.
* **Output Display (Plain Text):** After successful decryption, the original Plain Text is displayed.
* **Instructions:** Basic instructions on how to use the tool.

## How to Use

1. Select Cipher.
2. Select the input type of the text (Plain Text for Encryption, Hex or Base 64 for Decryption).
3. Enter your input text in the text area. 
4. Enter the secret key to be used during the process.
5. Select the output format (Plain Text for Decryption, Hex or Base 64 for Encryption).
6. Click the "Encrypt" button if you enter the plain text or click the "Decrypt" button if you enter the cipher text.
7. Click “Submit” to view the output result in the large text area on the right-hand side of the screen.

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

* Database for Storing User Keys (with appropriate security considerations): Implement a database to store user keys, allowing for potential future features like user accounts and key management.  This would require careful consideration of security best practices for key storage.
* Improve User Interface: Enhance the user interface for better usability and visual appeal.
* Implement Key Generation: Add functionality to generate cryptographic keys within the application, with clear warnings about the importance of secure key management.


## Team members

* **Nho Tomaneath:** Frontend 
* **Noy Chalinh:** Backend for Stream Cipher 
* **Taing Hokseng:** Backend for Block Cipher 
* **Taing Bunsou:** Team Lead and DevOps 
