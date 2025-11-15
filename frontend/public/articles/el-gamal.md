# Public-Key Cryptography’s Cornerstone: ElGamal

Diffie-Hellman is a key exchange protocol that allows two parties to communicate over an insecure channel and generate a shared secret key that cannot be learned by a third party. However, this is only a key exchange protocol, meaning it does not directly perform encryption and decryption operations—it only generates a key that can be used in those processes.

Of course, this shared key can be used in an encryption algorithm of our choice, allowing us to perform encryption and decryption. One of the most effective methods that arises from this structure is the **ElGamal cryptosystem**. It builds on the strong mathematical foundation of Diffie-Hellman by adding an encryption layer, turning it into a full cryptosystem.

---
## Schema

To understand the algorithm, we cannot skip our classic pair — **Alice** and **Bob**. This time, Alice and Bob decide to use the ElGamal cryptosystem in their communication. Naturally, **Eve** is once again trying to secretly eavesdrop on the communication.

Before the ElGamal algorithm can be used, certain public parameters must be determined. These parameters can be known not only by Alice and Bob but also by an attacker like Eve, because ElGamal’s security relies not on the secrecy of these parameters, but on the difficulty of solving the underlying mathematical problems.

### Public Parameters
A large prime number **p** is chosen. Then, a multiplicative group modulo p is defined:  
ℤₚ = {0,1,2,…,p-1}, and a primitive root **g** is selected.  
This **g** must be an element of ℤₚ* = {1,2,…,p-1} and must be capable of generating all elements of the group. In other words, the powers of **g** should generate the entire ℤₚ*.

### Key Generation
Let’s assume Alice is responsible for key generation. She chooses a private key and uses it to compute her public key.

Private key: x ∈ {1,2,…,p-2}  
Public key: y = gˣ (mod p)

She then sends the public key **y** to Bob.

### Encryption
Let’s say Bob wants to send Alice a message m ∈ ℤₚ.  
He randomly chooses a number  
k ∈ {1,2,…,p-2} and performs the following calculations:

c₁ = gᵏ (mod p)  
c₂ = m · yᵏ (mod p)

He then sends the encrypted message pair (c₁, c₂) to Alice.

### Decryption
Alice uses her private key to compute s = c₁ˣ (mod p).  
She then takes the modular inverse of s: s⁻¹ (mod p).  
Finally, she retrieves the original message: m = c₂ · s⁻¹ (mod p).

![ElGamal Schema](/article-images/cryptography/elgamal/elgamal-schema.webp)

## How does it work and why is it secure?
When examining Bob’s encrypted message to Alice, we can see an elegant simplification. Replacing Alice’s computation of **s**, we have:  
m = c₂ · (c₁ˣ)⁻¹ (mod p)  
We know that c₁ = gᵏ (mod p) and c₂ = m · yᵏ (mod p). Substituting these in, we get:  
m = m · yᵏ · ((gᵏ)ˣ)⁻¹ (mod p)  
Using y = gˣ (mod p), we have:  
m = m · (gˣ)ᵏ · ((gᵏ)ˣ)⁻¹ (mod p)  
Simplifying further:  
m = m · gᵏˣ · g⁻ᵏˣ (mod p) ⇒ m = m (mod p)

After some simplification and substitution, we understand how it works. But where does the security come from? There are two main aspects:

**1- Discrete Logarithm Problem:** Deriving **x** from Alice’s public key y = gˣ (mod p) is a discrete logarithm problem. That means even if Eve knows y, g, and p, she would need immense computational power to determine x.  
**2- Randomness and Unpredictability:** Even if Eve intercepts c₁ sent by Bob, she cannot decrypt it without knowing Bob’s randomly generated k. Since a new random k is generated for each message, Eve’s job becomes increasingly difficult. And since she also doesn’t know x, she cannot compute gᵏˣ either.

To enhance security, **p** should be chosen very large (2048 bits or more), and the randomly generated **k** value must never be reused.

---

## Upgrading ElGamal

Even though the ElGamal cryptosystem is theoretically secure, this direct version is not widely used in practical applications.

One of the main reasons is that the message **m** must be represented as a numeric value. ElGamal requires the message to be an element of ℤₚ. However, when long texts, images, or videos must be converted into a single number, it complicates data handling and increases system complexity.

Another important reason is **performance limitations**.  
A secure, non-repeating random number **k** must be generated for every encryption operation.  
If randomness is not ensured properly, the security of the system is at risk.  
Additionally, the ciphertext pair (c₁, c₂) takes up roughly **twice as much space** as the original message, which causes inefficiency for large datasets.

---

So, what happens when ElGamal is combined with elliptic curves?  
In that case, we get a cryptosystem that eliminates the performance concerns of classical ElGamal, provides similar security levels with much smaller key sizes (e.g., 256 bits), and operates much faster.  
This is known as **Elliptic Curve ElGamal (EC-ElGamal)**.

Although EC-ElGamal is not always used for direct message encryption, it is widely adopted in **IoT devices**, **blockchain systems**, **encrypted machine learning applications**, and various **cryptographic protocols**.  
Thanks to its low resource consumption and the mathematical structure of elliptic curves, it provides a secure and efficient solution.

In conclusion, ElGamal, in both its classical and elliptic curve forms, continues to be an important cornerstone in the world of cryptography.