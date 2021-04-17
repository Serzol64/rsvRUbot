import re
import json

text = open('botContent/data/textSkill.json','r')
eduTest = open('botContent/data/edutestSkill.json','r')
video = open('botContent/data/videoSkill.json','r')

def skillBase(skill):
    
    isText = re.search('/\[text skill*=\s*(.*)\]/',skill)
    isEduTest = re.search('/\[edu test skill*=\s*(.*)\]/',skill)
    isVideo = re.search('/\[video skill*=\s*(.*)\]/',skill)

    if isText:
        dataSource = text
    elif isEduTest:
        dataSource = eduTest
    elif isVideo:
        dataSource = video


    skillQuery = re.search('\[(.*)\s*=\s*(.*)\]',skill).group(1)
    
    with dataSource as source:
        data = json.load(source)

        for dataset in data:
            if dataset['skill'] == skillQuery:
                return dataset['content']
                break
        