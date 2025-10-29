# Le Chiffre Indéchiffrable

Bu yöntemin kökenleri **M.Ö. 45 yılına** kadar uzanır. **Julius Caesar**, askerlerine gönderdiği mesajları şifrelemek için basit bir kaydırma (shift) yöntemi kullanıyordu. Bu teknik, her harfin belirli bir sayıda kaydırılması esasına dayanıyordu ve bugün **Caesar şifresi** olarak bilinir. Ancak, bu yöntemin basitliği zamanla onu çözülmeye açık hale getirmiştir.

Caesar şifresinin temel zayıflığı, bir **monoalfabetik şifre** olmasıydı — yani, düz metindeki her harf tek bir harfle şifreleniyordu. Buna karşılık, **polialfabetik şifreler**, her harf için farklı anahtarlar kullanır ve birden fazla alfabe gerektirir. Bu fikir ilk olarak **Giovan Battista Bellaso** tarafından 1553 tarihli *La cifra del Sig. Giovan Battista Bellaso* adlı eserinde ortaya atılmıştır. Bellaso’nun yönteminde bir **anahtar kelime (keyword)** seçiliyor ve mesaj bu kelimeye göre şifreleniyordu. Bu yaklaşım, tekrar eden harflerin frekansını azalttığı için **frekans analizine** karşı daha dirençliydi.

Bellaso’nun sisteminde sabit bir anahtar kullanılıyor ve tüm düz metin buna göre şifreleniyordu. Daha sonra, 1586 yılında **Blaise de Vigenère**, *Traité des chiffres* adlı eserini yayımlayarak Bellaso’nun yöntemini tartıştı ve kendi katkısı olan **otokey (autokey) şifresi** ile geliştirdi. Ancak zamanla Bellaso’nun yöntemi unutuldu ve sistem **Vigenère şifresi** olarak anılmaya başlandı. İlginçtir ki, günümüzde bu yöntem Vigenère’e atfedilse de, Bellaso’nun katkıları büyük ölçüde göz ardı edilmiştir.

Özetle, Vigenère, Bellaso’nun şifreleme yöntemini **33 yıl sonra yeniden tanıtmış** ve zamanla bu yöntem **Vigenère şifresi** olarak tanınmıştır.

![Julius Caesar — Giovan Battista Bellaso — Blaise de Vigenère](/article-images/cryptography/vigenere/vigenere0.webp)

Önceden belirlenmiş anahtarlar, genellikle bir şiir ya da bir kitabın belirli bölümü gibi uzun ve karmaşık metinlerden türetilir ve **gizli örgütler**, **hükûmetler** ve **askeri birimler** tarafından uzun yıllar boyunca güvenle kullanılmıştır. Özellikle **18. ve 19. yüzyıllarda**, Vigenère şifrelemesi pek çok istihbarat servisi ve diplomatik yazışmada tercih edilmiştir. Şifreli mesajlar ele geçirilse bile, anahtar bilinmeden çözülmesi imkânsız olarak görülüyordu.

---

### Caesar Şifresi ve Vigenère Şifresi

**Caesar şifresinde**, düz metindeki her harfe bir sayısal değer atanır ve her harf belirli bir sayı kadar kaydırılır. Bu sayı **anahtar (key)** olarak adlandırılır, ancak bu anahtar bir sayı olabileceği gibi, bir harf seçilip onun sayısal değeri de kullanılabilir.

Örneğin, düz metindeki harflerin sayısal değerlerine **4** eklenirse (ya da bu **‘E’** harfi olarak düşünülürse), şifreleme şu şekilde yapılır:

![Caesar ciphering with E](/article-images/cryptography/vigenere/vigenere1.webp)

Eğer toplama işlemi sonucu değer **25’i** (yani ‘a’ = 0 olacak şekilde) aşarsa, karşılık gelen bir harf bulunamayacağından **modüler aritmetik** kullanılır. Bu durumda sayı **26’ya bölünür** ve kalanı alınır.

**Vigenère şifresi**, Caesar şifresine oldukça benzer ama burada anahtar bir **kelime veya cümle** olarak seçilir (boşluklar, sayılar ve özel karakterler çıkarılır) ve seçilen anahtarın sayısal değeri hesaplanır. Anahtar, düz metnin uzunluğu kadar tekrar edilerek şifreleme buna göre yapılır.

Caesar şifresi **monoalfabetik**, Vigenère şifresi ise **polialfabetik** olduğu için aralarındaki farkı şu şekilde gösterebiliriz:

