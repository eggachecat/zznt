
import re



raw_mapping = {'a':'ā á ǎ à','o':'ō ó ǒ ò','e':'ē é ě è','i':'ī í ǐ ì','u':'ū ú ǔ ù', 'v':'ǖ ǘ ǚ ǜ'}
translater = {}
for key in raw_mapping:
    for val in raw_mapping[key].split(' '):
        translater[val] = key

def parse_row(data):
    idiom, _ = data.split("拼音：")
    pinyin, _ = _.split("释义：")
    pinyin_raw = "".join(map(lambda c: translater[c] if c in translater else c, pinyin))
    idiom = idiom.strip()
    pinyin = pinyin.strip()
    pinyin_raw = pinyin_raw.strip()
    return idiom, pinyin, pinyin_raw

def main():
    with open("./all.txt", "r", encoding='UTF-8') as fp:
        raw_data = fp.read()
    raw_data = re.sub("\n* *\n+ *-+ *\n+ *分节阅读 *\n* *\d+\n\n", "", raw_data)

    raw_data = "".join(raw_data)

    dictionary = []

    data_set = list(filter(lambda x:  x.count('：') > 1, raw_data.split('\n')))

    for data in data_set:
        try:
            idiom, pinyin, pinyin_raw = parse_row(data)
            dictionary.append({
                'idiom': idiom,
                'pinyin': pinyin.split(' '),
                'pinyin_raw': pinyin_raw.split(' ')
            })
        except Exception as e:
                for data_ in data.split("示例：无"):
                    try:
                        idiom, pinyin, pinyin_raw = parse_row(data_)
                        dictionary.append({
                            'idiom': idiom,
                            'pinyin': pinyin.split(' '),
                            'pinyin_raw': pinyin_raw.split(' ')
                        })
                    except Exception as e_:
                        print(e_)
                        print(data_)

    return dictionary


result = main()

import json

with open("dictionary.json", "w") as fp:
    json.dump(result, fp)


