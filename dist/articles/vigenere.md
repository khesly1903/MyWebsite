# Le Chiffre Indéchiffrable

The origins of this method can be traced back to **45 BCE**, with **Julius Caesar**. The Roman Emperor employed a simple shift cipher to encrypt messages sent to his soldiers. This technique involved shifting each letter by a fixed number and is now known as the **Caesar cipher**. However, the simplicity of this encryption method rendered it vulnerable to decryption over time.

The primary flaw of the Caesar cipher was that it was a **monoalphabetic cipher**, meaning each letter in the plaintext was encrypted using a single letter. In contrast, **polyalphabetic ciphers** utilize different keys for each letter, necessitating the use of multiple alphabets. This idea was first proposed by **Giovan Battista Bellaso** in his 1553 work *La cifra del Sig. Giovan Battista Bellaso*. In Bellaso’s method, a **keyword** was selected, and the message was encrypted according to this keyword. This approach reduced the frequency of repeating letters, thereby making the cipher more resistant to **frequency analysis**.

In Bellaso’s system, a fixed key was employed, and the entire plaintext was encrypted accordingly. Subsequently, in 1586, **Blaise de Vigenère** published his treatise *Traité des chiffres*, in which he discussed Bellaso’s encryption system and further developed it through his own contribution: the **autokey cipher**. However, over time, Bellaso’s method was overshadowed, and the system became known as the **Vigenère cipher**. Notably, while the method is now attributed to Vigenère, Bellaso’s original contributions have largely been overlooked.

In summary, Vigenère reintroduced Bellaso’s cipher method **33 years later**, and over time, this method came to be known as the **Vigenère cipher**.

![Julius Caesar — Giovan Battista Bellaso — Blaise de Vigenère](/article-images/cryptography/vigenere/vigenere0.webp)

Pre-determined keys, often derived from long and complex texts such as a poem or a specific section of a book, have been used securely by **secret organizations**, **governments**, and **military units** for many years. Particularly during the **18th and 19th centuries**, Vigenère encryption was favored by numerous intelligence agencies and in diplomatic correspondence. Even if encrypted messages were intercepted, they were deemed impossible to decrypt without knowledge of the key.

---

### Caesar Cipher and Vigenère Cipher

In the **Caesar cipher**, each letter in the plaintext is assigned a numerical value and is then shifted by a predetermined number (the key). This number is referred to as the **key**, although it is important to note that the key can be represented not only as a number but also by selecting a letter and using its corresponding numerical value.

For example, by adding **4** to the numerical values of the letters in the plaintext (which can also be thought of as the letter **‘E’**), the encryption can be performed as follows:

![Caesar ciphering with E](/article-images/cryptography/vigenere/vigenere1.webp)

If adding the number causes the value to exceed **25** (with ‘a’ considered as **0**), **modular arithmetic** is used to perform the operation, as there would be no corresponding letter for that value. Specifically, we divide by **26** and take the remainder.

The **Vigenère cipher** is quite simple, similar to the Caesar cipher. However, in this case, the key is chosen as a **word or sentence** (with spaces, numbers, and special characters omitted), and the numerical value of the chosen key is calculated. The key is then repeated as many times as necessary to match the length of the plaintext, and encryption is performed accordingly.

Since the **Caesar cipher** is monoalphabetic and the **Vigenère cipher** is polyalphabetic, their differences can be seen most simply as follows:

In the Caesar cipher, a **single alphabet** is sufficient. When the key is combined with the alphabet, a **single-line table** is created. For example, considering the previous example, the table would look like this:

![Caesar ciphering table with E](/article-images/cryptography/vigenere/vigenere2.webp)

In the Vigenère cipher, since **two alphabets** are used, we require a table known as the **Tabula Recta**.

![Tabula Recta](/article-images/cryptography/vigenere/vigenere3.webp)

Alternatively, one can use sophisticated tools such as the **Alberti Cipher Disc**.

![Alberti Cipher Disc](/article-images/cryptography/vigenere/vigenere4.webp)

Therefore, it can be said that the Vigenère cipher is an **advanced form of the Caesar cipher**. In the Caesar cipher, only one column from the Tabula Recta is selected, and the entire plaintext is encrypted according to that column. However, the Vigenère cipher takes this a step further by encrypting each letter of the plaintext with a different letter. This makes **frequency analysis** more challenging.

For example, let’s use the plaintext **“CRYPTOGRAPHY”** and the key **“KEY”**.

![Vigenère ciphering with "key"](/article-images/cryptography/vigenere/vigenere5.webp)

For decryption, we apply the **subtraction operation**.

![Vigenère deciphering with "key"](/article-images/cryptography/vigenere/vigenere6.webp)

Of course, it is not always just a single word that is encrypted. When encrypting the plaintext, **spaces**, **numbers**, or **special characters** are ignored. If the key does not exactly cover the plaintext, the key should be truncated at the point where the plaintext ends. If the key is longer than the plaintext, only the portion of the key that matches the length of the plaintext should be used.

For example, let’s encrypt the plaintext **“CRYPTO IS FUN 1729 !”** with the key **“KEY”**:

![Vigenère ciphering with "key"](/article-images/cryptography/vigenere/vigenere7.webp)

---

### Le Chiffre Indéchiffrable (Unbreakable Cipher)

Although it may seem simple to us now, the **Vigenère cipher** was considered an **unbreakable and unsolvable encryption method for 300 years**. One of the main reasons for this was that the technology of the time was unable to perform such deep analysis and was not fast enough; however, 300 years is indeed a long time.

Initially, the Vigenère cipher, like the Caesar cipher, is quite resistant to **simple frequency analysis**. In frequency analysis, frequently used letters (such as **E**, **A**, **R**, **I** in English) are considered, and the corresponding letters in the ciphertext are examined. For instance, assuming that the most commonly used letter is **E**, the most frequent letter in the encrypted message is likely to be the encrypted form of E. In short, unlike the Caesar cipher, the change of letters has not just one possibility, but **26 different possibilities**, which complicates the analysis.

After 300 years, in the **19th century**, **Friedrich Kasiski** and **Charles Babbage** brought an end to this reign. In the test they named the **Kasiski Test**, they made it possible to determine the **key length** by analyzing repeating letter groups. Once the key length is discovered, frequency analysis can be performed on each letter within every group to find the key. In other words, when the key length is found, the plaintext can be divided into groups of the key length, and each group can be decrypted like a Caesar cipher.

Although today’s technology and various methods can break the Vigenère cipher, with the selection of a **sufficiently long and random key** of the same length as the plaintext, it can become **unbreakable again**. This creates a perfect encryption like the **One-Time Pad (OTP)**.  
Finally, we can conclude that with a random key of the same length as the plaintext, the **Vigenère cipher** can become **unbreakable once more!**