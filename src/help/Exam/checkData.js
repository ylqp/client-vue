import Vue from 'vue'
const $eventBus = Vue.prototype.$eventBus

const checkData = {
    // 中农题（数据源）
    cau_dataSource: '{"data":{"arrangementId":"b1030c2b-9b6a-4159-b8e6-1f48a7915554","role":"student","realpath":"/data/test-datafiles/ots/cate","autoPhotoTimes":10,"canNotEnterOverTimes":0,"faceCorpuscleInTest":false,"photoBeginTest":true,"title":"考前检测","photoBeginAboveThreeTimes":false,"strcode":null,"studentTestActivityScoreId":"9b79eb03-1699-46c9-8396-6de5b6a454a3","subjectId":null,"takePhotoInTest":true,"forceDetails":"1","paper":{"achievementType":1,"currentQuestionNum":0,"paperCategoryId":"1","answerTimeLength":null,"creatorId":"teacher1","questionCategoryItemCodes":["00292"],"difficultyDegree":5,"showComment":true,"isPrivate":0,"judgementmode":2,"showTotalScore":true,"paperForm":1,"showEachScore":true,"psOutputDto":[{"paperQuestionList":null,"realEachScore":0,"level":1,"totalscore":"0.0","eachQuestionScore":null,"sequencenumber":"","usedsequence":"","isSameScore":true,"parentId":"","sequence":1,"totalquestion":0,"name":null,"comment":null,"id":"41dc9cf3-819e-48e3-af48-2c39772555ce"},{"paperQuestionList":[{"solvingProcess":"","sequenceNumber":"1","questionId":"f5848bb5-c348-4d49-85dd-e6c31d16d503","answerRecord":{},"questiontypename":"中国农业大学考前检测","difficultyDegree":5,"usedsequence":"1","answerArea":null,"answerMode":"Composite","sequence":1,"score":100.000,"judgmentMode":2,"answer":null,"subqustionList":[{"solvingProcess":null,"sequence":1,"sequenceNumber":null,"score":15.000,"questionId":"7c1eb5d5-7810-4f27-99f6-e81c887da5bc","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"<span> 可以看到</span>","sequence":0,"score":0,"isInput":false},{"id":"1","content":"<span> 看不到</span>","sequence":1,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":"0,1","stem":"你能看到摄像头图像吗？"},{"solvingProcess":null,"sequence":2,"sequenceNumber":null,"score":20.000,"questionId":"e9ad823b-d510-48ce-bf4f-be7b23c24b42","answer":null,"answerRecord":{},"questiontypename":"问答题","answerArea":null,"answerMode":"EssayQuestion","answerAreaStyle":null,"stem":"测试一下键盘输入功能，请在答题区域输入“诚信考试”"},{"solvingProcess":null,"sequence":3,"sequenceNumber":null,"score":20.000,"questionId":"aa153fd7-8690-4637-adb9-a38867427cd2","answer":null,"answerRecord":{},"questiontypename":"问答题","answerArea":null,"answerMode":"EssayQuestion","answerAreaStyle":null,"stem":"测试一下拍照上传纸面答案功能。（部分课程的作答答案涉及公式，绘图，表格等，因无法通过键盘输入完成作答，所以请先在纸面手写作答后，再拍照上传到答题区域）拍照上传功能仅限对纸面作答内容（公式、绘图、表格）进行拍照，上传其他内容一律视为无效。"},{"solvingProcess":null,"sequence":4,"sequenceNumber":null,"score":15.000,"questionId":"ba45a024-31b2-40a0-9656-7de018fc5217","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"<span> 可以</span>","sequence":0,"score":0,"isInput":false},{"id":"1","content":"<span> 不可以</span>","sequence":1,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":"0,1","stem":"你能正常完成第3题的操作吗？"},{"solvingProcess":null,"sequence":5,"sequenceNumber":null,"score":15.000,"questionId":"72e6370e-6496-43c1-891f-91580993152d","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"<span> 已知晓</span>","sequence":0,"score":0,"isInput":false},{"id":"1","content":"<span> 不知晓（请退出客户端，进入我的课堂/在线考试查看在线考试说明。）</span>","sequence":1,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":"0,1","stem":"你是否知晓每门课程只有一次考试机会。"},{"solvingProcess":null,"sequence":6,"sequenceNumber":null,"score":15.000,"questionId":"42af9a6c-3ac4-4e58-b417-2ea0d67f5359","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"<span> 已知晓</span>","sequence":0,"score":0,"isInput":false},{"id":"1","content":"<span> 不知晓（请退出客户端，进入我的课堂/在线考试查看在线考试说明。）</span>","sequence":1,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":"0,1","stem":"你是否知晓考试过程中意外中断考试后，在120分钟考试时间内可重新登陆系统继续考试，但考试时间不因意外退出而停止计时。"}],"category":[{"code":"00292001","name":"考点检测"}],"answerAreaStyle":null,"stem":"环境检测试题","batchNumber":"f5848bb5-c348-4d49-85dd-e6c31d16d503"}],"realEachScore":100.000,"level":2,"totalscore":"100","eachQuestionScore":null,"sequencenumber":"一","usedsequence":"一","isSameScore":true,"parentId":"41dc9cf3-819e-48e3-af48-2c39772555ce","sequence":1,"totalquestion":1,"name":"复合题","comment":"","id":"0ce73011-8c02-453b-a584-7317d3f11a98"}],"number":"20123016093191502930d45","score":100.000,"name":"考前检测-复合题","questionCategoryId":"2","showQuestionCount":true,"lastSubmitQuestionTime":0,"comprehensive":0,"usedCount":1},"minimumCommitTime":0,"useTime":0,"tempSaveAnswerTime":60,"timeLimitEnabled":true,"startTime":"2020-12-30 17:08:24","testEndTime":"2021-03-25 00:00:00","takePhotoAutomaticSubmitTime":3,"paperOrder":1,"closePageAfterSubmit":false,"tenant":"cate","tempSaveAnswer":true,"viewStructure":true,"tempSaveAnswerExpire":64,"detection":"false","resourcePackageId":null,"startPaperResponse":false,"stayInPage":"true","currentStatus":"正在作答","isEntranceExams":false,"needCheckCode":false,"arrangementName":"环境测试，非正式考试","paperLayoutMode":0,"userFaceImageUrl":"http://211.167.76.161:8599/img/ots/cate/baseImage/7d/42/7d42fed9-407a-4884-916a-de5133dcfaec/20190416091509.jpg","photoEndTest":true,"answerPaperRecordId":"f720f77d-4757-41ca-b567-ea6be15e60c6","banCopy":false,"delayPapersAutoGradePolicy":false,"takePhotoInMinimumCommitTime":5,"paperTime":90,"photoInPocessTest":0},"error":null,"status":1}',
    // 上海交大
    shsmu_dataSource: '{"data":{"arrangementId":"f0d594fb-34ce-41e0-8414-3d52a40f066e","role":"student","realpath":"/data/test-datafiles/ots/lzuexam","title":"检测试题","strcode":null,"studentTestActivityScoreId":"b07d3b00-9450-4069-8965-56cc8446dfbc","subjectId":null,"takePhotoInTest":false,"forceDetails":0,"paper":{"achievementType":1,"currentQuestionNum":0,"paperCategoryId":"e83fd73e-f166-11e5-97b2-0050568acb7d","answerTimeLength":null,"creatorId":"teacher1","questionCategoryItemCodes":["00456"],"difficultyDegree":5,"showComment":true,"isPrivate":0,"judgementmode":2,"showTotalScore":false,"paperForm":1,"showEachScore":false,"psOutputDto":[{"paperQuestionList":null,"realEachScore":0,"level":1,"totalscore":"0.0","eachQuestionScore":null,"sequencenumber":"","usedsequence":"","isSameScore":true,"parentId":"","sequence":1,"totalquestion":0,"name":null,"comment":null,"id":"3b191367-9ee3-4ce3-b054-21c879b9d528"},{"paperQuestionList":[{"solvingProcess":null,"sequenceNumber":"1","questionId":"530ef551-785c-4599-9f4c-acf66edcaf8a","answerRecord":{},"questiontypename":"环境检测","difficultyDegree":5,"usedsequence":"1","answerArea":null,"answerMode":"Composite","sequence":1,"score":1.000,"judgmentMode":2,"answer":null,"subqustionList":[{"solvingProcess":null,"sequence":1,"sequenceNumber":null,"score":0.300,"questionId":"ea767936-4abe-4287-b379-cfadc788380e","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"可以看到","sequence":0,"score":0,"isInput":false},{"id":"1","content":"看不到","sequence":0,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":null,"stem":"你能看到摄像头图像吗？"}],"category":[{"code":"00456001","name":"1"}],"answerAreaStyle":null,"stem":"环境检测试题","batchNumber":"530ef551-785c-4599-9f4c-acf66edcaf8a"}],"realEachScore":1.000,"level":2,"totalscore":"1","eachQuestionScore":"1","sequencenumber":"一","usedsequence":"一","isSameScore":true,"parentId":"3b191367-9ee3-4ce3-b054-21c879b9d528","sequence":1,"totalquestion":1,"name":"环境检测","comment":"","id":"012c1dad-687f-4806-b122-cda749c032c5"}],"number":"1910161457431571209063467","score":1.000,"name":"检测试题","questionCategoryId":"2","showQuestionCount":false,"lastSubmitQuestionTime":0,"comprehensive":0,"usedCount":2},"minimumCommitTime":0,"useTime":0,"tempSaveAnswerTime":60,"timeLimitEnabled":true,"startTime":"2019-10-24 16:17:38","takePhotoAutomaticSubmitTime":0,"paperOrder":0,"closePageAfterSubmit":true,"tenant":"lzuexam","tempSaveAnswer":true,"viewStructure":true,"tempSaveAnswerExpire":24,"detection":"false","resourcePackageId":null,"startPaperResponse":false,"stayInPage":"true","currentStatus":"正在作答","isEntranceExams":false,"needCheckCode":false,"arrangementName":"环境测试，非正式考试","paperLayoutMode":0,"userFaceImageUrl":null,"answerPaperRecordId":"61e0c715-6c53-4c7c-b13d-4c2b01a07f33","banCopy":false,"delayPapersAutoGradePolicy":false,"takePhotoInMinimumCommitTime":0,"paperTime":90},"error":null,"status":1}',
    // 默认
    dataSource: '{"data":{"arrangementId":"f0d594fb-34ce-41e0-8414-3d52a40f066e","role":"student","realpath":"/data/test-datafiles/ots/lzuexam","title":"检测试题","strcode":null,"studentTestActivityScoreId":"b07d3b00-9450-4069-8965-56cc8446dfbc","subjectId":null,"takePhotoInTest":false,"forceDetails":0,"paper":{"achievementType":1,"currentQuestionNum":0,"paperCategoryId":"e83fd73e-f166-11e5-97b2-0050568acb7d","answerTimeLength":null,"creatorId":"teacher1","questionCategoryItemCodes":["00456"],"difficultyDegree":5,"showComment":true,"isPrivate":0,"judgementmode":2,"showTotalScore":false,"paperForm":1,"showEachScore":false,"psOutputDto":[{"paperQuestionList":null,"realEachScore":0,"level":1,"totalscore":"0.0","eachQuestionScore":null,"sequencenumber":"","usedsequence":"","isSameScore":true,"parentId":"","sequence":1,"totalquestion":0,"name":null,"comment":null,"id":"3b191367-9ee3-4ce3-b054-21c879b9d528"},{"paperQuestionList":[{"solvingProcess":null,"sequenceNumber":"1","questionId":"530ef551-785c-4599-9f4c-acf66edcaf8a","answerRecord":{},"questiontypename":"环境检测","difficultyDegree":5,"usedsequence":"1","answerArea":null,"answerMode":"Composite","sequence":1,"score":1.000,"judgmentMode":2,"answer":null,"subqustionList":[{"solvingProcess":null,"sequence":1,"sequenceNumber":null,"score":0.300,"questionId":"ea767936-4abe-4287-b379-cfadc788380e","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"可以看到","sequence":0,"score":0,"isInput":false},{"id":"1","content":"看不到","sequence":0,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":null,"stem":"你能看到摄像头图像吗？"},{"solvingProcess":null,"sequence":2,"sequenceNumber":null,"score":0.300,"questionId":"fdfb55ec-71b1-4a1d-91d9-6437af5dc698","answer":null,"answerRecord":{},"questiontypename":"简答题","answerArea":{"blankLine":4},"answerMode":"EssayQuestion","answerAreaStyle":null,"stem":"请在答题区内输入“终身学习，有教无类”。"},{"solvingProcess":null,"sequence":3,"sequenceNumber":null,"score":0.400,"questionId":"f6f171ba-7eba-40c1-a9c1-0bd4a38b5052","answer":null,"answerRecord":{},"questiontypename":"单选题","answerArea":{"optionList":[{"id":"0","content":"可以","sequence":0,"score":0,"isInput":false},{"id":"1","content":"不可以","sequence":0,"score":0,"isInput":false}],"reorder":false},"answerMode":"SingleSelection","answerAreaStyle":null,"stem":"你能正常完成第2题的操作吗？"}],"category":[{"code":"00456001","name":"1"}],"answerAreaStyle":null,"stem":"环境检测试题","batchNumber":"530ef551-785c-4599-9f4c-acf66edcaf8a"}],"realEachScore":1.000,"level":2,"totalscore":"1","eachQuestionScore":"1","sequencenumber":"一","usedsequence":"一","isSameScore":true,"parentId":"3b191367-9ee3-4ce3-b054-21c879b9d528","sequence":1,"totalquestion":1,"name":"环境检测","comment":"","id":"012c1dad-687f-4806-b122-cda749c032c5"}],"number":"1910161457431571209063467","score":1.000,"name":"检测试题","questionCategoryId":"2","showQuestionCount":false,"lastSubmitQuestionTime":0,"comprehensive":0,"usedCount":2},"minimumCommitTime":0,"useTime":0,"tempSaveAnswerTime":60,"timeLimitEnabled":true,"startTime":"2019-10-24 16:17:38","takePhotoAutomaticSubmitTime":0,"paperOrder":0,"closePageAfterSubmit":true,"tenant":"lzuexam","tempSaveAnswer":true,"viewStructure":true,"tempSaveAnswerExpire":24,"detection":"false","resourcePackageId":null,"startPaperResponse":false,"stayInPage":"true","currentStatus":"正在作答","isEntranceExams":false,"needCheckCode":false,"arrangementName":"环境测试，非正式考试","paperLayoutMode":0,"userFaceImageUrl":null,"answerPaperRecordId":"61e0c715-6c53-4c7c-b13d-4c2b01a07f33","banCopy":false,"delayPapersAutoGradePolicy":false,"takePhotoInMinimumCommitTime":0,"paperTime":90},"error":null,"status":1}',


}

