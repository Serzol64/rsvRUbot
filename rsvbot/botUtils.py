import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer

stremmer = PorterStemmer()
nltk.download('punkt')

def token(sntc):
    return nltk.word_tokenize(sntc, language="russian")

def stem(wd):
    return stremmer.stem(wd.lower())

def wdBag(token_sntc,wds):

    sntc_wds = [stem(wd) for wd in token_sntc]

    bag = np.zeros(len(wds), dtype=np.float32)
    for idx, w in enumerate(wds):
        if w in sntc_wds: bag[idx] = 1

    return bag




