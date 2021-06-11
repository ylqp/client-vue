// 关闭程序接口
export const APPCLOSE = 'APPCLOSE'
// 判断是通过浏览器登录 还是 客户端端登录
export const GetIsClientLogin = 'GetIsClientLogin'
// 获取菜单项
export const MenuFunction = 'MenuFunction'
// 获取学习logo
export const GetSchoolLogo = 'GetSchoolLogo'
// 获取租户名
export const GETSCHOOLCODE = 'GETSCHOOLCODE'
// 登录
export const Login = 'Login'
// 拉起程序直接登录
export const ClientCheckLogin = 'ClientCheckLogin'
// 判断程序怎么登录
export const ClientStart = 'ClientStart'
// 获取验证码
export const CheckCode = 'CheckCode'
// 用户信息
export const UserFPSettings = 'UserFPSettings'
// 学生展示信息
export const GetLocalStudentSimpleInformation = 'GetLocalStudentSimpleInformation'
// 获取考试类型
export const QueryActivityTypeListByStudentIdAndCourseCode = 'QueryActivityTypeListByStudentIdAndCourseCode'
// 获取考试列表
export const QueryStudentArrangementListByTypeIdAndCoursecode = 'QueryStudentArrangementListByTypeIdAndCoursecode'
// 检查能否开始考试
export const CheckStartAnswerPaper = 'CheckStartAnswerPaper'
// 开始考试接口(拍照)
export const StartAnswerPaperWithPhoto = 'StartAnswerPaperWithPhoto'
// 开始考试接口(不拍照)
export const StartAnswerPaper = 'StartAnswerPaper'
// 临时保存
export const TempSaveAnswerPaper = 'TempSaveAnswerPaper'
// 提交试卷
export const SubmitAnswerPaper = 'SubmitAnswerPaper'
// 详情页
export const QueryAnswerPaperDetails = 'QueryAnswerPaperDetails'
// 获取考试须知
export const GetPreExamNote = 'GetPreExamNote'
// 考前拍照重置时间
export const ResetAnswerPaperStartTime = 'ResetAnswerPaperStartTime'

// 获取已支付列表
export const QueryStudentPaymentBillByConditions = 'QueryStudentPaymentBillByConditions'
// 获取待付费列表
export const QueryStudentPaymentTestActivityByConditions = 'QueryStudentPaymentTestActivityByConditions'
// 获取支付二维码
export const GetPaymentQr = 'GetPaymentQr'
// 获取支付结果
export const GetPaymentResult = 'GetPaymentResult'

// 消息中心相关

// 获取消息列表
export const OIMMessageList = 'OIMMessageList'
// 消息已读回执
export const OIMMESSAGEISREAD = 'OIMMESSAGEISREAD'
// 消息功能是否有新消息
export const OIMMessageCount = 'OIMMessageCount'
// 登录页执行
export const APPLoginRun = 'APPLoginRun'
// 列表页执行
export const APPHomeRun = 'APPHomeRun'

// 照片上传相关

// 获取照片上传二维码
export const OtsClientCreateUploadID = 'OtsClientCreateUploadID'
// 获取已经上传的图片
export const OtsClientGetFileUrl = 'OtsClientGetFileUrl'


// 获取摄像头
export const GetVideoList = 'GetVideoList'
// 选择摄像头
export const SelectVideo = 'SelectVideo'
// 隐藏摄像头
export const HideCamera = 'HideCamera'
// 设置摄像头参数
export const SetCameraConfig = 'SetCameraConfig'
// 拍照接口
export const TAKEPHOTOFACECOMPARE = 'TAKEPHOTOFACECOMPARE'
// 关闭摄像头
export const CLOSECAMERA = 'CLOSECAMERA'
// 开始录像
export const StartRec = 'StartRec'
// 停止录像
export const StopRec = 'StopRec'
// 获取活体检测的一些配置
export const GETCORPUSCLECODEBYCLIENT = 'GETCORPUSCLECODEBYCLIENT'
// 活体检测对比接口
export const FACECORPUSCLEBYCLIENT = 'FACECORPUSCLEBYCLIENT'

// 随机拍照开始 （完整的进入到考试页面并且有倒计时的那种考试哈调用一下）
export const STARTRANDOMTAKEPHOTO = 'STARTRANDOMTAKEPHOTO'
// 随机拍照结束 （退出考试 交卷  和返回到列表都调用一下的）
export const ENDRANDOMTAKEPHOTO = 'ENDRANDOMTAKEPHOTO'