Caesar şifresinde tek bir alfabe yeterlidir. Anahtar ile alfabeti birleştirince **tek satırlı bir tablo** oluşur. Örneğin, önceki örneğe göre tablo şu şekildedir:

![Caesar ciphering table with E](/article-images/cryptography/vigenere/vigenere2.webp)

Vigenère şifresinde ise **iki alfabe** kullanıldığından, **Tabula Recta** adı verilen bir tabloya ihtiyaç duyulur.

![Tabula Recta](/article-images/cryptography/vigenere/vigenere3.webp)

Alternatif olarak, **Alberti Şifre Diski (Alberti Cipher Disc)** gibi gelişmiş araçlar da kullanılabilir.

![Alberti Cipher Disc](/article-images/cryptography/vigenere/vigenere4.webp)

Bu nedenle Vigenère şifresi, Caesar şifresinin **gelişmiş bir versiyonu** olarak görülebilir. Caesar şifresinde Tabula Recta’daki sadece **bir sütun** seçilir ve tüm düz metin buna göre şifrelenir. Ancak Vigenère şifresinde her harf, farklı bir sütunla şifrelenir. Bu da **frekans analizini** oldukça zorlaştırır.

Örneğin, düz metin olarak **“CRYPTOGRAPHY”**, anahtar olarak **“KEY”** kullanılsın:

![Vigenère ciphering with "key"](/article-images/cryptography/vigenere/vigenere5.webp)

Çözme işlemi (decryption) içinse **çıkarma işlemi** uygulanır:

![Vigenère deciphering with "key"](/article-images/cryptography/vigenere/vigenere6.webp)

Tabii ki, her zaman tek kelimelik metinler şifrelenmez. Şifreleme sırasında **boşluklar**, **sayılar** ve **özel karakterler** göz ardı edilir. Eğer anahtar düz metinden kısa ise, anahtar gerektiği kadar tekrar edilir. Eğer anahtar uzun ise, yalnızca düz metin uzunluğu kadar kısmı kullanılır.

Örneğin, **“CRYPTO IS FUN 1729 !”** metnini **“KEY”** anahtarıyla şifreleyelim:

![Vigenère ciphering with "key"](/article-images/cryptography/vigenere/vigenere7.webp)

---

### Le Chiffre Indéchiffrable (Kırılamaz Şifre)

Bugün bize basit gibi görünse de, **Vigenère şifresi**, **yaklaşık 300 yıl boyunca kırılamaz bir şifreleme yöntemi** olarak kabul edilmiştir. Bunun en önemli sebeplerinden biri, dönemin teknolojisinin bu kadar derin analizleri yapabilecek kadar gelişmiş ve hızlı olmamasıdır. Ancak 300 yıl, gerçekten de çok uzun bir süredir.

Vigenère şifresi, tıpkı Caesar şifresi gibi **basit frekans analizine** oldukça dayanıklıdır. Frekans analizinde, sık kullanılan harfler (örneğin İngilizcede **E**, **A**, **R**, **I**) dikkate alınır ve şifreli metindeki karşılıkları incelenir. Örneğin, şifreli metindeki en sık harfin **E’nin şifrelenmiş hâli** olabileceği varsayılır. Ancak Vigenère’de her harf farklı bir alfabe ile şifrelendiği için, tek bir olasılık yerine **26 farklı olasılık** vardır — bu da çözümlemeyi zorlaştırır.

**19. yüzyıla** gelindiğinde, **Friedrich Kasiski** ve **Charles Babbage**, bu şifrenin hükmüne son verdiler. **Kasiski Testi** olarak bilinen yöntemle, şifreli metinde tekrar eden harf gruplarını analiz ederek **anahtar uzunluğunu** tespit etmeyi başardılar. Anahtar uzunluğu bulunduktan sonra, her grup üzerinde Caesar şifresi benzeri bir **frekans analizi** yapılarak anahtar elde edilebiliyordu.

Bugün çeşitli tekniklerle Vigenère şifresi kolaylıkla çözülebilse de, **yeterince uzun ve rastgele bir anahtar**, düz metinle aynı uzunlukta seçilirse, şifre **yeniden kırılamaz hale gelir**. Bu durumda, mükemmel şifreleme yöntemi olan **Tek Kullanımlık Anahtar (One-Time Pad, OTP)** ile eşdeğer bir güvenlik düzeyi elde edilir.

Sonuç olarak diyebiliriz ki, düz metinle aynı uzunlukta rastgele bir anahtar kullanıldığında, **Vigenère şifresi yeniden kırılamaz hale gelir!**