from Crypto.Cipher import AES #the encryption algorithm we're using 
from Crypto.Random import get_random_bytes #to make a random IV
from Crypto.Util.Padding import pad, unpad #to make sure the text fits the encryption block size
import base64
import binascii # to convert encrypted data to text formats (base64/hex)

def encrypt(plaintext, key): # Created a function called encrypt
    key = key.encode('utf-8')[:32].ljust(32, b'\0')
    # "key.encode('utf-8')": Turns the secret key(String) into bytes.
    # "[32]": Cuts the key to max 32 bytes (AES supports from 16 bytes to 32 bytes and this one use 32 bytes)
    # ".ljust(32, b'\0')": If the key is too short, it adds 0s to reach 32 bytes, to ensure the key is always 32 bytes long

    iv = get_random_bytes(16) 
    # IV = Initialization Vector 
    # It is a random extra data added to make encryption different every time.

    cipher = AES.new(key, AES.MODE_CBC, iv) # This sets up the AES encryption engine
    # "AES.MODE_CBC": CBC = Cipher Block Chaining mode (standard method)
    # Uses the "key" and "iv" to begin

    padded = pad(plaintext.encode('utf-8'), AES.block_size) # Turns messages into bytes (using UTF-8)
    # pad() here is to add extra characters if the message isn't the right length

    encrypted = cipher.encrypt(padded)
    # This scrambles the padded message using the key and IV
    # The output is in binary

    combined = iv + encrypted
    # We combine the IV and the encrypted message

    print("🔐 Encrypted!")
    print("Hex:     ", binascii.hexlify(combined).decode()) 
    print("Base64:  ", base64.b64encode(combined).decode())
    # We convert the binary result into two text formats (Hexadecimal and Base64)

def decrypt(ciphertext, key, mode): # Reverse function (unscramble the message)
    key = key.encode('utf-8')[:32].ljust(32, b'\0')
    # same as encryption ensure the key is 32 bytes long and in bytes format
    try: 
        if mode == 'hex':
            combined = binascii.unhexlify(ciphertext)
            # Convert hex back to bytes
        elif mode == 'base64':
            combined = base64.b64decode(ciphertext)
            # Convert base64 back to bytes
        else:
            print("❌ Invalid mode (use 'hex' or 'base64')")
            return

        iv = combined[:16]
        # iv is the first 16 bytes

        encrypted = combined[16:]
        # encrypted = the rest 16 bytes

        cipher = AES.new(key, AES.MODE_CBC, iv)
        # recreate the AES machine using the same key and iv

        decrypted = unpad(cipher.decrypt(encrypted), AES.block_size)
        # first part "cipher.decrypt(encrypted)" is to take encrypted message and use the AES machine to turn it back to the orginal
        # second part "AES.block_size" it checks data and removes the padding to turn it back to the orginal message
        
        print("✅ Decrypted text:", decrypted.decode('utf-8'))
    except Exception as e:
        print("❌ Decryption failed:", str(e))


print("Block Cipher Tool")
print("=================\n")
print("1. Encrypt\n2. Decrypt")
choice = input("Choose (1/2): ")

if choice == "1":
    text = input("Enter plaintext: ")
    key = input("Enter secret key: ")
    encrypt(text, key)

elif choice == "2":
    enc = input("Paste encrypted text: ")
    mode = input("Format (hex/base64): ").lower()
    key = input("Enter secret key: ")
    decrypt(enc, key, mode)

else:
    print("❌ Invalid choice.")