// data为子题数组
export const dealCheck = {
    cau: (data) => {
        let  qids = ["7c1eb5d5-7810-4f27-99f6-e81c887da5bc", "e9ad823b-d510-48ce-bf4f-be7b23c24b42", "aa153fd7-8690-4637-adb9-a38867427cd2", "ba45a024-31b2-40a0-9656-7de018fc5217", "72e6370e-6496-43c1-891f-91580993152d", "42af9a6c-3ac4-4e58-b417-2ea0d67f5359"]
        // 这里的tryCatch用于跳出循环
        try {
            data.forEach(item => {
                // 第一题
                if (item.questionId === qids[0]) {
                    
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第一题.检测摄像头设备，能看到摄像头图像后方可继续考试'
                        })
                        throw Error()
                    }
                }
                // 第二题----输入内容
                if (item.questionId === qids[1]) {
                    
                    if (!item.webData.answer.length) {
                        $eventBus.$otsPop({
                            content: '第二题.请输入任意内容'
                        })
                        throw Error()
                    }
                }
                // 第三题----上传图片
                if (item.questionId === qids[2]) {
                    
                    if (item.webData.answer.indexOf('<img') < 0) {
                        $eventBus.$otsPop({
                            content: '第三题.请进行拍照上传答案测试'
                        })
                        throw Error()
                    }
                }
                // 第四题
                if (item.questionId === qids[3]) {
                    
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第四题.请完成第三题要求内容，如果存在问题请反馈'
                        })
                        throw Error()
                    }
                }
                // 第五题----上传图片
                if (item.questionId === qids[4]) {
                    
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第五题.请退出客户端，进入我的课堂/在线考试查看在线考试说明。'
                        })
                        throw Error()
                    }
                }
                // 第六题
                if (item.questionId === qids[5]) {
                    
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第六题.请退出客户端，进入我的课堂/在线考试查看在线考试说明。'
                        })
                        throw Error()
                    }
                }
            })
            return true
        } catch (error) {
            
        }
    },
    dealCommon: (data) => {
        let qids = ["ea767936-4abe-4287-b379-cfadc788380e", "fdfb55ec-71b1-4a1d-91d9-6437af5dc698", "f6f171ba-7eba-40c1-a9c1-0bd4a38b5052"]
        // 这里的tryCatch用于跳出循环
        try {
            data.forEach(item => {
                console.log(123)
                // 第一题
                if (item.questionId === qids[0]) {
                    
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第一题.检测摄像头设备，能看到摄像头图像后方可继续考试'
                        })
                        throw Error()
                    }
                }
                // 第二题----输入内容
                if (item.questionId === qids[1]) {
                    
                    if (!item.webData.answer.length) {
                        $eventBus.$otsPop({
                            content: '第二题.请填写任意内容'
                        })
                        throw Error()
                    }
                }
                // 第三题
                if (item.questionId === qids[2]) {
                    if (item.webData.answer != '0') {
                        $eventBus.$otsPop({
                            content: '第三题.请完成第二题要求内容，如果存在问题请反馈'
                        })
                        throw Error()
                    }
                }
            })
            return true
        } catch (error) {
            
        }
    }
}


export default checkData