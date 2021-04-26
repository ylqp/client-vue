//用于copy配置项
const copySetOptions = (obj) => {
	var newObj = {};
	//考试标题 ==> 由后台配置用活动名称OR试卷名称
	newObj.title = obj.title ? obj.title : '';
	//试卷时间 考试时间
	newObj.paperTime = obj.paperTime ? obj.paperTime : '';
    //作答记录id
    newObj.answerPaperRecordId = obj.answerPaperRecordId ? obj.answerPaperRecordId : '';
    //考试记录id
    newObj.studentTestActivityScoreId = obj.studentTestActivityScoreId ? obj.studentTestActivityScoreId : '';
    //临时保存参数
    newObj.tempSaveAnswerExpire = obj.tempSaveAnswerExpire ? obj.tempSaveAnswerExpire : '';
    //基础图片
    newObj.userFaceImageUrl = obj.userFaceImageUrl ? obj.userFaceImageUrl : '';
    //随机拍照总次数
    newObj.autoPhotoTimes = obj.autoPhotoTimes ? obj.autoPhotoTimes : '';
    //随机拍照已拍次数
    newObj.photoInPocessTest = obj.photoInPocessTest ? obj.photoInPocessTest : '';
    //是否计时
    newObj.timeLimitEnabled = obj.timeLimitEnabled ? obj.timeLimitEnabled : '';
    //控制是否展示基础
    newObj.viewUserFaceImage = obj.viewUserFaceImage ? obj.viewUserFaceImage : '';
    //最短提交时间
    newObj.minimumCommitTime = obj.minimumCommitTime ? obj.minimumCommitTime : '';
    //最短提交时间内最少照片
    newObj.takePhotoInMinimumCommitTime = obj.takePhotoInMinimumCommitTime ? obj.takePhotoInMinimumCommitTime : '';
    //答题时间
    newObj.useTime = obj.useTime ? obj.useTime : '';
    //人脸识别3次不通过不让进入考试
    newObj.canNotEnterOverTimes = obj.canNotEnterOverTimes ? obj.canNotEnterOverTimes : '';
    //是否强制去详情页
    newObj.forceDetails = obj.forceDetails ? obj.forceDetails : '';
    //是否调用答案存储
    newObj.tempSaveAnswer = obj.tempSaveAnswer ? obj.tempSaveAnswer : '';
    //多长时间存储一次
    newObj.tempSaveAnswerTime = obj.tempSaveAnswerTime ? obj.tempSaveAnswerTime : '';
    //是否延时判分 ===>提交试卷后页面处理用到
	newObj.delayPapersAutoGradePolicy = obj.delayPapersAutoGradePolicy ? obj.delayPapersAutoGradePolicy : '';
	//提交后是否关闭页面
	newObj.closePageAfterSubmit = obj.closePageAfterSubmit ? obj.closePageAfterSubmit : '';
	//是否保留在当前页面
	newObj.sTtayInPage = obj.sTtayInPage ? obj.sTtayInPage : '';
	//是否人脸识别====》人脸相关
	newObj.takePhotoInTest = obj.takePhotoInTest ? obj.takePhotoInTest : '';
	//拍照次数是否超过设置次数====》人脸相关
	newObj.photoBeginAboveThreeTimes = obj.photoBeginAboveThreeTimes ? obj.photoBeginAboveThreeTimes : '';
	//超过设置次数不让考试===》人脸相关
	newObj.comparefailClose = obj.comparefailClose ? obj.comparefailClose : '';
	//开始考试拍照次数===》人脸相关
	newObj.photoBeginTest = obj.photoBeginTest ? obj.photoBeginTest : '';
	//开始考试拍照次数===》人脸相关
	newObj.photoEndTest = obj.photoEndTest ? obj.photoEndTest : '';
	// 水印
	newObj.watermark = obj.watermark ? obj.watermark : '';
	// 防伪
	newObj.preventCheat = obj.preventCheat ? obj.preventCheat : '';
    //是否评阅 ===>提交试卷后页面处理用到
    newObj.judgementmode = obj.paper && obj.paper.judgementmode ? obj.paper.judgementmode : '';
	//是否是综合卷
	newObj.comprehensive = obj.paper && obj.paper.comprehensive ? obj.paper.comprehensive : '';
	// 是否显示每题分数
	newObj.showEachScore = obj.paper.showEachScore; 
	// 是否显示大题总分数
    newObj.showTotalScore = obj.paper.showTotalScore; 
    // 是否显示共多少题（每道大题后的括号内容）
    newObj.showQuestionCount = obj.paper.showQuestionCount; 
	
    return newObj;
}

export default copySetOptions