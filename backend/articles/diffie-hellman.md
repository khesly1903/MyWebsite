# Diffie-Hellman Key Exchange: The First Step to Secure Communication

Suppose you have a highly important document and you want to send it encrypted to someone. If you consulted a cryptographer, they would likely present two main options: key-based and keyless encryption methods.

Most likely, they would tell you that keyless encryption is now outdated and key-based encryption offers much stronger security. However, you immediately face a problem: the recipient is far away, and no shared key was established beforehand.

This is exactly where your cryptographer steps in and offers a solution: the Diffie-Hellman Key Exchange. With this method, even if you’ve never met the recipient before, no one else can understand your document—except for the intended recipient, of course.

And so begins your encryption adventure…

---

Whitfield Diffie and Martin Hellman had exactly this goal in mind. How could two independent people create a shared key over an insecure channel? This simple but revolutionary question laid the foundations for modern asymmetric cryptography and public-key cryptography.

In fact, the first mathematical steps were initially taken at the British intelligence agency (GCHQ). However, these works were kept secret for many years and not publicly disclosed. Therefore, these revolutionary ideas are associated with the surnames of the two Americans who first published them openly.

---

So, how can two distant people generate a shared key? Here enter the legendary cryptography characters: Alice and Bob.

**Public Parameters**  
Alice and Bob agree on a large prime number, denoted as p. This number will be used as the modulus, and they also choose a number g capable of producing all distinct residues modulo p—a primitive root. Alternatively, Alice may first choose p and g and send them to Bob.

**Private Computations**  
Alice randomly selects a number a and computes: 𝐴 ≡ 𝑔ᵃ (mod 𝑝)  
Bob randomly selects a number b and computes: 𝐵 ≡ 𝑔ᵇ (mod 𝑝)  
These numbers a and b are private keys and must be kept secret.

**Public Exchange**  
Alice sends her computed value A to Bob.  
Bob sends his computed value B to Alice.  
There is no problem sending A and B over an insecure channel.

**Shared Secret Key Computation**  
Alice computes the shared key using received B and her private a: 𝐵ᵃ (mod 𝑝)  
Bob computes the shared key using received A and his private b: 𝐴ᵇ (mod 𝑝)  
Through these operations, both Alice and Bob obtain the same shared secret key K:  
𝐾 ≡ 𝐵ᵃ ≡ (𝑔ᵇ)ᵃ ≡ 𝑔ᵃᵇ ≡ (𝑔ᵃ)ᵇ ≡ 𝐴ᵇ (mod 𝑝)

![Diffie-Hellman Schema](https://r2.kayaberkay.org/cryptography/diffie-hellman/diffie-hellman-schema.webp)

Now suppose the legendary eavesdropper Eve is observing this exchange. She might capture the prime p, primitive root g, A sent from Alice to Bob, and B sent from Bob to Alice. Even with all this information, she would need an enormous amount of computational power to calculate K. To find K, she would need one of the private keys a or b. In other words, she cannot compute 𝐾 = 𝑔ᵃᵇ (mod p) or 𝐾 ≡ 𝐵ᵃ (mod 𝑝) without them.

The problem Eve faces is called the **Discrete Logarithm Problem (DLP)**. For sufficiently large numbers, this is nearly impossible for classical computers to solve.

For example, Eve might try to calculate a by solving 𝐴 ≡ 𝑔ᵃ (mod 𝑝). Without an algorithm for DLP, she would have to attempt a brute-force search.

It’s worth noting that p is an extremely large number. A 2048-bit number is approximately 617 digits long. To find a or b, Eve would need a quantum computer or, metaphorically, an elixir of immortality.

---

Today, **Elliptic Curve Diffie-Hellman (ECDH)** is much more widely used than classical Diffie-Hellman. The main reason is that ECDH can provide the same security level with much smaller key sizes.

Classical Diffie-Hellman relies on the hardness of the Discrete Logarithm Problem (DLP), which requires very large prime numbers—typically 2048 bits or more.

On the other hand, ECDH bases its security on the **Elliptic Curve Discrete Logarithm Problem (ECDLP)**. This problem is significantly more complex than classical DLP, allowing much smaller keys to achieve equivalent security. For instance, the security of a 2048-bit classical DH key corresponds roughly to a 224-bit ECDH key.

---

Thus, you now have a key that no one other than the intended recipient can obtain. However, you only have the key; you haven’t decided on an encryption algorithm yet. Your cryptographer would also suggest an encryption method. At least you’re halfway there.
