async function translateText() {
    const text = document.getElementById("inputText").value.trim();
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;
    const output = document.getElementById("output");

    if (!text) {
        output.innerText = "Please enter text to translate.";
        return;
    }

    if (source === target) {
        output.innerText = text;
        return;
    }

    const dictionary = {
        en: {
            hi: {
                "hello": "नमस्ते",
                "hi": "नमस्ते",
                "good morning": "सुप्रभात",
                "good": "अच्छा",
                "morning": "सुबह",
                "world": "दुनिया",
                "how are you": "आप कैसे हैं",
                "how": "कैसे",
                "are": "हैं",
                "you": "आप",
                "i am": "मैं हूँ",
                "i": "मैं",
                "am": "हूँ",
                "fine": "ठीक",
                "thanks": "धन्यवाद",
                "thank you": "धन्यवाद",
                "thank": "धन्यवाद",
                "please": "कृपया",
                "yes": "हाँ",
                "no": "नहीं",
                "this": "यह",
                "that": "वह",
                "is": "है",
                "my": "मेरा",
                "name": "नाम",
                "what": "क्या",
                "your": "आपका",
                "friend": "दोस्त",
                "today": "आज",
                "food": "खाना",
                "water": "पानी",
                "love": "प्यार"
            },
            fr: {
                "hello": "bonjour",
                "hi": "salut",
                "good morning": "bonjour",
                "good": "bon",
                "morning": "matin",
                "world": "monde",
                "how are you": "comment allez-vous",
                "how": "comment",
                "are": "êtes",
                "you": "vous",
                "i am": "je suis",
                "i": "je",
                "am": "suis",
                "fine": "bien",
                "thanks": "merci",
                "thank you": "merci",
                "thank": "merci",
                "please": "s'il vous plaît",
                "yes": "oui",
                "no": "non",
                "this": "ceci",
                "that": "cela",
                "is": "est",
                "my": "mon",
                "name": "nom",
                "what": "quoi",
                "your": "votre",
                "friend": "ami",
                "today": "aujourd'hui",
                "food": "nourriture",
                "water": "eau",
                "love": "amour"
            }
        },
        hi: {
            en: {
                "नमस्ते": "hello",
                "सुप्रभात": "good morning",
                "अच्छा": "good",
                "सुबह": "morning",
                "दुनिया": "world",
                "आप कैसे हैं": "how are you",
                "कैसे": "how",
                "हैं": "are",
                "आप": "you",
                "मैं हूँ": "i am",
                "मैं": "i",
                "हूँ": "am",
                "ठीक": "fine",
                "धन्यवाद": "thanks",
                "कृपया": "please",
                "हाँ": "yes",
                "नहीं": "no",
                "यह": "this",
                "वह": "that",
                "है": "is",
                "मेरा": "my",
                "नाम": "name",
                "क्या": "what",
                "आपका": "your",
                "दोस्त": "friend",
                "आज": "today",
                "खाना": "food",
                "पानी": "water",
                "प्यार": "love"
            }
        },
        fr: {
            en: {
                "bonjour": "hello",
                "salut": "hi",
                "bonne journée": "good day",
                "bon": "good",
                "matin": "morning",
                "monde": "world",
                "comment allez-vous": "how are you",
                "comment": "how",
                "êtes": "are",
                "vous": "you",
                "je suis": "i am",
                "je": "i",
                "suis": "am",
                "bien": "fine",
                "merci": "thanks",
                "oui": "yes",
                "non": "no",
                "ceci": "this",
                "cela": "that",
                "est": "is",
                "mon": "my",
                "nom": "name",
                "quoi": "what",
                "votre": "your",
                "ami": "friend",
                "aujourd'hui": "today",
                "nourriture": "food",
                "eau": "water",
                "amour": "love"
            }
        }
    };

    const sourceMap = dictionary[source]?.[target] || {};
    const normalized = text.toLowerCase();

    const phraseKeys = Object.keys(sourceMap).sort((a, b) => b.length - a.length);
    let translatedText = normalized;
    let matchedAny = false;

    for (const key of phraseKeys) {
        if (translatedText.includes(key)) {
            translatedText = translatedText.replaceAll(key, sourceMap[key]);
            matchedAny = true;
        }
    }

    if (!matchedAny) {
        const words = text.split(/\s+/);
        let translatedCount = 0;

        translatedText = words.map((word) => {
            const match = word.match(/^(\W*)([\w\u0900-\u097F'’\-]+)(\W*)$/u);
            if (!match) return word;

            const [, prefix, core, suffix] = match;
            const lookup = core.toLowerCase();
            const translated = sourceMap[lookup];

            if (translated) {
                translatedCount++;
                return prefix + translated + suffix;
            }

            return word;
        }).join(" ");

        if (translatedCount === 0) {
            output.innerText = "No offline translation found for this text.";
            return;
        }
    }

    output.innerText = translatedText;
}