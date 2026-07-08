function analyzeInput(input) {
    const lowered = input.toLowerCase().trim();

    const sentiment = determineSentiment(lowered);
    const queryParams = parseQuery(lowered);

    return {
        queryParams,
        sentiment
    };
}

function determineSentiment(input) {
    const positiveWords = ['good', 'great', 'excellent', 'thank', 'thanks', 'please', 'best', 'love', 'happy', 'yes', 'yeah', 'amazing', 'wonderful', 'nice'];
    const negativeWords = ['bad', 'terrible', 'hate', 'problem', 'issue', 'wrong', 'no', 'nope', 'disappointed', 'poor', 'awful', 'horrible', 'complain'];

    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
        if (input.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
        if (input.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) {
        return 'positive';
    } else if (negativeCount > positiveCount) {
        return 'negative';
    }

    return 'neutral';
}

function parseQuery(input) {
    const facilityPatterns = {
        'facility_a': ['facility a', 'a', 'first'],
        'facility_b': ['facility b', 'b', 'second'],
        'facility_c': ['facility c', 'c', 'third']
    };

    let facility = null;
    for (const [fac, patterns] of Object.entries(facilityPatterns)) {
        if (patterns.some(p => input.includes(p))) {
            facility = fac;
            break;
        }
    }

    if (input.includes('all') || input.includes('facilities') && !facility) {
        return { type: 'all_facilities' };
    }

    if (facility) {
        return { type: 'specific_facility', facility };
    }

    if (input.includes('capacity') || input.includes('slot') || input.includes('waiting') || input.includes('hours') || input.includes('time')) {
        const keyword = extractKeyword(input);
        return { type: 'keyword', keyword };
    }

    return { type: 'keyword', keyword: input };
}

function extractKeyword(input) {
    const keywords = ['capacity', 'slot', 'available', 'waiting', 'hours', 'time', 'open', 'close'];
    for (const kw of keywords) {
        if (input.includes(kw)) {
            return kw;
        }
    }
    return input;
}
