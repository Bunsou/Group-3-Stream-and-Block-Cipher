#Stream Cipher
import base64
import hashlib
import hmac

def key_stream_generator(key, length, salt=b'stream_salt'):
    """Securely generates a deterministic keystream using PBKDF2-HMAC."""
    
    key_bytes = hashlib.pbkdf2_hmac(
        hash_name='sha256',
        password=key.encode(),
        salt=salt,
        iterations=100_000,
        dklen=length
    )
    return list(key_bytes)

def encrypt(plain_text, key):
    plain_bytes = plain_text.encode('utf-8')
    # Generate a keystream of the same length as the plaintext
    keystream = key_stream_generator(key, len(plain_bytes))
    cipher_bytes = bytes([b ^ k for b, k in zip(plain_bytes, keystream)])
    return cipher_bytes

def decrypt(cipher_bytes, key):
    # Generate a keystream of the same length as the ciphertext
    keystream = key_stream_generator(key, len(cipher_bytes))
    plain_bytes = bytes([b ^ k for b, k in zip(cipher_bytes, keystream)])
    try:
        return plain_bytes.decode('utf-8')
    except UnicodeDecodeError:
        return None

def main():
    # Ask the user whether they want to encrypt or decrypt
    mode = input("Do you want to encrypt or decrypt? (e/d): ").strip().lower()

    if mode == 'e':
        # Encryption mode
        plaintext = input("Enter the plaintext: ")
        key = input("Enter the key: ")
        
        # Encrypt the plaintext
        encrypted = encrypt(plaintext, key)

        print("\nEncrypted Output:")

        # Show the encrypted bytes in hex format
        hex_output = ' '.join(f'{b:02x}' for b in encrypted)
        print("Hex      :", hex_output)

        # Show the encrypted bytes in Base64 format
        b64_output = base64.b64encode(encrypted).decode()
        print("Base64   :", b64_output)

    elif mode == 'd':
        # Decryption mode
        format_choice = input("Enter the input format (hex/base64): ").strip().lower()

        # Validate input format
        if format_choice not in ('hex', 'base64'):
            print("❌ Unsupported format. Choose 'hex' or 'base64'.")
            return

        # Get encrypted input and key from user
        encrypted_input = input("Enter the ciphertext: ")
        key = input("Enter the key: ")

        try:
            # Decode input based on selected format
            if format_choice == 'hex':
                # Convert hex values (space-separated) to bytes
                hex_parts = encrypted_input.strip().split()
                cipher_bytes = bytes(int(part, 16) for part in hex_parts)
            elif format_choice == 'base64':
                # Decode Base64 to bytes
                cipher_bytes = base64.b64decode(encrypted_input)
        except Exception as e:
            # Handle decoding errors
            print(f"❌ Failed to decode the input: {e}")
            return

        # Display the decoded cipher bytes
        print("\nCipher Bytes:")
        print("Hex     :", ' '.join(f'{b:02x}' for b in cipher_bytes))
        print("Base64  :", base64.b64encode(cipher_bytes).decode())
        print("Key     :", key)

        # Attempt to decrypt the cipher bytes using the key
        decrypted = decrypt(cipher_bytes, key)
        
        if decrypted is None:
            # Decryption failed (likely due to wrong key or corrupted ciphertext)
            print("❌ Decryption failed. Possibly incorrect key or corrupted ciphertext.")
        else:
            # Show successfully decrypted text
            print("✅ Decrypted text:", decrypted)

    else:
        # Invalid mode selected
        print("❌ Invalid option. Choose 'e' for encryption or 'd' for decryption.")

if __name__ == "__main__":
    main()
