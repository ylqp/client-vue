/**
 * 挂载
 * @param {*} queItem 
 * @returns 
 */
 const mountAnswer_SingleSelection = queItem => {
    
    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.id
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_MultiSelection = queItem => {

    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.idList
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_BlankFilling = queItem => {
    
    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.pairList
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_Judgement = queItem => {

    let options = queItem.answerArea.optionList
	options.forEach(item => {
		if (item.content === '对' || item.content === '正确' || item.content === 'T') {
		  item.webContent = '正确'
		}
		if (item.content === '错' || item.content === '错误' || item.content === 'F') {
		  item.webContent = '错误'
		}
	})

    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.id
        queItem.webData.isAnswer = true
    }

    return queItem
}
const mountAnswer_EssayQuestion = queItem => {

    if (queItem.answerRecord && queItem.answerRecord.content) {

		let con = queItem.answerRecord.content.content
		if (con) {
			queItem.webData.answer = con
			queItem.webData.isAnswer = true
		}
	}

    return queItem
}
const mountAnswer_JudgementCorrectsMistakes = queItem => {

    // 处理判断选项
	let options = queItem.answerArea.optionList
	options.forEach(item => {
		if (item.content === '对' || item.content === '正确' || item.content === 'T') {
		  item.webContent = '正确'
		}
		if (item.content === '错' || item.content === '错误' || item.content === 'F') {
		  item.webContent = '错误'
		}
	})

    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content
        if (!queItem.webData.answer.content) {
        	queItem.webData.answer.content = ""
        }
        queItem.webData.isCorrect = false
        //是否需要改错框
        if (queItem.webData.answer && queItem.webData.answer.id) {
        	var answerOption = options.filter(item => item.id == queItem.webData.answer.id)
        	if (answerOption[0].webContent == '错误') {
        		queItem.webData.isCorrect = true
        	}
        }
        queItem.webData.isAnswer = true
    } else {
        queItem.webData.answer = {}
    	queItem.webData.answer.id = ""
    	queItem.webData.answer.content = ""
    	queItem.webData.isCorrect = false
    	queItem.webData.isAnswer = false
    }

    
    return queItem
}
const mountAnswer_Composite = queItem => {

    if (queItem.subqustionList.length) {
        queItem.subqustionList.forEach(subItem => {
            const subAnswerItem = mountQueItemAnswer(subItem)
        })
    }

    queItem.webData.isAnswer = queItem.subqustionList.every(function (item, index) {
    	// console.log(index + '---------' + item.webData.isAnswer)
    	return item.webData.isAnswer
    })

    return queItem
}

const mountQueItemAnswer = queItem => {
    let answerItem
    switch (queItem.answerMode) {
        case 'SingleSelection':
            answerItem = mountAnswer_SingleSelection(queItem)
            break;
        case 'MultiSelection':
            answerItem = mountAnswer_MultiSelection(queItem)
            break;
        case 'BlankFilling':
            answerItem = mountAnswer_BlankFilling(queItem)
            break;
        case 'Judgement':
            answerItem = mountAnswer_Judgement(queItem)
            break;
        case 'EssayQuestion':
            answerItem = mountAnswer_EssayQuestion(queItem)
            break;
        case 'JudgementCorrectsMistakes':
            answerItem = mountAnswer_JudgementCorrectsMistakes(queItem)
            break;
        case 'Composite':
            answerItem = mountAnswer_Composite(queItem)
            break;
    }
    return answerItem
}

export default mountQueItemAnswer