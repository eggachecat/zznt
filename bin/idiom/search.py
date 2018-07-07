import json
import time
import os
from pypinyin import pinyin
import sys

file_name = os.path.normpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../assets/dictionary.json"))
dictionary = json.load(open(file_name, "r"))

raw_mapping = {'a':'ā á ǎ à','o':'ō ó ǒ ò','e':'ē é ě è','i':'ī í ǐ ì','u':'ū ú ǔ ù', 'v':'ǖ ǘ ǚ ǜ'}
translater = {}
for key in raw_mapping:
    for val in raw_mapping[key].split(' '):
        translater[val] = key

def search(and_keywords, raw_is_ok=True):
    results = []

    for v in dictionary:
        idiom, pinyin, pinyin_raw = v['idiom'], v['pinyin'], v['pinyin_raw']
        and_match = True
        for or_keywords in and_keywords:
            if not and_match:
                break
            or_match = False
            for keyword in or_keywords:
                if raw_is_ok:
                    _pinyin_raw = "".join(map(lambda c: translater[c] if c in translater else c, keyword))
                    # print(_pinyin_raw, pinyin_raw)
                    or_match = or_match or  _pinyin_raw in pinyin_raw
                else:
                    or_match = or_match or keyword in pinyin
            if not or_match:
                and_match = False
        if and_match:
            results.append(idiom)

    print(results)

def parse_words(words):
    and_keywords = []
    for word in words:
        or_keywords = []
        for _ in pinyin(word):
            for __ in _:
                or_keywords.append(__)
        and_keywords.append(or_keywords)
    return and_keywords

if __name__ == '__main__':
    raw_is_ok = bool(int(sys.argv[1]))
    words = parse_words(sys.argv[2:])
    search(words, raw_is_ok=raw_is_ok)

